import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { contactus, getContactQuery } from "../../../api/user.api";

const ContactUs2 = () => {
  const [formData, setFormData] = useState({
    query: "",
    description: "",
  });
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all queries
  const fetchQueries = async () => {
    try {
      setLoading(true);
      const res = await getContactQuery();
  
      // check if res.data is actually array or object
      const queriesArray = Array.isArray(res?.data) ? res.data : res?.data?.data;
  
      setQueries(queriesArray || []);
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to fetch queries", "error");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchQueries();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit query
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.query || !formData.description) {
      return Swal.fire("Warning", "Please fill all fields", "warning");
    }
    try {
      setLoading(true);
      await contactus(formData);
      Swal.fire("Success", "Your query has been submitted", "success");
      setFormData({ query: "", description: "" });
      fetchQueries(); // refresh list after submit
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to submit query", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Query Title</label>
          <input
            type="text"
            name="query"
            value={formData.query}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter query title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write your description..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Queries List */}
      <h3 className="text-xl font-semibold mb-3">Your Queries</h3>
      <div className="space-y-3">
        {loading ? (
          <p>Loading...</p>
        ) : queries.length === 0 ? (
          <p className="text-gray-500">No queries submitted yet.</p>
        ) : (
          queries.map((q) => (
            <div
              key={q._id}
              className="bg-gray-100 p-4 rounded-lg shadow-sm border"
            >
              <h4 className="font-bold text-blue-600">{q.query}</h4>
              <p className="text-gray-700">{q.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {new Date(q.createdAt).toLocaleString()}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    q.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : q.status === "resolved"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {q.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactUs2;
