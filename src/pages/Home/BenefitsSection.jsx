import React from "react";
import { Leaf, Feather, Wind, Recycle } from "lucide-react";
import kapok1 from "/src/assets/cotton2.jpeg";
import kapok2 from "/src/assets/cotton1.jpg";
import kapok3 from "/src/assets/cotton3.jpeg";
import kapok4 from "/src/assets/cotton4.jpeg";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Feather className="w-6 h-6 text-green-700" />,
      title: "Lightweight & Soft",
      desc: "Kapok fiber is naturally soft and silky, giving a gentle cushion-like feel.",
    },
    {
      icon: <Wind className="w-6 h-6 text-green-700" />,
      title: "Breathable Comfort",
      desc: "Its airy structure allows natural ventilation, keeping you cool and fresh.",
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-700" />,
      title: "100% Natural & Organic",
      desc: "Completely eco-friendly and chemical-free — perfect for sensitive skin.",
    },
    {
      icon: <Recycle className="w-6 h-6 text-green-700" />,
      title: "Sustainable & Renewable",
      desc: "Harvested without cutting down trees — a renewable, zero-waste resource.",
    },
  ];

  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center">
        {/* 🖼️ Left Side - 4 Images Grid */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src={kapok1}
            alt="Kapok Fiber"
            className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition"
          />
          <img
            src={kapok2}
            alt="Illavam Panju"
            className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition"
          />
          <img
            src={kapok3}
            alt="Natural Kapok"
            className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition"
          />
          <img
            src={kapok4}
            alt="Eco Kapok"
            className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition"
          />
        </div>

        {/* 🌿 Right Side - Text Content */}
        <div>
          <h2 className="text-3xl font-bold text-[#3d5f12] mb-4">
            Benefits of Kapok (Illavam Panju)
          </h2>
          <p className="text-gray-600 mb-8">
            Kapok, known as Illavam Panju in Tamil, is a natural fiber obtained
            from the seed pods of the kapok tree. It’s used for pillows, mattresses,
            and eco-friendly products for its unique natural qualities.
          </p>

          {/* Benefits Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((b, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-5 flex items-start gap-4 hover:shadow-xl transition"
              >
                <div className="bg-green-100 p-3 rounded-full">{b.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800">{b.title}</h3>
                  <p className="text-sm text-gray-600">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
