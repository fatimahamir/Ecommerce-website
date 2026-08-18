// src/components/common/AuthModal.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { closeAuthModal } from "../../store/slices/authSlice";
import Auth from "../../pages/auth/Auth";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, modalMode } = useSelector((state) => state.auth);

  if (!modalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={() => dispatch(closeAuthModal())}
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => dispatch(closeAuthModal())}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <Auth initialMode={modalMode} />
      </div>
    </div>
  );
};

export default AuthModal;