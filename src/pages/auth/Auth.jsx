// src/pages/auth/Auth.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser, logout, clearError } from "../../store/slices/authSlice";

const Auth = ({ initialMode = "login" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [mode, setMode] = useState(initialMode);
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // ✨ Login hote hi redirect karo (agar kisi protected page se aaya tha)
  useEffect(() => {
    if (user && location.state?.from) {
      navigate(location.state.from, { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const switchMode = (m) => {
    setMode(m);
    setSuccess("");
    dispatch(clearError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (mode === "login") {
      dispatch(loginUser({ username: form.username, password: form.password }));
    } else {
      const result = await dispatch(
        registerUser({
          username: form.username,
          password: form.password,
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
        })
      );
      if (registerUser.fulfilled.match(result)) {
        setSuccess("Account created! Ab login karein.");
        setMode("login");
      }
    }
  };

  // Login form tab show karna hai, logged-in card nahi (Login page ke liye)
  if (user && !location.state?.from) {
    return (
      <div className="max-w-md mx-auto my-10 bg-white border border-gray-200 rounded-lg p-8 text-center">
        {user.image && (
          <img
            src={user.image}
            alt={user.username}
            className="w-16 h-16 rounded-full mx-auto mb-3"
          />
        )}
        <h2 className="text-lg font-semibold text-gray-900">
          Welcome, {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-gray-500 mt-1">@{user.username}</p>
        <button
          onClick={() => dispatch(logout())}
          className="mt-4 text-sm font-medium text-red-500 border border-red-200 rounded px-4 py-2 hover:bg-red-50 cursor-pointer transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-6 bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex border-b border-gray-200 mb-5">
        {["login", "signup"].map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 pb-2.5 text-sm font-medium cursor-pointer border-b-2 -mb-px capitalize ${
              mode === m
                ? "text-primary border-primary"
                : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
          >
            {m === "login" ? "Login" : "Sign up"}
          </button>
        ))}
      </div>

      {mode === "login" && (
        <p className="text-xs text-primary bg-primary-light border border-primary/20 rounded px-3 py-2 mb-4">
          Demo account → username: <b>emilys</b> · password: <b>emilyspass</b>
        </p>
      )}

      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2 mb-4">
          {error}
        </p>
      )}
      {success && (
        <p className="text-xs text-green-600 bg-green-50 border border-green-100 rounded px-3 py-2 mb-4">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {mode === "signup" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder="First name"
                className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder="Last name"
                className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </>
        )}

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          placeholder="Username"
          className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-dark disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded cursor-pointer transition-colors"
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>
      </form>
    </div>
  );
};

export default Auth;