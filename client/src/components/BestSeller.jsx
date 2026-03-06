import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products } = useAppContext();
  const inStockProducts = products.filter((p) => p.inStock).slice(0, 5);

  return (
    <div className="mt-24 relative">
      {/* Section background accent */}
      <div
        className="absolute -inset-x-8 -top-8 -bottom-8 rounded-3xl opacity-40 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #e0f2fe 0%, #ecfdf5 100%)",
        }}
      />

      <div className="relative flex items-end justify-between mb-8">
        <div>
          <div className="ocean-divider mb-3 w-16" />
          <p className="text-2xl md:text-3xl font-bold text-slate-800">
            Best <span className="gradient-text">Sellers</span>
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Top picks loved by our customers
          </p>
        </div>
        <Link
          to="/products"
          className="group hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dull transition-colors px-4 py-2 rounded-full border border-primary/30 hover:border-primary hover:bg-primary/5"
          onClick={() => scrollTo(0, 0)}
        >
          View all
          <span className="group-hover:translate-x-0.5 transition-transform inline-block">
            →
          </span>
        </Link>
      </div>

      {inStockProducts.length === 0 ? (
        <div className="relative flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-slate-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <p className="text-base">No products available yet</p>
        </div>
      ) : (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5 lg:grid-cols-5">
          {inStockProducts.map((product, index) => (
            <ProductCard key={product._id || index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
