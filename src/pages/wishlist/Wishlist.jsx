// src/pages/wishlist/Wishlist.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../store/slices/wishlistSlice";
import { addToCart } from "../../store/slices/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  const moveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <div className="max-w-[1340px] mx-auto px-4 mt-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-900">My wishlist ({items.length})</h2>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mt-3">Your wishlist is empty</h3>
          <p className="text-sm text-gray-500 mt-1">Clickr heart ❤️ icon  — to save Products in Wishlist.</p>
          <Link
            to="/products"
            className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2.5 rounded cursor-pointer transition-colors"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col">
              <Link to={`/product/${item.id}`}>
                <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-contain mb-2" />
                <p className="text-xs text-gray-700 line-clamp-2">{item.title}</p>
                <p className="text-sm font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
              </Link>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => moveToCart(item)}
                  className="flex-1 text-xs font-medium text-primary border border-primary/20 rounded py-1.5 hover:bg-primary/5 cursor-pointer transition-colors"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="flex-1 text-xs font-medium text-red-500 border border-red-200 rounded py-1.5 hover:bg-red-50 cursor-pointer transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;