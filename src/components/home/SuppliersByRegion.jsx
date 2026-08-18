// src/components/home/SuppliersByRegion.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const flagUrl = (code) => `https://flagcdn.com/w40/${code}.png`;

const defaultSuppliers = [
  { id: 1, country: "Arabic Emirates", site: "shopname.ae", flag: "ae" },
  { id: 2, country: "Australia", site: "shopname.com.au", flag: "au" },
  { id: 3, country: "United States", site: "shopname.com", flag: "us" },
  { id: 4, country: "Russia", site: "shopname.ru", flag: "ru" },
  { id: 5, country: "Italy", site: "shopname.it", flag: "it" },
  { id: 6, country: "Denmark", site: "denmark.com.dk", flag: "dk" },
  { id: 7, country: "France", site: "shopname.com.fr", flag: "fr" },
  { id: 8, country: "Arabic Emirates", site: "shopname.ae", flag: "ae" },
  { id: 9, country: "China", site: "shopname.cn", flag: "cn" },
  { id: 10, country: "Great Britain", site: "shopname.co.uk", flag: "gb" },
];

const SuppliersByRegion = ({
  title = "Suppliers by region",
  suppliers = defaultSuppliers,
}) => {
  const navigate = useNavigate();

  return (
    <section className="hidden md:block my-2 mx-3 xl:mx-0">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

      <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            onClick={() => navigate("/products")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img
              src={flagUrl(supplier.flag)}
              alt={supplier.country}
              className="w-7 h-5 object-cover rounded-sm shadow-sm shrink-0"
            />

            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-1">
                {supplier.country}
              </p>
              <p className="text-[11px] text-gray-400 line-clamp-1">{supplier.site}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuppliersByRegion;