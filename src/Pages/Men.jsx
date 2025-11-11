import React, { useContext, useState } from 'react';
import { Items } from './Data/Items';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../Context/WishlistContext';
import Slider from "@mui/material/Slider";
import { motion } from "framer-motion";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const filteredItems = Items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const price = parseInt(item.price.replace(/[^\d]/g, ""), 10);
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="mt-6 flex sticky top-24 ">
      {/* ---------------- Left Column (Filters) ---------------- */}
      <motion.div
        className='w-1/4 mt-40 font-poppins ml-6'
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className='lg:w-[250px] md;w-[100px]  sticky top-24 mt-12 '>
          <h1 className='text-xl '>Price</h1>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="off"
            min={0}
            max={2000}
            sx={{
              "& .MuiSlider-thumb": {
                width: 14,
                height: 14,
                backgroundColor: "black",
              },
              "& .MuiSlider-thumb:hover": {
                boxShadow: "0 0 0 6px rgba(0,0,0,0.16)",
              },
            }}
          />
          <div className="flex justify-between mt-2 text-sm font-medium text-gray-700">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
          
          
         
        </div>
      </motion.div>

      {/* ---------------- Right Column (Products + Categories) ---------------- */}
      <div className="w-3/4 p-6">
        <motion.h1
          className="heading font-poppins text-2xl mb-6"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Men’s Collection - New Arrivals
        </motion.h1>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {["All", "T-Shirts", "Shirts", "Hoodies", "Jeans"].map((category, idx) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${selectedCategory === category
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              {category}
            </motion.button>
          ))}
        </div>


        {/* Products Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="card w-[250px] h-[380px] rounded-2xl shadow-md p-3 flex flex-col cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <Link to={`/product/${item.id}`}>
                <div className="w-full h-56 rounded-lg overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="flex flex-col justify-between flex-1 mt-3">
                <h3 className="font-medium text-lg truncate">{item.name}</h3>
                <p className="text-gray-700 font-semibold">{item.price}</p>
                <div className="mt-2 flex justify-between gap-2">
                  <button
                    onClick={() => addToWishlist(item)}
                    className="px-3 py-1 rounded-md text-sm transition-transform duration-200 hover:scale-125"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 
                        1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 
                        3.75 3 5.765 3 8.25c0 7.22 9 12 9 
                        12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
