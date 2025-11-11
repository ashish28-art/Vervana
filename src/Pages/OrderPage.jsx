import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();

  // Which address is selected
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOrder = () => {
    // You can guard if no address selected, if you want.
    // if (selectedIndex === null) return alert("Please select an address");
    navigate("/Payment");
  };

  const [showDialog, setShowDialog] = useState(false);

  const [addresses, setAddresses] = useState([
    {
      name: "P. Ashish Sai",
      address:
        "2-2-185/55/J, Street No 11, Srinivasa Nagar Colony, Bagh Amberpet, Hyderabad, Telangana 500013",
      mobile: "8309404824",
      label: "Default Address",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Simple numeric-only cleanup for mobile & pincode
    if (name === "mobile") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((p) => ({ ...p, mobile: digits }));
      return;
    }
    if (name === "pincode") {
      const digits = value.replace(/\D/g, "").slice(0, 6);
      setFormData((p) => ({ ...p, pincode: digits }));
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.mobile.trim() ||
      !formData.city.trim() ||
      !formData.pincode.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("Mobile number should be 10 digits");
      return;
    }
    if (formData.pincode.length !== 6) {
      alert("Pincode should be 6 digits");
      return;
    }

    const newAddress = {
      name: formData.name.trim(),
      address: `${formData.address.trim()}, ${formData.city.trim()}, ${formData.pincode.trim()}`,
      mobile: formData.mobile,
      label: "New Address",
    };

    setAddresses((prev) => [...prev, newAddress]);
    setFormData({ name: "", address: "", mobile: "", city: "", pincode: "" });
    setSelectedIndex(addresses.length); // select the newly added
    setShowDialog(false);
  };

  // Close dialog on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowDialog(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="font-poppins min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-xl sm:text-2xl font-semibold text-center md:text-left">
              Select Delivery Address
            </h1>
            <div className="flex justify-center md:justify-end">
              <button
                onClick={() => setShowDialog(true)}
                className="w-[180px] h-[42px] border border-[#212529] text-[#141414] text-sm rounded-md hover:bg-[#f8f8f8] transition"
              >
                Add New Address
              </button>
            </div>
          </div>

          {/* Address Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {addresses.map((addr, index) => (
              <label
                key={index}
                className={`cursor-pointer bg-white w-full p-5 rounded-xl border transition-all duration-300
                  ${
                    selectedIndex === index
                      ? "border-[#FFD166] shadow-[0_8px_22px_rgba(0,0,0,0.12)]"
                      : "border-gray-200 shadow-[0_6px_16px_rgba(0,0,0,0.10)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="addressChoice"
                    checked={selectedIndex === index}
                    onChange={() => setSelectedIndex(index)}
                    className="accent-[#FFD166] mt-1"
                    aria-label={`Select ${addr.label}`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#121619] text-sm">
                        {addr.label}
                      </span>
                      {selectedIndex === index && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF2CC] text-[#8A6D3B]">
                          Selected
                        </span>
                      )}
                    </div>
                    <h2 className="font-semibold text-base sm:text-lg text-[#121619] mt-1">
                      {addr.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {addr.address}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Mobile: {addr.mobile}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center sm:justify-centre">
            <button
              onClick={handleOrder}
              className="w-[200px] h-[42px] border border-[#212529] text-[#141414] text-sm rounded-md hover:bg-[#f8f8f8] transition"
            >
              Go to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Dialog */}
      {showDialog && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Add New Address"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDialog(false);
          }}
        >
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
            <div className="p-6 sm:p-7">
              <h2 className="text-lg sm:text-xl font-semibold text-center">
                Add New Address
              </h2>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                  className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address Line"
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="address-line1"
                  required
                  className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  required
                  className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                  className="w-full p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDialog(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#FFD166] text-black font-semibold hover:bg-[#E6B850] transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPage;
