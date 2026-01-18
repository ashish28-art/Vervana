import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useContext } from "react";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increment,
  decrement,
  clearCart,
} from "../Store/cartSlice"

const Confirmation = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleShopping=()=>{
    clearCart();
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("selectedAddress");
    localStorage.removeItem("orderDetails");
    navigate("/")
  }
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[420px] text-center animate-fadeIn">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16 animate-bounce" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Order Placed Successfully 🎉
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Thank you for shopping with us! Your order has been confirmed and will
          be delivered soon.
        </p>

        <div className="flex flex-col gap-3">
          <button
             onClick={handleShopping}
            className="bg-[#FFD166] text-black font-semibold py-3 rounded-xl hover:bg-[#E6B850] transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="border border-gray-300 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
