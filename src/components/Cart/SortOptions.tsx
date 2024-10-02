// src/components/SortOptions.tsx
import React from "react";

interface SortOptionsProps {
  onSort: (sortKey: string, order: "asc" | "desc") => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSort }) => {
  return (
    <div className="mb-4">
      <label className="mr-2">Sort by:</label>
      <select
        onChange={(e) => {
          const [key, order] = e.target.value.split(",");
          onSort(key, order as "asc" | "desc");
        }}
        defaultValue="quantity,asc" // Giá trị mặc định
      >
        <option value="quantity,asc">Quantity (Low to High)</option>
        <option value="quantity,desc">Quantity (High to Low)</option>
        <option value="price,asc">Price (Low to High)</option>
        <option value="price,desc">Price (High to Low)</option>
        <option value="name,asc">Name (Low to High)</option>
        <option value="name,desc">Name (High to Low)</option>
      </select>
    </div>
  );
};

export default SortOptions;
