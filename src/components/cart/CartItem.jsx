
import React from "react";
import { useDispatch } from "react-redux";
import { updateQty, removeFromCart, saveForLater } from "../../store/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-3 sm:gap-4 p-4">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain border border-gray-100 rounded bg-white shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</p>
          <p className="text-sm font-bold text-gray-900 shrink-0">${(item.price * item.qty).toFixed(2)}</p>
        </div>
        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
          Size: medium · Color: blue · Seller: {item.brand || "BrandMart"}
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-gray-200 rounded">
            <button
              onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}
              className="w-7 h-7 text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{item.qty}</span>
            <button
              onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
              className="w-7 h-7 text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(saveForLater(item.id))}
              className="text-xs text-primary hover:underline cursor-pointer"
            >
              Save for later
            </button>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-xs text-red-500 hover:underline cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;