import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { VscCallIncoming } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { MainContent } from "../constants/mainContent";

const Footer = () => {
  return (
    <>
      <footer className="bg-black/90 text-white pt-12 pb-8 sm:px-[4rem] px-[2rem]">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/">
              <img
                src={MainContent.logo1}
                alt="Bionova Logo"
                className="w-[5rem] mb-4"
              />
            </Link>
            <p className="text-sm  leading-relaxed">
              Office  Helping Plan combines herbal wellness and
              sustainable income. A step towards health, prosperity, and a
              greener future.{" "}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm ">
              <li>
                <Link to="/" className="hover:text-green-700 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-green-700 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-green-700 transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-700 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact With Us!</h3>
            <ul className="space-y-3 text-sm ">
              <li>
                <span className="font-medium">Address:</span> India
              </li>
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:wirely@gmail.com"
                  className="hover:text-green-700 transition"
                >
                  wirely@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <VscCallIncoming className="text-green-400" />{" "}
                <a
                  href="tel:+911111111111"
                  className="hover:text-green-700 transition"
                >
                  +91 111 111 111
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-gray-200 hover:bg-green-500 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-gray-200 hover:bg-blue-400 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-gray-200 hover:bg-pink-500 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-gray-200 hover:bg-blue-700 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-black text-gray-400 py-5 text-xs md:text-sm text-ellipsiss text-center px-4">
        <p>
          This is a website by{" "}
          <span className="font-medium text-white">Star Chain Labs</span> ©{" "}
          {new Date().getFullYear()} - All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
