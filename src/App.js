// src/App.js
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";

import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import KidsPage from "./pages/KidsPage";
import ProductPage from "./pages/ProductPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import CapsuleWardrobePage from "./pages/blog/CapsuleWardrobePage";
import CareFabricsPage from "./pages/blog/CareFabricsPage";
import FitCheatSheetPage from "./pages/blog/FitCheatSheetPage";

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import AdminMessagesPage from "./pages/AdminMessagesPage";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <Routes>
      {/* Blog single pages (pretty slugs) */}
      <Route path="/blog/capsule-wardrobe-guide" element={<CapsuleWardrobePage />} />
      <Route path="/blog/care-fabrics" element={<CareFabricsPage />} />
      <Route path="/blog/fit-cheat-sheet" element={<FitCheatSheetPage />} />

      {/* Main */}
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Categories & product */}
      <Route path="/men" element={<MenPage />} />
      <Route path="/women" element={<WomenPage />} />
      <Route path="/kids" element={<KidsPage />} />
      <Route path="/product/:id" element={<ProductPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Cart & orders */}
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/checkout"
        element={
          <RequireAuth>
            <CheckoutPage />
          </RequireAuth>
        }
      />
      <Route
        path="/orders"
        element={
          <RequireAuth>
            <OrdersPage />
          </RequireAuth>
        }
      />
      <Route path="/order-success/:id" element={<OrderSuccessPage />} />

      {/* Admin */}
      <Route
        path="/admin/messages"
        element={
          <RequireAuth>
            <AdminMessagesPage />
          </RequireAuth>
        }
      />

      {/* 404 */}
      <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
    </Routes>
  );
}
