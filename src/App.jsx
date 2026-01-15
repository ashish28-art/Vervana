import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext";
import Header from "./Pages/Header";
import { AuthProvider } from "./Context/AuthContext";
import {SearchProvider} from './Context/Searchcontext'

// Lazy load all route components for code splitting
const Home = lazy(() => import('./Pages/Home'));
const Products = lazy(() => import("./Pages/Men"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const CartPage = lazy(() => import("./Pages/CartPage"));
const WishlistPage = lazy(() => import("./Pages/Wishlist"));
const Details = lazy(() => import("./Pages/Details"));
const Details1 = lazy(() => import('./Pages/Details1'));
const Profile = lazy(() => import("./Pages/Profile"));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const OrderPage = lazy(() => import("./Pages/OrderPage"));
const Payment = lazy(() => import("./Pages/Payment"));
const Confirmation = lazy(() => import("./Pages/Confirmation"));
const FavDetails = lazy(() => import("./FavDetails"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);



function App() {
  return (
    <SearchProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <Suspense fallback={<LoadingFallback />}>
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
            </Suspense>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </SearchProvider>
  );
}

export default App;
