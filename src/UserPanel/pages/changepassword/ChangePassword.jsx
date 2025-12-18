import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../api/user.api";
import { FaEyeSlash } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import Footer1 from "../../../Component/Footer1";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      return Swal.fire("Error", "Please fill all fields", "error");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return Swal.fire("Error", "New Password and Confirm Password do not match", "error");
    }

    try {
      const res = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      if (res?.success) {
        Swal.fire("Success", res.message || "Password updated successfully!", "success");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        Swal.fire("Error", res?.message || "Password update failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const renderPasswordInput = (name, placeholder, value) => (
    <div className="relative">
      <input
        type={showPassword[name] ? "text" : "password"}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full mt-1 p-3 rounded-lg border
          border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-200
          placeholder-gray-500 dark:placeholder-gray-400
          focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400
          pr-10
        "
      />
      <span
        className="absolute right-3 top-3 cursor-pointer text-gray-600 dark:text-gray-300"
        onClick={() => toggleShowPassword(name)}
      >
        {showPassword[name] ? <MdRemoveRedEye size={20} /> : <FaEyeSlash size={20} />}
      </span>
    </div>
  );

  return (
    <>
      <div className="flex justify-center items-center py-[5rem] 
        bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
        
        <div className="w-full max-w-md 
          bg-white dark:bg-gray-800 
          shadow-lg rounded-2xl p-6 
          border border-gray-200 dark:border-gray-700
          transition-colors">

          <h2 className="text-2xl font-bold 
            text-gray-700 dark:text-gray-200 
            mb-4 text-center">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300">
                Old Password
              </label>
              {renderPasswordInput("oldPassword", "Enter old password", formData.oldPassword)}
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300">
                New Password
              </label>
              {renderPasswordInput("newPassword", "Enter new password", formData.newPassword)}
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300">
                Confirm New Password
              </label>
              {renderPasswordInput("confirmPassword", "Confirm new password", formData.confirmPassword)}
            </div>

            <button
              type="submit"
              className="
                w-full py-3 rounded-lg 
                bg-green-600 text-white 
                hover:bg-green-700 
                dark:hover:bg-green-500
                transition-all font-semibold
              "
            >
              Update Password
            </button>
          </form>
        </div>
      </div>

      <Footer1 />
    </>
  );
};

export default ChangePassword;
