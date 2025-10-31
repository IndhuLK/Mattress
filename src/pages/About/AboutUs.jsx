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
            className="text-4xl md:text-5xl font-bold mb-4 text-[#3d5f12]"
            data-aos="fade-up"
          >
            About SKV Natural Beds & Pillows
          </h1>
          <p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            At SKV, we craft 100% natural comfort using{" "}
            <strong>Kapok (Illavam Panju)</strong> — nature’s softest fiber. Our
            beds and pillows are made to offer pure comfort, breathability, and
            long-lasting freshness — naturally supporting your body and mind.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 flex flex-col lg:flex-row items-center gap-10">
        <div className="lg:w-1/2" data-aos="fade-right">
          <img
            src={aboutImg1}
            alt="Natural Kapok fiber mattress"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
        <div className="lg:w-1/2 space-y-5" data-aos="fade-left">
          <h2 className="text-3xl font-semibold text-[#3d5f12]">
            Naturally Crafted for Deep, Peaceful Sleep
          </h2>
          <p className="leading-relaxed text-gray-700">
            Each SKV mattress is carefully filled with premium, breathable
            <strong> Illavam Panju </strong> — nature’s soft and springy fiber
            that adapts perfectly to the curves of your body. It provides
            balanced support that relaxes every pressure point and promotes
            deep, uninterrupted sleep. Unlike synthetic foam, Kapok allows
            natural air circulation, keeping your bed cool, dry, and perfectly
            comfortable through every season.
          </p>
          <p className="leading-relaxed text-gray-700">
            Every layer of the mattress is handcrafted by experienced artisans
            who understand the harmony between comfort and durability. From the
            inner filling to the outer stitching, each part reflects our
            dedication to quality and traditional craftsmanship. Free from
            harmful chemicals and toxins, SKV mattresses offer a safe,
            long-lasting sleeping experience for your entire family — ensuring
            peaceful nights and healthy mornings.
          </p>
        </div>
      </section>

      {/* Comfort Philosophy Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 px-6">
          <div className="lg:w-1/2 space-y-5" data-aos="fade-right">
            <h2 className="text-3xl font-semibold text-[#3d5f12]">
              Pillows Filled with Pure Kapok Softness
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our natural <strong>Illavam Panju (Kapok)</strong> pillows are
              designed to bring a cloud-like softness that gently supports your
              neck and shoulders. Each pillow is filled with pure, hand-cleaned
              Kapok fiber — light, fluffy, and naturally resilient. It provides
              a perfect balance between plush comfort and ergonomic support,
              helping your head rest in its natural alignment. The breathable
              structure of Kapok allows continuous airflow, keeping you cool and
              comfortable throughout the night.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Unlike synthetic fibers that trap heat or lose shape, Kapok
              remains airy, fresh, and hypoallergenic — ideal even for sensitive
              skin. Every SKV pillow is crafted with care to complement our
              Kapok mattresses, ensuring complete harmony between softness and
              support. Wake up every morning feeling refreshed, well-rested, and
              free from neck strain — because true comfort begins with nature’s
              gentlest touch.
            </p>
          </div>
          <div className="lg:w-1/2" data-aos="fade-left">
            <img
              src={aboutImg2}
              alt="Natural Kapok pillows"
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
            alt="Eco-friendly Kapok comfort"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
        <div className="lg:w-1/2 space-y-5" data-aos="fade-left">
          <h2 className="text-3xl font-semibold text-[#3d5f12]">
            Sustainable by Nature
          </h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Kapok (Illavam Panju)</strong> is one of nature’s most
            eco-friendly fibers — 100% natural, renewable, and completely
            biodegradable. Harvested from the Kapok tree without cutting or
            harming it, this miracle fiber promotes green living while
            preserving the environment. It requires no pesticides, minimal
            water, and grows naturally, making it one of the most sustainable
            materials for bedding. By choosing SKV, you choose a healthier
            planet and a cleaner way to sleep.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every SKV mattress and pillow is crafted with a deep respect for
            nature. From responsibly sourced materials to eco-conscious
            production methods, we ensure minimal waste and lasting durability.
            Our mission is to provide comfort that feels good — not just for
            you, but also for the Earth. With every SKV product, you embrace a
            lifestyle that blends luxury, sustainability, and mindful
            craftsmanship.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#3d5f12] text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Experience Nature’s Comfort with SKV
        </h2>
        <p className="max-w-2xl mx-auto text-gray-100 mb-8">
          Rediscover what true comfort feels like — soft, breathable, and 100%
          natural. Sleep better, live healthier, and wake up refreshed with
          SKV’s Kapok-filled beds and pillows.
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
