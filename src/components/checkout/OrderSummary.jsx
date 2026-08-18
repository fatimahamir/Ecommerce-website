
import React from "react";

const OrderSummary = ({ items }) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = 10;
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Order summary</h3>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-contain border border-gray-100 rounded bg-white shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-800 line-clamp-1">{item.title}</p>
              <p className="text-xs text-gray-400">Qty: {item.qty}</p>
            </div>
            <p className="text-xs font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm border-t border-gray-100 mt-4 pt-3">
        <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-gray-500"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
        <div className="flex justify-between text-gray-500"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
        <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-2">
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;