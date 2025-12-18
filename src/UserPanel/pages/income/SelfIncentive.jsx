import React, { useEffect, useState } from "react";
import { fetchSElfIncentive } from "../../../api/mlm.api";
import TableComponent from "../../../Component/ui/TableComponent";
import PageLoader from "../../../Component/PageLoader";

const SelfIncentive = () => {
  const [selfIncentiveData, setSelfIncentiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSelfIncentiveData = async () => {
      try {
        setLoading(true);
        const response = await fetchSElfIncentive();

        if (response && response?.data && Array.isArray(response?.data?.data)) {
          // ✅ sort latest first
          const sorted = response?.data?.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setSelfIncentiveData(sorted);
        } else {
          setSelfIncentiveData([]);
        }
      } catch (error) {
        console.error("Error fetching self incentive data:", error);
      } finally {
        setLoading(false);
      }
    };

    getSelfIncentiveData();
  }, []);

  const columns = [
    {
      header: "SR No.",
      render: (row, index) => index + 1,
    },
    {
      header: "Matched SP",
      accessor: "matchedSP",
    },
    {
      header: "From User",
      render: (row) => (row?.fromUser?.name ? row.fromUser.name : "N/A"),
    },
    {
      header: "Level",
      accessor: "level",
    },
    {
      header: "Income (₹)",
      accessor: "income",
    },
    {
      header: "Left Before",
      accessor: "leftBefore",
    },
    {
      header: "Right Before",
      accessor: "rightBefore",
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
      header: "Date",
      render: (row) =>
        new Date(row.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
  ];

  const totalIncome = selfIncentiveData.reduce(
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
              Self Incentive Income
            </h2>

            <p className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-md">
              Total Income: ₹{totalIncome.toLocaleString("en-IN")}
            </p>
          </div>

          <TableComponent
            columns={columns}
            data={selfIncentiveData}
            loading={loading}
            rowsPerPage={10}
            emptyMessage="No Self Incentive records found"
          />
        </>
      )}
    </div>
  );
};

export default SelfIncentive;
