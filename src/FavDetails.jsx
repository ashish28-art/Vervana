import React, { useState, useContext } from "react";
import { Favourites } from "./Pages/Data/Favourites";
import { useParams } from "react-router-dom";
import { WishlistContext } from "./Context/WishlistContext";

const FavDetails = () => {
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const product = Favourites.find((p) => p.id.toString() === id);

  if (!product) return <h2 className="text-center mt-10 text-xl">Product not found</h2>;

  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      size: selectedSize,
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-10 px-4 md:px-10 lg:px-20 py-10">
      {/* LEFT: Product Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.img}
          alt={product.name}
          className="w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-auto object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* RIGHT: Product Details */}
      <div className="w-full md:w-1/2 flex flex-col justify-start space-y-6 mt-8 md:mt-12 font-poppins">
        <h2 className="text-2xl sm:text-3xl font-medium">{product.name}</h2>

        {/* Sizes */}
        <div className="flex flex-wrap gap-3 mt-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center rounded-full border transition 
                ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 mb-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.5 3.5L6 5 3 9l2 2 1-1v9a2 2 0 002 2h8a2 2 0 002-2v-9l1 1 2-2-3-4-3.5-1.5h-4z"
                />
              </svg>
              <span className="text-xs font-medium">{size}</span>
            </button>
          ))}
        </div>

        <p className="text-2xl font-semibold text-gray-800">{product.price}</p>

        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          This is a high-quality product designed for comfort and style. Perfect for your daily wear.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-800 transition w-fit"
          >
            Add to Cart
          </button>

          <button
            onClick={() => addToWishlist(product)}
            className="bg-white text-black px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg border border-gray-400 hover:border-black transition w-fit flex items-center gap-2 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                -1.935 0-3.597 1.126-4.312 2.733
                -.715-1.607-2.377-2.733-4.313-2.733
                C5.1 3.75 3 5.765 3 8.25
                c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            Wishlist
          </button>
        </div>

        <hr className="border-gray-300" />

        {/* Product Details */}
        <div>
          <h1 className="text-xl sm:text-2xl mb-2 font-medium">Product Details</h1>

          <h2 className="text-lg font-medium">Material</h2>
          <p className="text-gray-600 mb-3">{product.Material}</p>

          <h2 className="text-lg font-medium">Fit</h2>
          <p className="text-gray-600 mb-3">{product.Fit}</p>

          <h2 className="text-lg font-medium mb-2">Features</h2>
          <ul className="text-gray-600 space-y-1 text-sm sm:text-base">
            {product.Features.map((line, index) => (
              <li key={index}>• {line}</li>
            ))}
          </ul>
        </div>

        <hr className="border-gray-300" />

        {/* Ratings Section */}
        <div className="ratings">
          <div className="flex items-center gap-2 text-lg sm:text-xl font-medium">
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
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442
                c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285
                5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0
                0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562
                0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1
                .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48
                3.5Z"
              />
            </svg>
            <h1>Ratings</h1>
          </div>

          <h1 className="text-4xl sm:text-5xl mt-3 mb-2 font-semibold">4.2</h1>
          <p className="text-gray-600 text-sm sm:text-base">202 Verified Buyers</p>
        </div>
      </div>
    </div>
  );
};

export default FavDetails;
