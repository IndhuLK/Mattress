// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Trash2,
} from "lucide-react";
import Logo from "/src/assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigate

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Product",
      submenu: [
        { name: "Mattress", path: "/mattress" },
        { name: "Pillow", path: "/pillow" },
      ],
    },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // ✅ Load cart on start
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ✅ Update cart when “cartUpdated” event triggered
  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    };

    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  const handleMenuClick = () => setIsOpen(false);

  const handleDeleteItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ✅ Navigate to product details when clicking inside cart
  const handleProductClick = (item) => {
    setCartOpen(false);
    if (item.type?.toLowerCase() === "pillow") {
      navigate(`/pillow/${item.sku}`);
    } else {
      navigate(`/mattress/${item.sku}`);
    }
  };

  return (
    <header className="w-full shadow-md relative">
      {/* 🔷 Offer Bar */}
      <div className="bg-[#745e46] text-white font-bold text-center text-md py-2 overflow-hidden">
        <marquee behavior="scroll" direction="left" scrollamount="6">
          Bring Home Comfort This Diwali — Up to ₹5,000 Off!
        </marquee>
      </div>

      {/* 🔹 Navbar Main */}
      <div className="flex items-center justify-between px-6 py-3 bg-white relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="h-20 w-20" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-800 font-medium relative z-10">
          {navLinks.map((link, index) =>
            link.submenu ? (
              <div key={index} className="relative group">
                <button className="flex items-center gap-1 text-[#36491f] hover:text-[#745e46] transition py-3 font-bold">
                  {link.name}
                  <ChevronDown size={16} className="mt-[2px]" />
                </button>
                <div className="absolute left-0 top-[100%] hidden group-hover:block bg-white shadow-lg border border-gray-100 rounded-md py-1 w-40 z-[99]">
                  {link.submenu.map((sub, i) => (
                    <Link
                      key={i}
                      to={sub.path}
                      onClick={handleMenuClick}
                      className="block px-4 py-2 text-sm text-[#36491f] hover:bg-gray-100 hover:text-[#745e46]"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={index}
                to={link.path}
                onClick={handleMenuClick}
                className="cursor-pointer text-[#36491f] hover:text-[#745e46] transition font-bold"
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-gray-700 relative">
          {/* Search */}
          <div className="flex items-center gap-2 border border-[#4e7265] rounded-md px-3 py-1 w-22 sm:w-64 shadow-xs shadow-[#4e7265] font-bold">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm w-full"
            />
          </div>

          <User className="cursor-pointer text-[#36491f]" size={24} />

          {/* Cart Icon with badge */}
          <div
            className="relative cursor-pointer"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <ShoppingCart className="text-[#36491f]" size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* 🔸 Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 md:hidden z-50">
            {navLinks.map((link, index) =>
              link.submenu ? (
                <div key={index} className="w-full">
                  <button
                    onClick={() => setIsProductOpen(!isProductOpen)}
                    className="py-2 w-full flex justify-between items-center text-[#5e782d] font-medium border-b border-gray-100"
                  >
                    {link.name}
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform ${
                        isProductOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isProductOpen && (
                    <div className="pl-4 flex flex-col">
                      {link.submenu.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          onClick={handleMenuClick}
                          className="py-2 text-[#36491f] text-sm border-b border-gray-100 hover:text-[#745e46]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  onClick={handleMenuClick}
                  className="py-2 w-full text-[#5e782d] font-medium border-b border-gray-100 cursor-pointer hover:text-[#745e46]"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
        )}
      </div>

      {/* 🔸 CART DRAWER */}
      {cartOpen && (
        <div className="absolute right-0 top-full bg-white shadow-xl border border-gray-200 
        w-80 max-h-[80vh] overflow-y-auto z-[9999] rounded-lg p-4">
          <h3 className="text-lg font-bold mb-3 text-[#36491f]">Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.sku}
                className="flex items-center justify-between mb-3 border-b pb-2 cursor-pointer
                 hover:bg-gray-50 rounded-md"
                onClick={() => handleProductClick(item)} // ✅ Added
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#36491f]">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600">₹{item.price}</p>
                  </div>
                </div>
                <Trash2
                  size={18}
                  className="text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ prevent navigation when deleting
                    handleDeleteItem(item.id);
                  }}
                />
              </div>
            ))
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
