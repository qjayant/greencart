import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart, cartItems } =
    useAppContext();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category && item._id !== id,
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, id]);

  useEffect(() => {
    setThumbnail(product?.image[0] ?? null);
    setQuantity(cartItems[product?._id] || 1);
  }, [product]);

  const discountPercent = product
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    product && (
      <div className="mt-10 animate-fade-in relative">
        {/* Background decorative blob */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #0ea5e9, transparent)",
          }}
        />

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-sm mb-8 flex-wrap"
          style={{ color: "rgba(15,23,42,0.45)" }}
        >
          <Link to={"/"} className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to={"/products"}
            className="hover:text-primary transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products/${product.category.toLowerCase()}`}
            className="hover:text-primary transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-primary font-medium truncate max-w-[160px] drop-shadow-sm">
            {product.name}
          </span>
        </nav>

        <div
          className="flex flex-col md:flex-row gap-10 lg:gap-14 bg-white/40 p-5 md:p-8 rounded-3xl border border-white/60 shadow-xl shadow-sky-100/40 relative z-10"
          style={{ backdropFilter: "blur(20px)" }}
        >
          {/* Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 w-16 h-16 flex items-center justify-center p-1.5 ${
                    thumbnail === image
                      ? "ring-2 ring-primary ring-offset-2 bg-white"
                      : "border border-slate-200/60 bg-white/50 hover:border-primary/40 hover:bg-white"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-contain w-full h-full drop-shadow-sm"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div
              className="relative rounded-3xl overflow-hidden w-64 md:w-80 h-64 md:h-80 flex items-center justify-center p-6 border border-white/80 shadow-inner group"
              style={{
                background: "linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)",
              }}
            >
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)",
                }}
              />
              <img
                src={thumbnail}
                alt={product.name}
                className="max-w-full max-h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 max-w-xl flex flex-col justify-center">
            {/* Category + Stock */}
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.15em] text-white px-3 py-1 rounded-full shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                }}
              >
                {product.category}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${product.inStock ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-500 border-rose-100"}`}
              >
                {product.inStock ? "● In Stock" : "○ Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-[1.15] mb-2 tracking-tight">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex text-amber-400">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-4 h-4 ${i < 4 ? "text-amber-400" : "text-slate-200"}`}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
              <p className="text-xs font-medium text-slate-400 ml-1 hover:text-primary transition-colors cursor-pointer">
                (24 verified reviews)
              </p>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-end gap-3 bg-white/60 p-4 rounded-2xl border border-white shadow-sm inline-flex w-fit">
              <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500 drop-shadow-sm">
                {currency}
                {product.offerPrice}
              </p>
              <div className="flex flex-col justify-end pb-1">
                {discountPercent > 0 && (
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-slate-400 line-through text-sm font-medium">
                      {currency}
                      {product.price}
                    </p>
                    <span
                      className="text-[10px] font-bold text-white px-2 py-0.5 rounded-md shadow-sm"
                      style={{ background: "#ef4444" }}
                    >
                      Save {discountPercent}%
                    </span>
                  </div>
                )}
                <p className="text-xs font-medium text-slate-400">
                  Inclusive of all taxes
                </p>
              </div>
            </div>

            <div className="my-6 h-px w-full bg-gradient-to-r from-slate-200/80 via-slate-100 to-transparent" />

            {/* Description */}
            <div>
              <p className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">
                Product Highlights
              </p>
              <ul className="space-y-2">
                {product.description.map((desc, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0 shadow-sm shadow-primary/40" />
                    {desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-6 h-px w-full bg-gradient-to-r from-slate-200/80 via-slate-100 to-transparent" />

            {/* Quantity + Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">
                  Quantity
                </p>
                <div className="flex items-center bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm h-12 w-32">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex-1 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors text-lg font-medium"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex-1 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors text-lg font-medium"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-1 flex gap-3 h-12">
                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) addToCart(product._id);
                  }}
                  disabled={!product.inStock}
                  className="flex-1 h-full flex items-center justify-center gap-2 cursor-pointer font-bold text-primary bg-sky-50 border border-primary/20 hover:bg-sky-100 hover:border-primary/40 transition-all rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) addToCart(product._id);
                    navigate("/cart");
                  }}
                  disabled={!product.inStock}
                  className="flex-1 h-full flex items-center justify-center gap-2 cursor-pointer font-bold text-white transition-all rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  style={{
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="flex flex-col items-center mt-28">
          <div className="text-center mb-10 w-full flex flex-col justify-center items-center">
            <div className="ocean-divider mb-3 w-16" />
            <p className="text-2xl md:text-3xl font-bold text-slate-800">
              <span className="gradient-text">Related</span> Products
            </p>
            <p className="text-sm text-slate-400 mt-1">
              You might also like these
            </p>
          </div>
          {relatedProducts.filter((p) => p.inStock).length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:grid-cols-5 w-full">
              {relatedProducts
                .filter((p) => p.inStock)
                .map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          ) : (
            <div className="py-12 px-6 rounded-3xl bg-white/50 border border-white text-center w-full max-w-xl">
              <p className="text-slate-400 font-medium">
                No related products found.
              </p>
            </div>
          )}

          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="mt-14 cursor-pointer font-bold px-8 py-3 rounded-full text-slate-600 bg-white border border-slate-200/80 hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-sky-100/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore all products
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
