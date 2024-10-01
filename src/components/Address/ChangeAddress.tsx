import React, { Dispatch, SetStateAction, useState } from "react";

interface ChangeAddressProps {
  setAddress: Dispatch<SetStateAction<string>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangeAddress: React.FC<ChangeAddressProps> = ({
  setAddress,
  setIsModalOpen,
}) => {
  const [newAddress, setNewAddress] = useState("");

  const onClose = () => {
    setAddress(newAddress);
    setIsModalOpen(false);
  };
  return (
    <div>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Enter new address"
        onChange={(e) => setNewAddress(e.target.value)}
      />
      <div className="justify-end flex">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default ChangeAddress;
