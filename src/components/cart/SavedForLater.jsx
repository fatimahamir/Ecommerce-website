
import React from "react";
import { useDispatch } from "react-redux";
import { moveToCart, removeSaved } from "../../store/slices/cartSlice";

const SavedForLater = ({ items }) => {
  const dispatch = useDispatch();

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Saved for later</h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">
          No saved items yet. Cart mein "Save for later" par click kar ke items yahan rakhein.
        </p>
      ) : (
        <>
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="border border-gray-100 rounded-lg p-3">
                <img src={item.thumbnail} alt={item.title} className="w-full h-28 object-contain mb-2" />
                <p className="text-sm font-bold text-gray-900">${item.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.title}</p>
                <button
                  onClick={() => dispatch(moveToCart(item.id))}
                  className="mt-2 w-full text-xs font-medium text-primary border border-primary/20 rounded py-1.5 hover:bg-primary/5 cursor-pointer transition-colors"
                >
                  Move to cart
                </button>
              </div>
            ))}
          </div>

          <div className="sm:hidden flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 border border-gray-100 rounded-lg p-3">
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-contain shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 line-clamp-2">{item.title}</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">${item.price.toFixed(2)}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => dispatch(moveToCart(item.id))}
                      className="flex-1 text-xs font-medium text-primary border border-primary/20 rounded py-1.5 hover:bg-primary/5 cursor-pointer transition-colors"
                    >
                      Move to cart
                    </button>
                    <button
                      onClick={() => dispatch(removeSaved(item.id))}
                      className="flex-1 text-xs font-medium text-red-500 border border-red-200 rounded py-1.5 hover:bg-red-50 cursor-pointer transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SavedForLater;