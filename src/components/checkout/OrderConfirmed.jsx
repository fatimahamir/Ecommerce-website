
import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmed = ({ orderId }) => (
  <div className="max-w-md mx-auto my-10 bg-white border border-gray-200 rounded-lg p-8 text-center">
    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-xl font-semibold text-gray-900 mt-4">Order confirmed!</h2>
    <p className="text-sm text-gray-500 mt-2">
      Thank you for your order. Your order number is{" "}
      <span className="font-bold text-gray-900">{orderId}</span>.
    </p>
    <p className="text-xs text-gray-400 mt-1">(Demo order — no real payment was made)</p>
    <Link
      to="/products"
      className="inline-block mt-5 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-6 py-2.5 rounded cursor-pointer transition-colors"
    >
      Continue shopping
    </Link>
  </div>
);

export default OrderConfirmed;