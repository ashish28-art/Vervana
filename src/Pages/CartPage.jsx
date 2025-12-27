import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, getTotalPrice, clearCart, increment, decrement } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate("/OrderPage");
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-8 font-poppins">
      {/* Left Column: Cart Items */}
      <div className="w-full lg:w-2/3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-xl font-semibold mb-2 sm:mb-0">Items in your cart</h1>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm underline text-gray-600 hover:text-black transition"
            >
              Remove all
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.uniqueId}
              className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border p-4 rounded-lg mb-4 shadow-sm"
            >
              <img
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded"
                src={item.img}
                alt={item.name}
              />
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.price}</p>
                  <p className="text-sm text-gray-700">
                    Size: <span className="font-medium">{item.size}</span>
                  </p>
                  <p className="text-gray-500 text-sm">Sold by: Flashstar Commerce</p>

                  <div className="flex gap-2 mt-2">
                    <p className="font-medium text-xs sm:text-sm text-green-600">
                      7 days return available
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => decrement(item.uniqueId)}
                      className="border rounded-full px-2 text-lg hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="text-base font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.uniqueId)}
                      className="border rounded-full px-2 text-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="self-start sm:self-center mt-2 sm:mt-0">
                  <button
                    onClick={() => removeFromCart(item.uniqueId)}
                    className="text-gray-700 hover:text-red-500 text-lg font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right Column: Order Summary */}
      {cartItems.length > 0 && (
        <div className="w-full lg:w-1/3 border p-6 rounded-lg h-fit sticky top-6 bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span>Subtotal</span>
            <span>${getTotalPrice()}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span>Shipping</span>
            <span>$50</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>₹{getTotalPrice() + 50}</span>
          </div>

          <button
            onClick={handleOrder}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
