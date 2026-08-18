// src/components/home/HeroSection.jsx
import React from "react";
import CategorySidebar from "./CategorySidebar";
import HeroBanner from "./HeroBanner";
import PromoPanel from "./PromoPanel";
import CategoryPills from "../layouts/CategoryPills";
import bannerImg from "../../assets/images/hero1.png";

const HeroSection = () => {
  return (
    <section className="w-full max-w-[1340px] mx-auto px-3 lg:px-2 py-2 rounded-lg border-gray-200 bg-white  overflow-x-hidden">
      <div className="lg:hidden flex flex-col gap-3">
        <CategoryPills />
        <HeroBanner image={bannerImg} />
      </div>

      <div className="hidden lg:flex items-stretch gap-2">
        <div className="w-[17%] shrink-0">
          <CategorySidebar />
        </div>

        <div className="w-[64%]">
          <HeroBanner image={bannerImg} />
        </div>

        <div className="w-[18%] shrink-0">
          <PromoPanel />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;