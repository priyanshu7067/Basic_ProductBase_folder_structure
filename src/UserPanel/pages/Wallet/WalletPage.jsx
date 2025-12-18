import React, { useEffect, useState } from "react";
import Footer1 from "../../../Component/Footer1";
import { getMatchingIncome } from "../../../api/user.api";
import PageLoader from "../../../Component/PageLoader";

const WalletPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistoryData = async () => {
    try {
      setIsLoading(true);
      const response = await getMatchingIncome();
      setHistory(response?.data?.history || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-4 bg-white rounded-xl">
      <h2 className="font-medium text-gray-800">Matching Income History</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm text-left">
          <thead>
            <tr>
              <th className="border p-2">Sr No.</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Matched Pairs</th>
              <th className="border p-2">GP Per Pair</th>
              <th className="border p-2">Total Amount (₹)</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((item, index) => (
                <tr key={item?._id} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item?.user?._id}</td>
                  <td className="border p-2">{item?.user?.email}</td>
                  <td className="border p-2">{item?.user?.username}</td>
                  <td className="border p-2">{item?.matchedPairs}</td>
                  <td className="border p-2">{item?.gpPerPair}</td>
                  <td className="border p-2">{item?.totalAmount}</td>
                  <td className="border p-2">
                    {new Date(item?.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Footer1 />
    </div>
  );
};

export default WalletPage;
