import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import EditProfileModal from "../components/EditProfileModal";
import AboutUs from "../components/AboutUs";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsOfUse from "../components/TermsOfUse";
import { CgClose } from "react-icons/cg";
import AddressModal from "../components/AddressModal";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        dispatch(setUserDetails(dataResponse.data));
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        localStorage.removeItem("token");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  // Open modal
  const openModal = (content) => {
    setModalContent(content);
  };

  // Close modal
  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Profile Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-10">Profile Information</h2>
        <div className="flex items-center gap-8 ml-10">
          {/* Profile Picture */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl text-gray-500">👤</span>
            )}
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="text-lg">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="text-lg">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Edit Profile Button */}
        <button
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          onClick={() => setIsEditModalOpen(true)}
        >
          <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
          <p className="text-gray-600">Update your personal information.</p>
        </button>

        {/* Order History Button */}
        <button
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          onClick={() => openModal("orderHistory")}
        >
          <h3 className="text-lg font-semibold mb-2">Order History</h3>
          <p className="text-gray-600">View your past orders.</p>
        </button>

        {/* Manage Addresses Button */}
        <button
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          onClick={() => setIsAddressModalOpen(true)}
        >
          <h3 className="text-lg font-semibold mb-2">Manage Addresses</h3>
          <p className="text-gray-600">
            Add or update or delete your addresses.
          </p>
        </button>

        {/* About Us Button */}
        <button
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          onClick={() => openModal("aboutUs")}
        >
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-gray-600">Learn more about our company.</p>
        </button>

        {/* Privacy Policy Button */}
        <button
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          onClick={() => openModal("privacyPolicy")}
        >
          <h3 className="text-lg font-semibold mb-2">Privacy Policy</h3>
          <p className="text-gray-600">Understand how we handle your data.</p>
        </button>

        {/* Terms of Use Button */}
        <button
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          onClick={() => openModal("termsOfUse")}
        >
          <h3 className="text-lg font-semibold mb-2">Terms of Use</h3>
          <p className="text-gray-600">Read our terms and conditions.</p>
        </button>
      </div>

      {/* Logout Button */}
      <div className="text-center mt-6">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          onClose={() => setIsEditModalOpen(false)}
          userDetails={user}
          fetchUserDetails={fetchUserDetails}
        />
      )}

      {/* Address Modal */}
      {isAddressModalOpen && (
        <AddressModal
          onClose={() => setIsAddressModalOpen(false)}
          userId={user?._id}
        />
      )}
      {modalContent === "orderHistory" && (
        <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <div
              className="absolute top-2 right-2 text-2xl hover:text-red-600 cursor-pointer"
              onClick={closeModal}
            >
              <CgClose />
            </div>

            {/* Modal Title */}
            <h2 className="text-2xl font-bold mb-4">Order History</h2>

            {/* Add Order Page Link */}
            <div className="mt-4 text-center">
              <Link
                to="/order"
                className="w-full mt-4 px-4 py-2 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition inline-block text-center"
                onClick={closeModal}
              >
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* About Us Modal */}
      {modalContent === "aboutUs" && (
        <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div
              className="absolute top-2 right-2 text-2xl hover:text-red-600 cursor-pointer"
              onClick={closeModal}
            >
              <CgClose />
            </div>
            <AboutUs />
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {modalContent === "privacyPolicy" && (
        <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div
              className="absolute top-2 right-2 text-2xl hover:text-red-600 cursor-pointer"
              onClick={closeModal}
            >
              <CgClose />
            </div>
            <PrivacyPolicy />
          </div>
        </div>
      )}

      {/* Terms of Use Modal */}
      {modalContent === "termsOfUse" && (
        <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div
              className="absolute top-2 right-2 text-2xl hover:text-red-600 cursor-pointer"
              onClick={closeModal}
            >
              <CgClose />
            </div>
            <TermsOfUse />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
