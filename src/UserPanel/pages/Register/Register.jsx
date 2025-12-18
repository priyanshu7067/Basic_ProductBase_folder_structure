import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import img from "../../../assets/images/loginNew.png";
import { MainContent } from "../../../constants/mainContent";
import { Routers } from "../../../constants/Routes";
import { helpingRegister, helpingVerifyOtp } from "../../../api/user.api";
import {
  emailValidator,
  nameValidator,
  phoneValidator,
} from "../../../utils/inputValidator";
import OtpPopup from "../../../Component/OtpPopup ";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slice/userSlice";
import LoadingSpinner from "../../../Component/LoadingSpinner";
import register from "../../../assets/images/register.jpg";
import { MdRemoveRedEye } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
const Register = () => {
  const [formData, setFormData] = useState({
    sponsorId: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    leg: "",
  });

  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();

  useEffect(() => {
    const ref = searchParam.get("referral");
    const leg = searchParam.get("leg");
    if (ref) {
      setFormData((prev) => ({ ...prev, sponsorId: ref, leg: leg })); // referral autofill
    }
  }, [searchParam]);

  // Validation
  const validate = () => {
    const validationErrors = {};
    let isValid = true;

    const nameError = nameValidator(formData.name);
    const phoneError = phoneValidator(formData.phone);
    const emailError = emailValidator(formData.email);

    if (nameError) {
      validationErrors.name = nameError;
      isValid = false;
    }
    if (phoneError) {
      validationErrors.phone = phoneError;
      isValid = false;
    }
    if (emailError) {
      validationErrors.email = emailError;
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await helpingRegister(formData);

      if (response?.success) {
        Swal.fire({
          title: "Success",
          text: response?.message,
          icon: "success",
          confirmButtonColor: "#248398",
          confirmButtonText: "OK",
        });
        setIsOtpOpen(true);
      } else {
        Swal.fire({
          title: "Error",
          text: response.response?.data?.message,
          icon: "error",
          confirmButtonColor: "#248398",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        title: "Error!",
        text: "Registration failed. Please try again.",
        icon: "error",
        confirmButtonColor: "#248398",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification
  const handleOtpSubmit = async (otp) => {
    const payload = {
      email: formData.email,
      otp: otp,
    };
    try {
      const response = await helpingVerifyOtp(payload);
      if (response?.success) {
        const userData = {
          id: response?.data?.id,
          name: response?.data?.name,
          phone: response?.data?.phone,
          userId: response?.data?.userId,
          email: response?.data?.email,
          token: response?.token,
        };

        localStorage.setItem("token", userData.token);
        dispatch(setUser(userData));

        Swal.fire({
          title: "Registration Successful!",
          text: `Welcome ${userData.name}`,
          html: `<p>Your User ID is:<strong>${userData.userId}</strong></p> <p>Your Password is : <strong>${formData.password}</strong></p>`,
          icon: "success",
          confirmButtonColor: "#248398",
          confirmButtonText: "Go to Website",
        }).then(() => {
          setIsOtpOpen(false);
          navigate("/user-dashboard");
        });
      } else {
        Swal.fire({
          title: "OTP Verification Failed",
          text: response?.message || "Invalid OTP",
          icon: "error",
          confirmButtonColor: "#248398",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
        icon: "error",
        confirmButtonColor: "#248398",
      });
    }
  };

  return (
    <div
      className="min-h-screen xl:p-20 flex items-center justify-center lg:p-16 md:p-10 p-4"
      style={{
        backgroundImage: `url(${register})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="py-4 p-4  bg-white/30 backdrop-blur-md rounded-3xl border shadow-[0_0_10px_rgba(0,0,0,0.1)] flex flex-col items-center">
        <Link to="/">
          <img
            src={MainContent.logo1}
            alt="helping Logo"
            className="w-full h-[6rem] object-cover"
          />
        </Link>
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 text-center mb-6 mt-2">
          Office  Helping Register
        </h2>
        <form
          onSubmit={handleRegister}
          className="w-full bg-white p-6 rounded-2xl shadow-xl space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sponsor ID */}
            <div className="relative w-full">
              <input
                type="text"
                name="sponsorId"
                placeholder="Sponsor ID"
                value={formData.sponsorId}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-bg-color focus:border-bg-color transition"
              />
            </div>

            {/* Full Name */}
            <div className="relative w-full">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-bg-color focus:border-bg-color transition"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative w-full">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-bg-color focus:border-bg-color transition"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="relative w-full">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-bg-color focus:border-bg-color transition"
                required
                maxLength="10"
                pattern="^\d{10}$"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-bg-color focus:border-bg-color transition"
                required
              />
              <span 
                className="absolute right-3 top-3 cursor-pointer text-gray-600" onClick={() =>setShowPassword((prev)=>!prev)}
                >
                 {showPassword ? <MdRemoveRedEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative w-full">
              <input
               type={showPassword ? "password" : "text"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg outline-none focus:ring-1 focus:ring-bg-color focus:border-bg-color transition"
                required
              />
              <span 
                className="absolute right-3 top-3 cursor-pointer text-gray-600" onClick={() =>setShowPassword((prev)=>!prev)}
                >
                 {showPassword ? <MdRemoveRedEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Leg Selection */}
          <div className="relative w-full md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Choose Leg
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="leg"
                  value="left"
                  checked={formData.leg === "left"}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                  required
                />
                Left
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="leg"
                  value="right"
                  checked={formData.leg === "right"}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                  required
                />
                Right
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-xl transition"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Register"}
          </button>

          <div>
            <Link to={Routers.Login}>
              <p className="text-sm text-center">
                Already have an account?{" "}
                <span className="text-green-700 font-semibold cursor-pointer">
                  Login
                </span>
              </p>
            </Link>
          </div>
        </form>
      </div>

      {/* OTP Modal */}
      <OtpPopup
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onSubmit={handleOtpSubmit}
      />
    </div>
  );
};

export default Register;
