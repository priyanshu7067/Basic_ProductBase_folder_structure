import React, { useEffect, useState } from "react";
import { fetchSponsorIncentive } from "../../../api/mlm.api";
import TableComponent from "../../../Component/ui/TableComponent";
import PageLoader from "../../../Component/PageLoader";

const SponsorIncentive = () => {
  const [sponsorIncentiveData, setSponsorIncentiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSponsorIncentiveData = async () => {
      try {
        setLoading(true);
        const response = await fetchSponsorIncentive();

        if (response && response?.data && Array.isArray(response?.data?.data)) {
          const sorted = response?.data?.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setSponsorIncentiveData(sorted);
        } else {
          setSponsorIncentiveData([]);
        }
      } catch (error) {
        console.error("Error fetching sponsor incentive data:", error);
      } finally {
        setLoading(false);
      }
    };

    getSponsorIncentiveData();
  }, []);

  const columns = [
    {
      header: "SR No.",
      render: (row, index) => index + 1,
    },
    {
      header: "From User Name",
      render: (row) =>
        row?.fromUser?.name ? row.fromUser.name : "—",
    },
    {
      header: "User ID",
      render: (row) => row?.fromUser?.userId || "—",
    },
    {
      header: "Email",
      render: (row) => row?.fromUser?.email || "—",
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
      header: "Level",
      accessor: "level",
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
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Sponsor Incentive Income
      </h2>

      {loading ? (
        <PageLoader />
      ) : (
        <TableComponent
          columns={columns}
          data={sponsorIncentiveData}
          loading={loading}
          rowsPerPage={10}
          emptyMessage="No Sponsor Incentive records found"
        />
      )}
    </div>
  );
};

export default SponsorIncentive;
