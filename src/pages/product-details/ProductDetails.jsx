// src/pages/product-details/ProductDetails.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/product-listing/Breadcrumb";
import ProductGallery from "../../components/product-details/ProductGallery";
import ProductInfo from "../../components/product-details/ProductInfo";
import ProductTabs from "../../components/product-details/ProductTabs";
import YouMayLike from "../../components/product-details/YouMayLike";
import ProductReviews from "../../components/product-details/ProductReviews";
import RelatedProducts from "../../components/product-details/RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const { items: products } = useSelector((state) => state.products);
  const product = products.find((p) => p.id === Number(id)) || products[0];

  if (!product) {
    return (
      <div className="max-w-[1340px] mx-auto px-4 mt-10 text-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id);
  const youMayLike = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-[1340px] mx-auto px-4 mt-4 flex flex-col gap-4">
      <Breadcrumb />

      <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductGallery images={product.images} discount={product.discountPercentage} />
        <ProductInfo product={product} />
      </div>

      <div className="hidden lg:flex gap-4 items-start">
        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6">
          <ProductTabs product={product} />
        </div>
        <aside className="w-64 shrink-0 bg-white border border-gray-200 rounded-lg p-4">
          <YouMayLike products={youMayLike} />
        </aside>
      </div>

      <ProductReviews
        reviews={product.reviews || []}
        averageRating={product.rating}
      />

      <RelatedProducts products={related.length ? related : products} />
    </div>
  );
};

export default ProductDetails;