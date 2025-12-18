import React, { useEffect, useState } from "react";
import { getHelpingPlan, purchaseHelpingPlan } from "../../../api/helpingplan.api";
import Swal from "sweetalert2";
import PageLoader from "../../../Component/PageLoader";

const AllHelpingPlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [purchaseLoading, setPurchaseLoading] = useState(false);

    // ------------------------------------
    // Fetch Plans
    // ------------------------------------
    const fetchPlans = async () => {
        setLoading(true);
        try {
            const res = await getHelpingPlan();

            if (res?.success) {
                setPlans(res.data || []);
            } else {
                Swal.fire("Error", res?.message || "Failed to fetch plans", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Server error while fetching plans", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    // ------------------------------------
    // PURCHASE CLICK
    // ------------------------------------
    const handlePurchase = async (plan) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to purchase ${plan.planName}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Purchase",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setPurchaseLoading(true);

                try {
                    const res = await purchaseHelpingPlan({
                        planId: plan._id,
                        amount: plan.amount,
                        paymentMethod: "UPI", // You can change if needed
                    });

                    if (res?.success) {
                        Swal.fire("Success", "Plan purchased successfully!", "success");
                    } else {
                        Swal.fire("Error", res?.message || "Failed to purchase", "error");
                    }
                } catch (error) {
                    Swal.fire("Error", "Server error while purchasing plan", "error");
                } finally {
                    setPurchaseLoading(false);
                }
            }
        });
    };

    return (
        <div className="p-6 md:p-10 relative">

            {/* Main Loader */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
                    <PageLoader />
                </div>
            )}

            {/* Purchase Loader */}
            {purchaseLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
                    <PageLoader />
                </div>
            )}

            <h1 className="text-2xl font-bold mb-6 text-center">Helping Plans</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {!loading && plans.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">
                        No plans available
                    </p>
                ) : (
                    plans.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white border rounded-xl shadow-md p-6 hover:shadow-xl transition-all"
                        >
                            {/* PLAN IMAGE */}
                            <div className="w-full h-48 bg-gray-200">
                                <img
                                    src={item.image}
                                    alt={item.planName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{item.planName}</h2>

                            <p className="text-gray-600 mt-2 text-sm">{item.description}</p>

                            <p className="text-blue-600 font-bold text-lg mt-4">
                                ₹ {item.amount}
                            </p>

                            <button
                                onClick={() => handlePurchase(item)}
                                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                            >
                                Purchase Now
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllHelpingPlans;
