// src/components/product-listing/FilterSidebar.jsx
import React, { useState } from "react";

const FilterGroup = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 py-3 px-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm font-bold text-primary cursor-pointer"
      >
        {title}
        <span className="text-gray-400">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
};

const CheckRow = ({ label, count, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
    />
    <span className="flex-1 capitalize">{label}</span>
    {count !== undefined && <span className="text-xs text-gray-400">{count}</span>}
  </label>
);

const pricePresets = [
  { label: "All prices", min: "", max: "" },
  { label: "Under $50", min: "", max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $500", min: 100, max: 500 },
  { label: "$500 – $1000", min: 500, max: 1000 },
  { label: "Over $1000", min: 1000, max: "" },
];

const FilterSidebar = ({ products, filters, onToggle, onPriceApply, onRating }) => {
  const countBy = (key) => {
    const map = {};
    products.forEach((p) => {
      if (p[key]) map[p[key]] = (map[p[key]] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  };

  const categories = countBy("category");
  const brands = countBy("brand").slice(0, 8);

  const tagMap = {};
  products.forEach((p) => (p.tags || []).forEach((t) => (tagMap[t] = (tagMap[t] || 0) + 1)));
  const features = Object.entries(tagMap).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const handleCategoryChange = (value) => {
    const wasSelected = filters.categories.includes(value);
    filters.categories.forEach((c) => {
      if (c !== value) onToggle("categories", c);
    });
    onToggle("categories", value);
    if (wasSelected && filters.categories.length === 1) return;
  };

  const handleAllCategories = () => {
    filters.categories.forEach((c) => onToggle("categories", c));
  };

  return (
    <div>
      <FilterGroup title="Category">
        <CheckRow
          label="All categories"
          checked={filters.categories.length === 0}
          onChange={handleAllCategories}
        />
        {categories.map(([value, count]) => (
          <CheckRow
            key={value}
            label={value}
            count={count}
            checked={filters.categories.includes(value)}
            onChange={() => handleCategoryChange(value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Brands">
        {brands.map(([value, count]) => (
          <CheckRow key={value} label={value} count={count} checked={filters.brands.includes(value)} onChange={() => onToggle("brands", value)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Features">
        {features.map(([value, count]) => (
          <CheckRow key={value} label={value} count={count} checked={filters.features.includes(value)} onChange={() => onToggle("features", value)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Price range">
        {pricePresets.map((p) => {
          const active =
            String(filters.priceMin) === String(p.min) &&
            String(filters.priceMax) === String(p.max);
          return (
            <label key={p.label} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
              <input
                type="radio"
                name="price"
                checked={active}
                onChange={() => onPriceApply(p.min, p.max)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <span className="flex-1">{p.label}</span>
            </label>
          );
        })}
      </FilterGroup>

      <FilterGroup title="Ratings">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
          <input
            type="radio"
            name="rating"
            checked={filters.rating === 0}
            onChange={() => onRating(0)}
            className="accent-primary cursor-pointer"
          />
          All ratings
        </label>
        {[4, 3, 2].map((r) => (
          <label key={r} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === r}
              onChange={() => onRating(r)}
              className="accent-primary cursor-pointer"
            />
            <span className="flex text-orange-400">
              {Array.from({ length: r }).map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </span>
            & up
          </label>
        ))}
      </FilterGroup>
    </div>
  );
};

export default FilterSidebar;