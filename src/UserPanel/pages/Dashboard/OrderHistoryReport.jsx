import React, { useEffect, useState, useMemo } from "react";
import Button from "../../../Component/Button";
import { getOrderHistory } from "../../../api/user.api";
import { useSelector } from "react-redux";
import PageLoader from "../../../Component/PageLoader";
import TableComponent from "../../../Component/ui/TableComponent";

export default function OrderHistoryReport() {
  const user = useSelector((store) => store?.user);
  const userId = user?.user?._id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrderHistory();
      setOrders(response?.data?.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredData = useMemo(() => {
    return orders.filter(
      (order) =>
        order?._id?.toLowerCase().includes(searchInput.toLowerCase()) ||
        order?.user?.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        order?.user?.phone?.toString().includes(searchInput.toLowerCase()) ||
        new Date(order?.createdAt)
          .toLocaleDateString("en-IN")
          .includes(searchInput)
    );
  }, [orders, searchInput]);

  const columns = [
    {
      header: "SR No.",
      render: (row, index) => index + 1,
    },
    {
      header: "Image",
      render: (row) => {
        const firstImage = row?.items?.[0]?.product?.images?.[0];
        return firstImage ? (
          <img
            src={firstImage}
            alt={row?.items?.[0]?.product?.productName || "Product"}
            className="w-12 h-12 object-cover rounded-md border hover:scale-110 transition-transform duration-200"
          />
        ) : (
          <span className="text-gray-400 text-xs">No image</span>
        );
      },
    },
    {
      header: "Order ID",
      render: (row) => row?._id || "N/A",
    },
    {
      header: "Customer Name",
      render: (row) => row?.user?.name || "-",
    },
    {
      header: "Mobile",
      render: (row) => row?.user?.phone || "-",
    },
    {
      header: "Order Date",
      render: (row) =>
        new Date(row?.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      header: "Total Items",
      render: (row) => row?.items?.length || 0,
    },
    {
      header: "Total Amount (₹)",
      render: (row) => row?.totalAmount?.toLocaleString("en-IN") || "0",
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-white text-xs capitalize ${
            row?.status === "Pending"
              ? "bg-yellow-500"
              : row?.status === "Processing"
              ? "bg-blue-500"
              : row?.status === "Shipped"
              ? "bg-indigo-500"
              : row?.status === "Delivered"
              ? "bg-green-500"
              : row?.status === "Cancelled"
              ? "bg-red-500"
              : "bg-gray-400"
          }`}
        >
          {row?.status || "N/A"}
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
              Order History Report
            </h2>
           </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Order ID, Name, Phone, or Date"
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
            emptyMessage="No orders found"
          />
        </>
      )}
    </div>
  );
}
