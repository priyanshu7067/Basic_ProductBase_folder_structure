import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Address from "./Address";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getCarts } from "../api/products.api";
import { userDetails   } from "../api/user.api";
import PageLoader from "../Component/PageLoader";
import { payment } from "../api/payment.api";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = location.state || { cartItems: [] };
  const totalAmount = totalPrice || 0;

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userBalance, setUserBalance] = useState(0);

  const user = useSelector((store) => store?.user);

  const fetchUserBalance = async () => {
    try {
      const response = await userDetails();
    setUserBalance(response?.data?.data?.wallet?.purchaseWallet || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBalance();
  }, []);

  console.log("cartItems:", cartItems);
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      Swal.fire({
        title: "Address Required!",
        text: "Please select an address to proceed.",
        icon: "warning",
        confirmButtonColor: "#90479B",
      });
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      Swal.fire({
        title: "Cart Empty!",
        text: "Your cart is empty.",
        icon: "warning",
        confirmButtonColor: "#90479B",
      });
      return;
    }

    try {
      const itemsPayload = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const payload = {
        addressId: selectedAddress,
        items: itemsPayload,
      };

      const response = await payment(payload);

      if (response?.success) {
        Swal.fire(
          "Order Placed!",
          "Your order has been successfully placed.",
          "success"
        );
        await getCarts(user.user._id);
        navigate("/user-dashboard/order-history");
      } else {
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: response?.message || "Insufficient deposit wallet balance!",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.message || "Something went wrong!",
      });
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-24 mb-6">
      <div className="w-full lg:w-2/3 border bg-white p-6 rounded-lg">
        <Address
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      </div>

      <div className="w-full lg:w-1/3 border h-fit bg-white p-6 rounded-lg lg:sticky lg:top-5">
        <h2 className="text-lg font-bold mb-4">Your Order</h2>

        <div className="py-4 border-b flex justify-between">
          <span>Subtotal</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-2">
          <span>Wallet Balance</span>
          <span>₹{userBalance || 0}</span>
        </div>

        <div className="flex justify-between py-2 font-bold">
          <span>Total Amount</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

      
        <button
          onClick={() => {
            if (!selectedAddress) {
              Swal.fire({
                title: "Please select an address!",
                text: "You need to select at least one address before placing your order.",
                icon: "warning",
                confirmButtonColor: "#90479B",
              });
              return;
            }
            handlePlaceOrder();
          }}
          disabled={!selectedAddress}
          className={`w-full mt-4 px-5 py-2 rounded-md text-white transition 
    ${selectedAddress
              ? "bg-green-600 hover:opacity-90"
              : "bg-gray-400 cursor-not-allowed"
            }
  `}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
