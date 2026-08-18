// src/components/product-listing/ProductGridCard.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/slices/cartSlice";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import { showToast } from "../../store/slices/toastSlice";
import RatingStars from "./RatingStars";

const ProductGridCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: wishItems } = useSelector((state) => state.wishlist);
  const isWishlisted = wishItems.some((i) => i.id === product.id);

  const oldPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(
      showToast({
        message: `${product.title} added to cart!`,
        type: "success",
      })
    );
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    const isAdding = !isWishlisted;
    dispatch(
      showToast({
        message: isAdding ? "Added to wishlist ❤️" : "Removed from wishlist",
        type: isAdding ? "success" : "info",
      })
    );
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer relative group"
    >
      {product.discountPercentage > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}

      <button
        onClick={handleWishlist}
        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors z-10 ${
          isWishlisted
            ? "bg-red-50 text-red-500"
            : "bg-white/80 text-gray-400 hover:text-red-500"
        }`}
        aria-label="Toggle wishlist"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill={isWishlisted ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-contain mb-3"
      />

      <p className="text-xs text-gray-600 line-clamp-2 mb-2 min-h-[2rem]">
        {product.title}
      </p>

      <RatingStars rating={product.rating} />

      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-sm font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        {oldPrice && (
          <span className="text-xs text-gray-400 line-through">
            ${oldPrice.toFixed(2)}
          </span>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full mt-3 bg-primary hover:bg-primary-dark text-white text-xs font-medium py-2 rounded cursor-pointer transition-colors"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductGridCard;