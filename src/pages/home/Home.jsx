
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";
import HeroSection from "../../components/home/HeroSection";
import DealsSection from "../../components/home/DealsSection";
import CategoryPromoGrid from "../../components/home/CategoryPromoGrid";
import SendQuoteSection from "../../components/home/SendQuoteSection";
import RecommendedItems from "../../components/home/RecommendedItems";
import ExtraServices from "../../components/home/ExtraServices";
import SuppliersByRegion from "../../components/home/SuppliersByRegion";
import homeOutdoorBanner from "../../assets/images/gadgets.png";
import electronicsBanner from "../../assets/images/homeout.png";

const mapProduct = (p) => ({
  id: p.id,
  image: p.thumbnail,
  name: p.title,
  price: p.price,
});

const fillUpTo = (categoryProducts, allProducts, count, excludeIds) => {
  if (categoryProducts.length >= count) {
    return categoryProducts.slice(0, count);
  }

  const remaining = count - categoryProducts.length;
  const fillers = allProducts
    .filter((p) => !excludeIds.includes(p.id))
    .slice(0, remaining);

  return [...categoryProducts, ...fillers];
};

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;
  }

  const dealsProducts = [...products]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      image: p.thumbnail,
      name: p.title,
      discount: Math.round(p.discountPercentage),
    }));

  const homeOutdoorRaw = products.filter(
    (p) => p.category === "furniture" || p.category === "home-decoration"
  );
  const homeOutdoorProducts = fillUpTo(
    homeOutdoorRaw,
    products,
    8,
    homeOutdoorRaw.map((p) => p.id)
  ).map(mapProduct);

  const electronicsRaw = products.filter(
    (p) =>
      p.category === "smartphones" ||
      p.category === "laptops" ||
      p.category === "mobile-accessories"
  );
  const electronicsProducts = fillUpTo(
    electronicsRaw,
    products,
    8,
    electronicsRaw.map((p) => p.id)
  ).map(mapProduct);

  const recommendedProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)
    .map((p) => ({
      id: p.id,
      image: p.thumbnail,
      price: p.price,
      name: p.description,
    }));

  return (
    <div className="max-w-[1340px] mx-auto mt-2 flex flex-col gap-4">
      <HeroSection />
      <DealsSection deals={dealsProducts} />
      <CategoryPromoGrid
        title="Home and outdoor"
        bgImage={homeOutdoorBanner}
        products={homeOutdoorProducts}
      />
      <CategoryPromoGrid
        title="Consumer electronics and gadgets"
        bgImage={electronicsBanner}
        products={electronicsProducts}
      />
      <SendQuoteSection />
      <RecommendedItems products={recommendedProducts} />
      <ExtraServices />
      <SuppliersByRegion />
    </div>
  );
};

export default Home;