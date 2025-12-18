import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Routers } from "./constants/Routes";
import LandingPage from './Website/LandingPage';
import Layout from './layout/Layout';
import DashboardPage from './UserPanel/pages/Dashboard/DashboardPage';
import WalletPage from './UserPanel/pages/Wallet/WalletPage';

import Login from './UserPanel/pages/Login/Login';
import Register from './UserPanel/pages/Register/Register';
import ReferralMembers from './UserPanel/pages/ReferralMembers/ReferralMembers';
import ProductDetailsPage from './Website/ProductDetailsPage';
import ProtectedRoute from './utils/ProtectedRoute';
import ScrollToTop from './Component/ScrollToTop ';
import CartPage from './Website/CartPage';

import CheckoutPage from './Website/CheckoutPage';

import Aboutus from './Website/Aboutus';
import ContactUs from './Website/ContactUs';
import Services from './Website/Services';
import MainLayout from './Website/MainLayout';
import MyProfile from './UserPanel/pages/Profile/MyProfile';
import ChangePassword from './UserPanel/pages/changepassword/ChangePassword';
import ForgotPassword from './UserPanel/pages/Register/ForgotPassword';
import MyDownlines from './UserPanel/pages/downline/MyDownline';
import MyGenology from './UserPanel/pages/downline/MyGenology';
import MyInvestment from './UserPanel/pages/MyInvestment/MyInvestment';
import OrderHistoryReport from './UserPanel/pages/Dashboard/OrderHistoryReport';
import WithdrawalHistory from './UserPanel/pages/Payout/WithdrawalHistory';
import LevelIncome from './UserPanel/pages/Payout/LevelIncome';
import RankHistory from './UserPanel/pages/Payout/RankHistory';
import InvestmentHistory from './UserPanel/pages/Payout/InvestmentHistory';
import AllProducts from './Website/AllProducts';
import KycPage from './UserPanel/pages/Kyc/KycPage';
import SponsorIncentive from './UserPanel/pages/income/SponsorIncentive';
import SelfIncentive from './UserPanel/pages/income/SelfIncentive';
import SelfPerformance from './UserPanel/pages/income/SelfPerformance';
import SponsorPerformance from './UserPanel/pages/income/SponsorPerformance';
import RoyalStar from './UserPanel/pages/income/RoyalStar';
import RoyalReferral from './UserPanel/pages/income/RoyalReferral';
import RainbowIncome from './UserPanel/pages/income/RainbowIncome';
import ForeverIncome from './UserPanel/pages/income/ForeverIncome';
import RoyalClubIncome from './UserPanel/pages/income/RoyalClubIncome';
import FieldOfficerIncome from './UserPanel/pages/income/FieldOfficerIncome';
import UserRankIncome from './UserPanel/pages/income/UserRankIncome';
import HelpingIncomeHistory from './UserPanel/pages/HelpingIncomeHistory/HelpingIncomeHistory';
import AllHelpingPlans from './UserPanel/pages/HelpingPlan/AllHelpingPlans';
import MyhelpingReffreral from './UserPanel/pages/Payout/MyhelpingReffreral';
import PublicRoute from './utils/PublicRoute';
// import BonanzaRank from './UserPanel/pages/Payout/BonanzaRank';
const RouterPages = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path={Routers.webiste} element={<LandingPage />} />
                {/* <Route path={Routers.Login} element={<Login />} />
                <Route path={Routers.Register} element={<Register />} />
                <Route path={Routers.ForgotPassword} element={<ForgotPassword />} /> */}
                <Route path={Routers.Login} element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route path={Routers.Register} element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route path={Routers.ForgotPassword} element={
                        <PublicRoute>
                            <ForgotPassword />
                        </PublicRoute>
                    }
                />

                <Route path={Routers.About} element={<MainLayout inner={<Aboutus />} />} />
                <Route path={Routers.Contact} element={<MainLayout inner={<ContactUs />} />} />
                <Route path={Routers.Services} element={<MainLayout inner={<Services />} />} />
                <Route path={Routers.ProductDetails} element={<ProductDetailsPage />} />
                <Route path={Routers.AllProducts} element={<MainLayout inner={<AllProducts />} />} />
                <Route path={Routers.Cart} element={<CartPage />} />
                <Route path={Routers.Checkout} element={<CheckoutPage />} />
                <Route
                    path={Routers.UserPanel}
                    element={
                        // <ProtectedRoute>
                            <Layout />
                        // </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardPage />} />
                    <Route path={Routers.MatchingIncomeHistory} element={<WalletPage />} />
                    <Route path={Routers.WithdrawalHistory} element={<WithdrawalHistory />} />
                    <Route path={Routers.LevelIncome} element={<LevelIncome />} />
                    <Route path={Routers.RankHistory} element={<RankHistory />} />
                    {/* <Route path={Routers.BonnzaRank} element={<BonanzaRank />} /> */}
                    <Route path={Routers.MyProfile} element={<MyProfile />} />
                    <Route path={Routers.changePassword} element={<ChangePassword />} />

                    <Route path={Routers.Member} element={<ReferralMembers />} />
                    <Route path={Routers.OrderHistory} element={<OrderHistoryReport />} />
                    <Route path={Routers.MyDownlines} element={<MyDownlines />} />
                    <Route path={Routers.MyGenology} element={<MyGenology />} />
                    <Route path={Routers.MyInvestment} element={<MyInvestment />} />
                    <Route path={Routers.InvestmentHistory} element={<InvestmentHistory />} />
                    <Route path={Routers.Kyc} element={<KycPage />} />
                    <Route path={Routers.SelfIncentive} element={<SelfIncentive />} />
                    <Route path={Routers.SponsorIncentive} element={<SponsorIncentive />} />

                    <Route path={Routers.SelfPerformance} element={<SelfPerformance />} />
                    <Route path={Routers.SponsorPerformance} element={<SponsorPerformance />} />

                    <Route path={Routers.RoyalStar} element={<RoyalStar />} />
                    <Route path={Routers.RoyalReferral} element={<RoyalReferral />} />

                    <Route path={Routers.RainbowIncome} element={<RainbowIncome />} />
                    <Route path={Routers.ForeverIncome} element={<ForeverIncome />} />
                    <Route path={Routers.RoyalClubIncome} element={<RoyalClubIncome />} />
                    <Route path={Routers.FieldOfficerIncome} element={<FieldOfficerIncome />} />
                    <Route path={Routers.UserRankIncome} element={<UserRankIncome />} />

                    <Route path={Routers.HelpingIncomeHistory} element={<HelpingIncomeHistory />} />
                    {/* ============plans============ */}
                    <Route path={Routers.AllHelpingPlans} element={<AllHelpingPlans />} />
                    <Route path={Routers.HelpingReferral} element={<MyhelpingReffreral />} />


                </Route>
            </Routes>
        </>
    );
};

export default RouterPages;
