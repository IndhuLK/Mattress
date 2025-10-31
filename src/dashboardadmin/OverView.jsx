import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ShoppingBag, DollarSign } from "lucide-react";

const OverView = () => {
  const [selectedMonth, setSelectedMonth] = useState("October");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");

  const [filteredData, setFilteredData] = useState([]);
  const [stats, setStats] = useState({
    profit: 0,
    sales: 0,
    orders: 0,
  });

  // Mock data (you can replace this with API data later)
  const allData = [
    {
      year: "2025",
      month: "October",
      date: "10",
      profit: 125000,
      sales: 689000,
      orders: 300,
      chart: [
        { week: "Week 1", sales: 40 },
        { week: "Week 2", sales: 65 },
        { week: "Week 3", sales: 25 },
        { week: "Week 4", sales: 80 },
      ],
    },
    {
      year: "2025",
      month: "September",
      date: "20",
      profit: 99000,
      sales: 580000,
      orders: 260,
      chart: [
        { week: "Week 1", sales: 20 },
        { week: "Week 2", sales: 45 },
        { week: "Week 3", sales: 35 },
        { week: "Week 4", sales: 55 },
      ],
    },
    {
      year: "2024",
      month: "December",
      date: "5",
      profit: 87000,
      sales: 490000,
      orders: 220,
      chart: [
        { week: "Week 1", sales: 25 },
        { week: "Week 2", sales: 35 },
        { week: "Week 3", sales: 40 },
        { week: "Week 4", sales: 60 },
      ],
    },
  ];

  // Filter logic
  useEffect(() => {
    const filtered = allData.find(
      (d) =>
        d.year === selectedYear &&
        d.month === selectedMonth &&
        (selectedDate ? d.date === selectedDate : true)
    );

    if (filtered) {
      setFilteredData(filtered.chart);
      setStats({
        profit: filtered.profit,
        sales: filtered.sales,
        orders: filtered.orders,
      });
    } else {
      setFilteredData([]);
      setStats({ profit: 0, sales: 0, orders: 0 });
    }
  }, [selectedMonth, selectedDate, selectedYear]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* --- Top Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Profit */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex justify-between items-center border-t-4 border-green-500">
          <div>
            <h2 className="text-gray-600 font-medium">Total Profit</h2>
            <h1 className="text-2xl font-bold mt-1">
              ₹ {stats.profit.toLocaleString()}
            </h1>
            <p className="text-sm text-green-600 mt-1">
              ▲ Based on filters
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <DollarSign className="text-green-600" size={28} />
          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex justify-between items-center border-t-4 border-orange-500">
          <div>
            <h2 className="text-gray-600 font-medium">Total Sales</h2>
            <h1 className="text-2xl font-bold mt-1">
              ₹ {stats.sales.toLocaleString()}
            </h1>
            <p className="text-sm text-orange-600 mt-1">
              ▲ Based on filters
            </p>
          </div>
          <div className="p-3 bg-orange-100 rounded-full">
            <TrendingUp className="text-orange-500" size={28} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex justify-between items-center border-t-4 border-blue-500">
          <div>
            <h2 className="text-gray-600 font-medium">Total Orders</h2>
            <h1 className="text-2xl font-bold mt-1">{stats.orders}</h1>
            <p className="text-sm text-blue-600 mt-1">▲ Based on filters</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <ShoppingBag className="text-blue-500" size={28} />
          </div>
        </div>
      </div>

      {/* --- Sales Performance Chart --- */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <h2 className="text-xl font-semibold">Sales Performance</h2>

          <div className="flex gap-3 flex-wrap">
            {/* Month Dropdown */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Month</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>

            {/* Date Dropdown */}
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Date</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
            </select>

            {/* Year Dropdown */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Year</option>
              {Array.from({ length: 6 }, (_, i) => {
                const year = 2025 - i;
                return <option key={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#F97316"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverView;
