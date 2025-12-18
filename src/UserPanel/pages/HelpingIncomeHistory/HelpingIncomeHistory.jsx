import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Wallet } from "lucide-react";
import { getHelpingIncomeHistory } from "../../../api/mlm.api";
import PageLoader from "../../../Component/PageLoader";
import TableComponent from "../../../Component/ui/TableComponent";

const HelpingIncomeHistory = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncome = async () => {
      setLoading(true);
      try {
        const res = await getHelpingIncomeHistory();

        if (res?.data && Array.isArray(res.data)) {
          setIncomeList(res.data);
        } else {
          setIncomeList([]);
        }
      } catch (err) {
        Swal.fire("Error", err?.message || "Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, []);

  const columns = [
    {
      header: "SR No.",
      render: (_, index) => index + 1,
    },
    {
      header: "Level",
      render: (row) => (
        <span className="font-semibold text-green-700">Level {row.level}</span>
      ),
    },
    {
      header: "Total Amount",
      render: (row) => (
        <span className="font-semibold text-blue-700">
          ₹{row.totalAmount}
        </span>
      ),
    },
    {
      header: "Income Wallet",
      render: (row) => `₹${row.incomeWallet}`,
    },
    {
      header: "Upgrade Wallet",
      render: (row) => `₹${row.upgradeWallet}`,
    },
    {
      header: "Note",
      render: (row) => (
        <p className="text-xs text-gray-600 whitespace-normal">{row.note}</p>
      ),
    },
    {
      header: "Date",
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-IN") || "-",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md min-h-[60vh]">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-gray-800 flex items-center gap-2">
              <Wallet size={20} /> Helping Income History
              <span className="ml-2 px-2 py-1 bg-green-600 text-white rounded-full text-sm">
                {incomeList?.length}
              </span>
            </h2>
          </div>

          {/* Table */}
          <TableComponent
            columns={columns}
            data={incomeList}
            loading={loading}
            rowsPerPage={10}
            emptyMessage="No income history found"
            searchable={false} // search off
          />
        </>
      )}
    </div>
  );
};

export default HelpingIncomeHistory;
