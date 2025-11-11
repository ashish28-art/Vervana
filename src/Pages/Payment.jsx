import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upi: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  // Validate form based on selected method
  useEffect(() => {
    if (selectedMethod === "card") {
      const { name, cardNumber, expiry, cvv } = formData;
      setIsFormValid(name && cardNumber && expiry && cvv);
    } else {
      const { upi } = formData;
      setIsFormValid(upi);
    }
  }, [formData, selectedMethod]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    navigate("/confirmation");
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 font-poppins">
      <div className="bg-white w-[450px] shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          💳 Choose Payment Method
        </h2>

        {/* Payment Options */}
        <div className="flex justify-between mb-8">
          {["card", "upi"].map((method) => (
            <div
              key={method}
              className={`flex flex-col items-center justify-center w-[48%] border-2 rounded-xl py-4 cursor-pointer transition-all duration-300 ${
                selectedMethod === method
                  ? "border-[#FFD166] bg-[#FFF8E1] shadow-md"
                  : "border-gray-300 bg-white"
              }`}
              onClick={() => setSelectedMethod(method)}
            >
              <img
                src={
                  method === "card"
                    ? "https://cdn-icons-png.flaticon.com/512/217/217425.png"
                    : "https://cdn-icons-png.flaticon.com/512/825/825454.png"
                }
                alt={method}
                className="w-10 mb-2"
              />
              <p className="font-medium text-gray-700 capitalize">{method}</p>
            </div>
          ))}
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment}>
          {selectedMethod === "card" ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Cardholder Name"
                className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                required
              />
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="Card Number"
                className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                maxLength="16"
                required
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-1/2 mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="CVV"
                  className="w-1/2 mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                  maxLength="3"
                  required
                />
              </div>
            </>
          ) : (
            <input
              type="text"
              name="upi"
              value={formData.upi}
              onChange={handleChange}
              placeholder="Enter your UPI ID (e.g. name@upi)"
              className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
              required
            />
          )}

          {/* Pay Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full mt-4 py-3 rounded-xl font-semibold transition ${
              isFormValid
                ? "bg-[#FFD166] text-black hover:bg-[#E6B850]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Pay Now
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-5">
          Secure Payment 🔒 | Powered by React & Tailwind
        </p>
      </div>
    </div>
  );
};

export default Payment;
