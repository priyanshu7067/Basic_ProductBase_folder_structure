import React, { useEffect, useState } from "react";
import { Edit, Mail, Phone, Hash, Shield, Calendar } from "lucide-react";
import Swal from "sweetalert2";
import { userDetails, editProfile } from "../../../api/user.api";
import profileimg from "../../../assets/profile.png";
import PageLoader from "../../../Component/PageLoader";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    accountNo: "",
    ifscCode: "",
    holderName: "",
    upiId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userDetails();
        if (res?.data?.success) {
          const u = res?.data?.data;
          setUser(u);
          setFormData({
            name: u.name || "",
            email: u.email || "",
            phone: u.phone || "",
            username: u.username || "",
            accountNo: u.bankDetails?.accountNo || "",
            ifscCode: u.bankDetails?.ifscCode || "",
            holderName: u.bankDetails?.holderName || "",
            upiId: u.bankDetails?.upiId || "",
          });
        } else {
          Swal.fire("Error", res?.message || "Failed to fetch profile", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Something went wrong while fetching profile", "error");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await editProfile(formData);

      if (res?.user) {
        setUser(res?.user);
        setEditMode(false);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: res?.message || "Profile updated successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", res?.message || "Update failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", err?.message || "Something went wrong", "error");
    }
  };

  if (!user) return <PageLoader />;

  return (
    <div className="px-4 mt-4 flex justify-center items-center">
      <div className="w-full bg-white shadow-xl rounded-2xl p-6">
        {!editMode ? (
          <>
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <img src={profileimg} alt="" className="w-20 h-20 rounded-full" />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <h2 className="text-3xl font-extrabold text-gray-800">
                  {user.name}
                </h2>
                <div className="flex flex-col gap-2 mt-3 text-gray-700">
                  <p className="flex items-center gap-2 justify-center sm:justify-start">
                    <Mail className="text-blue-500" size={18} /> {user.email}
                  </p>
                  <p className="flex items-center gap-2 justify-center sm:justify-start">
                    <Phone className="text-green-500" size={18} /> {user.phone}
                  </p>
                  <p className="flex items-center gap-2 justify-center sm:justify-start">
                    <Hash className="text-purple-500" size={18} /> {user.name}
                  </p>
                  <p className="flex items-center gap-2 justify-center sm:justify-start">
                    <Shield
                      className={
                        user.isVerified ? "text-green-600" : "text-red-500"
                      }
                      size={18}
                    />
                    <span
                      className={`font-semibold ${user.isVerified ? "text-green-600" : "text-red-500"
                        }`}
                    >
                      {user.isVerified ? "Verified User ✅" : "Not Verified ❌"}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 justify-center sm:justify-start">
                    <Calendar className="text-orange-500" size={18} />
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* IDs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
              <div className="p-3 border rounded-lg">
                <strong>Sponsor ID:</strong> {user.sponsorId || "N/A"}
              </div>
              <div className="p-3 border rounded-lg">
                <strong>Upperline ID:</strong> {user.upperlineId || "N/A"}
              </div>
              <div className="p-3 border rounded-lg">
                <strong>Leg:</strong> {user.leg || "N/A"}
              </div>
              <div className="p-3 border rounded-lg">
                <strong>User ID:</strong> {user?.userId || "N/A"}
              </div>
            </div>



            {/* Bank Details Section */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center sm:text-left">
                Bank Details 🏦
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
                <p><strong>Account No:</strong> {user.bankDetails?.accountNo || "N/A"}</p>
                <p><strong>IFSC Code:</strong> {user.bankDetails?.ifscCode || "N/A"}</p>
                <p><strong>Holder Name:</strong> {user.bankDetails?.holderName || "N/A"}</p>
                <p><strong>UPI ID:</strong> {user.bankDetails?.upiId || "N/A"}</p>
              </div>
            </div>

            {/* Referral Link */}
            {/* <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center sm:text-left">
                Your Referral Link For Left 🔗
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/register?referral=${user?.name?.toUpperCase()}&leg=left`}
                  className="flex-1 border rounded-lg p-2 text-blue-700 bg-white focus:outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/register?referral=${user?.username?.toUpperCase()}&leg=left`
                    );
                    Swal.fire({
                      icon: "success",
                      title: "Copied!",
                      text: "Referral link copied to clipboard",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all"
                >
                  Copy Link
                </button>
              </div>
            </div> */}

            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center sm:text-left">
                Your Referral Link For Right 🔗
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/register?referral=${user?.userId?.toUpperCase()}`}
                  className="flex-1 border rounded-lg p-2 text-blue-700 bg-white focus:outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/register?referral=${user?.userId?.toUpperCase()}`
                    );
                    Swal.fire({
                      icon: "success",
                      title: "Copied!",
                      text: "Referral link copied to clipboard",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all"
                >
                  Copy Link
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Edit size={18} /> Edit Profile
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Basic Details */}
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              {/* Bank Details */}
              {["accountNo", "ifscCode", "holderName", "upiId"].map((field) => (
                <div key={field}>
                  <label className="block mb-1 text-gray-700 capitalize">
                    {field === "upiId"
                      ? "UPI ID"
                      : field === "ifscCode"
                        ? "IFSC Code"
                        : field === "accountNo"
                          ? "Account Number"
                          : "Holder Name"}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
