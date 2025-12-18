import React, { useEffect, useState } from "react";
import { getRainbowIncome } from "../../../api/mlm.api";
import PageLoader from "../../../Component/PageLoader";
import TableComponent from "../../../Component/ui/TableComponent";

const RainbowIncome = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRainbowIncomeData = async () => {
      try {
        setLoading(true);

        const response = await getRainbowIncome();

        if (response?.data?.data && Array.isArray(response.data.data)) {
          // ✅ Latest first
          const sorted = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setIncomeData(sorted);
        } else {
          setIncomeData([]);
        }
      } catch (error) {
        console.error("Error fetching Rainbow income:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRainbowIncomeData();
  }, []);

  // ✅ Table Columns (Accurate from your API)
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
        new Date(row.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
  ];

  // ✅ Total Income = sum of perUserAmount
  const totalIncome = incomeData.reduce(
    (sum, item) => sum + (item.perUserAmount || 0),
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
              Rainbow Income
            </h2>

            <p className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-md">
              Total Income: ₹{totalIncome.toLocaleString("en-IN")}
            </p>
          </div>

          <TableComponent
            columns={columns}
            data={incomeData}
            loading={loading}
            rowsPerPage={10}
            emptyMessage="No Rainbow Income records found"
          />
        </>
      )}
    </div>
  );
};

export default RainbowIncome;
