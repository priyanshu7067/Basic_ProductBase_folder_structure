import React, { useEffect, useState } from "react";
import Footer1 from "../../../Component/Footer1";
import { getOrderHistory } from "../../../api/user.api.js";
import PageLoader from "../../../Component/PageLoader.jsx";
import TableComponent from "../../../Component/ui/TableComponent.jsx";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await getOrderHistory();
      const allOrders = response?.orders || [];

      const sortedOrders = [...allOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(sortedOrders.slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      header: "SR No.",
      render: (row, index) => index + 1,
    },
    {
      header: "Order ID",
      accessor: "_id",
    },
    {
      header: "Customer Name",
      render: (row) => row?.user?.name || "-",
    },
    {
      header: "Phone",
      render: (row) => row?.user?.phone || "-",
    },
    {
      header: "Order Date",
      render: (row) => new Date(row?.createdAt).toLocaleDateString(),
    },
    {
      header: "Total Items",
      render: (row) => row?.items?.length || 0,
    },
    {
      header: "Total Amount (₹)",
      accessor: "totalAmount",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <div className="p-4 bg-white rounded-xl overflow-hidden">
      <h2 className="font-medium text-gray-800 mb-4">Recent Orders</h2>
      <TableComponent
        columns={columns}
        data={orders}
        loading={isLoading}
        emptyMessage="No orders found"
      />
    </div>
  );
};

export default OrderHistory;
