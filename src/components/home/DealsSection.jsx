// src/components/home/DealsSection.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const getTargetTime = () => {
  const target = new Date();
  target.setDate(target.getDate() + 4);
  return target.getTime();
};

const useCountdown = () => {
  const [targetTime] = useState(getTargetTime());
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return timeLeft;
};

const DealsSection = ({ deals = [] }) => {
  const timeLeft = useCountdown();
  const navigate = useNavigate();

  const timerItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hour", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="border border-gray-200 rounded-lg bg-white px-4 no-scrollbar mx-3 xl:mx-0">
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6">
        <div className="flex items-center justify-between gap-4 lg:block shrink-0 p-1">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Deals and offers</h3>
            <p className="text-base text-gray-400 lg:mb-2">Hygiene equipments</p>
          </div>

          <div className="flex gap-2">
            {timerItems.map((item) => (
              <div
                key={item.label}
                className={`bg-gray-800 text-white text-sm font-medium w-9 h-9 rounded items-center justify-center ${
                  item.label === "Days" ? "hidden sm:flex" : "flex"
                }`}
              >
                {item.value}
              </div>
            ))}
          </div>
          <Link to="/deals" className="hidden lg:inline-flex text-sm font-medium text-white rounded-lg bg-gray-800 mt-8 hover:text-primary hover:bg-white p-2">
            View all deals
          </Link>
        </div>

        <div className="flex overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-5 divide-x divide-gray-200 flex-1 pb-2 lg:pb-0 no-scrollbar">
          {deals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => navigate(`/product/${deal.id}`)}
              className="flex flex-col items-center text-center cursor-pointer px-4 py-3 shrink-0 min-w-[140px] sm:min-w-[170px] lg:min-w-0 hover:bg-gray-50 transition-colors"
            >
              <img
                src={deal.image}
                alt={deal.name}
                className="w-24 h-24 sm:w-44 sm:h-44 object-contain mb-3"
              />
              <p className="text-sm text-gray-800 line-clamp-1 w-full">{deal.name}</p>
              <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full mt-2">
                -{deal.discount}%
              </span>
            </div>
          ))}
        </div>
        <Link to="/deals" className="md:hidden text-base font-medium text-primary hover:text-primary-dark mb-3">
          View all deals →
        </Link>
      </div>
    </div>
  );
};

export default DealsSection;