import React, { useState, useEffect } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { MdModeEdit, MdDelete } from "react-icons/md";

const AddressModal = ({ onClose, userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    isPrimary: false,
  });

  useEffect(() => {
    if (userId) fetchAddresses();
  }, [userId]);

  const fetchAddresses = async () => {
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
    } catch (error) {
      toast.error("Failed to fetch addresses");
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      const url = editingAddress
        ? SummaryApi.updateAddress.url(editingAddress._id)
        : SummaryApi.addAddress.url;

      const method = editingAddress
        ? SummaryApi.updateAddress.method
        : SummaryApi.addAddress.method;

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...formData, userId }),
      });

      if (!response.ok) throw new Error("Failed to save address");

      const data = await response.json();
      toast.success(data.message);
      fetchAddresses();
      setShowForm(false);
      setEditingAddress(null);
      setFormData({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        isPrimary: false,
      });
    } catch (error) {
      toast.error("Failed to save address");
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({ ...address });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteAddress.url(id), {
        method: SummaryApi.deleteAddress.method,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete address");

      const data = await response.json();
      toast.success(data.message);
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  return (
    <div className="fixed w-full h-full bg-gray-900 bg-opacity-50 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-lg">
        
        {/* Close Button */}
        <div className="absolute top-3 right-3 text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
          <CgClose />
        </div>

        {/* Header */}
        <h2 className="text-3xl font-bold mb-4 text-left">Manage Addresses</h2>

        {/* Show Address List */}
        {!showForm ? (
          <>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address._id} className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 flex justify-between items-center shadow">
                  <div>
                    <p className="font-semibold">{address.addressLine1}</p>
                    <p className="text-gray-600">{address.addressLine2}</p>
                    <p className="text-gray-700">{address.city}, {address.state} - {address.postalCode}</p>
                    {address.isPrimary && <p className="text-green-600 font-semibold">Primary Address</p>}
                  </div>
                  <div className="flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800 text-xl"
                      onClick={() => handleEdit(address)}
                    >
                      <MdModeEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-xl"
                      onClick={() => handleDelete(address._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No addresses found.</p>
            )}

            {/* Add Address Button */}
            <button
              className="w-full mt-4 px-4 py-2 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition"
              onClick={() => setShowForm(true)}
            >
              + Add New Address
            </button>
          </>
        ) : (
          // Show Address Form
          <form onSubmit={handleSaveAddress} className="mt-6 space-y-4">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              {editingAddress ? "Update Address" : "Add New Address"}
            </h3>
            <div className="grid gap-3">
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Address Line 1" value={formData.addressLine1} onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })} required />
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Address Line 2" value={formData.addressLine2} onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })} />
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="State" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} required />
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Postal Code" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} required />

              {/* Primary Address Checkbox */}
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={formData.isPrimary} onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })} />
                Set as Primary Address
              </label>
            </div>

            <div className="flex justify-between">
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                {editingAddress ? "Update" : "Add"}
              </button>
              <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700" onClick={() => { setShowForm(false); setEditingAddress(null); }}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddressModal;
