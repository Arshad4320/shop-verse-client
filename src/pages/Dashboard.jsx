import React from "react";
import DashboardLayout from "../Layout/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded">Total Users: 120</div>
        <div className="p-4 bg-white shadow rounded">Products: 85</div>
        <div className="p-4 bg-white shadow rounded">Orders: 50</div>
        <div className="p-4 bg-white shadow rounded">Revenue: $10k</div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
