import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {

  const navigate=useNavigate();
  const handleOrder=()=>{
        navigate("/Payment")
    }

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.address ||
      !formData.mobile ||
      !formData.city ||
      !formData.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    const newAddress = {
      name: formData.name,
      address: `${formData.address}, ${formData.city}, ${formData.pincode}`,
      mobile: formData.mobile,
      label: "New Address",
    };

    setAddresses([...addresses, newAddress]); 
    setFormData({ name: "", address: "", mobile: "", city: "", pincode: "" }); 
    setShowDialog(false);
  };

  return (
    <>
      <div className="container font-poppins min-h-screen pb-20">
        {/* Header Section */}
        <div className="flex justify-center gap-[10rem] mt-20">
          <h1 className="text-lg font-medium">Select Delivery Address</h1>
          <button
            onClick={() => setShowDialog(true)}
            className="w-[150px] h-[38px] border border-[#212529] text-[#141414] text-sm rounded-md hover:bg-[#f8f8f8] transition"
          >
            Add New Address
          </button>
        </div>

       
        <div className="flex flex-col items-center mt-10 gap-6">
          {addresses.map((addr, index) => (
            <div
              key={index}
              className="bg-white w-[500px] p-5 rounded-xl border border-gray-200 shadow-[0_8px_20px_rgba(0,0,0,0.15)] transform hover:scale-[1.02] hover:shadow-[0_12px_25px_rgba(0,0,0,0.2)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="radio"
                  name="Address"
                  value={addr.label}
                  className="accent-[#FFD166] scale-125"
                />
                <span className="font-medium text-[#121619] text-sm">
                  {addr.label}
                </span>
              </div>
              <h2 className="font-semibold text-lg text-[#121619]">{addr.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
              <p className="text-sm text-gray-600 mt-1">
                Mobile: {addr.mobile}
              </p>
            </div>
          ))}
        </div>
        <div className=''>
        <button
        onClick={handleOrder}
            
            className="w-[150px] h-[38px] border border-[#212529] text-[#141414] text-sm rounded-md hover:bg-[#f8f8f8] transition mx-[34rem] mt-16"
          >
            Go to Payment
          </button>
          </div>

        {/* Dialog Box */}
        {showDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[400px] p-6 rounded-2xl shadow-lg animate-fadeIn">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Add New Address
              </h2>

              {/* Address Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address Line 1"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
                />

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowDialog(false)}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    
                    className="px-4 py-2 bg-[#FFD166] rounded-lg text-black font-semibold hover:bg-[#E6B850] transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      
    </>
  );
};

export default OrderPage;
