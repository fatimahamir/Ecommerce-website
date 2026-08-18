// src/components/layout/CategoryPills.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryPills = () => {
  const navigate = useNavigate();
  const { items: products } = useSelector((state) => state.products);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["All category", ...[...cats].sort()];
  }, [products]);

  const [active, setActive] = useState("All category");

  const handleCategoryClick = (cat) => {
    setActive(cat);
    
    if (cat === "All category") {
      navigate("/products");
    } else {
      navigate(`/products?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 w-max">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              active === cat
                ? "bg-secondary text-white"
                : "bg-gray-100 text-secondary hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPills;