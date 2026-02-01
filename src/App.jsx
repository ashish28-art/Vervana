import { Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./Context/WishlistContext";
import Header from "./Pages/Header";
import Home from './Pages/Home';
import Products from "./Pages/Men";
import ProductDetail from "./Pages/ProductDetail";
import CartPage from "./Pages/CartPage";
import WishlistPage from "./Pages/Wishlist";
import Details from "./Pages/Details";
import Details1 from './Pages/Details1'
import Profile from "./Pages/Profile";
import { AuthProvider } from "./Context/AuthContext";
import { SearchProvider } from "./Context/Searchcontext";
import Dashboard from './Pages/Dashboard'
import OrderPage from "./Pages/OrderPage";
import Payment from "./Pages/Payment";
import Confirmation from "./Pages/Confirmation";
import FavDetails from "./FavDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
  <SearchProvider>
      <AuthProvider>
          <WishlistProvider>
            <Toaster
            
            position="top-right"
            toastOptions={{
              className:"mt-11",
              duration: 2000,
            }}
          />

          
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/men" element={<Products />} />
              <Route path="/women" element={<ProductDetail />} />
              <Route path="/product/:id" element={<Details />} />
              <Route path="/products/:id" element={<Details1 />} />
              <Route path="/fav/:id" element={<FavDetails />} />
              <Route path="/details1" element={<Details1 />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orderpage" element={<OrderPage />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </WishlistProvider>
      </AuthProvider>
      </SearchProvider>
   
  );
}

export default App;
