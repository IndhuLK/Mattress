import { useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Image,
  BarChart,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import AddProduct from "./AddProduct"; // ✅ import AddProduct component
import OrderManagement from "./OrderManagement";
import SliderManagement from "./SliderManagement";

const AdminDashboard = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activePage, setActivePage] = useState("Overview"); // track active page

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/admin/login"; // simple logout
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const navItems = [
    {
      name: "Products",
      icon: Package,
      submenu: [
        { name: "Add Product" },
        { name: "Product Management" },
      ],
    },
    { name: "Order Management", icon: ShoppingCart },
    { name: "Slider Management", icon: Image },
    { name: "Overview", icon: BarChart },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 shadow-xl">
        <h2 className="text-2xl font-bold text-[#3d5f12] mb-8 text-center">
          Admin Panel
        </h2>

        <nav className="flex-1 space-y-2">
          {navItems.map((item, index) => {
            const isOpen = openMenu === item.name;

            return (
              <div key={index}>
                {/* Parent menu */}
                <button
                  onClick={() =>
                    item.submenu ? toggleMenu(item.name) : setActivePage(item.name)
                  }
                  className={`w-full flex items-center justify-between p-3 rounded-lg font-medium transition text-left ${
                    activePage === item.name
                      ? "bg-[#745e46] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </div>
                  {item.submenu &&
                    (isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                </button>

                {/* Submenu */}
                {item.submenu && isOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.submenu.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePage(sub.name)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-md transition ${
                          activePage === sub.name
                            ? "bg-[#3d5f12] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center p-3 mt-4 text-sm font-medium cursor-pointer 
          text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-10">
        <header className="flex justify-between items-center pb-6 border-b border-gray-200 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{activePage}</h1>
          <button
            onClick={() => window.location.href = "/"}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            <Home className="w-4 h-4 mr-1" /> View Store
          </button>
        </header>

        {/* Conditional Rendering */}
        <div className="bg-white  rounded-xl shadow-lg">
          {activePage === "Overview" && (
            <>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Welcome to Admin Panel
              </h2>
              <p className="text-gray-600">
                Use the sidebar to manage your products, orders, sliders, and more.
              </p>
            </>
          )}

          {activePage === "Add Product" && <AddProduct />}

          {activePage === "Product Management" && (
            <p className="text-gray-600">Orders management table here.</p>
          )}

          {activePage === "Order Management" && <OrderManagement /> }

          {activePage === "Slider Management" && <SliderManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
