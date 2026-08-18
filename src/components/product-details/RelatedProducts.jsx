// src/components/product-details/RelatedProducts.jsx
import React from "react";

const RelatedProducts = ({ products, title = "Related products" }) => (
  <section className="bg-white border border-gray-200 rounded-lg p-4">
    <h3 className="text-base font-semibold text-gray-900 mb-3">{title}</h3>
    <div className="flex lg:grid lg:grid-cols-6 gap-3 overflow-x-auto scrollbar-hide pb-1 lg:pb-0">
      {products.slice(0, 6).map((p) => (
        <div key={p.id} className="w-36 lg:w-auto shrink-0 border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
          <img src={p.thumbnail} alt={p.title} className="w-full h-24 lg:h-34 object-contain mb-2" />
          <p className="text-xs text-gray-700 line-clamp-2">{p.title}</p>
          <p className="text-sm font-bold text-gray-900 mt-1">${p.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  </section>
);

export default RelatedProducts;