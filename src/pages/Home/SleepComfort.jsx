import React from "react";
import comfort from "/src/assets/comfort.jpg";
const SleepComfort = () => {
  return (
    <div className="relative w-full mt-10 text-center">
      {/* ✅ Background Image */}
      <img
        src={comfort}
        alt="Education Background"
        className="w-full h-[400px] md:h-[450px] object-cover"
      />

      {/* ✅ Overlay Content */}
      <div className="absolute inset-0 bg-black/30 bg-opacity-40 flex items-center">
        <div
          className="px-4 md:px-20 text-white max-w-7xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h1
            className="text-xl md:text-4xl font-bold leading-tight mb-4 "
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Where Comfort Meets Craftsmanship
          </h1>

          <p
            className="mb-6 text-md md:text-lg"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Each Kapok - (Illavam Panju) mattress is carefully handcrafted using
            natural fibers and expert techniques — blending traditional comfort
            with modern innovation for restful, breathable, and long-lasting
            support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SleepComfort;
