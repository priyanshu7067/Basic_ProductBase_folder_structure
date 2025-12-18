import React, { useState } from "react";
import { updateUserBank } from "../../../api/user.api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BankDetails = () => {
  const user = useSelector((state) => state?.user?.user); // Get current user from redux
  const [formData, setFormData] = useState({
    accountNo: user?.bankDetails?.accountNo || "",
    ifscCode: user?.bankDetails?.ifscCode || "",
    holderName: user?.bankDetails?.holderName || "",
    upiId: user?.bankDetails?.upiId || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.accountNo || !formData.ifscCode || !formData.holderName) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const response = await updateUserBank(formData);
      toast.success(response?.message || "Bank details updated successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to update bank details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mx-4  shadow-md   mb-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Update Bank Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Account Number *
          </label>
          <input
            type="text"
            name="accountNo"
            value={formData.accountNo}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring focus:ring-indigo-200 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            IFSC Code *
          </label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring focus:ring-indigo-200 text-sm uppercase"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Account Holder Name *
          </label>
          <input
            type="text"
            name="holderName"
            value={formData.holderName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring focus:ring-indigo-200 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">UPI ID</label>
          <input
            type="text"
            name="upiId"
            value={formData.upiId}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring focus:ring-indigo-200 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Bank Details"}
        </button>
      </form>
    </div>
  );
};

export default BankDetails;
