
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import SavedForLater from "../../components/cart/SavedForLater";
import EmptyCart from "../../components/cart/EmptyCart";
import { clearCart } from "../../store/slices/cartSlice";

const perks = [
  ["Secure payment", "100% protected payments"],
  ["Customer support", "24/7 available for help"],
  ["Free delivery", "On orders over $50"],
];

const Cart = () => {
  const dispatch = useDispatch();
  const { items, saved } = useSelector((state) => state.cart);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="max-w-[1340px] mx-auto px-4 mt-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">My cart ({itemCount})</span>
        <span className="sm:hidden">Shopping cart</span>
      </h2>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="w-full flex-1 bg-white border border-gray-200 rounded-lg">
            <p className="text-xs text-primary bg-primary-light px-4 py-2 border-b border-gray-100">
              Sign in to make multiple orders and track them easily.
            </p>

            <div className="divide-y divide-gray-100">
              {items.map((item) => <CartItem key={item.id} item={item} />)}
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <a href="#" className="text-xs font-medium text-primary border border-primary/20 rounded px-3 py-1.5 hover:bg-primary/5 transition-colors">
                + Add to shopping
              </a>
              <button onClick={() => dispatch(clearCart())} className="text-xs text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
                Remove all
              </button>
            </div>
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <CartSummary items={items} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {perks.map(([title, desc]) => (
          <div key={title} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <SavedForLater items={saved} />
    </div>
  );
};

export default Cart;