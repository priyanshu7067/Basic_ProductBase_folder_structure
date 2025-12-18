import { useState } from "react";
import React from "react";
import {
  FaWallet,
  FaCheckCircle,
  FaPaperPlane,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import WalletEarningTable from "./WalletEarningTable";

const allTransactions = {
  Statement: [
    {
      id: 1,
      description: "Level Commission From QEGOXY",
      amount: 9.34,
      date: "13 Jan 2025 10:23:42",
      balance: 1.07,
      type: "credit",
    },
    {
      id: 2,
      description: "Matching Bonus From TESTTEST",
      amount: 0.86,
      date: "13 Jan 2025 10:23:41",
      balance: 1.05,
      type: "credit",
    },
    {
      id: 3,
      description: "Referral From QEGOXY",
      amount: 12.46,
      date: "13 Jan 2025 10:23:41",
      balance: 1.06,
      type: "credit",
    },
    {
      id: 1,
      description: "Level Commission From QEGOXY",
      amount: 9.34,
      date: "13 Jan 2025 10:23:42",
      balance: 1.07,
      type: "credit",
    },
    {
      id: 2,
      description: "Matching Bonus From TESTTEST",
      amount: 0.86,
      date: "13 Jan 2025 10:23:41",
      balance: 1.05,
      type: "credit",
    },
    {
      id: 3,
      description: "Referral From QEGOXY",
      amount: 12.46,
      date: "13 Jan 2025 10:23:41",
      balance: 1.06,
      type: "credit",
    },
  ],
  "Transfer History": [
    {
      id: 1,
      description: "Level Commission From QEGOXY",
      amount: 9.34,
      date: "13 Jan 2025 10:23:42",
      balance: 1.07,
      type: "credit",
    },
    {
      id: 2,
      description: "Matching Bonus From TESTTEST",
      amount: 0.86,
      date: "13 Jan 2025 10:23:41",
      balance: 1.05,
      type: "credit",
    },
    {
      id: 3,
      description: "Referral From QEGOXY",
      amount: 12.46,
      date: "13 Jan 2025 10:23:41",
      balance: 1.06,
      type: "credit",
    },
    {
      id: 4,
      description: "Payout Request",
      amount: -77.18,
      date: "10 Jan 2025 17:24:46",
      balance: 1.05,
      type: "debit",
    },
  ],
  "Purchase Wallet": [
    {
      id: 1,
      description: "Level Commission From QEGOXY",
      amount: 9.34,
      date: "13 Jan 2025 10:23:42",
      balance: 1.07,
      type: "credit",
    },
    {
      id: 2,
      description: "Matching Bonus From TESTTEST",
      amount: 0.86,
      date: "13 Jan 2025 10:23:41",
      balance: 1.05,
      type: "credit",
    },
    {
      id: 3,
      description: "Referral From QEGOXY",
      amount: 12.46,
      date: "13 Jan 2025 10:23:41",
      balance: 1.06,
      type: "credit",
    },
    {
      id: 5,
      description: "Matching Bonus Purchase From INF73911799",
      amount: 2.41,
      date: "07 Nov 2024 00:06:52",
      balance: 1.13,
      type: "credit",
    },
    {
      id: 1,
      description: "Level Commission From QEGOXY",
      amount: 9.34,
      date: "13 Jan 2025 10:23:42",
      balance: 1.07,
      type: "credit",
    },
    {
      id: 2,
      description: "Matching Bonus From TESTTEST",
      amount: 0.86,
      date: "13 Jan 2025 10:23:41",
      balance: 1.05,
      type: "credit",
    },
    {
      id: 3,
      description: "Referral From QEGOXY",
      amount: 12.46,
      date: "13 Jan 2025 10:23:41",
      balance: 1.06,
      type: "credit",
    },
  ],
  "My Earnings": [
    {
      id: 6,
      description: "Referral From BINARYADDONAAAA",
      amount: 12.46,
      date: "22 Oct 2024 22:04:16",
      balance: 1.12,
      type: "credit",
    },
  ],
};

const WalletComponent = ({ data }) => {
  console.log(data);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {/* <Card icon={FaWallet} title="E-Wallet Balance" amount={data?.EwalletBalance} /> */}
        <Card
          icon={FaArrowUp}
          title="Total Earning"
          amount={data?.totalLevelIncome}
        />
      </div>

      <h1 className="text-black/80 text-base font-medium mb-4">My Earnings</h1>
      <WalletEarningTable Earnings={data?.levelIncomeDetails} />
    </div>
  );
};

const Card = ({ icon: Icon, title, amount, subtitle }) => (
  <div className="p-4 bg-white/30 border-2 border-white rounded-lg flex gap-2 justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold ">₹ {amount}</p>
    </div>
    <div className="p-2 bg-bg-color rounded-lg">
      <Icon className=" text-white " size={24} />
    </div>
  </div>
);

export default WalletComponent;
