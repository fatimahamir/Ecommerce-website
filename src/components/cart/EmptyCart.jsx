
import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    <h3 className="text-lg font-semibold text-gray-900 mt-3">Your cart is empty</h3>
    <p className="text-sm text-gray-500 mt-1">Products added in your cart will e shown here.</p>
    <Link to="/products" className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2.5 rounded cursor-pointer transition-colors">
      Browse products
    </Link>
  </div>
);

export default EmptyCart;