import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Users } from "lucide-react";
import { getHelpingReferrals } from "../../../api/helpingplan.api";
import PageLoader from "../../../Component/PageLoader";
import TableComponent from "../../../Component/ui/TableComponent";

const MyhelpingReffreral = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      setLoading(true);
      try {
        const res = await getHelpingReferrals();

        if (res?.success && Array.isArray(res?.data)) {
          setReferrals(res.data);
        } else {
          setReferrals([]);
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.message || "Something went wrong",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  // 🟩 TABLE COLUMNS
  const columns = [
    {
      header: "SR No.",
      render: (_, index) => index + 1,
    },
    {
      header: "Name",
      accessor: "name",
      render: (row) => (
        <div>
          <p className="font-medium">{row?.name || "N/A"}</p>
          <p className="text-xs text-gray-500">{row?.email || "-"}</p>
        </div>
      ),
    },
    {
      header: "User ID",
      accessor: "userId",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Joining Date",
      render: (row) =>
        new Date(row?.createdAt).toLocaleDateString("en-IN") || "-",
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-white text-xs ${
            row?.isActive ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {row?.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md min-h-[60vh]">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-gray-800 flex items-center gap-2">
              <Users size={20} /> My Helping Referrals
              <span className="ml-2 px-2 py-1 bg-green-600 text-white rounded-full text-sm">
                {referrals?.length}
              </span>
            </h2>
          </div>

          {/* Table */}
          <TableComponent
            columns={columns}
            data={referrals}
            loading={loading}
            rowsPerPage={10}
            emptyMessage="No referrals found"
            searchable={false} // no search
          />
        </>
      )}
    </div>
  );
};

export default MyhelpingReffreral;
