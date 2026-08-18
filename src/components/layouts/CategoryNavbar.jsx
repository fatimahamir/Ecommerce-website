// src/components/layouts/CategoryNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ShipToDropdown from "../common/Shiptodropdown.jsx";

const CategoryNavbar = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="hidden lg:block w-full border-b border-gray-200 bg-white">
      <div className="max-w-[1340px] mx-auto h-11 flex items-center justify-between px-4">

        <div className="flex items-center gap-6 text-sm text-gray-700">
          <Link
            to="/products"
            className="font-medium cursor-pointer hover:text-primary"
          >
            All category
          </Link>

          <Link
            to="/deals"
            className="cursor-pointer hover:text-primary"
          >
            Hot offers
          </Link>

          <button
            onClick={() => scrollToSection("recommended")}
            className="cursor-pointer hover:text-primary"
          >
            Featured Products
          </button>

          <button
            onClick={() => scrollToSection("inquiry")}
            className="cursor-pointer hover:text-primary"
          >
            Inquiry
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-700">
          <button className="flex items-center gap-1 cursor-pointer">
            English, USD
          </button>
          <ShipToDropdown />
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbar;