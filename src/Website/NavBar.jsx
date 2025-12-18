import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MainContent } from "../constants/mainContent";
import { Routers } from "../constants/Routes";
import {
  IoIosArrowRoundForward,
  IoMdCart,
  IoMdHome,
  IoMdMenu,
  IoMdClose,
} from "react-icons/io";
import { FastForward } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navlinks = [
    
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Contact Us", path: "/contact" },
    { label: "About Us", path: "/about" },
  ];

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleAuthAction = () => {
    if (!isLoggedIn) {
      navigate(Routers.Login);
    } else {
      navigate(Routers.UserPanel);
    }
    setMenuOpen(false); 
  };

  return (
    <div className="flex justify-between items-center py-2 sm:px-[4rem] px-[1rem] shadow-md fixed z-50 w-full bg-white top-0 left-0">
      <div className="flex items-center gap-4 w-auto">
        <Link to={"/"}>
          <img
            src={MainContent.logo1}
            alt="logo"
            className="lg:w-[4rem] md:w-[3rem] w-[3rem]"
          />
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-center gap-8 w-3/5">
        {navlinks.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            className={({ isActive }) =>
              `relative text-[#051B2E] text-sm font-medium transition duration-300 
               hover:text-green-800 
               after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 
               after:bg-green-800 after:transition-all after:duration-300 
               hover:after:w-full
               ${isActive ? "text-green-700 after:w-full" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-3">
     <Link
          to={"/cart"}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <IoMdCart className="text-lg font-bold" />
        </Link>

        <button
          onClick={handleAuthAction}
          className="text-white text-xs md:text-sm flex items-center gap-1 bg-green-500  hover:bg-green-900 px-3 md:px-4 py-1.5 md:py-2 rounded-md shadow-md hover:shadow-lg transition"
        >
          {isLoggedIn ? (
            <>
              Dashboard <FastForward size={15} />
            </>
          ) : (
            <>
              Login <IoIosArrowRoundForward className="text-xl" />
            </>
          )}
        </button>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <IoMdClose className="text-3xl text-[#051B2E]" />
            ) : (
              <IoMdMenu className="text-3xl text-[#051B2E]" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 z-20">
          {navlinks.map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-[#051B2E] text-base font-medium transition duration-300 hover:text-green-800 ${
                  isActive ? "text-green-500" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
