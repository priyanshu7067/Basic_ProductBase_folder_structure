import React from "react";
import {
  FaUsers,
  FaMoneyCheckAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { GiTakeMyMoney, GiReceiveMoney } from "react-icons/gi";


const HeaderCard = () => {
  const data = {
    totalUsers: 1200,
    totalActiveUsers: 950,
    totalPlans: 320,
    totalOrders: 845,
    purchaseWallet: 150000,
    upgradeWallet: 82000,
    incomeWallet: 54000,
  };

  const cards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: <FaUsers />,
      variant: "blue",
      iconClass: "icon--blue",
    },
    {
      title: "Total Active User",
      value: data.totalActiveUsers,
      icon: <FaUsers />,
      variant: "pink",
      iconClass: "icon--pink",
    },
    {
      title: "Total Plans",
      value: data.totalPlans,
      symbol: "₹",
      icon: <FaMoneyCheckAlt />,
      variant: "amber",
      iconClass: "icon--amber",
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      symbol: "₹",
      icon: <FaMoneyBillAlt />,
      variant: "green",
      iconClass: "icon--green",
    },
    {
      title: "Total Purchase Wallet",
      value: data.purchaseWallet,
      symbol: "₹",
      icon: <GiTakeMyMoney />,
      variant: "indigo",
      iconClass: "icon--indigo",
    },
    {
      title: "Upgrade Wallet",
      value: data.upgradeWallet,
      symbol: "₹",
      icon: <FaMoneyBillAlt />,
      variant: "cyan",
      iconClass: "icon--cyan",
    },
    {
      title: "Income Wallet",
      value: data.incomeWallet,
      symbol: "₹",
      icon: <GiReceiveMoney />,
      variant: "rose",
      iconClass: "icon--rose",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="header-card-grid">
        {cards.map((stat, index) => (
          <div
            key={index}
            className={`card card--${stat.variant}`}
            role="button"
            tabIndex={0}
          >
            <div>
              <h4 className="card__title">{stat.title}</h4>
              <h3 className="card__value">
                {stat.symbol && <span>{stat.symbol}</span>}
                <span>{stat.value}</span>
              </h3>
            </div>

            <div className={`card__icon ${stat.iconClass}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderCard;
