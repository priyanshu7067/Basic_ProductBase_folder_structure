import React from 'react'
import { FaLeaf, FaSeedling, FaHeartbeat, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import service from '../assets/images/services.jpg';
const Services = () => {
  const services = [
    {
      icon: <FaSeedling className="text-green-600 text-3xl mb-4" />,
      title: "Agricultural Support",
      desc: "We empower farmers through modern organic farming techniques, high-quality seeds, and eco-friendly products that enhance productivity naturally.",
    },
    {
      icon: <FaHeartbeat className="text-green-600 text-3xl mb-4" />,
      title: "Health & Wellness",
      desc: "Our herbal and health-focused products promote a balanced lifestyle. We focus on natural healing and sustainable well-being for every individual.",
    },
    {
      icon: <FaGraduationCap className="text-green-600 text-3xl mb-4" />,
      title: "Education & Training",
      desc: "We provide training and awareness programs to help our members understand business growth, product benefits, and personal development.",
    },
    {
      icon: <FaLeaf className="text-green-600 text-3xl mb-4" />,
      title: "Eco-friendly Products",
      desc: "Our products are made from natural ingredients that protect the environment while supporting a healthier and cleaner lifestyle.",
    },
  ];

  return (
    <div className="font-sans my-[4rem]">
      <div className="relative bg-green-900 text-white">
        <img
          src={service}
          alt="header background"
          className="w-full h-72 object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="mt-2 text-sm">
            <Link to="/" className="hover:underline">Home</Link> &gt;{" "}
            <span className="text-bg-color">Our Services</span>
          </p>
        </div>
      </div>

      <div className="w-full bg-white py-16 px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition"
            >
              {service.icon}
              <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
              <p className="text-gray-500 text-sm">{service.desc}</p>
              <a
                href="#"
                className="text-green-600 font-medium text-sm mt-3 inline-block"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="border border-green-600 text-green-600 px-6 py-2 rounded-md hover:bg-green-600 hover:text-white transition">
            Explore More
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h4 className="text-sm text-gray-400 uppercase tracking-wide">About Us</h4>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
              Building Growth Through <br />{" "}
              <span className="text-green-600">Innovation & Trust</span>
            </h2>
            <p className="text-gray-500 mb-4">
              We are committed to creating a sustainable business ecosystem
              where health, education, and agriculture work together for community progress.
              Through our MLM model, members earn while promoting wellness and growth.
            </p>
            <p className="text-gray-500">
              From natural products to knowledge-based training, our mission is
              to uplift lives through innovation, responsibility, and empowerment.
            </p>
          </div>
          <div>
            <img
              src="https://nursing.jhu.edu/wp-content/uploads/2025/05/Untitled-design-3.jpg"
              alt="agriculture"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
