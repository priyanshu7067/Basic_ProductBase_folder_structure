import React, { useEffect, useState } from "react";
import { fetchRoyalStarIncome } from "../../../api/mlm.api";
import TableComponent from "../../../Component/ui/TableComponent";
import PageLoader from "../../../Component/PageLoader";

const RoyalStar = () => {
  const [royalStarData, setRoyalStarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoyalStarIncome = async () => {
      try {
        setLoading(true);
        const response = await fetchRoyalStarIncome();

        if (response && response?.data && Array.isArray(response?.data?.data)) {
          // Sort data by latest createdAt
          const sorted = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setRoyalStarData(sorted);
        } else {
          setRoyalStarData([]);
        }
      } catch (error) {
        console.error("Error fetching Royal Star Income:", error);
      } finally {
        setLoading(false);
      }
    };

    getRoyalStarIncome();
  }, []);

  // 🧮 Calculate total income
  const totalIncome = royalStarData.reduce(
    (sum, item) => sum + (item.income || 0),
    0
  );

  // 📋 Define table columns
  const columns = [
    {
      header: "SR No.",
      render: (row, index) => index + 1,
    },
    {
      header: "Matched",
      accessor: "matched",
    },
    {
      header: "Left Count",
      accessor: "leftCount",
    },
    {
      header: "Right Count",
      accessor: "rightCount",
    },
    {
      header: "Left After",
      accessor: "leftAfter",
    },
    {
      header: "Right After",
      accessor: "rightAfter",
    },
    {
      header: "Income (₹)",
      render: (row) => row?.income?.toLocaleString("en-IN") || "0",
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
              Royal Star Income
            </h2>

            <p className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-md">
              Total Income: ₹{totalIncome.toLocaleString("en-IN")}
            </p>
          </div>

          <TableComponent
            columns={columns}
            data={royalStarData}
            loading={loading}
            rowsPerPage={10}
            emptyMessage="No Royal Star Income records found"
          />
        </>
      )}
    </div>
  );
};

export default RoyalStar;
