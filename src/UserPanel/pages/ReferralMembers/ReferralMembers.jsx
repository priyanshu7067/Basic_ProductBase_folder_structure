import React, { useEffect, useState } from 'react';
import ReferralMemberList from './ReferralMemberList';
import PageLoader from '../../../Component/PageLoader';

const ReferralMembers = () => {
    return (
        <div className="flex flex-col gap-5">
           
            <ReferralMemberList  />
        </div>
    );
};

const Card = ({ title, member }) => (
    <div className="p-4 bg-white/30 border-2 border-white rounded-lg flex gap-2 flex-col justify-center items-center">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{member}</p>
    </div>
);

export default ReferralMembers;
