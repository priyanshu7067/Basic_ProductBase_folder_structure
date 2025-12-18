import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
  setDefaultAddress,
} from "../api/address.api";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const Address = ({ selectedAddress, setSelectedAddress }) => {
  const user = useSelector((store) => store?.user);
  const userId = user?.user?.id;

  console.log("User ID in Address Component:",user);

  const [address, setAddress] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: user?.user?.name || "",
    userId: userId || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    phone: user?.user?.phone || "",
    email: user?.user?.email || "",
    isDefault: false,
  });



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let payload = {
      userId: user?.user?.id,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      country: formData.country,
      isDefault: formData.isDefault,
    };

    if (editMode) {
      payload.addressId = editAddressId; 
      await updateAddress(payload);
    } else {
      await addAddress(payload);
    }

    Swal.fire({
      title: "Success!",
      text: editMode ? "Address updated successfully!" : "Address added successfully!",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });

    resetForm();
    await fetchAddress();
  } catch (error) {
    console.error("Error Adding/Updating Address:", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to save address. Please try again.",
      icon: "error",
      confirmButtonColor: "#90479B",
      confirmButtonText: "OK",
    });
  }
};

  const resetForm = () => {
    setFormData({
      firstName: user?.user?.name || "",
      userId: userId || "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      phone: user?.user?.phone || "",
      email: user?.user?.email || "",
      isDefault: false,
    });
    setShowForm(false);
    setEditMode(false);
    setEditAddressId(null);
  };

  const fetchAddress = async () => {
    if (!userId) return;
    try {
      const response = await getAddress();
      const addresses = response?.data?.addresses || [];
      setAddress(addresses);

      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      } else if (addresses.length > 0) {
        setSelectedAddress(addresses[0]._id);
      }
    } catch (error) {
      console.error("Error Fetching Address:", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleDelete = async (addressId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this address?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAddress(addressId);
          fetchAddress();
        } catch (error) {
          console.error("Error Deleting Address:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete address. Please try again.",
            icon: "error",
            confirmButtonColor: "#90479B",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleEdit = (addr) => {
    setFormData({ ...addr });
    setEditAddressId(addr._id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleSetDefault = async (addressId) => {
    try {
      await setDefaultAddress(addressId);
      await fetchAddress();
    } catch (error) {
      console.error("Error Setting Default Address:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Billing Details</h2>

      {!showForm ? (
        <>
          {address.length > 0 ? (
            <div className="space-y-4">
              {address.map((addr, index) => (
                <div
                  key={index}
                  className={`border p-4 rounded-md flex items-center justify-between ${
                    selectedAddress === addr._id ? "border-blue-500" : ""
                  }`}
                >
                  <div className="text-sm">
                    <p className="font-semibold">{addr?.firstName}</p>
                    <p>
                      {addr?.addressLine1}, {addr?.addressLine2}
                    </p>
                    <p>
                      {addr?.city}, {addr?.state} - {addr?.pincode}
                    </p>
                    <p>{addr?.country}</p>
                    <p className="text-gray-900">{addr?.user?.phone}</p>

                    <div className="flex gap-5 items-center text-xl mt-4">
                      <FiEdit
                        onClick={() => handleEdit(addr)}
                        className="text-bg-color cursor-pointer"
                      />
                      <MdDeleteForever
                        onClick={() => handleDelete(addr._id)}
                        className="text-red-500 cursor-pointer"
                      />
                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefault(addr._id)}
                          className="text-sm text-blue-500 underline ml-2"
                        >
                          Set Default
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="radio"
                    name="selectedAddress"
                    value={addr._id}
                    checked={selectedAddress === addr._id}
                    onChange={() => setSelectedAddress(addr._id)}
                    className="w-5 h-5"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
               <span className="text-red-500">Please add an address before placing your order.</span> 
               (No addresses found.)
               </p>
          )}

          <button
            onClick={() => setShowForm(true)}
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-bg-color"
          >
            + Add New Address
          </button>
        </>
      ) : (
        <form
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-semibold">Full Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              // disabled
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              // disabled
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold">Phone</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold">Street Address</label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mb-2"
            />
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              disabled
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Zip Code</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div className="lg:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            <label className="text-sm">Set as Default Address</label>
          </div>

          <button
            type="submit"
            className="w-full px-5 py-2 bg-green-600 text-white rounded-md"
          >
            {editMode ? "Update Address" : "Save Address"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="w-full px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Address;
