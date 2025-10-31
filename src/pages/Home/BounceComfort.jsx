import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, Check } from "lucide-react";
import image1 from "/src/assets/image1.jpg";
import image2 from "/src/assets/image2.jpg";
import image3 from "/src/assets/image3.jpg";
import image4 from "/src/assets/image4.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

// --- BounceComfort Card ---
const BounceComfort = ({
  image = "",
  name = "Product Name",
  price = 0,
  rating = 0,
  reviews = 0,
  features = [],
  badge = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white 
      border border-gray-200 transition-all duration-500 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? "translateY(-6px) scale(1.02)"
          : "translateY(0) scale(1)",
        transition: "all 0.3s ease-in-out",
      }}
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-duration="800"
      data-aos-once="true"
    >
       {/* Badge */}
{badge && (
  <div className="absolute top-4 left-4 z-10">
    <span
      className="inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold
      text-white bg-teal-700"
    >
      {badge}
    </span>
  </div>
)}

      {/* Image */}
      <div className="relative overflow-hidden rounded-t-2xl bg-gray-100 p-4 aspect-[1/0.8]">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-700 
            group-hover:scale-110"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-200 text-yellow-500"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {rating} ({reviews})
          </span>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <ul className="space-y-1 text-sm text-gray-600">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <p className="text-md font-bold text-[#3d5f12]">
            ₹{price.toLocaleString()}
          </p>
          <button
            className="flex items-center gap-2 px-4 py-1 text-sm 
          font-semibold text-white hover:bg-[#3d5f12] bg-[#4f3b30] rounded  
          transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
            Shop Now
          </button>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity 
        duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform 0.8s ease-in-out",
        }}
      />
    </div>
  );
};

// --- Main Product Page ---
const ProductPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const products = [
        {
      id: 1,
      image: image1,
      name: "Ilavam Panju Natural Comfort Mattress",
      price: 13000,
      rating: 4.8,
      reviews: 1224,
      badge: "Best Seller",
      features: [
        "Made with 100% Natural Ilavam Panju (Kapok)",
        "Eco-friendly and hypoallergenic material",
        "Provides superior air circulation for cool sleep",
        
      ],
    },
    {
      id: 2,
      image: image2,
      name: "Organic Kapok Ortho Support Mattress",
      price: 13000,
      rating: 4.6,
      reviews: 982,
      badge: "Premium",
      features: [
        "Ilavam Panju fiber for natural orthopedic support",
        "Reduces body heat for a cool, restful sleep",
        "Chemical-free and safe for sensitive skin",
        
      ],
    },
    {
      id: 3,
      image: image3,
      name: "Cloud Kapok Dream Mattress",
      price: 13000,
      rating: 4.9,
      reviews: 1456,
      badge: "Top Rated",
      features: [
        "Stuffed with pure Kapok (Ilavam Panju) fibers",
        "Naturally ventilated – stays cool all night",
        "Ultra-soft comfort with firm body balance",
       
      ],
    },
    {
      id: 4,
      image: image4,
      name: "Luxury Ilavam Panju Bliss Mattress",
      price: 13000,
      rating: 4.7,
      reviews: 1103,
      badge: "Top Rated",
      features: [
        "Luxury filling with natural Ilavam Panju blend",
        "Promotes deep, uninterrupted sleep",
        "Anti-dust and moisture control properties",
        
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <header
        className="relative overflow-hidden py-12 text-center"
        data-aos="fade-down"
      >
        <h1 className="text-xl md:text-4xl font-bold text-[#3d5f12]">
          Mattresses with Natural Bounce & Breathable Comfort
        </h1>
        <p className="text-md md:text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          Filled with pure Kapok — (Illavam Panju), these mattresses offer soft,
          cloud-like comfort and gentle bounce — keeping you cool, relaxed, and
          supported throughout the night.
        </p>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
              data-aos-once="true"
            >
              <BounceComfort {...product} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
