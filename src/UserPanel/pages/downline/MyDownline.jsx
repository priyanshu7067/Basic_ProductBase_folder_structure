import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import { Users } from "lucide-react";
import { getMyDownlines } from "../../../api/user.api";
import PageLoader from "../../../Component/PageLoader";
import TableComponent from "../../../Component/ui/TableComponent";

const MyDownlines = () => {
  const [downlines, setDownlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchDownlines = async () => {
      setLoading(true);
      try {
        const res = await getMyDownlines();
        if (res?.downlines && Array.isArray(res.downlines)) {
          setDownlines(res.downlines);
        } else {
          setDownlines([]);
        }
      } catch (err) {
        Swal.fire("Error", err?.message || "Something went wrong", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDownlines();
  }, []);

  const filteredData = useMemo(() => {
    return downlines.filter(
      (user) =>
        user?.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        user?.username?.toLowerCase().includes(searchInput.toLowerCase()) ||
        user?.sponsor?.name?.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput, downlines]);

  const columns = [
    {
      header: "SR No.",
      render: (row, index) => index + 1,
    },
    {
      header: "Name",
      render: (row) => (
        <div>
          <p className="font-medium">{row?.name || "N/A"}</p>
          <p className="text-xs text-gray-500">{row?.email || "-"}</p>
        </div>
      ),
    },
    {
      header: "Leg",
      render: (row) => row?.leg || "-",
    },
    {
      header: "Sponsor ",
      render: (row) => (
        <div>
          <p className="font-medium">{row?.sponsor?.name || "-"}</p>
          <p className="text-xs text-gray-500">{row?.sponsor?.email || "-"}</p>
        </div>
      ),
    },
    {
      header: "Sponsor ID",
      render: (row) => row?.sponsor?.userId || "-", 

    }
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
              <Users size={20} /> My Downlines
              <span className="ml-2 px-2 py-1 bg-green-600 text-white rounded-full text-sm">
                {filteredData?.length}
              </span>
            </h2>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Name, Username, or Sponsor"
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
            emptyMessage="No downlines found"
          />
        </>
      )}
    </div>
  );
};

export default MyDownlines;
