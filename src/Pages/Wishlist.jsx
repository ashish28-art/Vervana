import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist ❤️</h1>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
          {wishlistItems.map((item) => (
            <div key={item.id} className="w-64 h-80 p-4 shadow rounded-lg border flex flex-col justify-between items-center">
              <img src={item.img} alt={item.name} className="h-40 object-cover mb-3 rounded" />
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.price}</p>
              <button 
                onClick={() => removeFromWishlist(item.id)} 
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
