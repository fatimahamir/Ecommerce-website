// src/pages/auth/Auth.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser, logout, clearError } from "../../store/slices/authSlice";
import { ShoppingBag, User, Lock, Mail, UserCircle } from "lucide-react";

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

  if (user && !location.state?.from) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-primary/20">
            {user.image ? (
              <img src={user.image} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
                {user.firstName?.[0]}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back, {user.firstName}! 
          </h2>
          <p className="text-sm text-gray-500 mb-6">@{user.username}</p>
          <button
            onClick={() => dispatch(logout())}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-500 border border-red-200 rounded-lg px-6 py-2.5 hover:bg-red-50 cursor-pointer transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary shadow-lg mb-4 ">
            <ShoppingBag size={30} className="text-white" />
          </div> */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-sm text-gray-500">
            {mode === "login" 
              ? "Login to access your account" 
              : "Join Shopora to start shopping"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                  mode === m
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {m === "login" ? "Login" : "Sign up"}
              </button>
            ))}
          </div>

          {/* Messages */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-4 py-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {success}
            </div>
          )}

          {/* Demo info */}
          {mode === "login" && (
            <div className="bg-primary-light border border-primary/20 rounded-lg px-4 py-3 mb-4">
              <p className="text-xs text-primary font-medium mb-1"> Demo credentials:</p>
              <p className="text-xs text-primary">
                Username: <code className="font-mono font-bold">emilys</code> · 
                Password: <code className="font-mono font-bold">emilyspass</code>
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <UserCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      placeholder="First name"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <div className="relative">
                    <UserCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Last name"
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Email address"
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-medium py-3 rounded-lg cursor-pointer transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : mode === "login" ? "Login" : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Switch mode */}
          <p className="text-center text-sm text-gray-600">
            {mode === "login" ? "New to Shopora?" : "Already have an account?"}{" "}
            <button
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              {mode === "login" ? "Create account" : "Login"}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to Shopora's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Auth;