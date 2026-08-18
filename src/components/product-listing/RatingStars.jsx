
import React from "react";

const RatingStars = ({ rating, count }) => (
  <div className="flex items-center gap-1.5 mt-1">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-orange-400" : "text-gray-300"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
    <span className="text-xs text-gray-500">{rating}</span>
    {count !== undefined && <span className="text-xs text-gray-400">| {count} reviews</span>}
  </div>
);

export default RatingStars;