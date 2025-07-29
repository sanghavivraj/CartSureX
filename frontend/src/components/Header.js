import React, { useContext, useState, useEffect } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";
import ROLE from "../common/role";
import Logo from "../assest/CartSureX1.png";
import axios from "axios";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user-details`,
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setUserDetails(res.data.data));
      }
    } catch (err) {
      console.error("User fetch failed:", err.message);
    }
  };

  useEffect(() => {
    if (!user?._id) {
      fetchUser();
    }
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (menuDisplay) setMenuDisplay(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuDisplay]);

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* <Link to={"/"}>
          <img src={Logo} alt="CartSureX Logo" className="w-[150px] h-[60px]" />
        </Link> */}

        <Link to={"/"} className="group inline-block">
          <div className="flex flex-col items-center justify-center animate-fadeIn">
            <h1 className="text-3xl font-extrabold text-red-600 group-hover:tracking-wide transition-all duration-300">
              CartSureX
            </h1>
            <p className="text-[0.85rem] text-gray-600 italic group-hover:text-red-600 transition-colors duration-300 -mt-1">
              Trust and Secure
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          {/* Profile Dropdown */}
          <div className="relative flex justify-center">
            {user?._id ? (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuDisplay((preve) => !preve);
                }}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic || null}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            ) : null}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav className="space-y-2">
                  <Link
                    to={"/profile"}
                    className="whitespace-nowrap hover:bg-slate-100 p-2 block"
                    onClick={() => setMenuDisplay(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    to={"/order"}
                    className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Order
                  </Link>

                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hover:bg-slate-100 p-2 block"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <FaShoppingCart />
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {/* Login Button */}
          {!user?._id && (
            <Link
              to={"/login"}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
