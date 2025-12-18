import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllProducts } from "../api/products.api";
import PageLoader from "../Component/PageLoader";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response?.data?.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching all products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="md:p-10 p-5 mt-16 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center tracking-tight">
        Our All <span className="text-green-600">Products</span>
      </h2>

      {products.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh] text-gray-500">
          No products available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl duration-300 overflow-hidden flex flex-col"
            >
              {/* Stock badge */}
              <div className="absolute top-3 left-3 z-10">
                {product?.stock > 0 ? (
                  <span className="bg-green-500 text-white text-[11px] px-3 py-1 rounded-full shadow-sm">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-500 text-white text-[11px] px-3 py-1 rounded-full shadow-sm">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Product image */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                {product?.images?.length > 0 ? (
                  <motion.img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>

              {/* Product info */}
              <div className="flex flex-col gap-2 p-4">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2 leading-tight">
                  {product.productName}
                </h3>

                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-[#222]">
                    ₹{product.price}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    ₹{product.mrp}
                  </p>
                </div>

                {product.discount && (
                  <p className="text-xs font-medium text-green-600">
                    {product.discount}% off
                  </p>
                )}

                <Link
                  to={`/product/${product._id}`}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium text-center hover:bg-green-400  transition-all"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
