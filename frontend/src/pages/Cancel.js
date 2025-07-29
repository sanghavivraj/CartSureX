import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center max-w-md w-full text-center">
        {/* Cancel Icon */}
        <FaTimesCircle size="10rem" color="red" />

        <h1 className="text-red-700 font-extrabold text-2xl mt-4">
          Payment Canceled ❌
        </h1>
        <p className="text-gray-600 mt-2">Your order was not completed.</p>

        {/* Button to return to cart */}
        <Link
          to="/cart"
          className="mt-5 px-5 py-2 text-lg font-semibold border-2 border-red-600 text-red-600 rounded-lg transition-all duration-300 hover:bg-red-600 hover:text-white shadow-md hover:shadow-lg"
        >
          Return to Cart
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
