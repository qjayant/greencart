import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-sky-200/40">
      <img
        src={assets.main_banner_bg}
        alt="Fresh groceries banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="Fresh groceries banner"
        className="w-full md:hidden"
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/30 via-transparent to-transparent hidden md:block rounded-3xl" />

      {/* Floating decorative shapes */}
      <div className="absolute top-6 right-24 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl hidden md:block animate-float" />
      <div
        className="absolute bottom-10 right-16 w-12 h-12 bg-sky-400/30 rounded-full blur-lg hidden md:block"
        style={{ animationDelay: "1s" }}
      />

      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-20 md:pb-0 px-4 md:pl-14 lg:pl-20">
        {/* Pill label */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 animate-slide-up"
          style={{
            animationDelay: "0.05s",
            opacity: 0,
            animationFillMode: "forwards",
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.4)",
            color: "white",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          Fresh · Organic · Fast Delivery
        </div>

        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-[1.12] text-gray-800 md:text-white animate-slide-up"
          style={{
            animationDelay: "0.15s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          Freshness You Can{" "}
          <span
            className="md:text-transparent"
            style={{
              WebkitTextStroke: "0px",
              background: "linear-gradient(to right, #34d399, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trust,
          </span>{" "}
          Savings You'll Love!
        </h1>

        <p
          className="mt-3 text-sm md:text-base text-gray-700/80 md:text-white/80 text-center md:text-left max-w-xs hidden md:block animate-slide-up"
          style={{
            animationDelay: "0.28s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          Farm-fresh groceries delivered to your door in minutes.
        </p>

        <div
          className="flex items-center mt-6 gap-3 font-medium animate-slide-up"
          style={{
            animationDelay: "0.42s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-7 md:px-9 py-3 rounded-full text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 transform text-sm md:text-base"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
              boxShadow: "0 6px 20px rgba(14,165,233,0.4)",
            }}
          >
            Shop Now
            <img
              className="transition-transform group-hover:translate-x-1 brightness-[10]"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-7 py-3 cursor-pointer rounded-full text-white/90 hover:text-white transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            Explore Deals
            <img
              className="transition-transform group-hover:translate-x-1 brightness-[10]"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="hidden md:flex items-center gap-6 mt-8 animate-slide-up"
          style={{
            animationDelay: "0.56s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {[
            ["10K+", "Happy Customers"],
            ["500+", "Products"],
            ["30 min", "Delivery"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="text-lg font-bold text-white">{num}</p>
              <p className="text-xs text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
