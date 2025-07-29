import React, { useState, useEffect } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const SelectionModal = ({ onClose, userId, onAddressSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.getAddresses.url}/${userId}`, {
        method: SummaryApi.getAddresses.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch addresses");

      const data = await response.json();
      setAddresses(data);
      
      // Set primary address as selected by default
      const primaryAddress = data.find(addr => addr.isPrimary);
      if (primaryAddress) {
        setSelectedAddress(primaryAddress);
      }
    } catch (error) {
      toast.error("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchAddresses();
  }, [userId]);

  const handleSelectAddress = () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    onAddressSelect(selectedAddress);
  };

  const handleBackToShop = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed w-full h-full bg-gray-900 bg-opacity-50 top-0 left-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-lg">
        {/* Close Button */}
        <div className="absolute top-3 right-3 text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
          <CgClose />
        </div>

        {/* Modal Title */}
        <h2 className="text-3xl font-bold mb-4 text-left">Select Delivery Address</h2>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div 
                key={address._id} 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedAddress?._id === address._id 
                    ? 'border-red-600 bg-red-50 shadow-md' 
                    : 'border-gray-300 hover:border-red-300'
                }`}
                onClick={() => setSelectedAddress(address)}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    checked={selectedAddress?._id === address._id}
                    onChange={() => setSelectedAddress(address)}
                    className="mt-1 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{address.addressLine1}</p>
                    {address.addressLine2 && <p className="text-gray-600">{address.addressLine2}</p>}
                    <p className="text-gray-700 mt-1">
                      {address.city}, {address.state} - {address.postalCode}
                    </p>
                    {address.isPrimary && (
                      <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                        Primary Address
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4 mt-6">
              <button
                className="flex-1 px-4 py-3 bg-gray-600 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 transition"
                onClick={onClose}
              >
                Back to Cart
              </button>
              <button
                className="flex-1 px-4 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleSelectAddress}
                disabled={!selectedAddress}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg mb-6">No addresses found. Please add an address first.</p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                onClick={onClose}
              >
                Back to Cart
              </button>
              <button
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={handleBackToShop}
              >
                Back to Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionModal;