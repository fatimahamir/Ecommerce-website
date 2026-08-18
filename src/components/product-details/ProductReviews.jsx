// src/components/product-details/ProductReviews.jsx
import React from "react";
import RatingStars from "../product-listing/RatingStars";

const ProductReviews = ({ reviews = [], averageRating = 0 }) => {
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percent };
  });

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
      <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-5">
        Customer reviews
      </h3>

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-6">
          Abhi tak koi review nahi hai.
        </p>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6 mb-6 pb-6 border-b border-gray-100">
            <div className="text-center md:text-left md:w-40 shrink-0">
              <p className="text-4xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </p>
              <div className="flex justify-center md:justify-start mt-1">
                <RatingStars rating={averageRating} />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {reviews.length} reviews
              </p>
            </div>

            <div className="flex-1 space-y-2">
              {distribution.map(({ star, count, percent }) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-6 text-gray-600 shrink-0">{star} ★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-gray-500">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review, i) => {
              const initials = review.reviewerName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              const dateStr = review.date
                ? new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "";

              return (
                <div
                  key={i}
                  className="border border-gray-100 rounded-lg p-4 hover:border-primary/40 hover:shadow-sm transition-all flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {review.reviewerName}
                      </p>
                      {dateStr && (
                        <span className="text-xs text-gray-400">{dateStr}</span>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <RatingStars rating={review.rating} />
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {review.comment}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductReviews;