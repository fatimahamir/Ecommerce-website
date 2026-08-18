// src/components/layouts/MobileMenu.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  User, X, Home, LayoutGrid, Heart, ShoppingCart,
  Globe, Headphones, Tag, Star, ChevronDown, MapPin,
} from "lucide-react";
import { openAuthModal, logout } from "../../store/slices/authSlice";
import ShipToDropdown from "../common/Shiptodropdown.jsx";

const MobileMenu = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items: products } = useSelector((state) => state.products);
  const [catOpen, setCatOpen] = useState(false);

 
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return [...cats].sort();
  }, [products]);

 
  const goAndScroll = (sectionId) => {
    onClose();
    navigate("/");
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const mainItems = [
    { icon: Home, label: "Home", to: "/" },
    { icon: Heart, label: "Wishlist", to: "/wishlist" },
    { icon: ShoppingCart, label: "My cart", to: "/cart" },
  ];

  const offerItems = [
    { icon: Tag, label: "Hot offers", to: "/deals" },
    { icon: Star, label: "Featured products", scroll: "recommended" },
  ];

  const openAuth = (mode) => {
    dispatch(openAuthModal(mode));
    onClose();
  };

  return (
    <>
      
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* menu */}
      <aside className={`fixed top-0 left-0 h-full w-72 max-w-[85%] bg-white z-50 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} overflow-y-auto`}>

        {/* user profile*/}
        <div className="p-4 bg-login">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500">
              <User size={18} />
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 cursor-pointer" aria-label="Close menu">
              <X size={20} />
            </button>
          </div>

          {user ? (
            <p className="text-sm text-gray-800 mt-2">
              Hi, <b>{user.firstName}</b> ·{" "}
              <button onClick={() => dispatch(logout())} className="text-red-500 cursor-pointer">Logout</button>
            </p>
          ) : (
            <p className="text-sm text-gray-800 mt-2">
              <button onClick={() => openAuth("login")} className="cursor-pointer text-primary font-medium hover:underline">Sign in</button>
              <span className="mx-1.5 text-gray-400">|</span>
              <button onClick={() => openAuth("signup")} className="cursor-pointer text-primary font-medium hover:underline">Register</button>
            </p>
          )}
        </div>

        {/*Main menu  */}
        <nav className="py-2 border-b border-gray-100">
          {mainItems.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-light"
            >
              <Icon size={17} className="text-primary" />
              {label}
            </Link>
          ))}

          {/* ✅ Categories */}
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-light cursor-pointer"
          >
            <LayoutGrid size={17} className="text-primary" />
            <span className="flex-1 text-left">Categories</span>
            <ChevronDown size={15} className={`transition-transform ${catOpen ? "rotate-180" : ""}`} />
          </button>

          {catOpen && (
            <div className="bg-gray-50 py-1">
              <Link
                to="/products"
                onClick={onClose}
                className="block px-8 py-2 text-sm text-primary font-medium hover:bg-primary-light"
              >
                All products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  onClick={onClose}
                  className="block px-8 py-2 text-sm text-gray-600 capitalize hover:bg-primary-light hover:text-primary"
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* links */}
        <nav className="py-2 border-b border-gray-100">
          {offerItems.map(({ icon: Icon, label, to, scroll }) =>
            to ? (
              <Link
                key={label}
                to={to}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-light"
              >
                <Icon size={17} className="text-primary" />
                {label}
              </Link>
            ) : (
              <button
                key={label}
                onClick={() => goAndScroll(scroll)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-light cursor-pointer text-left"
              >
                <Icon size={17} className="text-primary" />
                {label}
              </button>
            )
          )}
        </nav>

        {/* Info menu  */}
        <nav className="py-2 border-b border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700">
            <Globe size={17} className="text-primary" />
            English | USD
          </div>

         

          <button
            onClick={() => goAndScroll("inquiry")}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-light cursor-pointer text-left"
          >
            <Headphones size={17} className="text-primary" />
            Inquiry
          </button>
        </nav>

        {/*  links */}
        <div className="px-6 py-4 flex flex-col gap-3">
          {["User agreement", "Partnership", "Privacy policy"].map((label) => (
            <a key={label} href="#" className="text-xs text-gray-500 hover:text-primary">{label}</a>
          ))}
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;