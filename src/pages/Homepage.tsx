import React from "react";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import InforSection from "../components/InforSection";
import Categories from "../components/Categories";
import ProductCard from "../components/Cart/ProductCard";
import ProductCarousel from "../components/Cart/ProductCarousel";

const Homepage = () => {
  return (
    <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
      <div className="container mx-auto py-4 flex flex-col md:flex-row space-x-2">
        <Sidebar />
        <Hero />
      </div>
      <div>
        <InforSection />
      </div>
      <div>
        <Categories />
      </div>
      <div>
        {/* <ProductCard title="Top Product" /> */}
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Homepage;
