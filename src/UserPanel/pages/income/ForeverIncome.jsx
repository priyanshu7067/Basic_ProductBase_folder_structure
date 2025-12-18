import React, { useEffect, useState } from "react";
import { getForeverIncome } from "../../../api/mlm.api";
import PageLoader from "../../../Component/PageLoader";
import TableComponent from "../../../Component/ui/TableComponent";

const ForeverIncome = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        setLoading(true);

        const response = await getForeverIncome();

        if (response?.data?.data && Array.isArray(response.data.data)) {
          // ✅ Sort by newest first
          const sorted = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setIncomeData(sorted);
        } else {
          setIncomeData([]);
        }
      } catch (error) {
        console.error("Error fetching Forever Income:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  // ✅ TEMPORARY Columns (Standard MLM Structure)
  // ✅ If you send API JSON, I will fully match these.
  const columns = [
    {
      header: "SR No.",
      render: (row, index) => index + 1,
    },
    {
      header: "Total Amount (₹)",
      accessor: "totalAmount",
    },
    {
      header: "Per User Amount (₹)",
      accessor: "perUserAmount",
    },
    {
      header: "Percentage (%)",
      accessor: "percentage",
    },
    {
      header: "Total Members",
      accessor: "totalMembers",
    },
    {
      header: "Date",
      render: (row) =>
        row?.createdAt
          ? new Date(row.createdAt).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })
          : "N/A",
    },
  ];

  // ✅ Calculate total income
  const totalIncome = incomeData.reduce(
    (sum, item) => sum + (item.income || 0),
    0
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md min-h-[60vh] relative">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Forever Income
            </h2>

            <p className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-md">
              Total Income: ₹{totalIncome.toLocaleString("en-IN")}
            </p>
          </div>

          <TableComponent
            columns={columns}
            data={incomeData}
            loading={loading}
            rowsPerPage={10}
            emptyMessage="No Forever Income records found"
          />
        </>
      )}
    </div>
  );
};

export default ForeverIncome;
