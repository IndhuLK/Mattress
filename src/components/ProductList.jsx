import React, { useState } from "react";
import FilterSection from "./FilterSection";
import productsData from "./productsData.json"; // or Firebase data

const ProductList = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleFilterApply = (filters) => {
    const newFiltered = productsData.filter((p) => {
      const priceOK = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const firmnessOK = !filters.firmness || p.firmness === filters.firmness;
      const sizeOK = !filters.size || p.size === filters.size;
      const typeOK = filters.types.length === 0 || filters.types.includes(p.type);
      const availabilityOK =
        filters.availability === "In stock"
          ? p.stock > 0
          : filters.availability === "Out of stock"
          ? p.stock === 0
          : true;

      return priceOK && firmnessOK && sizeOK && typeOK && availabilityOK;
    });
    setFilteredProducts(newFiltered);
  };

  return (
    <div className="flex">
      <FilterSection
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        onFilterApply={handleFilterApply}
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {filteredProducts.length ? (
          filteredProducts.map((p, i) => (
            <div
              key={i}
              className="border p-3 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="font-semibold mt-2">{p.title}</h3>
              <p className="text-sm text-gray-500">₹{p.price}</p>
              <p className="text-xs text-gray-400">{p.type}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
