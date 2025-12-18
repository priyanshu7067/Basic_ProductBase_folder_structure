import React, { useState } from "react";
import { motion } from "framer-motion";

export default function OrderTable({ data, isLoading }) {
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const filteredData = data?.filter(order =>
        order?.orderId?.toLowerCase().includes(searchInput?.toLowerCase()) ||
        order?.user?.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        order?.createdAt.includes(searchInput)
    ) || [];

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="p-4 bg-white rounded-xl overflow-hidden">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Order ID, Customer Name, or Date"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm text-left">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 font-medium p-2">SR No.</th>
                            <th className="border border-gray-300 font-medium p-2">Order ID</th>
                            <th className="border border-gray-300 font-medium p-2">Customer Name</th>
                            <th className="border border-gray-300 font-medium p-2">Order Date</th>
                            <th className="border border-gray-300 font-medium p-2">Total Items</th>
                            <th className="border border-gray-300 font-medium p-2">Total Amount (Rs)</th>
                            <th className="border border-gray-300 font-medium p-2">Payment Method</th>
                            <th className="border border-gray-300 font-medium p-2">Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: paginatedData.length }).map((_, index) => (
                                <tr key={index}>
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <td key={i} className="border border-gray-300 p-2">
                                            <motion.div
                                                className="h-4 bg-gray-300 rounded animate-pulse"
                                                initial={{ opacity: 0.5 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                            ></motion.div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            paginatedData.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 p-2">{index + 1}</td>
                                    <td className="border border-gray-300 p-2">{order?.orderId}</td>
                                    <td className="border border-gray-300 p-2">{order?.user.name}</td>
                                    <td className="border border-gray-300 p-2"> {new Date(order?.createdAt).toLocaleDateString()} - {new Date(order?.createdAt).toLocaleTimeString()}</td>
                                    <td className="border border-gray-300 p-2">{order?.items?.length}</td>
                                    <td className="border border-gray-300 p-2">{order?.totalAmount}</td>
                                    <td className="border border-gray-300 p-2">{order?.paymentMethod}</td>
                                    <td className="border border-gray-300 p-2">{order?.status}</td>
                                </tr>
                            ))
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
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-2 py-1 border rounded ${currentPage === i + 1 ? "bg-bg-color text-white" : "hover:bg-gray-100"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
