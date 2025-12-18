import React, { useState, useEffect } from "react";

const WalletEarningTable = ({ Earnings }) => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 10;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (!Earnings) return null;

  const filteredData = Earnings.filter((entry) =>
    entry?.fromUser?.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">
                SR No.
              </th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">
                Name
              </th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">
                Coupon
              </th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">
                Income
              </th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">
                Level
              </th>
              <th className="border border-gray-300 font-medium p-2 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading
              ? Array.from({ length: paginatedData.length }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <td key={i} className="border border-gray-300 p-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              : paginatedData.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {entry?.fromUser?.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.coupon?.code || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.amount}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {entry.level}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {new Date(entry?.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
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
            disabled={loading}
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
              disabled={loading}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-2 py-1 border rounded hover:bg-gray-100"
            disabled={loading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletEarningTable;
