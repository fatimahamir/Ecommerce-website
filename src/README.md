# 🛍️ Shopora — E-Commerce Web App

A modern, fully responsive e-commerce application built with **React**, **Redux Toolkit** and **Tailwind CSS**. Powered by the **DummyJSON API**, featuring a complete shopping flow — from browsing products to placing orders with protected checkout.

## ✨ Features

- 🏠 Home page with hero carousel, deals section & category promotions
- 🛒 Product listing with filters (category, brand, price, rating), sorting, search & pagination
- 📦 Product details with image gallery, reviews, ratings & related products
- 🛍️ Shopping cart with quantity management, "Save for later" & localStorage persistence
- ❤️ Wishlist with persistent storage
- 🔐 Login/Signup with **protected routes** (checkout & profile)
- 💳 Checkout with form validation & order confirmation
- 🔥 Deals page with Flipkart-style auto-sliding banner carousel
- 🔔 Toast notifications on cart/wishlist actions
- 🎨 Theme-driven UI — colors controlled from a single source
- 📱 Fully responsive (mobile, tablet, desktop)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React + Vite | UI & build tool |
| Redux Toolkit | State management |
| React Router | Routing & protected routes |
| Tailwind CSS | Styling |
| DummyJSON API | Products & auth data |
| localStorage | Cart & wishlist persistence |

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/ecommerceapp.git

# Move into the folder
cd ecommerceapp

# Install dependencies
npm install

# Run the app
npm run dev
```

Open `http://localhost:5173` in your browser.

## 🔑 Demo Login

| Username | Password |
|----------|----------|
| `emilys` | `emilyspass` |

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── home/        # Hero, deals, category sections
│   ├── product-listing/
│   ├── product-details/
│   ├── cart/
│   ├── checkout/
│   └── layouts/     # Navbar, Footer, MobileMenu
├── pages/           # Route pages
├── routes/          # AppRoutes + ProtectedRoute
├── store/           # Redux store & slices
└── assets/          # Images & banners
```

## 📸 Screenshots

*(Yahan apni app ke screenshots lagayein)*

---

Made with ❤️ using React & Tailwind CSS