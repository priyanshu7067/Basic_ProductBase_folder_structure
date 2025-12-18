import React, { useEffect, useState } from "react";
import { getFeildOfficerIncome } from "../../../api/mlm.api";
import PageLoader from "../../../Component/PageLoader";
import TableComponent from "../../../Component/ui/TableComponent";

const FieldOfficerIncome = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIncome = async () => {
            try {
                setLoading(true);

                const response = await getFeildOfficerIncome();

                if (response?.data?.data && Array.isArray(response.data.data)) {
                    // ✅ Sort by latest first
                    const sorted = response.data.data.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setIncomeData(sorted);
                } else {
                    setIncomeData([]);
                }
            } catch (error) {
                console.error("Error fetching Field Officer Income:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIncome();
    }, []);

    // ✅ Customize columns based on your real API response
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
                row.createdAt
                    ? new Date(row.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    })
                    : "N/A",
        },
    ];

    // ✅ Total Income
    const totalIncome = incomeData.reduce(
        (sum, item) => sum + (item.income || 0),
        0
    );

    return (
        <div className="p-4 bg-white rounded-lg shadow-md min-h-[60vh] relative">
            {loading ? (
                <PageLoader />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Field Officer Income
                        </h2>

                        <p className="text-sm font-medium text-orange-700 bg-orange-100 px-3 py-1 rounded-md">
                            Total Income: ₹{totalIncome.toLocaleString("en-IN")}
                        </p>
                    </div>

                    <TableComponent
                        columns={columns}
                        data={incomeData}
                        loading={loading}
                        rowsPerPage={10}
                        emptyMessage="No Field Officer Income found"
                    />
                </>
            )}
        </div>
    );
};

export default FieldOfficerIncome;
