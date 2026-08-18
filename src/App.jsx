// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import CategoryNavbar from "./components/layouts/CategoryNavbar";
import Footer from "./components/layouts/Footer";
import Newsletter from "./components/common/Newsletter";
import AuthModal from "./components/common/AuthModal";
import AppRoutes from "./routes/AppRoutes";
import Toast from "./components/common/Toast";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = () => {
  const { pathname } = useLocation();
  
  const hideNewsletterPages = ["/login", "/checkout", "/profile"];
  const shouldHideNewsletter = hideNewsletterPages.includes(pathname);

  return (
    <>
      <Navbar />
      <CategoryNavbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!shouldHideNewsletter && <Newsletter />}
      <Footer />
      <AuthModal />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Toast />
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Layout />
    </div>
  </BrowserRouter>
);

export default App;