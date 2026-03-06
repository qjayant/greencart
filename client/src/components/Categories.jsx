import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="ocean-divider mb-3 w-16" />
          <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
            Shop by <span className="gradient-text">Category</span>
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Find what you love across all sections
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer relative overflow-hidden rounded-2xl card-hover"
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <div
              className="py-5 px-3 flex flex-col justify-center items-center gap-3 border border-white/80 rounded-2xl transition-all duration-300 group-hover:border-primary/30"
              style={{
                backgroundColor: category.bgColor,
                backdropFilter: "blur(4px)",
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(16,185,129,0.06))",
                }}
              />

              <div className="relative w-16 h-16 flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.text}
                  className="group-hover:scale-115 transition-transform duration-300 max-w-full max-h-full object-contain drop-shadow-sm"
                />
              </div>
              <p className="relative text-xs font-bold text-slate-700 text-center leading-tight uppercase tracking-wide">
                {category.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
