import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHistory,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FiChevronsLeft, FiChevronsRight, FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Routers } from "../constants/Routes";
import { clearUser } from "../store/slice/userSlice";
import { History, Home, PanelLeftClose, PanelRightClose, PanelRightCloseIcon, Users } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { MainContent } from "../constants/mainContent";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store?.user?.user);

  const { theme, toggleTheme } = useTheme(); // 🔥 Dark mode hook

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(clearUser());
    navigate(Routers.Login);
  };

  const page = location.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "Dashboard";

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setOpenDropdown(null);
  };

  const toggleDropdown = (index) => {
    if (!isCollapsed) setOpenDropdown(openDropdown === index ? null : index);
  };

  const menuItems = [
    { path: Routers.UserPanel, label: "Dashboard", icon: <FaHome /> },
    { path: Routers.MyProfile, label: "My Profile", icon: <FaUser /> },
    { path: Routers.MyInvestment, label: "Add Fund", icon: <FaMoneyBill /> },
    { path: Routers.AllHelpingPlans, label: "Helping Plan", icon: <FaMoneyBill /> },
    { path: Routers.HelpingReferral, label: "My Referrals", icon: <Users /> },
    { path: Routers.InvestmentHistory, label: "Fund History", icon: <FaHistory /> },
    { path: Routers.HelpingIncomeHistory, label: "Helping Income History", icon: <History /> },
    { path: Routers.changePassword, label: "Change Password", icon: <FaLock /> },
  ];

  return (
    <div className="flex w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors">

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen 
        bg-white dark:bg-gray-900 
        text-gray-800 dark:text-gray-200 
        border-r border-gray-200 dark:border-gray-700
        shadow-2xl z-50 transition-all duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "w-20" : "w-72"}`}
      >

        {/* Sidebar Header */}
        <div className="relative h-20 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">

          {/* Logo + User */}
          <div
            className={`flex items-center gap-3 transition-all duration-300 
            ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}`}
          >
            {/* <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg"></div> */}
            <img
              src={MainContent.logo}
              alt="Logo"
              className={`rounded-full w-[3rem] h-[3rem] mb-2 cursor-pointer`}
              onClick={() => navigate(Routers.DASHBOARD)}
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold capitalize truncate max-w-[150px]">
                {userInfo?.name || "User"}
              </span>
              <span className="text-xs text-green-600 font-medium">Premium Member</span>
            </div>
          </div>

          {/* Collapse Button FIXED POSITION */}
          <button
            onClick={toggleCollapse}
            className="hidden md:flex absolute -right-3 top-6 z-50
  w-8 h-8 items-center justify-center rounded-full
  bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600
  hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isCollapsed ? (
              <PanelRightClose className="text-green-900" />
            ) : (
              <PanelLeftClose className="text-gray-900" />
            )}
          </button>


          {/* Mobile Close */}
          <button
            onClick={toggleSidebar}
            className="md:hidden flex items-center justify-center w-8 h-8 
            bg-gray-100 dark:bg-gray-800"
          >
            <PanelLeftClose className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Sidebar Menu */}
        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">

          {/* MENU TITLE */}
          {!isCollapsed && (
            <p className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide mb-3">
              MENU
            </p>
          )}

          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
            group flex items-center gap-3 px-4 py-3 rounded-lg relative transition-all
            ${isActive
                      ? "text-[#125954] dark:text-emerald-300 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-[#4bef8a] dark:hover:bg-gray-800"
                    }
          `}
                >

                  {/* LEFT ACTIVE BORDER */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-emerald-600 rounded-r-lg"></span>
                  )}

                  {/* ICON */}
                  <div className={`
            text-lg transition 
            ${isActive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white"
                    }
          `}>
                    {item.icon}
                  </div>

                  {/* LABEL */}
                  {!isCollapsed && (
                    <span className="text-sm">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* GENERAL TITLE */}
          {/* {!isCollapsed && (
            <p className="px-4 mt-6 text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide mb-3">
              GENERAL
            </p>
          )} */}

          {/* LOGOUT */}
          {/* <button
            onClick={handleLogout}
            className={`
             mt-2 w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800
              transition-all
                ${isCollapsed ? "justify-center" : ""}
              `}
          >
            <FaSignOutAlt className="text-lg" />
            {!isCollapsed && <span>Logout</span>}
          </button> */}

        </nav>


        {/* Logout */}
        <div className="p-4 border-t  mt-0 md:mt-4 border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl 
            bg-gradient-to-r from-red-500 to-red-600 text-white shadow 
            hover:scale-105 transition 
            ${isCollapsed ? "justify-center" : ""}`}
          >
            <FaSignOutAlt className="text-lg" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <header className="sticky top-0 h-16 bg-white dark:bg-gray-900 
        border-b border-gray-200 dark:border-gray-700 shadow transition-colors">

          <div className="h-full px-4 md:px-6 flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center ">
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiMenu className="text-xl text-gray-700 dark:text-gray-300" />
              </button>

              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {/* {page} */} Dashboard
                </h1>

              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg dark:bg-gray-800 
                hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>

              <Link to={Routers.webiste}>
                <button className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow hover:scale-110 transition">
                  <Home size={18} />
                </button>
              </Link>


            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 
        dark:from-gray-900 dark:to-gray-950 p-4 md:p-6 transition-colors">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;
