// src/pages/profile/Profile.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Package, Heart, ShoppingCart, LogOut, BadgeCheck } from "lucide-react";
import { logout } from "../../store/slices/authSlice";
import Auth from "../auth/Auth";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount = useSelector((state) => state.cart.items.length);

  if (!user) {
    return (
      <div className="max-w-[1140px] mx-auto px-4 mt-4 flex flex-col gap-4">
        <div className="bg-primary-light border border-primary/20 text-primary text-sm rounded-lg px-4 py-3 text-center">
          Login to View your Profile
        </div>
        <Auth />
      </div>
    );
  }

  const details = [
    ["Full name", `${user.firstName} ${user.lastName}`],
    ["Username", user.username],
    ["Email", user.email],
    ["User ID", `#${user.id}`],
  ];

  const quickLinks = [
    { icon: Package, label: "Browse products", to: "/products" },
    { icon: Heart, label: "Wishlist", value: wishlistCount, to: "/wishlist" },
    { icon: ShoppingCart, label: "Cart", value: cartCount, to: "/cart" },
  ];

  return (
    <div className="max-w-[1340px] mx-auto px-4 mt-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-900">My profile</h2>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="w-full lg:w-72 bg-white border border-gray-200 rounded-lg p-6 text-center">
          {user.image ? (
            <img src={user.image} alt={user.username} className="w-24 h-24 rounded-full mx-auto object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto bg-primary text-white flex items-center justify-center text-3xl font-bold">
              {user.firstName?.[0]}
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 mt-3">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500">@{user.username}</p>

          <button
            onClick={() => dispatch(logout())}
            className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-medium text-red-500 border border-red-200 rounded py-2 hover:bg-red-50 cursor-pointer transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="w-full flex-1 flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BadgeCheck size={16} className="text-primary" /> Account details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.map(([label, value]) => (
                <div key={label} className="border border-gray-100 rounded-lg px-4 py-3">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-sm text-gray-800 mt-0.5 capitalize">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick access</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickLinks.map(({ icon: Icon, label, value, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="flex items-center gap-3 border border-gray-100 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Icon size={18} className="text-primary" />
                  <span className="text-sm text-gray-700 flex-1">{label}</span>
                  {value !== undefined && (
                    <span className="text-xs font-bold bg-primary-light text-primary rounded-full px-2 py-0.5">
                      {value}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;