// src/components/home/SendQuoteSection.jsx
import React, { useState } from "react";

const SendQuoteSection = ({
  bgImage = "https://images.unsplash.com/photo-1608841828390-a4eb54fb1987?q=80&w=1239&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}) => {
  const [formData, setFormData] = useState({
    item: "",
    details: "",
    quantity: "",
    unit: "Pcs",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Quote request:", formData);
  };

  return (
    <div
      id="inquiry"
      className="relative rounded-lg overflow-hidden bg-cover bg-center mx-3 xl:mx-0"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-primary/50" />

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-white text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-3">
              An easy way to send requests to all suppliers
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-md mx-auto lg:mx-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>

          <div className="w-full max-w-md lg:w-[380px] shrink-0 bg-white rounded-lg shadow-lg p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Send quote to suppliers
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="item"
                value={formData.item}
                onChange={handleChange}
                placeholder="What item you need?"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-secondary"
              />

              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Type more details"
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none resize-none focus:border-secondary"
              />

              <div className="flex gap-3">
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-secondary"
                />

                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-[90px] border border-gray-300 rounded px-2 py-2 text-sm outline-none focus:border-secondary cursor-pointer"
                >
                  <option>Pcs</option>
                  <option>Kg</option>
                  <option>Box</option>
                  <option>Set</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-secondary hover:bg-primary-dark text-white text-sm font-medium py-2.5 rounded cursor-pointer transition-colors"
              >
                Send inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendQuoteSection;