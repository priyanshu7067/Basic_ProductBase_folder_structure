import React, { useEffect, useState } from "react";
import { fetchRoyalReferralIncome } from "../../../api/mlm.api";
import TableComponent from "../../../Component/ui/TableComponent";
import PageLoader from "../../../Component/PageLoader";

const RoyalReferral = () => {
  const [royalReferralData, setRoyalReferralData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoyalReferralIncome = async () => {
      try {
        setLoading(true);
        const response = await fetchRoyalReferralIncome();

        if (response && response?.data && Array.isArray(response?.data?.data)) {
          // Sort by date (latest first)
          const sorted = response?.data?.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setRoyalReferralData(sorted);
        } else {
          setRoyalReferralData([]);
        }
      } catch (error) {
        console.error("Error fetching Royal Referral Income:", error);
      } finally {
        setLoading(false);
      }
    };

    getRoyalReferralIncome();
  }, []);

  // 🧮 Calculate total income
  const totalIncome = royalReferralData.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  // 📋 Table Columns
  const columns = [
    {
      header: "SR No.",
      render: (row, index) => index + 1,
    },
    {
      header: "From User Name",
      render: (row) => row?.fromUser?.name || "N/A",
    },
    {
      header: "User ID",
      render: (row) => row?.fromUser?.userId || "N/A",
    },
    {
      header: "Email",
      render: (row) => row?.fromUser?.email || "N/A",
    },
    {
      header: "Level",
      render: (row) => row?.level || "N/A",
    },
    {
      header: "Amount (₹)",
      render: (row) => row?.amount?.toLocaleString("en-IN") || "0",
    },
    {
      header: "Date",
      render: (row) =>
        new Date(row.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-h-[60vh] relative">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Sponsor Royal Star Income
            </h2>

            <p className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-md">
              Total Income: ₹{totalIncome.toLocaleString("en-IN")}
            </p>
          </div>

          <TableComponent
            columns={columns}
            data={royalReferralData}
            loading={loading}
            rowsPerPage={15}
            emptyMessage="No Royal Referral records found"
          />
        </>
      )}
    </div>
  );
};

export default RoyalReferral;
