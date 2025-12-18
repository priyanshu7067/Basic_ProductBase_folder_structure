import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {contactus} from "../api/user.api"
import img from "../assets/images/contact.jpg";
import Swal from "sweetalert2";
export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      await contactus(formData);
      console.log("Form submitted:", formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      Swal.fire({
        title: "Message Sent!",
        text: "Your message has been sent successfully.",
        icon: "success",
        confirmButtonColor: "#28a745",
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error sending your message. Please try again later.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="font-sans my-[4rem]">
      <div className="relative bg-green-900 text-white">
        <img
          src={img}
          alt="header background"
          className="w-full h-72 object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-sm">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            &gt; <span className="text-bg-color">Contact Us</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-[4rem] py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <p className="text-green-600 font-semibold uppercase tracking-wide">
            Find Our Office
          </p>
          <h2 className="text-3xl font-bold mt-2 mb-4">
            Contact <span className="text-green-600">with the team</span>
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Get in touch with us for queries, support, or collaborations.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-green-600 text-xl mt-1" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-600">New Hyde Park, NY 11040</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-green-600 text-xl mt-1" />
              <div>
                <p className="font-semibold">Phone no</p>
                <p className="text-gray-600">(+91) 333 666 0021</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-green-600 text-xl mt-1" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">support@example.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-green-50 rounded-lg transform rotate-1"></div>

          <div className="relative bg-white shadow-xl rounded-lg p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full border rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="w-full border rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="2"
                required
                className="w-full border rounded-md px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              ></textarea>
              <button
                type="submit"
                className=" bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-md shadow-lg transform hover:scale-105 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.3780558163405!2d-122.5428561242643!3d37.97468480243007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859c3bb9b5fef1%3A0xd3a9281c77d4bde!2sSan%20Rafael%2C%20CA!5e0!3m2!1sen!2sus!4v1693593172010!5m2!1sen!2sus"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>
    </div>
  );
}
