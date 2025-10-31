import React from "react";
import { Leaf, ShieldCheck, BedDouble, HeartHandshake } from "lucide-react";

const services = [
  {
    id: 1,
    icon: <Leaf className="w-10 h-10 text-green-700" />,
    title: "Eco-Friendly Materials",
    desc: "We use 100% natural Kapok (Illavam Panju) and organic fabrics for a cleaner, healthier sleep experience.",
  },
  {
    id: 2,
    icon: <BedDouble className="w-10 h-10 text-green-700" />,
    title: "Custom Comfort Designs",
    desc: "Tailor-made mattresses to suit your body type and comfort preferences — ensuring the perfect fit for every sleeper.",
  },
  {
    id: 3,
    icon: <ShieldCheck className="w-10 h-10 text-green-700" />,
    title: "Quality Assurance",
    desc: "Each product goes through strict quality checks for durability, bounce, and long-lasting performance.",
  },
  {
    id: 4,
    icon: <HeartHandshake className="w-10 h-10 text-green-700" />,
    title: "Trusted Support",
    desc: "We stand by our products with genuine care and excellent post-purchase support for complete peace of mind.",
  },
];

const OurServices = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#36491f]">
          Our Services
        </h2>
        <p className="text-gray-700 mt-3 mb-10 max-w-2xl mx-auto">
          We blend nature, innovation, and craftsmanship to bring you products
          that redefine comfort and trust.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 border border-green-100"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-green-50 p-4 rounded-full">{service.icon}</div>
                <h3 className="font-semibold text-lg text-[#2f4d11]">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
