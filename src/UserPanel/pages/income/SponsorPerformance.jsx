import React, { useEffect, useState } from "react";
import { fetchSponsorPerformance } from "../../../api/mlm.api";
import TableComponent from "../../../Component/ui/TableComponent";
import PageLoader from "../../../Component/PageLoader";

const SponsorPerformance = () => {
  const [sponsorPerformanceData, setSponsorPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSponsorPerformance = async () => {
      try {
        setLoading(true);
        const response = await fetchSponsorPerformance();

        if (response && response?.data && Array.isArray(response?.data?.data)) {
          const sorted = response?.data?.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setSponsorPerformanceData(sorted);
        } else {
          setSponsorPerformanceData([]);
        }
      } catch (error) {
        console.error("Error fetching sponsor performance data:", error);
      } finally {
        setLoading(false);
      }
    };

    getSponsorPerformance();
  }, []);

  const totalIncome = sponsorPerformanceData.reduce(
    (sum, item) => sum + (item.income || 0),
    0
  );

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
      header: "Matched SP",
      accessor: "matchedSP",
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
    <div className="p-4 bg-white rounded-lg shadow-md min-h-[60vh] relative">
      {loading ? (
          <PageLoader />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Sponsor Performance Income
            </h2>

            <p className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-md">
              Total Income: ₹{totalIncome.toLocaleString("en-IN")}
            </p>
          </div>

          <TableComponent
            columns={columns}
            data={sponsorPerformanceData}
            loading={loading}
            rowsPerPage={10}
            emptyMessage="No Sponsor Performance records found"
          />
        </>
      )}
    </div>
  );
};

export default SponsorPerformance;
