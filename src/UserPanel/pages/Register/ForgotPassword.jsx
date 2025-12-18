import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../api/user.api";
import PageLoader from "../../../Component/PageLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return Swal.fire("Error", "Please enter your email", "error");
    }

    try {
      setloading(true);
      const res = await forgotPassword({ email });

      if (res?.success) {
        Swal.fire(
          "Success",
          "Your new password has been sent to your registered email. Please check your inbox.",
          "success"
        );
        setTimeout(() => navigate("/login"), 2000);
      } else {
        Swal.fire(
          "Error",
          res?.message || "Failed to send new password",
          "error"
        );
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Something went wrong";
      Swal.fire("Error", msg, "error");
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader loading={loading} />}

      <div className="flex justify-center items-center min-h-screen bg-green-100 px-4">
        <div className="w-full max-w-lg  bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Forgot Password
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter your registered email and we’ll send you a new password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full mt-1 p-3 rounded-lg border border-green-500 focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-semibold"
            >
              Send New Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
