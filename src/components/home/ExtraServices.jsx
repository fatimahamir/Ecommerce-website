// src/components/home/ExtraServices.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const defaultServices = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=60",
    title: "Source from Industry Hubs",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=60",
    title: "Customize Your Products",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=60",
    title: "Fast, reliable shipping by ocean or air",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.769 59.769 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=60",
    title: "Product monitoring and inspection",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

const ExtraServices = ({ title = "Our extra services", services = defaultServices }) => {
  const navigate = useNavigate();

  return (
    <section className="hidden md:block mx-3 xl:mx-0">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => navigate("/products")}
            className="bg-white border border-gray-200 pb-2 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-24 lg:h-28 object-cover"
            />

            <div className="p-3 flex items-start justify-between gap-2">
              <p className="text-base text-gray-800 leading-relaxed font-medium">{service.title}</p>
              <div className="w-10 h-10 -mt-8 shrink-0 rounded-full bg-primary-light text-primary flex items-center justify-center shadow-sm">
                {service.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExtraServices;