// src/components/home/CategorySidebar.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CategorySidebar = () => {
  const navigate = useNavigate();
  const { items: products } = useSelector((state) => state.products);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return [...cats].sort();
  }, [products]);

  const [active, setActive] = useState(null);

  const handleCategoryClick = (cat) => {
    setActive(cat);
    navigate(`/products?category=${encodeURIComponent(cat)}`);
  };

  return (
    <div className="hidden lg:block w-full border border-gray-200 rounded-lg overflow-hidden">
      <div className="max-h-[460px] overflow-y-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`w-full text-left px-4 py-2.5 text-sm border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors ${
              active === cat
                ? "bg-primary-light text-primary font-medium"
                : "hover:bg-primary-light hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;