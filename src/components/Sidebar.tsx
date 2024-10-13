import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

interface Category {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axiosClient.get("/categories");
      console.log(response); 


      const data = response.data || response; 

      if (Array.isArray(data)) {
        setCategories(data as Category[]);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.log("🚀 ~ createTodo ~ error:", error);
    }
  };

  return (
    <div className="w-full md:w-3/12">
      <div className="bg-blue-700 text-white text-xs font-bold px-2 py-2.5">
        SHOP BY CATEGORIES
      </div>
      <ul className="space-y-4 p-3 border bg-gray-100">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <li key={index} className="flex items-center text-sm font-medium">
              <div className="w-2 h-2 border border-violet-500 rounded-full mr-2"></div>
              {category.name}
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
