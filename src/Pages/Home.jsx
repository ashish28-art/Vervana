
import main from "../assets/main.jpg";
import Footer from "./ Footer.jsx";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";


const categories = [
  {
    title: "MEN",
    image:
      "https://triprindia.com/cdn/shop/files/TGYRNOS-PLAIND1651.jpg?v=1741861583",
  },
  {
    title: "WOMEN",
    image:
      "https://thehouseofrare.com/cdn/shop/files/HENARES-OFF-WHITE5559.jpg?v=1743501047",
  },
  
];

const Home = () => {
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products/category/mens-shirts").then(res => res.json()),
      fetch("https://dummyjson.com/products/category/womens-dresses").then(res => res.json()),
      fetch("https://dummyjson.com/products/category/tops").then(res => res.json()),
    ])
      .then((results) => {
        const clothesOnly = results.flatMap(r => r.products);
        setFavourites(clothesOnly);
      })
      .catch((err) => console.error(err));
  }, []);
  


  const navigate = useNavigate();
  const categoryRef = useRef(null);

  const handleScrollToCategories = useCallback(() => {
    categoryRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  
  const handleCategory = useCallback((title) => {
    if (["MEN"].includes(title)) {
      navigate("/men");
    } else {
      navigate("/women")
    }
  }, [navigate]);
  return (
    <>
      {/* HERO SECTION */}
      <div className="main relative w-full h-screen">
        <img src={main} alt="Main banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30 text-center px-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-4 font-poppins"
          >
            Shop the best deals
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-lg md:text-2xl mb-6 font-poppins"
          >
            Your one-stop shop for style and comfort
          </motion.p>

          <motion.button
            onClick={handleScrollToCategories}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-lg font-semibold font-inter"
          >
            Shop Now
          </motion.button>
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <section ref={categoryRef} className="category w-full py-10 ">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center font-poppins font-normal text-3xl"
        >
          Shop by 
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-6 mt-8 px-4">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              onClick={() => handleCategory(category.title)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="item w-[160px] sm:w-[190px] md:w-[250px] rounded-lg cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-56 object-cover transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <h2 className="mt-4 font-poppins text-center text-gray-800 text-lg font-semibold">
                {category.title}
              </h2>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAVOURITES SECTION */}
      <section className="favourites mt-7 py-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="font-poppins font-medium text-3xl text-center mb-3"
        >
          Vervana Favourites
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="font-poppins mb-10 text-center text-gray-600"
        >
          Beautifully Functional. Purposefully Designed. Consciously Crafted.
        </motion.p>

        <div className="Favourites w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 px-4">
            {favourites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="fav flex-shrink-0 w-[170px] sm:w-[190px] md:w-[260px] rounded-lg overflow-hidden group"
              >
                <Link to={`/product/${item.id}`}
                  state={{ source: "dummyjson" }}>
                  <div className="w-full h-56 rounded-lg overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                    />

                  </div>
                </Link>

                <p className="mt-3 text-center font-poppins font-medium">
                  {item.title}
                </p>
                <p className="text-center text-gray-600 text-sm">
                  ${item.price}
                </p>
              </motion.div>

            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
