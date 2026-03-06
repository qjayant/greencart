import React from "react";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, updateCartItem, getCartItemCount, navigate } =
    useAppContext();

  const currentQty = getCartItemCount ? getCartItemCount(product._id) : 0;
  const discountPercent =
    product.price && product.offerPrice
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  const handleCardClick = () => {
    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
    scrollTo(0, 0);
  };

  return (
    <div
      className="relative group cursor-pointer glass-card rounded-2xl overflow-hidden card-hover"
      onClick={handleCardClick}
    >
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <span
          className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #10b981)" }}
        >
          -{discountPercent}%
        </span>
      )}

      {/* Image tile */}
      <div className="relative w-full pt-[80%] bg-gradient-to-br from-sky-50 to-emerald-50/40 overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-108 transition-transform duration-400"
        />
        {/* Shimmer overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(14,165,233,0.04) 0%, rgba(16,185,129,0.04) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-0.5">
          {product.category}
        </p>
        <p className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 mb-2">
          {product.name}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-2">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-3 h-3 ${i < 4 ? "text-amber-400" : "text-slate-200"}`}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          <span className="text-[10px] text-slate-400 ml-1">(4)</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-1 gap-2">
          <div>
            <p className="font-bold text-primary text-base leading-none">
              {currency}
              {product.offerPrice}
            </p>
            {product.price !== product.offerPrice && (
              <p className="text-slate-400 line-through text-[11px] mt-0.5">
                {currency}
                {product.price}
              </p>
            )}
          </div>

          {currentQty === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product._id);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/30 text-primary bg-primary/5 hover:bg-gradient-to-r hover:from-primary hover:to-emerald-500 hover:text-white hover:border-transparent transition-all duration-200 hover:shadow-md hover:shadow-sky-200/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-3.5 h-3.5"
                strokeWidth={2.5}
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Add
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center rounded-full overflow-hidden border border-primary/30 shadow-inner"
              style={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
              }}
            >
              <button
                onClick={() => updateCartItem(product._id, currentQty - 1)}
                className="w-7 h-7 text-white text-sm font-bold hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="w-7 h-7 flex items-center justify-center text-xs font-bold text-white bg-white/15">
                {currentQty}
              </span>
              <button
                onClick={() => updateCartItem(product._id, currentQty + 1)}
                className="w-7 h-7 text-white text-sm font-bold hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
