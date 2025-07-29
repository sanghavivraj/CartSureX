import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  console.log("GOOGLE CLIENT ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include'
      });
      
      if (dataResponse.ok) {
        const dataApi = await dataResponse.json();
        if (dataApi?.success) {
          dispatch(setUserDetails(dataApi.data));
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const cartRes = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include'
      });
      
      if (cartRes.ok) {
        const cartData = await cartRes.json();
        setCartProductCount(cartData?.data?.count || 0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
  
      if (event.data.type === 'googleAuth' && event.data.token) {
        localStorage.setItem('token', event.data.token);
        fetchUserDetails();
        fetchUserAddToCart();
      }
    };
  
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart
        }}
      >
        <ToastContainer position='top-center' />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
      </Context.Provider>
    </>
  );
}

export default App;