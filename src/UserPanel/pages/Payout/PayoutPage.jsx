import React, { useEffect, useState } from 'react'
import PayoutComponent from './PayoutComponent '
import Footer1 from '../../../Component/Footer1'
import PageLoader from '../../../Component/PageLoader';
// import { getDashboradData } from '../../../api/user.api';

const PayoutPage = () => {
 


  
  return (
    <div className='flex flex-col gap-5'>
        <PayoutComponent />
        {/* <Footer1/> */}
    </div>
  )
}

export default PayoutPage