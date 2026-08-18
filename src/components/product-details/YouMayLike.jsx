// src/components/product-details/YouMayLike.jsx
import React from "react";

const YouMayLike = ({ products }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 mb-3">You may like</h3>
    <div className="flex flex-col gap-3">
      {products.map((p) => (
        <div key={p.id} className="flex gap-2.5 border border-gray-100 rounded-lg p-2 hover:shadow-md transition-shadow cursor-pointer">
          <img src={p.thumbnail} alt={p.title} className="w-20 h-20 object-contain shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-700 line-clamp-2">{p.title}</p>
            <p className="text-xs font-bold text-gray-900 mt-0.5">${p.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default YouMayLike;