import React, { useState } from "react";
import AdminPage from "./AdminPage";
import AdminUser from "./AminUser";
import AdminOrder from "./AdminOrder";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("adminPage");

  const renderContent = () => {
    switch (activeTab) {
      case "adminPage":
        return <AdminPage />;
      case "adminUser":
        return <AdminUser />;
      case "adminOrder":
        return <AdminOrder />;
      default:
        return <AdminPage />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-blue-400 text-white w-full md:w-1/4 p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActiveTab("adminPage")}
                className="hover:underline focus:outline-none"
              >
                Admin Page
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActiveTab("adminUser")}
                className="hover:underline focus:outline-none"
              >
                Admin User
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActiveTab("adminOrder")}
                className="hover:underline focus:outline-none"
              >
                Admin Order
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default Admin;
