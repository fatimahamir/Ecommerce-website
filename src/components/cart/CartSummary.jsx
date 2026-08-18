// src/components/cart/CartSummary.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ items }) => {
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = 10;
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <p className="text-sm text-gray-500 mb-2">Have a coupon?</p>
      <div className="flex gap-2 mb-4">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
        />
        <button className="text-sm font-medium text-primary cursor-pointer hover:underline">Apply</button>
      </div>

      <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
        <div className="flex justify-between text-gray-500">
          <span>Items ({itemCount})</span><span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span><span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax</span><span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-2">
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 rounded cursor-pointer transition-colors"
      >
        Checkout ({itemCount} items)
      </button>

      <div className="flex justify-center gap-2 mt-3 text-[10px] text-gray-400">
        <span className="border border-gray-200 rounded px-1.5 py-0.5">VISA</span>
        <span className="border border-gray-200 rounded px-1.5 py-0.5">MasterCard</span>
        <span className="border border-gray-200 rounded px-1.5 py-0.5">PayPal</span>
      </div>
    </div>
  );
};

export default CartSummary;