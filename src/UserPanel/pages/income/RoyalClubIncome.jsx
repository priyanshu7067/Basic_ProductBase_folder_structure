import React, { useEffect, useState } from "react";
import { getRoyalIncome } from "../../../api/mlm.api";
import PageLoader from "../../../Component/PageLoader";
import TableComponent from "../../../Component/ui/TableComponent";

const RoyalClubIncome = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoyalIncome = async () => {
      try {
        setLoading(true);

        const response = await getRoyalIncome();

        if (response?.data?.data && Array.isArray(response.data.data)) {
          // ✅ Latest first sorted
          const sorted = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setIncomeData(sorted);
        } else {
          setIncomeData([]);
        }
      } catch (error) {
        console.error("Error fetching Royal Club Income:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoyalIncome();
  }, []);

  // ✅ TEMPORARY columns (update after your API response)
  const columns = [
    {
      header: "SR No.",
      render: (row, index) => index + 1,
    },
    {
      header: "user ",
      accessor: "user",
    },
    {
      header: "Total Amount",
      accessor: "totalAmount",
    },
    {
      header: "Total Members",
      accessor: "totalMembers",
    },
    {
      header: " PerUser Amount",
      accessor: "perUserAmount",
    },
    {
      header: "Percentage (%)",
      accessor: "percentage",
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

  // ✅ Total Income Count
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
              Royal Club Income
            </h2>

            <p className="text-sm font-medium text-indigo-700 bg-indigo-100 px-3 py-1 rounded-md">
              Total Income: ₹{totalIncome.toLocaleString("en-IN")}
            </p>
          </div>

          <TableComponent
            columns={columns}
            data={incomeData}
            loading={loading}
            rowsPerPage={10}
            emptyMessage="No Royal Club Income records found"
          />
        </>
      )}
    </div>
  );
};

export default RoyalClubIncome;
