import React, { useEffect, useState } from "react";
import { requestWithdrawal, getWithdrawalAmount } from "../../../api/payment.api";
import { FaWallet, FaArrowRight } from "react-icons/fa";

const PayoutComponent = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [requestAmount, setRequestAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch wallet balance
  useEffect(() => {
    const fetchWithdrawalAmount = async () => {
      try {
        const res = await getWithdrawalAmount();
        if (res && res.success) setWithdrawalAmount(res.data);
      } catch (err) {
        console.error("Failed to fetch withdrawal amount", err);
      }
    };
    fetchWithdrawalAmount();
  }, []);

  const showMessage = (msg, success = false, duration = 3000) => {
    setMessage(msg);
    setIsSuccess(success);
    setTimeout(() => setMessage(""), duration);
  };

  const handleRequest = async () => {
    const amount = Number(requestAmount);

    if (!amount || amount < 500) {
      showMessage("Minimum withdrawal is ₹500", false);
      return;
    }

    if (amount > withdrawalAmount) {
      showMessage("Withdrawal amount cannot exceed wallet balance", false);
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await requestWithdrawal({ amount });
      console.log(res);

      if ( res.success) {
        showMessage(res.message || "Withdrawal request submitted successfully!", true);
        setWithdrawalAmount((prev) => prev - amount);
        setRequestAmount("");
      } else {
        showMessage(res?.message || "Please update your bank details before requesting a withdrawal", false);
      }
    } catch (err) {
      console.error(err);
      showMessage("Something went wrong", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white/10 backdrop-blur-xl shadow-sm rounded-3xl p-8 border border-green-500 relative overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 tracking-wide drop-shadow-md flex items-center justify-center gap-2">
        <FaWallet className="text-green-400" /> Withdrawal Portal
      </h2>

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 mb-8 shadow-xl transform hover:scale-105 transition-transform duration-300">
        <p className="text-sm uppercase opacity-80 tracking-wide">Wallet Balance</p>
        <h3 className="text-3xl font-extrabold mt-2 drop-shadow-lg">
          ₹ {withdrawalAmount.toLocaleString()}
        </h3>
      </div>

      <div className="text-left mb-6">
        <label className="block font-medium mb-2">Enter Withdrawal Amount</label>
        <input
          type="number"
          placeholder="₹500 or more"
          value={requestAmount}
          onChange={(e) => setRequestAmount(e.target.value)}
          className="w-full bg-white/20 placeholder-gray-300 border border-green-500  rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/30 transition-all"
        />
      </div>

      <button
        onClick={handleRequest}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(16,185,129,0.7)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : <>Request Withdrawal <FaArrowRight /></>}
      </button>

      {message && (
        <p
          className={`text-sm mt-4 text-center ${
            isSuccess ? "text-green-400" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <p className="text-xs text-gray-500 mt-4 text-center">
        Minimum withdrawal: ₹500 | Processing time: 24 hours
      </p>
    </div>
  );
};

export default PayoutComponent;
