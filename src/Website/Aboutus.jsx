import React from "react";
import {
  FaMoneyBillWave,
  FaUserFriends,
  FaBalanceScale,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import about from "../assets/images/about.jpg";
const Aboutus = () => {
  const highlights = [
    {
      icon: <FaMoneyBillWave className="text-3xl text-bg-color" />,
      title: "Daily Payout",
      desc: "Above ₹300 daily payout is processed within the same day. KYC is compulsory for payout.",
    },
    {
      icon: <FaBalanceScale className="text-3xl text-bg-color" />,
      title: "Withdrawal",
      desc: " Two directs compulsory for binary bonus",
    },
    {
      icon: <FaUserFriends className="text-3xl text-bg-color" />,
      title: "Direct Sponsor Income",
      desc: "Direct Sponsor Income with no capping on earnings.",
    },
    {
      icon: <FaChartLine className="text-3xl text-bg-color" />,
      title: "Binary Capping",
      desc: "2X multiplication of your package for maximum earning potential.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50   mt-[4rem]  ">
      <div className="relative bg-green-900 text-white">
        <img
          src={about}
          alt="header background"
          className="w-full h-72 object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 text-sm">
            {" "}
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            &gt; <span className="text-bg-color">About Us</span>
          </p>
        </div>
      </div>

      <div className="px-4 md:px-12 sm:my-[4rem] my-[2rem]">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Closing Note */}
        <div className="text-center mt-16 max-w-2xl mx-auto ">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600">
            With a strong foundation of trust and commitment, we ensure timely
            payouts, secure withdrawals, and maximum opportunities for growth.
            Join us and multiply your success with a reliable system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
