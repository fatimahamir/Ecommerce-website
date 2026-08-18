// src/pages/checkout/Checkout.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import OrderSummary from "../../components/checkout/OrderSummary";
import OrderConfirmed from "../../components/checkout/OrderConfirmed";
import EmptyCart from "../../components/cart/EmptyCart";

const Checkout = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [orderId, setOrderId] = useState(null);

  const handlePlaceOrder = () => {
    setOrderId("ORD-" + Math.floor(100000 + Math.random() * 900000));
    dispatch(clearCart());
  };

  if (orderId) return <OrderConfirmed orderId={orderId} />;

  return (
    <div className="max-w-[1340px] mx-auto px-4 mt-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-900">Checkout</h2>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="w-full flex-1">
            <CheckoutForm onPlaceOrder={handlePlaceOrder} />
          </div>
          <div className="w-full lg:w-96 shrink-0">
            <OrderSummary items={items} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;