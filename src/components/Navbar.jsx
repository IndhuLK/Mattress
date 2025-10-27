// src/pages/OrderManagement.jsx (or wherever your Navbar is)
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import Logo from "/src/assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false); // for mobile submenu // ✅ Updated nav links

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

  const handleMenuClick = () => setIsOpen(false);

  return (
    <header className="w-full shadow-md">
      {/* 🔷 Top Offer Bar */}
      <div className="bg-[#745e46] text-white font-bold text-center text-md py-2 overflow-hidden">
        <marquee behavior="scroll" direction="left" scrollamount="6">
          Bring Home Comfort This Diwali — Up to ₹5,000 Off!
        </marquee>
      </div>
      {/* 🔹 Main Navbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white relative">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="h-20 w-20" />
        </Link>
        {/* Desktop Menu - ***FIX APPLIED HERE*** */}
        <nav className="hidden md:flex items-center gap-8 text-gray-800 font-medium relative z-10">
          {navLinks.map((link, index) =>
            link.submenu ? (
              <div key={index} className="relative group">
                <button
                  className="flex items-center gap-1 text-[#36491f] hover:text-[#745e46] transition py-3" // Added py-3 for padding
                >
                  {link.name}

                  <ChevronDown size={16} className="mt-[2px]" />
                </button>

                {/* Submenu - Removed mt-2, using absolute positioning */}

                <div
                  className="absolute left-0 top-[100%] hidden group-hover:block bg-white shadow-lg border border-gray-100 rounded-md py-1 w-40 z-[99]" // Increased z-index, used shadow-lg
                >
                  {link.submenu.map((sub, i) => (
                    <Link
                      key={i}
                      to={sub.path}
                      onClick={handleMenuClick}
                      className="block px-4 py-2 text-sm text-[#36491f] hover:bg-gray-100 hover:text-[#745e46] whitespace-nowrap"
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
                className="cursor-pointer text-[#36491f] hover:text-[#745e46] transition"
              >
                {link.name}
              </Link>
            )
          )}
        </nav>
        {/* ... Rest of the component remains the same ... */}
        {/* Right Icons */}
        <div className="flex items-center gap-4 text-gray-700">
          {/* Search Box */}
          <div className="flex items-center gap-2 border border-[#4e7265] rounded-md px-3 py-1 w-22 sm:w-64 md:w-62 shadow-xs shadow-[#4e7265]">
            <Search size={20} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm w-full"
            />
          </div>
          <User className="cursor-pointer text-[#36491f]" size={20} />

          <ShoppingCart className="cursor-pointer text-[#36491f]" size={20} />
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {/* Mobile Menu */}
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
                  className="py-2 w-full text-[#5e782d] font-medium border-b border-gray-100 cursor-pointer hover:text-[#745e46] transition"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
