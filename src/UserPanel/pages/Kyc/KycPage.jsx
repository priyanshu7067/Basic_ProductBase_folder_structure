import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { submitKyc } from "../../../api/user.api";
import { getKycDetails } from "../../../api/user.api";
import KycStatus from "./KycStatus";


const KycPage = () => {
    const [loading, setLoading] = useState(false);
    const [kycInfo, setKycInfo] = useState(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);


    // ✅ Bank Details State
    const [bankDetails, setBankDetails] = useState({
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        branchName: "",
        nomineeName: "",
        nomineeRelation: "",
    });

    // ✅ KYC Details State
    const [kycDetails, setKycDetails] = useState({
        aadharNumber: "",
        panNumber: "",
        aadharDocument: null,
        panDocument: null,
    });

    const resetForm = () => {
        setBankDetails({
            accountHolderName: "",
            accountNumber: "",
            ifscCode: "",
            bankName: "",
            branchName: "",
            nomineeName: "",
            nomineeRelation: "",
        });

        setKycDetails({
            aadharNumber: "",
            panNumber: "",
            aadharDocument: null,
            panDocument: null,
        });

        // ✅ File inputs manually reset karne ke liye
        const fileInputs = document.querySelectorAll("input[type='file']");
        fileInputs.forEach((input) => (input.value = ""));
    };

    const loadKycDetails = async () => {
        try {
            const res = await getKycDetails();
            if (res.success) {
                setKycInfo(res.data);
            }
        } catch (err) {
            console.error("KYC Fetch Error:", err);
        }
    };

    useEffect(() => {
        loadKycDetails();
    }, []);

    useEffect(() => {
        loadKycDetails();
    }, []);


    // ✅ Bank Value Change
    const handleBankChange = (e) => {
        const { name, value } = e.target;
        setBankDetails((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ KYC Text Inputs
    const handleKycChange = (e) => {
        const { name, value } = e.target;
        setKycDetails((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Convert File to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // ✅ Handle File Upload
    const handleFileChange = async (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (!file) return;

        const base64 = await convertToBase64(file);

        setKycDetails((prev) => ({
            ...prev,
            [name]: base64, // ✅ Base64 store inside object
        }));
    };

    // ✅ Validate Inputs
    const validateKyc = () => {
        if (!/^\d{12}$/.test(kycDetails.aadharNumber)) {
            Swal.fire("Invalid Aadhar", "Aadhar must be 12 digits.", "error");
            return false;
        }

        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(kycDetails.panNumber.toUpperCase())) {
            Swal.fire("Invalid PAN", "PAN must be 10 characters.", "error");
            return false;
        }

        if (!kycDetails.aadharDocument || !kycDetails.panDocument) {
            Swal.fire("Missing Files", "Upload both Aadhar and PAN.", "error");
            return false;
        }

        return true;
    };

    // ✅ Final Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateKyc()) return;

        try {
            setLoading(true);

            const finalPayload = {
                bankDetails: { ...bankDetails },
                kycDetails: {
                    aadharNumber: kycDetails.aadharNumber,
                    panNumber: kycDetails.panNumber,

                },
                aadharDocument: kycDetails.aadharDocument, // ✅ Base64 included
                panDocument: kycDetails.panDocument,// ✅ Base64 included
            };

            // console.log("✅ FINAL PAYLOAD:", finalPayload);

            const res = await submitKyc(finalPayload);

            if (!res.success) {
                Swal.fire({
                    icon: "error",
                    title: "KYC Failed",
                    text: res.message || "Unknown error occurred",
                });
                setLoading(false);
                return;
            }

            Swal.fire({
                icon: "success",
                title: "KYC Submitted Successful",
                text: res.message || "Your KYC is under review.",
            });
            resetForm()
        } catch (error) {
            console.error("KYC Error:", error);

            Swal.fire({
                icon: "error",
                title: "Server Error",
                text:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong! Try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" mx-auto p-6 bg-white rounded-xl shadow border border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-green-700">KYC Verification</h2>
            {/* ✅ Show KYC Status */}
            <div className="mb-6">
                <KycStatus data={kycInfo} />
            </div>

       <hr />
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">

                {/* ✅ BANK DETAILS */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-green-600">
                        Bank Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(bankDetails).map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium mb-1 capitalize">
                                    {field.replace(/([A-Z])/g, " $1")}
                                </label>
                                <input
                                    type="text"
                                    name={field}
                                    value={bankDetails[field]}
                                    onChange={handleBankChange}
                                    className="w-full border p-2 rounded-md focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ✅ KYC DETAILS */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-green-600">
                        KYC Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Aadhar Number
                            </label>
                            <input
                                type="text"
                                name="aadharNumber"
                                value={kycDetails.aadharNumber}
                                onChange={handleKycChange}
                                className="w-full border p-2 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                PAN Number
                            </label>
                            <input
                                type="text"
                                name="panNumber"
                                value={kycDetails.panNumber}
                                onChange={handleKycChange}
                                className="w-full border p-2 rounded-md uppercase"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Upload Aadhar
                            </label>
                            <input
                                type="file"
                                name="aadharDocument"
                                onChange={handleFileChange}
                                className="w-full border p-2 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Upload PAN
                            </label>
                            <input
                                type="file"
                                name="panDocument"
                                onChange={handleFileChange}
                                className="w-full border p-2 rounded-md"
                                required
                            />
                        </div>

                    </div>
                </div>

                {/* ✅ Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                >
                    {loading ? "Submitting..." : "Submit KYC"}
                </button>
            </form>
        </div>
    );
};

export default KycPage;
