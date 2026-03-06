import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();
  const location = useLocation();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) navigate("/products");
  }, [searchQuery]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative pb-0.5 font-medium transition-colors duration-200 ${
      isActive ? "text-primary" : "text-slate-600 hover:text-primary"
    } after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-all after:duration-200 ${
      isActive
        ? "after:w-full after:bg-gradient-to-r after:from-primary after:to-emerald-500"
        : "after:w-0 hover:after:w-full after:bg-primary"
    }`;

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3.5 transition-all duration-300 ${
        scrolled
          ? "shadow-lg shadow-sky-100/50 border-b border-white/60"
          : "border-b border-white/40"
      }`}
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.88)"
          : "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="GreenCart logo" />
      </NavLink>

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={navLinkClass}>
          All Products
        </NavLink>
        <NavLink to="/" className={navLinkClass}>
          Contact
        </NavLink>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 px-3 py-2 rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-sm hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white transition-all duration-200 shadow-sm">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 opacity-40"
          />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="w-44 bg-transparent outline-none placeholder-slate-400 text-sm"
            type="text"
            placeholder="Search products..."
          />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer group"
        >
          <div className="p-2 rounded-full bg-slate-100/80 hover:bg-primary/10 transition-colors">
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-5 group-hover:scale-110 transition-transform"
            />
          </div>
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] text-white bg-gradient-to-br from-primary to-emerald-500 w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold animate-fade-in shadow-sm">
              {getCartCount()}
            </span>
          )}
        </div>

        {/* Auth */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 transform duration-200"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
              boxShadow: "0 4px 14px rgba(14,165,233,0.35)",
            }}
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={assets.profile_icon}
                className="w-9 rounded-full border-2 border-transparent group-hover:border-primary transition-all ring-2 ring-primary/20"
                alt="profile"
              />
            </div>
            <div
              className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute top-12 right-0 shadow-2xl shadow-sky-100/50 border border-white/80 py-2 w-40 rounded-2xl text-sm z-40 transition-all duration-200 transform group-hover:translate-y-0 translate-y-1"
              style={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs text-slate-400 font-medium">
                  Signed in as
                </p>
                <p className="text-sm text-slate-700 font-semibold truncate">
                  {user.name}
                </p>
              </div>
              <ul className="mt-1">
                <li
                  onClick={() => navigate("/my-orders")}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-primary/8 cursor-pointer text-slate-600 hover:text-primary rounded-lg mx-1 transition-colors text-sm"
                >
                  📦 My Orders
                </li>
                <li
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-red-50 cursor-pointer text-slate-600 hover:text-red-500 rounded-lg mx-1 transition-colors text-sm"
                >
                  🚪 Logout
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Right */}
      <div className="flex items-center gap-4 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <div className="p-1.5 rounded-full bg-slate-100/80">
            <img src={assets.nav_cart_icon} alt="cart" className="w-5" />
          </div>
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] text-white bg-gradient-to-br from-primary to-emerald-500 w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold">
              {getCartCount()}
            </span>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="p-1.5 rounded-lg bg-slate-100/80 hover:bg-primary/10 transition-colors"
        >
          <img src={assets.menu_icon} alt="menu" className="w-5" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full border-t border-white/60 shadow-xl shadow-sky-100/30 flex flex-col gap-1 px-5 py-4 text-sm md:hidden transition-all duration-300 origin-top ${
          open
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
        style={{
          background: "rgba(255,255,255,0.93)",
          backdropFilter: "blur(20px)",
          transformOrigin: "top",
        }}
      >
        {[
          { to: "/", label: "🏠 Home" },
          { to: "/products", label: "🛍️ All Products" },
          { to: "/", label: "📞 Contact" },
        ].map(({ to, label }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `py-2.5 px-3 rounded-xl font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50"}`
            }
          >
            {label}
          </NavLink>
        ))}

        {user && (
          <NavLink
            to="/my-orders"
            className={({ isActive }) =>
              `py-2.5 px-3 rounded-xl font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50"}`
            }
          >
            📦 My Orders
          </NavLink>
        )}

        {/* Mobile Search */}
        <div className="flex items-center gap-2 border border-slate-200 bg-white/80 px-3 py-2.5 rounded-xl mt-1">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-4 h-4 opacity-40"
          />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="flex-1 bg-transparent outline-none placeholder-slate-400 text-sm"
            type="text"
            placeholder="Search products..."
          />
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100">
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="w-full cursor-pointer px-6 py-2.5 text-white rounded-full text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
              }}
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="w-full cursor-pointer px-6 py-2.5 border border-red-200 hover:bg-red-50 transition text-red-500 rounded-full text-sm font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
