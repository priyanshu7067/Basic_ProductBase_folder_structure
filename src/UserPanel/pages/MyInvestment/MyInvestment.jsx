import React, { useEffect, useState } from "react";
import {
  getAllHelpingQRCodes,
  getMyHelpingInvestments,
  verifyHelpingPayment,
} from "../../../api/user.api";
import Swal from "sweetalert2";
import PageLoader from "../../../Component/PageLoader";

const TransactionForm = () => {
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [formData, setFormData] = useState({
    fromBank: "",
    amount: "",
    toBank: "",
    utrNo: "",
    paymentProof: "",
  });

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await getAllHelpingQRCodes();
        if (res?.success && Array.isArray(res.data)) {
          setBanks(res.data);
        }
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    const fetchQRCode = async () => {
      if (!selectedBank) return;
      try {
        const res = await getMyHelpingInvestments(selectedBank);
        if (res?.success && res.data?.qrCode) {
          setQrCode(res.data.qrCode);
        } else {
          setQrCode("");
        }
      } catch (error) {
        console.error("Error fetching QR Code:", error);
      }
    };
    fetchQRCode();
  }, [selectedBank]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, paymentProof: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await verifyHelpingPayment(formData);
      setLoading(false);

      if (res?.success) {
        Swal.fire(
          " Success",
          res.message || "Transaction submitted",
          "success"
        );
        setFormData({
          fromBank: "",
          toBank: "",
          utrNo: "",
          amount: "",
          paymentProof: "",
        });
        setSelectedBank("");
        setQrCode("");
      } else {
        Swal.fire(" Error", res?.message || "Something went wrong", "error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Transaction submit error:", error);
      Swal.fire(" Error", "Failed to submit transaction", "error");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          🏦 Transaction Form
        </h2>

        <div>
          <label className="block text-gray-600 mb-1">From Bank</label>
          <input
            type="text"
            value={formData.fromBank}
            onChange={(e) =>
              setFormData({ ...formData, fromBank: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Enter your bank name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">To Bank</label>
          <select
            value={selectedBank}
            onChange={(e) => {
              setSelectedBank(e.target.value);
              setFormData({ ...formData, toBank: e.target.value });
            }}
            className="w-full border px-3 py-2 rounded-lg"
            required
          >
            <option value="">Select Bank</option>
            {banks.map((bank) => (
              <option key={bank._id} value={bank.bankName}>
                {bank.bankName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Enter Amount"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">UTR No</label>
          <input
            type="text"
            value={formData.utrNo}
            onChange={(e) =>
              setFormData({ ...formData, utrNo: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-lg"
            placeholder="Enter UTR Number"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Payment Proof</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
            required
          />
          {formData.paymentProof && (
            <img
              src={formData.paymentProof}
              alt="Preview"
              className="w-20 h-20 object-cover mt-2 rounded-lg border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          disabled={loading}
        >
          Submit Transaction
        </button>
        {loading ? <PageLoader /> : null}
      </form>

      <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🏧 QR Code</h2>
        {qrCode ? (
          <img
            src={qrCode}
            alt="QR Code"
            className="w-48 h-48 object-contain border rounded-lg shadow-md"
          />
        ) : (
          <p className="text-gray-500">Select a bank to view QR Code</p>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
