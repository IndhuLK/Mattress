import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutImg1 from "/src/assets/img3.jpg";
import aboutImg2 from "/src/assets/Pillow2.jpeg";
import comfortImg from "/src/assets/comfort.jpg";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-white py-16 shadow-sm">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4 text-[#3d5f12]"
            data-aos="fade-up"
          >
            About SKV Natural Beds Comforts
          </h1>
          <p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Crafting cozy dreams with science-backed comfort. From our luxurious
            mattresses to our ultra-soft pillows, we’re dedicated to giving you
            restful sleep — night after night.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 flex flex-col lg:flex-row items-center gap-10">
        <div className="lg:w-1/2" data-aos="fade-right">
          <img
            src={aboutImg1}
            alt="Mattress manufacturing"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
        <div className="lg:w-1/2 space-y-5" data-aos="fade-left">
          <h2 className="text-3xl font-semibold text-[#3d5f12]">
            Redefining Rest, One Layer at a Time
          </h2>
          <p className="leading-relaxed text-gray-700">
            Our mattresses are more than just bedding — they’re engineered for
            balance, support, and pure comfort. We blend ergonomic design with
            breathable materials, ensuring optimal posture alignment and
            pressure relief while you sleep.
          </p>
          <p className="leading-relaxed text-gray-700">
            Whether you’re a side sleeper or a back sleeper, our premium
            foams and fiber layers adapt to your body to keep you cool and
            comfortable all night long.
          </p>
        </div>
      </section>

      {/* Comfort Philosophy Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 px-6">
          <div className="lg:w-1/2 space-y-5" data-aos="fade-right">
            <h2 className="text-3xl font-semibold text-[#3d5f12]">
              The Pillow that Completes Your Sleep Story
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our Hollow Fiber and Memory Foam pillows deliver the perfect
              combination of plush softness and adaptive support. Each pillow is
              crafted with breathable spun yarn fibers that cradle your neck
              without losing shape.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Designed to complement our mattress range, these pillows help you
              maintain perfect spinal alignment and wake up feeling refreshed
              and recharged.
            </p>
          </div>
          <div className="lg:w-1/2" data-aos="fade-left">
            <img
              src={aboutImg2}
              alt="Soft pillows"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 flex flex-col lg:flex-row items-center gap-10">
        <div className="lg:w-1/2" data-aos="fade-right">
          <img
            src={comfortImg}
            alt="Eco-friendly comfort"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
        <div className="lg:w-1/2 space-y-5" data-aos="fade-left">
          <h2 className="text-3xl font-semibold text-[#3d5f12]">
            Sustainable Comfort
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We care about the planet as much as we care about your comfort.
            That’s why we use recyclable materials, minimal packaging, and
            energy-efficient processes in every product we craft.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Sleep peacefully knowing your mattress and pillow were made with
            love, ethics, and a commitment to sustainability.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#3d5f12] text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Experience the Sleepyhead Way</h2>
        <p className="max-w-2xl mx-auto text-gray-100 mb-8">
          From supportive mattresses to cozy pillows, our products are crafted
          to redefine the way you rest. Because everyone deserves a better
          night's sleep.
        </p>
        <a
          href="/pillow"
          className="bg-white text-[#3d5f12] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Explore Our Collection
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
