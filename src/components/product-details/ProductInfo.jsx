// src/components/product-details/ProductInfo.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/slices/cartSlice";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import { showToast } from "../../store/slices/toastSlice";
import RatingStars from "../product-listing/RatingStars";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const { items: wishItems } = useSelector((state) => state.wishlist);
  const isWishlisted = wishItems.some((i) => i.id === product.id);

  const oldPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  const specs = [
    ["Condition", "Brand new"],
    ["Material", product.material || "Standard"],
    ["Category", product.category],
    ["Stock", `${product.stock} pcs`],
    ["SKU", product.sku],
    ["Warranty", product.warrantyInformation],
  ];

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(showToast({ message: `${product.title} added to cart!`, type: "success" }));
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    dispatch(showToast({ message: `${product.title} added to cart!`, type: "success" }));
    navigate("/cart");
  };

  const handleWishlist = () => {
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
    <div className="flex flex-col">
      <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{product.title}</h1>

      <RatingStars rating={product.rating} count={(product.reviews || []).length} />

      <div className="flex items-baseline gap-3 mt-3 bg-orange-50 border border-orange-100 rounded-lg px-4 py-2.5 w-fit">
        <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
        {oldPrice && <span className="text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</span>}
      </div>

      <div className="mt-4 border border-gray-100 rounded-lg divide-y divide-gray-100 text-sm">
        {specs.map(([label, value]) => (
          <div key={label} className="flex px-4 py-2">
            <span className="w-28 shrink-0 text-gray-400">{label}</span>
            <span className="text-gray-700 capitalize">{value}</span>
          </div>
        ))}
      </div>

      <p className={`lg:hidden text-sm text-gray-500 mt-3 leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
        {product.description}
      </p>
      <button onClick={() => setExpanded(!expanded)} className="lg:hidden text-sm text-primary mt-1 w-fit cursor-pointer">
        {expanded ? "Read less" : "Read more"}
      </button>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 rounded cursor-pointer transition-colors"
        >
          Buy now
        </button>
        <button
          onClick={handleWishlist}
          className={`w-10 h-10 border border-gray-200 rounded flex items-center justify-center cursor-pointer transition-colors ${
            isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          aria-label="Add to wishlist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-2 w-full border border-primary text-primary text-sm font-medium py-2.5 rounded hover:bg-primary/5 cursor-pointer transition-colors"
      >
        Add to cart
      </button>
      <a href="#" className="mt-2 text-xs text-primary hover:underline w-fit">Save for later</a>

      <div className="mt-4 border border-gray-200 rounded-lg p-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded bg-primary text-white flex items-center justify-center font-bold">
            {(product.brand || "G").charAt(0)}
          </div>
          <div>
            <p className="text-xs text-gray-400">Supplier</p>
            <p className="text-sm font-medium text-gray-900">{product.brand || "BrandMart"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <img src="https://flagcdn.com/w20/us.png" alt="" className="w-5 h-3.5 object-cover rounded-sm" />
            {product.meta?.country || "USA"}
          </span>
          <span className="flex items-center gap-1 text-primary font-medium">✓ Verified</span>
          <span>Fast shipping</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;