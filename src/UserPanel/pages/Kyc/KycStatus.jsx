import React from "react";

const KycStatus = ({ data }) => {
  if (!data) {
    return (
      <div className="p-4 text-gray-500 italic">
        No KYC submitted yet.
      </div>
    );
  }

  const bank = data.bankDetails;
  const kyc = data.kycDetails;

  return (
    <div className="p-5 bg-white shadow rounded-xl border mb-6">
      <h3 className="text-xl font-semibold text-green-700 mb-4">
        Your KYC Details
      </h3>

      {/* ✅ Bank Details */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-5">
        <div>
          <p className="font-semibold">Account Holder</p>
          <p>{bank?.accountHolderName}</p>
        </div>

        <div>
          <p className="font-semibold">Account Number</p>
          <p>{bank?.accountNumber}</p>
        </div>

        <div>
          <p className="font-semibold">IFSC Code</p>
          <p>{bank?.ifscCode}</p>
        </div>

        <div>
          <p className="font-semibold">Bank Name</p>
          <p>{bank?.bankName}</p>
        </div>

        <div>
          <p className="font-semibold">Branch Name</p>
          <p>{bank?.branchName}</p>
        </div>

        <div>
          <p className="font-semibold">Nominee Name</p>
          <p>{bank?.nomineeName}</p>
        </div>

        <div>
          <p className="font-semibold">Nominee Relation</p>
          <p>{bank?.nomineeRelation}</p>
        </div>
      </div>

      {/* ✅ KYC Details */}
      <h4 className="text-lg font-semibold text-green-700 mb-3">
        Documents
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold">Aadhar Number</p>
          <p className="mb-2">{kyc?.aadharNumber}</p>
          <img
            src={kyc?.aadharDocument}
            alt="Aadhar"
            className="w-32 h-32 object-cover rounded border shadow"
          />
        </div>

        <div>
          <p className="font-semibold">PAN Number</p>
          <p className="mb-2">{kyc?.panNumber}</p>
          <img
            src={kyc?.panDocument}
            alt="PAN"
            className="w-32 h-32 object-cover rounded border shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default KycStatus;
