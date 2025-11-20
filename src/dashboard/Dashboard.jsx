import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  // Bar Chart Data
  const barData = [
    { name: "Users", value: 120 },
    { name: "Products", value: 85 },
    { name: "Orders", value: 50 },
    { name: "Revenue", value: 10000 },
  ];

  // Pie Chart Data
  const pieData = [
    { name: "Pending", value: 20 },
    { name: "Shipped", value: 15 },
    { name: "Delivered", value: 15 },
  ];

  const COLORS = ["#22c55e", "#0ea5e9", "#f97316"];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Welcome to Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-5 bg-green-500 text-white shadow rounded-lg text-center">
          <h3 className="text-lg">Total Users</h3>
          <p className="text-3xl font-bold">120</p>
        </div>

        <div className="p-5 bg-blue-500 text-white shadow rounded-lg text-center">
          <h3 className="text-lg">Products</h3>
          <p className="text-3xl font-bold">85</p>
        </div>

        <div className="p-5 bg-orange-500 text-white shadow rounded-lg text-center">
          <h3 className="text-lg">Orders</h3>
          <p className="text-3xl font-bold">50</p>
        </div>

        <div className="p-5 bg-purple-600 text-white shadow rounded-lg text-center">
          <h3 className="text-lg">Revenue</h3>
          <p className="text-3xl font-bold">$10k</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3">Business Stats</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
