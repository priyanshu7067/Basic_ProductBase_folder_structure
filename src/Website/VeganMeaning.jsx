import React from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaAppleAlt,
  FaCarrot,
  FaHeart,
  FaHandsHelping,
  FaShieldAlt,
  FaSmileBeam,
} from "react-icons/fa";
import img from "../assets/images/whyus.jpg"
const VeganMeaning = () => {
  const features = [
    {
      icon: <FaHandsHelping className="text-green-600 text-6xl" />,
      title: "Trusted Quality",
      desc: "We deliver high-quality, naturally sourced products that go through multiple quality checks to ensure purity and effectiveness.",
    },
    {
      icon: <FaLeaf className="text-green-600 text-6xl" />,
      title: "Sustainable Approach",
      desc: "Our products are crafted using eco-friendly ingredients and sustainable packaging to support a greener planet.",
    },
    {
      icon: <FaShieldAlt className="text-green-600 text-6xl" />,
      title: "Certified & Safe",
      desc: "Every product is lab-tested and certified to meet safety and regulatory standards, ensuring complete peace of mind.",
    },
    {
      icon: <FaSmileBeam className="text-green-600 text-6xl" />,
      title: "Customer Satisfaction",
      desc: "We prioritize your happiness with responsive support, easy returns, and a growing community that trusts our brand.",
    },
  ];

  return (
    <section className="mx-auto px-6 md:px-12 lg:px-16 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center overflow-hidden cursor-pointer"
        >
          <img
            src={img}
            alt="Farmer with veggies"
            className="shadow-lg w-full h-[50vh] rounded-md object-cover transition-transform duration-700 ease-in-out hover:scale-110"
            // style={{ borderRadius: "72% 44% 59% 94% / 49% 44% 88% 31% " }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">
            Why You Can Choose Us!
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We believe in delivering excellence through nature-inspired, safe,
            and reliable products. Our mission is to bring you closer to
            wellness, sustainability, and trust — all in one place.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                {feature.icon}
                <div>
                  <h3 className="text-green-700 font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VeganMeaning;
