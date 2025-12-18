import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

const OtpPopup = ({ isOpen, onClose, onSubmit }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      // Focus the first input when opened
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow numbers or empty

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight") {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      onSubmit(otpValue);
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-md border border-white/30 relative">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-lg font-semibold">Enter OTP</h2>
          <button onClick={onClose}>
            <FaTimes className="text-white hover:text-red-400 transition" />
          </button>
        </div>

        <p className="text-sm text-gray-300 mb-4">Enter the 6-digit OTP sent to email</p>

        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 sm:w-12 sm:h-12 text-center text-white text-xl bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-700 hover:bg-teal-600 text-white py-2 rounded-lg font-medium transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpPopup;
