// src/components/SortOptions.tsx
import React from "react";

interface SortOptionsProps {
  onSort: (sortKey: string, order: "asc" | "desc") => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSort }) => {
  return (
    <div className="mb-4">
      <label className="mr-2">Sắp xếp theo:</label>
      <select
        onChange={(e) => {
          const [key, order] = e.target.value.split(",");
          onSort(key, order as "asc" | "desc");
        }}
        defaultValue="quantity,asc" // Giá trị mặc định
      >
        <option value="quantity,asc">Số lượng (Tăng dần)</option>
        <option value="quantity,desc">Số lượng (Giảm dần)</option>
        <option value="price,asc">Giá (Tăng dần)</option>
        <option value="price,desc">Giá (Giảm dần)</option>
        <option value="name,asc">Tên (Tăng dần)</option>
        <option value="name,desc">Tên (Giảm dần)</option>
      </select>
    </div>
  );
};

export default SortOptions;
