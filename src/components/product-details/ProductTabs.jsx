// src/components/product-details/ProductTabs.jsx
import React, { useState } from "react";

const tabs = ["Description", "Reviews", "Shipping"];

const ProductTabs = ({ product }) => {
  const [active, setActive] = useState("Description");

  return (
    <div>
      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`pb-2.5 text-sm font-medium cursor-pointer border-b-2 -mb-px transition-colors ${
              active === tab ? "text-primary border-primary" : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="pt-4">
        {active === "Description" && (
          <div>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 max-w-md gap-x-8 gap-y-1.5 mt-4 text-sm border border-gray-100 rounded-lg p-4">
              <span className="text-gray-400">Model:</span><span className="text-gray-700">{product.sku}</span>
              <span className="text-gray-400">Style:</span><span className="text-gray-700">Classic style</span>
              <span className="text-gray-400">Category:</span><span className="text-gray-700 capitalize">{product.category}</span>
              <span className="text-gray-400">Material:</span><span className="text-gray-700">{product.material || "Standard"}</span>
            </div>

            <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
              {(product.tags || []).slice(0, 4).map((tag) => (
                <li key={tag}>• {tag}</li>
              ))}
            </ul>
          </div>
        )}

        {active === "Reviews" && (
          <div className="space-y-3">
            {(product.reviews || []).length === 0 && <p className="text-sm text-gray-500">No reviews yet.</p>}
            {(product.reviews || []).map((review, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{review.reviewerName}</p>
                  <span className="text-xs text-orange-400">★ {review.rating}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {active === "Shipping" && (
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Shipping: {product.shippingInformation}</li>
            <li>• Warranty: {product.warrantyInformation}</li>
            <li>• Return policy: {product.returnPolicy}</li>
            <li>• Availability: {product.availabilityStatus}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;