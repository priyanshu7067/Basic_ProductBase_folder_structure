import React, { useEffect, useState } from "react";
import { getWithdrawalRequests } from "../../../api/payment.api";
import { motion } from "framer-motion";
import PageLoader from "../../../Component/PageLoader";

const WithdrawalHistory = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  const fetchWithdrawalRequests = async () => {
    try {
      setLoading(true);
      const response = await getWithdrawalRequests();
      setWithdrawalRequests(response?.data?.requests || []);
    } catch (error) {
      console.error("Error fetching withdrawal requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawalRequests();
  }, []);

  const filteredData = withdrawalRequests?.filter(
    (req) =>
      req?.accountHolderName
        ?.toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      req?.bankName?.toLowerCase().includes(searchInput.toLowerCase()) ||
      req?.accountNumber?.toString().includes(searchInput) ||
      new Date(req?.createdAt).toLocaleDateString().includes(searchInput)
  );

  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-800">Withdrawal History</h2>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Bank, Account No, or Date"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              <th className="border p-2">SR No.</th>
              <th className="border p-2">Account Holder</th>
              <th className="border p-2">Bank Name</th>
              <th className="border p-2">Account No</th>
              <th className="border p-2">IFSC</th>
              <th className="border p-2">UPI</th>
              <th className="border p-2">Amount (₹)</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <PageLoader />
            ) : paginatedData.length > 0 ? (
              paginatedData.map((req, index) => (
                <tr key={req?._id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="border p-2">{req?.accountHolderName}</td>
                  <td className="border p-2">{req?.bankName}</td>
                  <td className="border p-2">{req?.accountNumber}</td>
                  <td className="border p-2">{req?.ifscCode}</td>
                  <td className="border p-2">{req?.upiNo}</td>
                  <td className="border p-2">₹{req?.amount}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs capitalize ${
                        req?.status === "approved"
                          ? "bg-green-500"
                          : req?.status === "processing"
                          ? "bg-yellow-500"
                          : req?.status === "rejected"
                          ? "bg-red-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {req?.status}
                    </span>
                  </td>{" "}
                  <td className="border p-2">
                    {new Date(req?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No withdrawal requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
};

export default WithdrawalHistory;
