import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa';
const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center max-w-md w-full text-center">
        <br></br>
        <FaCheckCircle size="10rem" color="green" /> 

        <h1 className="text-green-700 font-extrabold text-2xl mt-4">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>

        <Link
          to="/order"
          className="mt-5 px-5 py-2 text-lg font-semibold border-2 border-green-600 text-green-600 rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white shadow-md hover:shadow-lg"
        >
          View My Order
        </Link>
        <br></br>

      </div>
    </div>
  );
};

export default Success;
