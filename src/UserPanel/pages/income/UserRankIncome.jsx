import React, { useEffect, useState } from "react";
import { getuserRankIncome } from "../../../api/mlm.api";
import PageLoader from "../../../Component/PageLoader";
import TableComponent from "../../../Component/ui/TableComponent";

const UserRankIncome = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRankIncome = async () => {
            try {
                setLoading(true);

                const response = await getuserRankIncome();

                if (response?.data?.data && Array.isArray(response.data.data)) {
                    // ✅ latest first sorting
                    const sortedData = response.data.data.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setIncomeData(sortedData);
                } else {
                    setIncomeData([]);
                }
            } catch (error) {
                console.error("Error fetching User Rank Income:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRankIncome();
    }, []);

    // ✅ Columns (Generic until you send API response sample)
    const columns = [
        {
            header: "SR No.",
            render: (row, index) => index + 1,
        },
        {
            header: "Total Amount (₹)",
            accessor: "totalAmount",
        },
        {
            header: "Per User Amount (₹)",
            accessor: "perUserAmount",
        },
        {
            header: "Percentage (%)",
            accessor: "percentage",
        },
        {
            header: "Total Members",
            accessor: "totalMembers",
        },
        {
            header: "Date",
            render: (row) =>
                row?.createdAt
                    ? new Date(row.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    })
                    : "N/A",
        },
    ];

    // ✅ Total income calculation
    const totalIncome = incomeData.reduce(
        (sum, item) => sum + (item?.income || 0),
        0
    );

    return (
        <div className="p-4 bg-white rounded-lg shadow-md min-h-[60vh] relative">
            {loading ? (
                <PageLoader />
            ) : (
                <>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            User Rank Income
                        </h2>

                        <p className="text-sm font-medium text-yellow-700 bg-yellow-100 px-3 py-1 rounded-md">
                            Total Income: ₹{totalIncome.toLocaleString("en-IN")}
                        </p>
                    </div>

                    {/* Table */}
                    <TableComponent
                        columns={columns}
                        data={incomeData}
                        loading={loading}
                        rowsPerPage={10}
                        emptyMessage="No User Rank Income found"
                    />
                </>
            )}
        </div>
    );
};

export default UserRankIncome;
