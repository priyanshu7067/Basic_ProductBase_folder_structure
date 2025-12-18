// import React, { useState, useMemo } from "react";

// const TableComponent = ({
//   columns = [],
//   data = [],
//   loading = false,
//   emptyMessage = "No records found",
//   rowsPerPage = 10,
//   searchable = true, // enable/disable search
// }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchInput, setSearchInput] = useState("");

//   const totalRecords = data.length;

//   // 🔍 GLOBAL SEARCH FUNCTION
//   const filteredData = useMemo(() => {
//     if (!searchInput.trim()) return data;

//     const searchTerm = searchInput.toLowerCase();

//     return data.filter((row) => {
//       return columns.some((col) => {
//         const value = col.accessor ? row[col.accessor] : "";

//         // when render exists, skip accessor filter
//         if (typeof value === "string" || typeof value === "number") {
//           return value.toString().toLowerCase().includes(searchTerm);
//         }

//         return false;
//       });
//     });
//   }, [data, searchInput, columns]);

//   // 🔢 PAGINATION
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   const paginatedData = useMemo(() => {
//     const start = (currentPage - 1) * rowsPerPage;
//     return filteredData.slice(start, start + rowsPerPage);
//   }, [filteredData, currentPage, rowsPerPage]);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   if (loading) {
//     return (
//       <div className="text-center p-6 text-gray-500 font-medium">
//         Loading...
//       </div>
//     );
//   }

//   const startRecord =
//     filteredData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

//   const endRecord = Math.min(currentPage * rowsPerPage, filteredData.length);

//   return (
//     <div className="w-full">
//       {/* 🔎 Search Bar */}
//       {searchable && (
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchInput}
//             onChange={(e) => {
//               setSearchInput(e.target.value);
//               setCurrentPage(1); // reset page on search
//             }}
//             className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:border-green-500"
//           />
//         </div>
//       )}

//       {/* Table */}
//       <div
//         className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
//         style={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
//       >
//         <table className="min-w-[900px] w-full border-collapse border border-gray-300 text-sm text-left">
//           <thead>
//             <tr>
//               {columns.map((col, index) => (
//                 <th
//                   key={index}
//                   className="border p-2 bg-gray-100 text-gray-700 sticky top-0 z-10"
//                 >
//                   {col.header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((row, rowIndex) => (
//                 <tr
//                   key={row._id || rowIndex}
//                   className="hover:bg-gray-50 transition-colors"
//                 >
//                   {columns.map((col, colIndex) => (
//                     <td key={colIndex} className="border p-2 whitespace-nowrap">
//                       {col.render
//                         ? col.render(row, rowIndex)
//                         : row[col.accessor] ?? "-"}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={columns.length}
//                   className="text-center p-4 text-gray-500"
//                 >
//                   {emptyMessage}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {filteredData.length > 0 && (
//         <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 text-sm text-gray-700">
//           <div className="text-center md:text-left">
//             Showing <span className="font-medium">{startRecord}</span>–
//             <span className="font-medium">{endRecord}</span> of{" "}
//             <span className="font-medium">{filteredData.length}</span> records
//           </div>

//           <div className="flex items-center gap-2 flex-wrap justify-center">
//             {/* Prev */}
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-3 py-1 border rounded-md ${
//                 currentPage === 1
//                   ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                   : "hover:bg-green-100 border-gray-300"
//               }`}
//             >
//               Prev
//             </button>

//             {/* Page Numbers */}
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => handlePageChange(i + 1)}
//                 className={`px-3 py-1 border rounded-md ${
//                   currentPage === i + 1
//                     ? "bg-green-600 text-white border-green-600"
//                     : "hover:bg-green-100 border-gray-300"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             {/* Next */}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-3 py-1 border rounded-md ${
//                 currentPage === totalPages
//                   ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                   : "hover:bg-green-100 border-gray-300"
//               }`}
//             >
//               Next
//             </button>

//             <span className="ml-2 text-gray-600 hidden md:inline">
//               Page <b>{currentPage}</b> of <b>{totalPages}</b>
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableComponent;
import React, { useState, useMemo } from "react";

const TableComponent = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found",
  rowsPerPage = 10,
  searchable = true, // enable/disable search
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const totalRecords = data.length;

  // 🔍 GLOBAL SEARCH FUNCTION
  const filteredData = useMemo(() => {
    if (!searchInput.trim()) return data;

    const searchTerm = searchInput.toLowerCase();

    return data.filter((row) => {
      return columns.some((col) => {
        const value = col.accessor ? row[col.accessor] : "";

        // when render exists, skip accessor filter
        if (typeof value === "string" || typeof value === "number") {
          return value.toString().toLowerCase().includes(searchTerm);
        }

        return false;
      });
    });
  }, [data, searchInput, columns]);

  // 🔢 PAGINATION
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="text-center p-6 text-gray-500 font-medium">
        Loading...
      </div>
    );
  }

  const startRecord =
    filteredData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endRecord = Math.min(currentPage * rowsPerPage, filteredData.length);

  return (
    <div className="w-full">
      {/* 🔎 Search Bar */}
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
            className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:border-green-500"
          />
        </div>
      )}

      {/* Table */}
      <div
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        style={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
      >
        <table className="min-w-[900px] w-full border-collapse border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="border p-2 bg-gray-100 text-gray-700 sticky top-0 z-10"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row._id || rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="border p-2 whitespace-nowrap">
                      {col.render
                        ? col.render(row, rowIndex)
                        : row[col.accessor] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2 text-sm text-gray-700">
          <div className="text-center md:text-left">
            Showing <span className="font-medium">{startRecord}</span>–
            <span className="font-medium">{endRecord}</span> of{" "}
            <span className="font-medium">{filteredData.length}</span> records
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Prev */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "hover:bg-green-100 border-gray-300"
              }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white border-green-600"
                    : "hover:bg-green-100 border-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "hover:bg-green-100 border-gray-300"
              }`}
            >
              Next
            </button>

            <span className="ml-2 text-gray-600 hidden md:inline">
              Page <b>{currentPage}</b> of <b>{totalPages}</b>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
