import React from "react";
import HeroImage from "../assets/HeroImage3.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative mt-8 h-96 md:w-9/12 md:mt-0">
      <img
        src={HeroImage}
        alt="Hero"
        className="w-full h-full object-cover rounded-lg shadow-md"
      />
      <div className="absolute top-28 left-8">
        <h2 className="text-4xl text-violet-600 font-bold">WELCOME TO SHOP</h2>
        <p className="text-xl text-violet-700 font-bold mt-2.5">
          MILION$ PRODUCTS
        </p>
        <Link to="/shop">
          <button className="bg-blue-500 px-8 py-1.5 text-white mt-4 hover:bg-blue-700 transform transition-transform duration-300 hover:scale-105">
            SHOP NOW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
