import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  addtoCart,
  getCarts,
  removeCartProduct,
  updateCartItem,
} from "../api/products.api";

import img from "../assets/productlist/emptycart.jpg";
import PageLoader from "../Component/PageLoader";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const userInfo = useSelector((store) => store?.user);
  const userId = userInfo?.user?.id;

  // console.log("User ID from Redux:", userId);

  const fetchCartData = async () => {
    try {
      const response = await getCarts();
      setCartItems(response?.cart?.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchCartData();
  }, [userId]);

  const handleApplyCoupon = () => {
    setAppliedCoupon(coupon);
    console.log("Applied Coupon:", coupon);
  };

  const handleQuantityChange = async (item, delta) => {
    if (!item?.product?._id) return;

    try {
      await updateCartItem({
        productId: item.product._id,
        action: delta === 1 ? "increase" : "decrease", // delta se action decide
      });

      fetchCartData(); // refresh cart
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await removeCartProduct(productId);
          fetchCartData();

          Swal.fire({
            title: "Removed!",
            text: "Item has been removed from your cart.",
            icon: "success",
            confirmButtonColor: "#90479B",
            confirmButtonText: "OK",
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Failed to remove item. Please try again.",
            icon: "error",
            confirmButtonColor: "#90479B",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.subtotal || 0),
    0
  );

  // if (loading) return <PageLoader />;

  if (!userId || cartItems.length === 0) {
    return (
      <div className="p-10 text-center flex items-center justify-center text-xl font-medium tracking-wider mt-14">
        Your cart is empty.{" "}
        <Link to="/" className="text-blue-600">
          continue shopping.
        </Link>{" "}

        <img src={img} alt="Empty Cart" className="mx-auto mt-4 w-[20rem]" />
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-10 flex flex-col gap-6 lg:flex-row mt-14">
      {/* Cart Table */}
      <div className="lg:w-3/4 border p-4 shadow-md rounded-lg bg-white">
        <h2 className="text-xl lg:text-2xl font-semibold mb-4">
          Shopping Cart
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="py-3 font-semibold">Product</th>
                <th className="py-3 font-semibold">Price</th>
                <th className="py-3 font-semibold">Quantity</th>
                <th className="py-3 font-semibold">Subtotal</th>
                <th className="py-3 font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.product._id}
                  className="border-b text-sm lg:text-base"
                >
                  <td className="flex items-center gap-3 py-4">
                    {item?.product?.images?.[0] && (
                      <Link to={`/product/${item.product._id}`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg"
                      />
                      </Link>
                    )}
                    {item.product.name}
                  </td>
                  <td>₹{item.product.price}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        disabled={item.quantity <= 1} 
                        className={`px-2 py-1 border rounded-lg ${
                          item.quantity <= 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        −
                      </button>

                      {item.quantity}

                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        disabled={item.quantity >= 10} 
                        className={`px-2 py-1 border rounded-lg ${
                          item.quantity >= 10
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>₹{item.subtotal?.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-red-500"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="lg:w-1/4 h-fit bg-gray-100 p-5 flex flex-col gap-2 shadow-md rounded-lg lg:sticky lg:top-5">
        <h3 className="text-lg font-medium mb-4">Cart Total</h3>
        <div className="border-t pt-3">
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xl font-medium">Total:</p>
            <p className="text-xl font-medium">₹{totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <Link
          className={`w-full px-8 mt-4 text-center py-2 rounded-lg ${
            cartItems.length === 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-bg-color"
          }`}
          to="/checkout"
          state={{ coupon, cartItems, totalPrice }}
        >
          {cartItems.length === 0 ? "CART IS EMPTY" : "CHECKOUT"}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
