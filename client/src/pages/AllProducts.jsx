import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const query = (searchQuery || "").toLowerCase();
    if (query.length > 0) {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query),
        ),
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  const inStockProducts = filteredProducts.filter((p) => p.inStock);

  return (
    <div className="mt-16 flex flex-col animate-fade-in relative">
      {/* Decorative bg blobs */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="ocean-divider mb-3 w-16" />
          <p className="text-3xl md:text-4xl font-bold text-slate-800">
            All <span className="gradient-text">Products</span>
          </p>
          <p className="text-sm text-slate-500 mt-2 max-w-md">
            Discover our full range of farm-fresh, high-quality groceries and
            everyday essentials.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl border border-white text-sm font-medium text-slate-600 shadow-sm self-start md:self-auto">
          {searchQuery ? (
            <p>
              Found{" "}
              <span className="text-primary font-bold">
                {inStockProducts.length}
              </span>{" "}
              results for "<span className="text-slate-800">{searchQuery}</span>
              "
            </p>
          ) : (
            <p>
              Showing{" "}
              <span className="text-primary font-bold">
                {inStockProducts.length}
              </span>{" "}
              products
            </p>
          )}
        </div>
      </div>

      {inStockProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:grid-cols-5 pb-10">
          {inStockProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center glass-card rounded-3xl mt-4">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner"
            style={{
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            }}
          >
            <span className="text-4xl">🔍</span>
          </div>
          <p className="text-2xl font-bold text-slate-700 mb-2">
            No products found
          </p>
          <p className="text-slate-500 max-w-sm">
            {searchQuery
              ? `We couldn't find anything matching "${searchQuery}". Try a different spelling or broader term.`
              : "Check back later for new arrivals. We're restocking soon!"}
          </p>
          {searchQuery && (
            <button
              onClick={() => (window.location.href = "/products")}
              className="mt-6 px-6 py-2 rounded-full font-semibold text-primary bg-sky-50 border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
