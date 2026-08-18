// src/components/layouts/Navbar.jsx
import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal, logout } from "../../store/slices/authSlice";
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  Tag,
} from "lucide-react";
import CategoryDropdown from "../common/CategoryDropdown";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: products } = useSelector((state) => state.products);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, i) => sum + i.qty, 0)
  );

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return [...cats].sort();
  }, [products]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (selectedCategory) params.set("category", selectedCategory);
    
    const queryString = params.toString();
    const targetUrl = `/products${queryString ? `?${queryString}` : ""}`;
    
    console.log("Navigating to:", targetUrl);
    navigate(targetUrl);
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white text-primary">
      <div className="max-w-[1340px] mx-auto h-14 lg:h-20 flex items-center justify-between gap-4 my-2 lg:my-0 px-4">

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden cursor-pointer text-primary"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 lg:h-11 lg:w-11 text-white flex items-center justify-center rounded bg-primary shrink-0">
              <ShoppingBag size={20} color="white" />
            </div>
            <h1 className="text-lg lg:text-2xl font-bold text-primary">
              Shopora
            </h1>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-[560px] lg:max-w-[585px] xl:max-w-[665px] h-11 rounded-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-[63%] h-full px-3 text-base rounded-l-lg border border-gray-300 text-gray-600 border-r-0 focus:outline-none focus:border-primary"
          />
          <CategoryDropdown
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            className="w-[22%] text-base"
          />
          <button
            type="submit"
            className="w-[15%] h-full px-2 bg-primary text-white text-base font-medium cursor-pointer rounded-r-lg border-primary"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 lg:gap-4 shrink-0">

          <div className="hidden sm:flex items-center gap-4 xl:gap-6 text-xs text-gray-600">
            
            <Link to="/profile" className="flex flex-col items-center gap-1 cursor-pointer">
              <User size={20} color="gray-200" fill="gray-200" />
              <span className="max-w-[60px] truncate">
                {user ? `Hi, ${user.firstName}` : "Profile"}
              </span>
            </Link>

            <Link to="/deals" className="flex flex-col items-center gap-1 cursor-pointer">
              <Tag size={20} color="gray-200" fill="gray-200" />
              <span>Deals</span>
            </Link>

            <Link to="/wishlist" className="flex flex-col items-center gap-1 cursor-pointer relative">
              <Heart size={20} color="gray-200" fill="gray-200" />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="flex flex-col items-center gap-1 cursor-pointer relative">
              <ShoppingCart size={20} color="gray-200" fill="gray-200" />
              <span>My cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex sm:hidden items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={22} color="black" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/profile">
              <User size={22} color="black" />
            </Link>
          </div>
        </div>
      </div>

      <form onSubmit={handleSearch} className="lg:hidden px-4 sm:px-6 pb-3 pt-1">
        <div className="flex sm:hidden items-center h-10 border border-gray-300 rounded px-3 gap-2 mb-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="flex-1 h-full text-sm outline-none"
          />
        </div>

        <div className="hidden sm:flex items-center h-11 border border-gray-300 rounded mb-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-[70%] h-full px-3 text-sm outline-none rounded-l border-2 border-gray-300 border-r-0 focus:border-primary"
          />
          <CategoryDropdown
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            widthClass="w-[20%]"
            textClass="text-sm"
          />
          <button
            type="submit"
            className="w-[15%] h-full px-2 bg-primary text-white text-sm font-medium shrink-0 rounded-r"
          >
            Search
          </button>
        </div>
      </form>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Navbar;