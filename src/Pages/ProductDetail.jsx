import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { WishlistContext } from '../Context/WishlistContext';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { SearchContext } from '../Context/Searchcontext';
import Skeleton from '../Componenets/Skeleton';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { wishlistItems, addToWishlist } = useContext(WishlistContext);
  const { text } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products/category/womens-dresses").then(res => res.json()),
      fetch("https://dummyjson.com/products/category/womens-shoes").then(res => res.json()),
      fetch("https://dummyjson.com/products/category/womens-watches").then(res => res.json()),
      fetch("https://dummyjson.com/products/category/tops").then(res => res.json()),
    ])
      .then((results) => {
        const allWomenProducts = results.flatMap(r => r.products);
        setItems(allWomenProducts);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const safeSearch = useMemo(() => text?.toLowerCase() || "", [text]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category.includes(selectedCategory.toLowerCase());

      const matchesSearch = item?.title?.toLowerCase().includes(safeSearch);

      if (safeSearch !== "") {
        return matchesSearch;
      }

      return matchesCategory;
    });
  }, [items, selectedCategory, safeSearch]);

  const sortedItems = useMemo(() => {
    const data = [...filteredItems];
    if (sort == "lowToHigh") {
      data.sort((a, b) => a.price - b.price);
    }
    if (sort == "highToLow") {
      data.sort((a, b) => b.price - a.price);
    }
    return data;
  }, [filteredItems, sort]);

  const handleSort = (option) => {
    setSort(option);
    setFilterOpen(false);
  };

  const handleWishlistClick = useCallback((e, item) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(item);
  }, [addToWishlist]);

  return (
    <div className="mt-6 flex justify-center sticky top-24">


      {/* ---------------- Right Column (Products) ---------------- */}
      <div className="w-100 p-6">
        <motion.h1
          className="heading font-poppins text-2xl mb-6 pl-20"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          Women’s Collection - New Arrivals
        </motion.h1>

        <div className="flex items-center justify-between mb-6 pl-20">
          {/* Left: Category Buttons */}
          <div className="flex flex-wrap gap-3">
            {["All", "Dresses", "Shoes", "Watches", "Tops"].map((category, idx) => (
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
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Right: Filter Button */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(prev => !prev)}
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              Filter by ▾
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                <button
                  onClick={() => handleSort("lowToHigh")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Price: Low to High
                </button>

                <button
                  onClick={() => handleSort("highToLow")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Price: High to Low
                </button>
              </div>
            )}
          </div>
        </div>


        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-20">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} />
            ))
          ) : (
            sortedItems.map((item, idx) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                state={{ source: "dummyjson" }}
              >
                <motion.div
                  className="card w-[250px] h-[380px] rounded-2xl shadow-md p-3 flex flex-col transition-transform duration-300 hover:scale-105 cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                >
                  <div className="w-full h-56 rounded-lg overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1 mt-3">
                    <h3 className="font-medium text-lg truncate">{item.title}</h3>
                    <p className="text-gray-700 font-semibold">${item.price}</p>

                    <div className="mt-2 flex justify-between gap-2">
                      <button
                        onClick={(e) => handleWishlistClick(e, item)}
                        className="px-3 py-1 rounded-md text-sm transition-transform duration-200 hover:scale-125"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={
                            wishlistItems.some((i) => i.id === item.id)
                              ? "red"
                              : "none"
                          }
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="red"
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
              </Link>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Products;
