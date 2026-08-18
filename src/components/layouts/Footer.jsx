// src/components/layouts/Footer.jsx
import React from "react";

const linkColumns = [
  { title: "About", links: ["About Us", "Find store", "Categories", "Blogs"] },
  { title: "Partnership", links: ["About Us", "Find store", "Categories", "Blogs"] },
  { title: "Information", links: ["Help Center", "Money Refund", "Shipping", "Contact us"] },
  { title: "For users", links: ["Login", "Register", "Settings", "My Orders"] },
];

const socials = [
  {
    name: "Facebook",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    name: "Twitter",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    name: "LinkedIn",
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM6 9H2v12h4zM4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    name: "Instagram",
    path: "M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5zm-5 14a4 4 0 110-8 4 4 0 010 8zm5.5-9a1 1 0 110-2 1 1 0 010 2z",
  },
  {
    name: "YouTube",
    path: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.92 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-6">
      <div className="max-w-[1340px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
        <div className="col-span-2 md:col-span-4 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-primary">Shopora</span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-xs">
            Best information about the company gies here but now lorem ipsum is
          </p>

          <div className="flex gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {linkColumns.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">{column.title}</h4>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Get app</h4>
          <div className="flex flex-col gap-2">
            <a href="#" className="flex items-center gap-2 bg-black text-white rounded px-3 py-1.5 hover:bg-gray-800 transition-colors w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="flex flex-col leading-tight text-left">
                <span className="text-[9px] text-gray-300">Download on the</span>
                <span className="text-xs font-semibold">App Store</span>
              </span>
            </a>

            <a href="#" className="flex items-center gap-2 bg-black text-white rounded px-3 py-1.5 hover:bg-gray-800 transition-colors w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.25.92-.59 1.19l-2.29 1.32-2.5-2.51 2.5-2.51 2.29 1.32zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
              </svg>
              <span className="flex flex-col leading-tight text-left">
                <span className="text-[9px] text-gray-300">Get it on</span>
                <span className="text-xs font-semibold">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-[1340px] mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Shopora. All rights reserved.</p>

          <button className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-primary">
            <img
              src="https://flagcdn.com/w20/us.png"
              alt="US"
              className="w-5 h-3.5 object-cover rounded-sm"
            />
            English
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;