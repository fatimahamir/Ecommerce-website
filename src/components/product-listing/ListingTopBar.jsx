// src/components/product-listing/ListingTopBar.jsx
import React from "react";

const ListingTopBar = ({
  count, view, onViewChange, sort, onSortChange,
  verified, onVerifiedChange, onToggleFilters,
  chips = [], onRemoveChip, onClearAll,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={onToggleFilters}
        className="lg:hidden text-sm font-medium text-primary border border-primary/20 bg-primary-light rounded px-3 py-1.5 cursor-pointer hover:bg-primary/10 transition-colors"
      >
        Filters
      </button>

      <p className="text-sm text-gray-500 mr-auto">
        {count} items | <span className="text-gray-900 font-medium">All products</span>
      </p>

      {/* <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <button
          onClick={onVerifiedChange}
          className={`w-9 h-5 rounded-full relative transition-colors ${verified ? "bg-primary" : "bg-gray-300"}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${verified ? "translate-x-4" : ""}`} />
        </button>
        Verified only
      </label> */}

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="text-sm border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-700 cursor-pointer focus:outline-none"
      >
        <option value="featured">Featured</option>
        <option value="top-rated">Top rated</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>

      <div className="flex border border-gray-200 rounded overflow-hidden">
        <button
          onClick={() => onViewChange("list")}
          className={`p-1.5 cursor-pointer ${view === "list" ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
          aria-label="List view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          onClick={() => onViewChange("grid")}
          className={`p-1.5 cursor-pointer ${view === "grid" ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
          aria-label="Grid view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
          </svg>
        </button>
      </div>
    </div>

    {chips.length > 0 && (
      <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
        {chips.map((chip) => (
          <button
            key={chip.group + chip.value}
            onClick={() => onRemoveChip(chip.group, chip.value)}
            className="flex items-center gap-1 text-xs bg-primary-light text-primary border border-primary/20 rounded-full px-2.5 py-1 cursor-pointer hover:bg-primary/10 transition-colors"
          >
            {chip.value} ×
          </button>
        ))}
        <button onClick={onClearAll} className="text-xs text-accent hover:underline ml-1 cursor-pointer">
          Clear all filters
        </button>
      </div>
    )}
  </div>
);

export default ListingTopBar;