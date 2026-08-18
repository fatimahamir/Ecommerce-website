// src/components/product-listing/Pagination.jsx
import React from "react";

const getPages = (total, current) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, 2, current - 1, current, current + 1, total - 1, total]);
  const arr = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  arr.forEach((p, i) => {
    if (i > 0 && p - arr[i - 1] > 1) out.push("...");
    out.push(p);
  });
  return out;
};

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 bg-white border border-gray-200 rounded-lg px-4 py-3">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
        aria-label="Previous page"
      >
        ‹
      </button>

      {getPages(totalPages, page).map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="px-1 text-gray-400">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded text-sm cursor-pointer ${p === page ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;