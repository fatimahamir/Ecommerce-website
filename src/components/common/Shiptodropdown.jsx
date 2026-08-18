// src/components/common/ShipToDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const countries = [
  { name: "United States", code: "us" },
  { name: "Germany", code: "de" },
  { name: "United Kingdom", code: "gb" },
  { name: "Pakistan", code: "pk" },
  { name: "Canada", code: "ca" },
  { name: "France", code: "fr" },
  { name: "UAE", code: "ae" },
  { name: "India", code: "in" },
  { name: "Australia", code: "au" },
  { name: "Saudi Arabia", code: "sa" },
];

const ShipToDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(countries[1]);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer"
      >
        Ship to
        <img
          src={`https://flagcdn.com/w20/${selected.code}.png`}
          alt={selected.name}
          className="w-4 h-3 object-cover rounded-[2px]"
        />
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute no-scrollbar top-full right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 max-h-[280px] overflow-y-auto">
          {countries.map((c) => (
            <li
              key={c.code}
              onClick={() => {
                setSelected(c);
                setOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                c.code === selected.code
                  ? "bg-primary-light text-accent font-medium"
                  : "text-gray-700"
              }`}
            >
              <img
                src={`https://flagcdn.com/w20/${c.code}.png`}
                alt={c.name}
                className="w-4 h-3 object-cover rounded-[2px]"
              />
              {c.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShipToDropdown;