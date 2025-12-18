import React, { useEffect, useState } from 'react';
import HeaderCard from './HeaderCard';
import Footer1 from '../../../Component/Footer1';
import PageLoader from '../../../Component/PageLoader';


const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div>
        <PageLoader/>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <HeaderCard  />
      <div className="pr-4  ">
       
      </div>
      <Footer1 />
    </div>
  );
};

export default DashboardPage;
