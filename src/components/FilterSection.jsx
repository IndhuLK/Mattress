import React, { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const FilterSection = ({ filterOpen, setFilterOpen, filters, setFilters }) => {
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const [tempFirmness, setTempFirmness] = useState(filters.firmness);
  const [tempSize, setTempSize] = useState(filters.size);
  const [tempType, setTempType] = useState(filters.type);

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
          <div className="mt-2 space-y-2 text-xs">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="stock" 
                checked={filters.availability === "in-stock"}
                onChange={() => setFilters({...filters, availability: "in-stock"})}
              />
              In stock
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="stock" 
                checked={filters.availability === "all"}
                onChange={() => setFilters({...filters, availability: "all"})}
              />
              All products
            </label>
          </div>
        )}
      </div>

      {/* -------- Price -------- */}
      <div className="mb-4 border-b pb-2 border-gray-200">
        <button
          onClick={() => toggleSection("price")}
          className="w-full flex justify-between items-center text-left font-medium text-sm"
        >
          <span>PRICE</span>
          {openSections.price ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>

        {openSections.price && (
          <div className="mt-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-[#3d5f12] text-center mb-3">
              PRICE RANGE
            </h3>

            {/* Input boxes */}
            <div className="flex justify-center items-center gap-3 mb-3">
              <div className="flex flex-col items-center">
                <label className="text-[10px] text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  min="0"
                  max="100000"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(
                      Math.min(Number(e.target.value), maxPrice - 1000)
                    )
                  }
                  className="w-20 border border-gray-300 rounded-md text-center py-1 text-xs focus:ring-2 focus:ring-[#3d5f12] outline-none"
                />
              </div>

              <span className="text-gray-500 font-medium text-sm">—</span>

              <div className="flex flex-col items-center">
                <label className="text-[10px] text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  min="0"
                  max="100000"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      Math.max(Number(e.target.value), minPrice + 1000)
                    )
                  }
                  className="w-20 border border-gray-300 rounded-md text-center py-1 text-xs focus:ring-2 focus:ring-[#3d5f12] outline-none"
                />
              </div>
            </div>

            {/* Range slider */}
            <div className="relative w-full h-2 mb-4">
              <div className="absolute w-full h-2 bg-gray-200 rounded-lg"></div>
              <div
                className="absolute h-2 bg-[#3d5f12] rounded-lg"
                style={{
                  left: `${(minPrice / 100000) * 100}%`,
                  right: `${100 - (maxPrice / 100000) * 100}%`,
                }}
              ></div>
              <input
                type="range"
                min="0"
                max="100000"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 1000))
                }
                className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer accent-[#3d5f12]"
              />
              <input
                type="range"
                min="0"
                max="100000"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 1000))
                }
                className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer accent-[#3d5f12]"
              />
            </div>

            {/* Apply Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setFilters({...filters, minPrice, maxPrice});
                }}
                className="bg-[#3d5f12] text-white px-5 py-1.5 rounded-lg text-xs font-medium hover:bg-[#2d460f] transition"
              >
                Apply Price
              </button>
            </div>
          </div>
        )}
      </div>

      {/* -------- Firmness -------- 
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
          <div className="mt-2 space-y-2 text-xs">
            {["Soft", "Medium", "Firm"].map((level, i) => (
              <label key={i} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="firmness" 
                  checked={tempFirmness === level}
                  onChange={() => setTempFirmness(level)}
                />
                {level}
              </label>
            ))}
            <button
              onClick={() => setFilters({...filters, firmness: tempFirmness})}
              className="w-full bg-[#3d5f12] text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-[#2d460f] transition mt-2"
            >
              Apply Firmness
            </button>
          </div>
        )}
      </div>*/}

      {/* -------- Size (MULTIPLE SELECT) -------- */}
<div className="mb-4 border-b pb-2 border-gray-200">
  <button
    onClick={() => toggleSection("size")}
    className="w-full flex justify-between items-center text-left font-medium text-sm"
  >
    <span>SIZE</span>
    {openSections.size ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
  </button>

  {openSections.size && (
    <div className="mt-2 space-y-2 text-xs">
      {["Twin", "Full", "Queen", "King", "California King"].map((size, i) => (
        <label key={i} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={tempSize.includes(size)}
            onChange={(e) => {
              if (e.target.checked) {
                setTempSize([...tempSize, size]);
              } else {
                setTempSize(tempSize.filter((s) => s !== size));
              }
            }}
          />
          {size}
        </label>
      ))}

      <button
        onClick={() => setFilters({ ...filters, size: tempSize })}
        className="w-full bg-[#3d5f12] text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-[#2d460f] transition mt-2"
      >
        Apply Size
      </button>
    </div>
  )}
</div>


      {/* -------- Type --------
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
          <div className="mt-2 space-y-2 text-xs">
            {[
              "Memory Foam",
              "Hybrid",
              "Innerspring",
              "Latex",
              "Natural Fiber",
              "Coir",
            ].map((type, i) => (
              <label key={i} className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={tempType.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTempType([...tempType, type]);
                    } else {
                      setTempType(tempType.filter(t => t !== type));
                    }
                  }}
                />
                {type}
              </label>
            ))}
            <button
              onClick={() => setFilters({...filters, type: tempType})}
              className="w-full bg-[#3d5f12] text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-[#2d460f] transition mt-2"
            >
              Apply Type
            </button>
          </div>
        )}
      </div> */}

      {/* -------- Clear Filters -------- */}
      <div className="pt-3">
        <button
          onClick={() => {
            setFilters({
              availability: "all",
              minPrice: 0,
              maxPrice: 75000,
              firmness: "",
              size: "",
              type: []
            });
            setMinPrice(0);
            setMaxPrice(75000);
            setTempFirmness("");
            setTempSize("");
            setTempType([]);
          }}
          className="w-full border border-gray-400 text-gray-700 rounded-md py-2 hover:bg-gray-100 transition"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
