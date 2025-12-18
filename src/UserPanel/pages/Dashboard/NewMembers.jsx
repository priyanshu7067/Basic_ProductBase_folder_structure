import React from "react";
import Button from "../../../Component/Button";

const NewMembers = ({ members, isLoading }) => {
    const referralMembers = (members?.totalReferrals || []).slice(-5);

    return (
        <div className="bg-white rounded-xl h-fit p-4 space-y-4">
            <div className="flex items-center gap-2 justify-between">
                <h3 className="">Referral Members Report</h3>
                <Button title="View all" link="members" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-3 font-medium">Name</th>
                            <th className="p-3 font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: referralMembers.length }).map((_, index) => (
                                <tr key={index} className="border-b animate-pulse">
                                <td className="p-3 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                </td>
                                <td className="p-3 font-light">
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                </td>
                            </tr>
                            ))
                        ) : referralMembers.length > 0 ? (
                            referralMembers.map((member, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-3 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    {member?.avatar ? (
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-500">👤</span>
                                    )}
                                </div>
                                {member?.user?.name || "N/A"}
                            </td>
                            <td className="p-3 font-light">{new Date(member?.date).toLocaleDateString() || "N/A"}</td>
                        </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="2" className="text-center py-4 text-gray-500">
                                No referral members found
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewMembers;