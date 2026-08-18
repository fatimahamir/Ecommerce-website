// src/components/product-listing/ProductListItem.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import RatingStars from "./RatingStars";

const ProductListItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: wishItems } = useSelector((state) => state.wishlist);
  const isWishlisted = wishItems.some((i) => i.id === product.id);

  const oldPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow relative cursor-pointer"
    >
      <img src={product.thumbnail} alt={product.title} className="w-28 h-30 sm:w-65 sm:h-55 object-contain rounded bg-gray-50" />

      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base font-medium text-gray-900 line-clamp-1 pr-8">{product.title}</p>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {oldPrice && <span className="text-xs text-gray-400 line-through">${oldPrice.toFixed(2)}</span>}
        </div>

        <RatingStars rating={product.rating} count={(product.reviews || []).length} />

        <p className="text-xs text-green-600 font-medium mt-1.5">Free Shipping</p>
        <p className="hidden sm:block text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        <span className="inline-block text-xs text-primary font-medium mt-2">More details</span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleWishlist(product));
        }}
        className={`absolute top-3 right-3 z-10 cursor-pointer ${isWishlisted ? "text-red-500" : "text-gray-300 hover:text-red-500"}`}
        aria-label="Add to wishlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
};

export default ProductListItem;