import React, { useEffect, useState } from "react";
import { getLevelIncome } from "../../../api/payment.api";
import PageLoader from "../../../Component/PageLoader";

const LevelIncome = () => {
  const [levelIncome, setLevelIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  const fetchLevelIncome = async () => {
    try {
      const res = await getLevelIncome();

      if (Array.isArray(res?.data)) {
        const data = setLevelIncome(res?.data);
      } else {
        setLevelIncome([]);
      }
    } catch (error) {
      console.error("Error fetching level income:", error);
      setLevelIncome([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevelIncome();
  }, []);

  const filteredData = levelIncome.filter((item) => {
    const search = searchInput.toLowerCase();
    return (
      item?.user?.username?.toLowerCase().includes(search) ||
      item?.fromUser?.username?.toLowerCase().includes(search) ||
      String(item?.level).includes(searchInput) ||
      String(item?.amount).includes(searchInput) ||
      new Date(item?.createdAt).toLocaleDateString().includes(searchInput)
    );
  });

  const totalPages = Math.max(Math.ceil(filteredData.length / rowsPerPage), 1);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-800">Level Income History</h2>
      </div>

      {/* 🔍 Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Username, From User, Level, Amount, or Date"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm"
        />
      </div>

      {/* 📊 Level Income Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              <th className="border p-2">SR No.</th>
              <th className="border p-2">User</th>
              <th className="border p-2">From User</th>
              <th className="border p-2">Level</th>
              <th className="border p-2">Amount (₹)</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  <PageLoader />
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={item?._id || index} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="border p-2">{item?.user?.username}</td>
                  <td className="border p-2">{item?.fromUser?.username}</td>
                  <td className="border p-2">{item?.level}</td>
                  <td className="border p-2">{item?.amount}</td>
                  <td className="border p-2">
                    {item?.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No level income history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Pagination Controls */}
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
};

export default LevelIncome;
