import React, { useEffect, useState } from "react";
import Button from "../../../Component/Button";
import { getBonanzaHistory } from "../../../api/payment.api";
import PageLoader from "../../../Component/PageLoader";

export default function BonanzaRank() {
  const [rankHistory, setRankHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  const fetchRankHistory = async () => {
    try {
      const res = await getBonanzaHistory();
      setRankHistory(res?.data || []);
    } catch (error) {
      console.error("Error fetching rank history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankHistory();
  }, []);

  const filteredData = rankHistory?.filter((item) => {
    // const user = item?.user || {};
    const search = searchInput.toLowerCase();
    return (
      item?.newRank?.toLowerCase().includes(search) ||
      item?.previousRank?.toLowerCase().includes(search) ||
      item?.reward?.toLowerCase().includes(search) ||
      item?.status?.toLowerCase().includes(search) ||
      user?.name?.toLowerCase().includes(search) ||
      user?.email?.toLowerCase().includes(search) ||
      user?.username?.toLowerCase().includes(search) ||
      new Date(item?.upgradedAt).toLocaleDateString().includes(search)
    );
  });

  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getStatusBadge = (status) => {
    const baseClass = "px-3 py-1 rounded-full text-xs font-semibold capitalize";
    switch (status?.toLowerCase()) {
      case "completed":
        return `${baseClass} bg-green-100 text-green-700`;
      case "pending":
        return `${baseClass} bg-yellow-100 text-yellow-700`;
      case "rejected":
        return `${baseClass} bg-red-100 text-red-700`;
      default:
        return `${baseClass} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-800">Bonanza Rank History</h2>
        <Button title={"View all"} link={"rank-history"} />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by User, Rank, Reward, Status or Date"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-center">SR No.</th>

              <th className="border p-2">New Rank</th>
              <th className="border p-2">Previous Rank</th>
              <th className="border p-2">Left GP Used</th>
              <th className="border p-2">Right GP Used</th>
              <th className="border p-2">Carry Forward Left</th>
              <th className="border p-2">Carry Forward Right</th>
              <th className="border p-2">Reward</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Upgraded At</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="13" className="p-4 text-center">
                  <PageLoader />
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => {
                // const user = item?.user || {};
                return (
                  <tr key={item?._id} className="hover:bg-gray-50">
                    <td className="border p-2 text-gray-700 text-center">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>

                    <td className="border p-2">{item?.newRank || "-"}</td>
                    <td className="border p-2">{item?.previousRank || "-"}</td>
                    <td className="border p-2">{item?.leftGPUsed}</td>
                    <td className="border p-2">{item?.rightGPUsed}</td>
                    <td className="border p-2">{item?.carryForwardLeftGP}</td>
                    <td className="border p-2">{item?.carryForwardRightGP}</td>
                    <td className="border p-2">{item?.reward || "-"}</td>
                    <td className="border p-2">
                      <span className={getStatusBadge(item?.status)}>
                        {item?.status}
                      </span>
                    </td>
                    <td className="border p-2">
                      {new Date(item?.upgradedAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="13" className="text-center p-4 text-gray-500">
                  No rank history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600">Rows per page: {rowsPerPage}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-2 py-1 border rounded hover:bg-gray-100"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-2 py-1 border rounded hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
