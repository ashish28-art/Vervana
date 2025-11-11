import React, { useContext, useState } from 'react';
import vervana from '../assets/vervana.png';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../Context/CartContext.jsx';
import { WishlistContext } from '../Context/WishlistContext.jsx';
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalQuantity = cartItems.length;

  return (
    <div className="py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        
        {/* Left Nav Links (Desktop) */}
        <ul className="hidden md:flex gap-8 font-poppins font-light">
          <li className="hover:underline hover:underline-offset-8 cursor-pointer">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="hover:underline hover:underline-offset-8 cursor-pointer">About</li>
          <li className="hover:underline hover:underline-offset-8 cursor-pointer">
            <NavLink to="/men">Men</NavLink>
          </li>
          <li className="hover:underline hover:underline-offset-8 cursor-pointer">
            <NavLink to="/women">Women</NavLink>
          </li>
        </ul>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img src={vervana} alt="Vervana Logo" className="w-[120px] h-auto" />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Hamburger Menu Icon (Visible on Mobile) */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                // Close icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Icons (Desktop + Mobile) */}
          <div className="hidden md:flex gap-6">
            {/* Search */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth="1.5" stroke="currentColor"
              className="w-6 h-6 cursor-pointer duration-200 hover:text-gray-600 hover:scale-90">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            {/* Cart */}
            <div className="relative">
              <NavLink to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth="1.5" stroke="currentColor"
                  className="w-6 h-6 cursor-pointer hover:scale-90 hover:text-gray-600 transition">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 
                    2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 
                    14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 
                    0 .75.75 0 0 1 1.5 0Zm12.75 
                    0a.75.75 0 1 1-1.5 
                    0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </NavLink>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </div>

            {/* Wishlist */}
            <div className="relative">
              <NavLink to="/wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth="1.5" stroke="currentColor"
                  className="w-6 h-6 cursor-pointer hover:text-pink-600 hover:scale-90 transition">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                    -1.935 0-3.597 1.126-4.312 2.733
                    -.715-1.607-2.377-2.733-4.313-2.733
                    C5.1 3.75 3 5.765 3 8.25
                    c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </NavLink>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </div>

            {/* Profile */}
            <NavLink to="/profile">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor"
                className="w-6 h-6 cursor-pointer hover:text-gray-600 hover:scale-90 transition">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 
                  15.75a7.488 7.488 0 0 0-5.982 
                  2.975m11.963 0a9 9 0 1 
                  0-11.963 0m11.963 0A8.966 
                  8.966 0 0 1 12 21a8.966 
                  8.966 0 0 1-5.982-2.275M15 
                  9.75a3 3 0 1 1-6 0 3 3 
                  0 0 1 6 0Z" />
              </svg>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col items-center py-4 gap-4 font-poppins font-light">
              <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
              <NavLink to="/men" onClick={() => setMenuOpen(false)}>Men</NavLink>
              <NavLink to="/women" onClick={() => setMenuOpen(false)}>Women</NavLink>
              <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</NavLink>
              <NavLink to="/cart" onClick={() => setMenuOpen(false)}>Cart</NavLink>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>Profile</NavLink>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
