import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FilterSection from "../../components/FilterSection";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "/src/config/firebase";
import { collection, getDocs } from "firebase/firestore";

// 🧩 Utility: Generate slug from title
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const PillowPage = () => {
  const [firebaseProducts, setFirebaseProducts] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");
  const [visibleCount, setVisibleCount] = useState(9);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // ✅ Filters
  const [filters, setFilters] = useState({
    availability: "all",
    minPrice: 0,
    maxPrice: 75000,
    firmness: "",
    size: "",
    type: [],
  });

  // ✅ Fetch Firebase pillow products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pillowProducts"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFirebaseProducts(products);
      } catch (error) {
        console.error("Error fetching Firebase pillow products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // 🧮 Prepare product data
  const combinedProducts = firebaseProducts.map((p, index) => {
    const numeric = p.numericPrice || parseFloat(p.price) || 0;
    const oldNumeric = Math.round(numeric * 1.25);
    const slug =
      p.sku ||
      `${slugify(p.title || "pillow")}-${numeric}-${p.size || "na"}`;

    return {
      ...p,
      id: p.id || index + 1,
      numericPrice: numeric,
      price: `₹ ${numeric.toFixed(2)}`,
      oldPrice: `₹ ${oldNumeric.toFixed(2)}`,
      sku: slug,
    };
  });

  // 🎯 Apply filters
  const filteredProducts = combinedProducts.filter((product) => {
    // Availability
    if (filters.availability === "in-stock" && product.stock === 0)
      return false;

    // Price range
    if (
      product.numericPrice < filters.minPrice ||
      product.numericPrice > filters.maxPrice
    )
      return false;

    // Firmness
    if (
      filters.firmness &&
      String(product.firmness || "")
        .toLowerCase()
        .trim() !== filters.firmness.toLowerCase().trim()
    )
      return false;

    // Size
    if (
      filters.size &&
      String(product.size || "")
        .toLowerCase()
        .trim() !== filters.size.toLowerCase().trim()
    )
      return false;

    // Type (multiple)
    if (
      filters.type.length > 0 &&
      !filters.type.some(
        (t) =>
          t.toLowerCase().trim() ===
          String(product.type || "").toLowerCase().trim()
      )
    )
      return false;

    return true;
  });

  // 🧠 Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Price: Low to High")
      return a.numericPrice - b.numericPrice;
    if (sortOption === "Price: High to Low")
      return b.numericPrice - a.numericPrice;
    if (sortOption === "Alphabetical (A–Z)") return a.title.localeCompare(b.title);
    return b.id - a.id;
  });

  // 🌀 Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisibleCount((prev) =>
          prev < sortedProducts.length ? prev + 9 : prev
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sortedProducts.length]);

  return (
    <div className="flex flex-col md:flex-row w-full p-6 gap-6">
      {/* Sidebar */}
      <FilterSection
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Mobile Filter Button */}
        <button
          className="md:hidden bg-gray-900 text-white px-4 py-2 rounded-md w-fit"
          onClick={() => setFilterOpen(!filterOpen)}
          data-aos="fade-down"
        >
          {filterOpen ? "Close Filters" : "Show Filters"}
        </button>

        {/* Sort Header */}
        <h1 className="md:text-3xl text-xl text-[#3d5f12] font-bold mb-5">
          Pillow
        </h1>
        <div
          className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-3 mb-3"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort by:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#4e7265]"
            >
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Alphabetical (A–Z)</option>
            </select>
          </div>
          <p className="text-sm text-gray-500">
            {sortedProducts.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {sortedProducts.slice(0, visibleCount).map((product, index) => (
            <div
              key={product.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="group relative border border-[#bee4d5] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition bg-white transform hover:-translate-y-1 hover:scale-[1.02] duration-500"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl || product.image}
                  alt={product.title}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2 bg-teal-700 text-white text-sm font-semibold px-3 py-1 rounded-lg flex items-center justify-center shadow-md">
                  {Math.round(
                    ((parseFloat(product.oldPrice.replace(/[₹ ,]/g, "")) -
                      product.numericPrice) /
                      parseFloat(product.oldPrice.replace(/[₹ ,]/g, ""))) *
                      100
                  )}
                  % OFF
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col items-center text-center">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <div className="flex items-center gap-1 text-yellow-400 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.round(product.rating) ? "#facc15" : "none"}
                    />
                  ))}
                  <span className="text-gray-500 text-sm ml-1">
                    ({product.reviewCount || 0})
                  </span>
                </div>

                {/* Price */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[#3d5f12] font-bold text-lg">
                    {product.price}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    {product.oldPrice}
                  </span>
                </div>

                {/* Button */}
                <button
                  onClick={() => navigate(`/pillow/${product.sku}`)}
                  className="flex items-center justify-center gap-2 mt-4 border border-[#4e7265] px-4 py-1 rounded-md hover:bg-[#3d5f12] bg-[#745e46] transition text-white text-sm font-semibold cursor-pointer shadow-[#4e7265] shadow-xs"
                >
                  <ShoppingCart className="w-3 h-3 text-white" /> Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Spinner */}
        {visibleCount < sortedProducts.length && (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#745e46] border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PillowPage;
