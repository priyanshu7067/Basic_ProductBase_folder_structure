import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllProducts } from "../api/products.api";
import PageLoader from "../Component/PageLoader";

const SkeletonCard = () => (
  <div className="bg-white p-3 rounded-xl border animate-pulse flex flex-col gap-5">
    <div className="h-44 bg-gray-300 rounded-xl"></div>
    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
    <div className="h-8 w-full bg-gray-300 rounded"></div>
  </div>
);

const Products = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // ✅ Check if we are on Home or All Products page
  const isHomePage = location.pathname === "/";

  const getAllProductsList = async () => {
    try {
      const response = await getAllProducts();
      if (response?.data?.success) {
        setProducts(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductsList();
  }, []);

  if (loading) return <PageLoader />;

  // ✅ Limit products to 10 only on home page
  const displayedProducts = isHomePage ? products.slice(0, 10) : products;

  return (
    <div className="md:p-10 p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className=" text-xl md:text-3xl font-semibold text-gray-800">
          {isHomePage ? "Most Popular Products" : "All Products"}
        </h2>

        {/* ✅ Show View All Button only on Home Page */}
        {isHomePage && (
          <Link
            to="/all-products"
            className="text-sm font-medium text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-900 transition-all"
          >
            View All Products
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-lg duration-300 relative flex flex-col justify-between"
          >
            {/* Stock Badge */}
            <div className="absolute top-2 left-2 z-10">
              {product?.stock > 0 ? (
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Product Image */}
            <div className="w-full h-44 flex items-center justify-center bg-gray-100 rounded-t-xl overflow-hidden">
              {product?.images?.length > 0 ? (
                <motion.img
                  src={product.images[0]}
                  alt={product.productName}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                />
              ) : (
                <span className="text-gray-500 text-sm">
                  No Image Available
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-2 items-start p-4">
              <h3 className="text-base font-semibold text-gray-700 line-clamp-2">
                {product.productName}
              </h3>

              <div className="flex items-center gap-3">
                <p className="text-lg font-bold text-gray-900">
                  ₹ {product.price}
                </p>
                <p className="text-sm text-gray-400 line-through">
                  ₹ {product.mrp}
                </p>
              </div>

              <Link
                to={`/product/${product._id}`}
                className="bg-green-600 text-white px-4 py-2 text-xs font-medium rounded-lg mt-2 hover:bg-opacity-90 transition-all"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
