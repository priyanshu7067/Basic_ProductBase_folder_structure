import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addtoCart, getCarts, getSingleProductDetails } from "../api/products.api";
import LoadingSpinner from "../Component/LoadingSpinner";
import PageLoader from "../Component/PageLoader";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const userInfo = useSelector((store) => store?.user);
  const userId = userInfo?.user?.id;

  const getSingleProduct = async () => {
    try {
      const response = await getSingleProductDetails(id);
      if (response?.data?.success) {
        const fetchedProduct = response?.data?.data;

        let stockQuantity = fetchedProduct.stock;

        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct?.images?.[0] || "");

        if (userId) {
          const cartResponse = await getCarts();
          const cartItems = cartResponse?.cart?.items || [];
          const exists = cartItems.some(
            (item) => item.product?._id === fetchedProduct._id
          );
          setIsInCart(exists);
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const handleAddToCart = async () => {
    if (!userId) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to add items to the cart.",
        icon: "warning",
        confirmButtonColor: "#90479B",
        confirmButtonText: "Login",
      }).then(() => navigate("/login"));
      return;
    }

    const payload = {
      productId: product._id,
      quantity: quantity,
    };

    try {
      setButtonLoading(true);
      const response = await addtoCart(payload, userId);
      if (response?.success) {
        setIsInCart(true);
        
      } else {
        Swal.fire({
          title: "Error",
          text: response?.message || "Product is Not Available in Stock",
          icon: "error",
        });
      }
      setIsInCart(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add product to cart.",
        icon: "error",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  if (loading) return <PageLoader />;
  if (!product)
    return <h1 className="text-center text-2xl py-4">Product not found</h1>;

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 p-5 md:p-10 gap-5 md:gap-10 mt-14">
      {/* Left Section - Images */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative w-full h-96 rounded-xl overflow-hidden border box-shadow">
          <img
            src={selectedImage}
            alt={product.productName}
            className="w-96 h-96 object-cover mx-auto"
          />
        </div>
        <div className="flex gap-2 md:flex-row flex-col top-2 left-2">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Thumbnail"
              className={`w-24 h-20 border-2 object-cover rounded cursor-pointer ${
                selectedImage === img ? "border-white" : ""
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold mt-2 line-clamp-2 mb-2">
          {product.productName}
        </h1>

        <div>
          <h1
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          ></h1>
        </div>

        <p className="text-gray-600 mt-2">
          Price: ₹ {product.price.toFixed(2)}
        </p>

        {/* <p>
          Quntity :
        </p> */}

        {product.stock > 0 ? (
          <p className="  text-green-600 mt-4 rounded">
            In Stock
            {/* {product.stock} */}
          </p>
        ) : (
          <p className="mt-4 text-red-600">
            Out of Stock
          </p>
        )}

       
        <div className="flex gap-4 mt-6">
          {isInCart ? (
            <button
              className="bg-green-600 text-white px-6 py-2 rounded"
              onClick={() => navigate("/cart")}
            >
              GO TO CART
            </button>
          ) : (
            <button
              className="bg-green-600 text-white px-6 py-2 rounded"
              disabled={buttonLoading}
              onClick={handleAddToCart}
            >
              {buttonLoading ? <LoadingSpinner /> : "ADD TO CART"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
