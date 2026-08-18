// src/components/home/PromoPanel.jsx
import React from "react";
import { User, Truck, ShieldCheck, Headphones } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal, logout } from "../../store/slices/authSlice";

const perks = [
  {
    icon: Truck,
    title: "Free shipping",
    desc: "On your first order, easy returns in 7 days.",
    color: "bg-teal-50 text-teal-600",
    bgcol: "bg-soft-orange",
  },
  {
    icon: ShieldCheck,
    title: "Secure payment",
    desc: "100% buyer protection on every order.",
    color: "bg-blue-50 text-blue-600",
    bgcol: "bg-soft-blue",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    desc: "Track your order in real time.",
    color: "bg-orange-50 text-orange-500",
    bgcol: "bg-soft-mint",
  },
];

const PromoPanel = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="hidden lg:flex flex-col gap-3 w-full">
      <div className="bg-login border border-gray-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500">
            <User size={16} />
          </div>
          <p className="text-sm text-gray-700">
            {user ? <>Hi, <b>{user.firstName}</b></> : <>Hi, user <br /> let's get started</>}
          </p>
        </div>

        {user ? (
          <button
            onClick={() => dispatch(logout())}
            className="w-full border bg-white border-gray-300 text-sm font-medium py-2 rounded cursor-pointer hover:bg-gray-50"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => dispatch(openAuthModal("signup"))}
              className="w-full bg-blue-brand text-white text-sm font-medium py-2 rounded mb-2 cursor-pointer hover:bg-blue-700"
            >
              Join now
            </button>
            <button
              onClick={() => dispatch(openAuthModal("login"))}
              className="w-full border bg-white border-gray-300 text-sm font-medium py-2 rounded cursor-pointer hover:bg-gray-50"
            >
              Log in
            </button>
          </>
        )}
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {perks.map(({ icon: Icon, title, desc, color, bgcol }) => (
          <div
            key={title}
            className={`flex gap-3 px-3 py-5 border-b border-gray-100 last:border-b-0 ${bgcol}`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoPanel;