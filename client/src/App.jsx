import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import Loading from "./components/Loading";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div
      className="text-default min-h-screen text-gray-700 relative overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f0f9ff 0%, #ffffff 45%, #f8fafc 75%, #ecfdf5 100%)",
      }}
    >
      {/* Decorative background blobs */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] blob"
        style={{
          background: "radial-gradient(circle, #0ea5e9, transparent)",
          right: "-150px",
          top: "-150px",
        }}
      ></div>
      <div
        className="fixed bottom-0 left-0 w-[500px] h-[500px] blob"
        style={{
          background: "radial-gradient(circle, #10b981, transparent)",
          left: "-100px",
          bottom: "-100px",
        }}
      ></div>
      <div
        className="fixed top-1/2 left-1/2 w-[400px] h-[400px] blob"
        style={{
          background: "radial-gradient(circle, #38bdf8, transparent)",
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}

      <Toaster />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
