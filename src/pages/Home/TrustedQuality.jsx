import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Quality from "/src/assets/Quality.jpg";

const TrustedQuality = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-12 py-16 mt-10 
    items-center overflow-hidden"
    >
      {/* Trusted Content */}
      <div data-aos="fade-right" className="text-center md:text-left">
        <h1 className="text-[#36491f] font-bold text-2xl md:text-3xl">
          Trusted Quality. Proven Comfort.
        </h1>
        <p className="text-gray-700 text-sm md:text-lg mt-4 leading-relaxed">
          Join countless happy homes who trust our{" "}
          <span className="font-semibold text-[#36491f]">
            Illavam Panju — (Kapok)  
          </span> for its natural softness, breathability, and eco-friendly comfort.
          Each product is crafted to deliver lasting freshness, gentle support,
          and peaceful sleep — the way nature intended.
        </p>
        <button
          className="items-center justify-center gap-2 rounded-md mt-5 text-sm font-medium
           py-2 px-8 bg-[#3d5f12] hover:bg-[#4f3b30] text-white hover:scale-105 hover:shadow-sky-100
          hover:shadow-lg ] transition-all duration-300 cursor-pointer"
        >
          Shop Now
        </button>
      </div>

      {/* Image Section */}
      <div
        data-aos="zoom-in"
        className="relative group w-full mx-auto overflow-hidden 
      rounded-tr-[150px] rounded-bl-[80px] md:rounded-tr-[200px] md:rounded-bl-[100px]"
      >
        <img
          src={Quality}
          alt="Quality"
          className="w-full h-auto object-cover transition-transform duration-700 
          group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent
          opacity-0 group-hover:opacity-100 transition-all duration-700"
        ></div>
      </div>

      {/* Points */}
      <div
        data-aos="fade-left"
        className="py-8 md:py-10 flex items-center justify-center"
      >
        <ul className="text-center space-y-6 w-full max-w-xs">
  <li className="border-b border-green-600 pb-2 hover:text-[#36491f] transition-colors">
    Natural & Eco-Friendly Fiber
  </li>
  <li className="border-b border-green-600 pb-2 hover:text-[#36491f] transition-colors">
    Soft and Breathable Comfort
  </li>
  <li className="border-b border-green-600 pb-2 hover:text-[#36491f] transition-colors">
    Hypoallergenic & Chemical-Free
  </li>
  <li className="border-b border-green-600 pb-2 hover:text-[#36491f] transition-colors">
    Long-Lasting Freshness & Support
  </li>
</ul>

      </div>
    </div>
  );
};

export default TrustedQuality;
