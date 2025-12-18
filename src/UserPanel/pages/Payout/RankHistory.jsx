import React, { useEffect, useState } from "react";
import Button from "../../../Component/Button";
import { getRankHistory } from "../../../api/payment.api";
import PageLoader from "../../../Component/PageLoader";

export default function RankHistory() {
  const [rankHistory, setRankHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  const fetchRankHistory = async () => {
    try {
      const res = await getRankHistory();
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

  // 🔍 Filter logic
  const filteredData = rankHistory?.filter(
    (item) =>
      item?.newRank?.toLowerCase().includes(searchInput.toLowerCase()) ||
      item?.previousRank?.toLowerCase().includes(searchInput.toLowerCase()) ||
      item?.reward?.toLowerCase().includes(searchInput.toLowerCase()) ||
      new Date(item?.upgradedAt).toLocaleDateString().includes(searchInput)
  );

  // 📄 Pagination
  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      {/* Title + Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-800">Rank History</h2>
        <Button title={"View all"} link={"rank-history"} />
      </div>

      {/* 🔍 Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Rank, Reward, or Date"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm"
        />
      </div>

      {/* 📊 Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              <th className="border p-2">SR No.</th>
              <th className="border p-2">New Rank</th>
              <th className="border p-2">Previous Rank</th>
              <th className="border p-2">Left SP Used</th>
              <th className="border p-2">Right SP Used</th>
              <th className="border p-2">Carry Forward Left</th>
              <th className="border p-2">Carry Forward Right</th>
              <th className="border p-2">Reward</th>
              <th className="border p-2">Upgraded At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="p-4 text-center">
                  <PageLoader />
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item?._id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="border p-2">{item?.newRank || "-"}</td>
                  <td className="border p-2">{item?.previousRank || "-"}</td>
                  <td className="border p-2">{item?.leftSPUsed}</td>
                  <td className="border p-2">{item?.rightSPUsed}</td>
                  <td className="border p-2">{item?.carryForwardLeftSP}</td>
                  <td className="border p-2">{item?.carryForwardRightSP}</td>
                  <td className="border p-2">{item?.reward || "-"}</td>
                  <td className="border p-2">
                    {new Date(item?.upgradedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-4 text-gray-500">
                  No rank history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Pagination */}
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
                  ? "bg-bg-color text-white"
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
