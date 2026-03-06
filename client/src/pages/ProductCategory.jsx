import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category,
  );
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category,
  );
  const inStockProducts = filteredProducts.filter((p) => p.inStock);

  return (
    <div className="mt-16 animate-fade-in">
      {searchCategory && (
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: searchCategory.bgColor }}
          >
            <img
              src={searchCategory.image}
              alt={searchCategory.text}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-semibold text-gray-800">
              {searchCategory.text}
            </p>
            <p className="text-sm text-gray-400 mt-0.5">
              {inStockProducts.length} product
              {inStockProducts.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>
      )}
      <div className="w-full h-0.5 bg-gray-100 rounded-full mb-6"></div>

      {inStockProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {inStockProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[55vh] text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-10 h-10 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-600">
            No products in this category
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Check back soon for new arrivals!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
