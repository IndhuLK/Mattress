import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FilterSection from "../../components/FilterSection";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "/src/dashboardadmin/ProductContext"; // ✅ Added for context
import mattress from "/src/assets/img1.jpg";
import { useNavigate, useLocation } from "react-router-dom";

// ✅ Product base data — only essential info
const baseProducts = [
  {
    id: 1,
    title: "Therapeutic Memory Foam",
    numericPrice: 949,
    image: mattress,
    brand: "Super Mattress",
    size: "King",
    description:
      "Relieves back pain and supports spine alignment. Premium memory foam layers provide a restful sleep experience.",
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: 2,
    title: "Premium Innerspring Twin",
    numericPrice: 599,
    image: "/images/innerspring.jpg",
    brand: "CozyRest",
    size: "Queen",
    description:
      "A bouncy and supportive innerspring design with soft cushioning for superior comfort.",
    rating: 4.2,
    reviewCount: 80,
  },
  {
    id: 3,
    title: "EcoFoam Natural Latex",
    numericPrice: 1199,
    image: "/images/latex.jpg",
    brand: "GreenDream",
    size: "King",
    description:
      "Crafted from 100% natural latex. Eco-friendly, breathable, and offers firm support.",
    rating: 4.7,
    reviewCount: 95,
  },
  {
    id: 4,
    title: "Orthopedic Comfort Mattress",
    numericPrice: 899,
    image: "/images/orthopedic.jpg",
    brand: "OrthoPlus",
    size: "Queen",
    description:
      "Engineered for spinal support with firm orthopedic layers that relieve body pressure points.",
    rating: 4.6,
    reviewCount: 140,
  },
];

// 🧩 Utility: Generate slug from title
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const ProductPage = () => {
  const { products: addedProducts, addProduct } = useProducts();
  const navigate = useNavigate(); // ✅ new context products
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");
  const [visibleCount, setVisibleCount] = useState(9);
  const { pathname } = useLocation(); // 👈 track route


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 scrolls when route changes
  }, [pathname]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  // ✅ Combine base + added products
  const combinedProducts = [...baseProducts, ...addedProducts];

  // 🧮 Final Products with auto-calculated fields
  const products = combinedProducts.map((p, index) => {
    const numeric = p.numericPrice || parseFloat(p.price) || 0;
    const oldNumeric = Math.round(numeric * 1.25);
    const slug =
      p.sku || `${slugify(p.title || "product")}-${numeric}-${p.size || "na"}`;

    return {
      ...p,
      id: p.id || index + 1,
      numericPrice: numeric,
      price: typeof p.price === "string" ? p.price : `₹ ${numeric.toFixed(2)}`,
      oldPrice:
        typeof p.oldPrice === "string"
          ? p.oldPrice
          : `₹ ${oldNumeric.toFixed(2)}`,
      sku: slug,
    };
  });

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "Price: Low to High")
      return a.numericPrice - b.numericPrice;
    if (sortOption === "Price: High to Low")
      return b.numericPrice - a.numericPrice;
    if (sortOption === "Alphabetical (A–Z)")
      return a.title.localeCompare(b.title);
    return b.id - a.id;
  });

  // Infinite scroll
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
      <FilterSection filterOpen={filterOpen} setFilterOpen={setFilterOpen} />

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

        {/* Sort Bar */}
        <h1 className="md:text-3xl text-xl text-[#3d5f12] font-bold mb-5 ">Mattress</h1>
        <div
          className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-3 mb-3"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort by:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none
               focus:ring-2 focus:ring-[#4e7265]"
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
              className="group relative border border-[#bee4d5] rounded-2xl overflow-hidden shadow-sm
              hover:shadow-md transition bg-white transform hover:-translate-y-1 hover:scale-[1.02]
              duration-500"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* 🏷️ Discount badge */}
                <div
                  className="absolute top-1 left-0 text-[#f70808] text-sm font-semibold px-2 py-1 
                      rounded bg-cover bg-center flex items-center justify-center"
                  style={{
                    backgroundImage: "url('/src/assets/cloud-im.png')",
                    width: "85px",
                    height: "45px",
                  }}
                >
                  {Math.round(
                    ((parseFloat(product.oldPrice.replace(/[₹ ,]/g, "")) -
                      product.numericPrice) /
                      parseFloat(product.oldPrice.replace(/[₹ ,]/g, ""))) *
                      100
                  )}
                  % OFF
                </div>
              </div>

              {/* Product Info */}
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

                {/* Price Display */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[#3d5f12] font-bold text-lg">
                    {product.price}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    {product.oldPrice}
                  </span>
                </div>

                {/* 🛒 Shop Button */}
                <button
  onClick={() => {
    // 1️⃣ Add product to context if not already present
    const exists = addedProducts.find((p) => p.sku === product.sku);
    if (!exists) addProduct(product);

    window.scrollTo({ top: 0, behavior: "smooth" });

    // 2️⃣ Navigate to ProductDetail page
    navigate(`/mattress/${product.sku}`, { state: { product } });
  }}
  className="flex items-center justify-center gap-2 mt-4 border 
    border-[#4e7265] px-4 py-1 rounded-md hover:bg-[#3d5f12] bg-[#745e46] 
    transition text-white text-sm font-semibold cursor-pointer shadow-[#4e7265]
    shadow-xs"
>
  <ShoppingCart className="w-3 h-3 text-white" /> Shop Now
</button>

              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {visibleCount < sortedProducts.length && (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#745e46] border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
