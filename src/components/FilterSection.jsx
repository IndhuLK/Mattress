import React, { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const FilterSection = ({ filterOpen, setFilterOpen }) => {
  // State to control each dropdown
  const [openSections, setOpenSections] = useState({
    availability: true,
    price: true, 
    firmness: true,
    size: true,
    type: true,
  });

  // Toggle function
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div
      className={`fixed md:static top-0 left-0 h-full md:h-auto bg-white shadow-md
         md:shadow-none z-50 transition-transform duration-300 ease-in-out ${
           filterOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
         } w-64 md:w-1/4 p-5 overflow-y-auto`}
    >
      {/* Mobile Close Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold">FILTER</h2>
        <button
          className="md:hidden text-gray-600"
          onClick={() => setFilterOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* -------- Availability -------- */}
      <div className="mb-4 border-b pb-2 border-gray-200">
        <button
          onClick={() => toggleSection("availability")}
          className="w-full flex justify-between items-center text-left font-medium
          text-sm"
        >
          <span>AVAILABILITY</span>
          {openSections.availability ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {openSections.availability && (
          <div className="mt-2 space-y-1 text-xs">
            <label className="flex items-center gap-2">
              <input type="radio" name="stock" defaultChecked />
              In stock{" "}
              <span className="text-gray-400 text-sm ml-auto">(24)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="stock" />
              Out of stock{" "}
              <span className="text-gray-400 text-sm ml-auto">(0)</span>
            </label>
          </div>
        )}
      </div>

      {/* -------- Price -------- */}
      <div className="mb-4 border-b pb-2 border-gray-200 ">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex justify-between items-center text-left font-medium
          text-sm"
        >
          <span>PRICE</span>
          {openSections.price ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {openSections.price && (
          <div className="mt-2 space-y-1 text-xs">
            {[
              "Under ₹41,500",
              "₹41,500 - ₹83,000",
              "₹83,000 - ₹1,24,500",
              "Over ₹1,24,500",
            ].map((price, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="radio" name="price" />
                {price}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* -------- Firmness -------- */}
      <div className="mb-4 border-b pb-2 border-gray-200">
        <button
          onClick={() => toggleSection("firmness")}
          className="w-full flex justify-between items-center text-left font-medium
          text-sm"
        >
          <span>FIRMNESS</span>
          {openSections.firmness ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {openSections.firmness && (
          <div className="mt-2 space-y-1 text-xs">
            {["Soft", "Medium", "Firm"].map((level, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="radio" name="firmness" />
                {level}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* -------- Size -------- */}
      <div className="mb-4 border-b pb-2 border-gray-200">
        <button
          onClick={() => toggleSection("size")}
          className="w-full flex justify-between items-center text-left font-medium
          text-sm"
        >
          <span>SIZE</span>
          {openSections.size ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {openSections.size && (
          <div className="mt-2 space-y-1 text-xs">
            {["Twin", "Full", "Queen", "King", "California King"].map(
              (size, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="radio" name="size" />
                  {size}
                </label>
              )
            )}
          </div>
        )}
      </div>

      {/* -------- Type -------- */}
      <div className="mb-4 border-b pb-2 border-gray-200">
        <button
          onClick={() => toggleSection("type")}
          className="w-full flex justify-between items-center text-left font-medium text-sm"
        >
          <span>TYPE</span>
          {openSections.type ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        {openSections.type && (
          <div className="mt-2 space-y-1 text-xs">
            {["Memory Foam", "Hybrid", "Innerspring", "Latex"].map(
              (type, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="checkbox" />
                  {type}
                </label>
              )
            )}
          </div>
        )}
      </div>

      {/* -------- Clear Filters -------- */}
      <div className="pt-3">
        <button
          onClick={() => window.location.reload()}
          className="w-full border border-gray-400 text-gray-700 rounded-md py-2 hover:bg-gray-100 transition"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
