import React, { useEffect, useState } from "react";
import { fetchSelfPerformance } from "../../../api/mlm.api";
import TableComponent from "../../../Component/ui/TableComponent";
import PageLoader from "../../../Component/PageLoader";

const SelfPerformance = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSelfPerformance = async () => {
      try {
        setLoading(true);
        const response = await fetchSelfPerformance();

        if (response && response?.data && Array.isArray(response?.data?.data)) {
          const sorted = response?.data?.data.sort(
            (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
          );
          setPerformanceData(sorted);
        } else {
          setPerformanceData([]);
        }
      } catch (error) {
        console.error("Error fetching self performance data:", error);
      } finally {
        setLoading(false);
      }
    };

    getSelfPerformance();
  }, []);

  const totalIncome = performanceData.reduce(
    (sum, item) => sum + (item?.income || 0),
    0
  );

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
      header: "From User Name",
      render: (row) =>
        row?.fromUser?.name ? row.fromUser?.name : "—",
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

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Self Performance Income
        </h2>

        <p className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-md">
          Total Income: ₹{totalIncome.toLocaleString("en-IN")}
        </p>
      </div>

      {loading ? (
        <PageLoader />
      ) : (
        <TableComponent
          columns={columns}
          data={performanceData}
          loading={loading}
          rowsPerPage={10}
          emptyMessage="No Self Performance records found"
        />
      )}
    </div>
  );
};

export default SelfPerformance;
