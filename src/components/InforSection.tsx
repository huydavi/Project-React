import React from "react";
import { infoItems } from "../assets/Mockdata";

const InforSection = () => {
  return (
    <div className="bg-white pb-8 pt-12">
      <div className="mx-auto container grid grid-col-1 md:grid-col-2 lg:grid-cols-5 gap-4">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 border rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <span className="text-blue-600 text-xl">{item.icon}</span>
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InforSection;
