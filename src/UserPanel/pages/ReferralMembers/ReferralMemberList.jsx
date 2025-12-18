import React, { useEffect, useState, useMemo } from "react";
import { getReferrals } from "../../../api/payment.api";
import PageLoader from "../../../Component/PageLoader";
import TableComponent from "../../../Component/ui/TableComponent";

const ReferralMemberList = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true);
        const response = await getReferrals();
        setReferrals(response?.data?.partners || []);
      } catch (error) {
        console.error("Error fetching referral members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  const filteredData = useMemo(() => {
    return referrals.filter(
      (member) =>
        member?.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        member?.email?.toLowerCase().includes(searchInput.toLowerCase()) ||
        member?.phone?.toString().includes(searchInput.toLowerCase()) ||
        member?.userId?.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput, referrals]);

  const columns = [
    {
      header: "SR No.",
      render: (row, index) => index + 1,
    },
    {
      header: "User Name",
      render: (row) => row?.name || "N/A",
    },
    {
      header: "Email",
      render: (row) => row?.email || "-",
    },
    {
      header: "Phone",
      render: (row) => row?.phone || "-",
    },
    {
      header: "User ID",
      render: (row) => row?.userId || "N/A",
    },
    {
      header: "Leg",
      render: (row) => <span className="capitalize">{row?.leg || "-"}</span>,
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-md ${
            row?.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Referral Members
            </h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium">
              Total: {filteredData.length}
            </span>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Name, Email, Phone, or User ID"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:border-green-500"
            />
          </div>

          <TableComponent
            columns={columns}
            data={filteredData}
            loading={loading}
            rowsPerPage={10}
            emptyMessage="No referral members found"
          />
        </>
      )}
    </div>
  );
};

export default ReferralMemberList;
