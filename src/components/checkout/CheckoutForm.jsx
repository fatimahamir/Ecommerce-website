// src/components/checkout/CheckoutForm.jsx
import React, { useState } from "react";

const Field = ({ label, error, ...props }) => (
  <div>
    <label className="text-xs font-medium text-gray-600">{label}</label>
    <input
      {...props}
      className={`mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary ${error ? "border-red-400" : "border-gray-200"}`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const initialForm = {
  fullName: "", email: "", phone: "", address: "", city: "", country: "", postal: "",
  payment: "cod", cardNumber: "", cardExpiry: "", cardCvc: "",
};

const CheckoutForm = ({ onPlaceOrder }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Valid email is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.country) errs.country = "Select a country";
    if (!form.postal.trim()) errs.postal = "Postal code is required";
    if (form.payment === "card") {
      if (!form.cardNumber.trim()) errs.cardNumber = "Card number is required";
      if (!form.cardExpiry.trim()) errs.cardExpiry = "Expiry is required";
      if (!form.cardCvc.trim()) errs.cardCvc = "CVC is required";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    
    console.log("Form submitted", { errors: errs, form });
    
    if (Object.keys(errs).length === 0) {
      onPlaceOrder();
    } else {
      console.log("Validation errors:", errs);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Shipping address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Ahmed Khan" error={errors.fullName} />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" error={errors.email} />
          <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567" error={errors.phone} />
          <Field label="Postal code" name="postal" value={form.postal} onChange={handleChange} placeholder="54000" error={errors.postal} />
          <div className="sm:col-span-2">
            <Field label="Address" name="address" value={form.address} onChange={handleChange} placeholder="House #, Street, Area" error={errors.address} />
          </div>
          <Field label="City" name="city" value={form.city} onChange={handleChange} placeholder="Lahore" error={errors.city} />
          <div>
            <label className="text-xs font-medium text-gray-600">Country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className={`mt-1 w-full border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-primary ${errors.country ? "border-red-400" : "border-gray-200"}`}
            >
              <option value="">Select country</option>
              <option>Pakistan</option>
              <option>Germany</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>UAE</option>
            </select>
            {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Payment method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer text-sm ${form.payment === "cod" ? "border-primary bg-primary-light" : "border-gray-200"}`}>
            <input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={handleChange} className="accent-primary" />
            Cash on Delivery
          </label>
          <label className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer text-sm ${form.payment === "card" ? "border-primary bg-primary-light" : "border-gray-200"}`}>
            <input type="radio" name="payment" value="card" checked={form.payment === "card"} onChange={handleChange} className="accent-primary" />
            Credit / Debit card (demo)
          </label>
        </div>

        {form.payment === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="sm:col-span-3">
              <Field label="Card number" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" error={errors.cardNumber} />
            </div>
            <Field label="Expiry" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM/YY" error={errors.cardExpiry} />
            <Field label="CVC" name="cardCvc" value={form.cardCvc} onChange={handleChange} placeholder="123" error={errors.cardCvc} />
          </div>
        )}
      </div>

      <button type="submit" className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-8 py-2.5 rounded cursor-pointer transition-colors">
        Place order
      </button>
    </form>
  );
};

export default CheckoutForm;