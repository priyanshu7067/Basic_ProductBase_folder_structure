import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/whyus2.jpg";

const Banner = () => {
  return (
    <section className="relative overflow-hidden group sm:h-[35rem] h-[25rem] flex items-center justify-center text-center">

      {/* ✅ Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${img})` }}
      ></div>

      {/* ✅ Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✅ Content */}
      <div className="relative z-10 text-white px-6 max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Your Journey to Sustainable Growth Starts Here{" "}
          <span className="text-green-500">Office  Helping Plan</span>
        </h1>

        <p className="text-lg md:text-xl mb-6">
          A sustainable business model combining health, herbal products & financial growth.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="#plans"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
          >
            Explore Plans
          </a>

          <Link
            to="/about"
            className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold shadow-lg transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
