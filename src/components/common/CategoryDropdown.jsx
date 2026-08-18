// src/components/common/CategoryDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const CategoryDropdown = ({ 
  categories = [], 
  value = "", 
  onChange,
  widthClass = "w-[22%]", 
  textClass = "text-base" 
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayText = value || "All categories";

  return (
    <div ref={ref} className={`relative ${widthClass} h-full shrink-0`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-full flex items-center justify-center gap-1 px-2 border border-gray-300 ${textClass} text-gray-600 cursor-pointer bg-white`}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute top-full left-0 mt-1 w-[220px] bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 max-h-[320px] overflow-y-auto">
          <li
            onClick={() => {
              onChange?.("");
              setOpen(false);
            }}
            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
              value === "" ? "bg-primary-light text-primary font-medium" : "text-gray-700"
            }`}
          >
            All categories
          </li>
          
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => {
                onChange?.(cat);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                cat === value ? "bg-primary-light text-primary font-medium" : "text-gray-700"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;