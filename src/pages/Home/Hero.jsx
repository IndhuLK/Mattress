import React, { useEffect, useState } from "react";
import { ArrowRight, Truck, Package, Wallet, BadgeCheck } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSlider } from "/src/dashboardadmin/SliderContext";

const Hero = () => {
  const { sliderData } = useSlider();
  if (!sliderData) return null;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ⏰ Countdown
  useEffect(() => {
    const targetDate = new Date(sliderData.countdownDate);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sliderData.countdownDate]);

  const features = [
    { icon: <Truck size={24} />, title: "Free & Fast Shipping" },
    { icon: <Package size={24} />, title: "10 Days Free Trial" },
    { icon: <Wallet size={24} />, title: "No Cost EMI" },
    { icon: <BadgeCheck size={24} />, title: "10 Years Warranty" },
  ];

  return (
    <div>
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden md:rounded-bl-[255px]">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sliderData.image})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1 className="text-xl md:text-4xl font-bold mb-4 drop-shadow-2xl">
            {sliderData.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90 font-medium drop-shadow-md">
            {sliderData.description}
          </p>
          <button className="flex items-center justify-center gap-2 mx-auto bg-[#3d5f12] 
          hover:bg-[#4f3b30] text-white px-8 py-2 rounded-md transition cursor-pointer hover:scale-105">
            {sliderData.buttonText} <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Offer Section */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-col sm:flex-row 
        items-center justify-center px-6 gap-10">
          <span className="text-white font-bold text-2xl bg-[#2d517a] px-4 py-1 rounded-lg">
            {sliderData.offerTitle}
          </span>
          <span className="text-[#e1ebd5] font-bold text-xl">
            {sliderData.discountText}
          </span>
          <span className="bg-[#4f3b30] px-4 py-1 rounded-md text-xs sm:text-sm text-white">
            {String(timeLeft.days).padStart(2, "0")}d :{" "}
            {String(timeLeft.hours).padStart(2, "0")}h :{" "}
            {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
            {String(timeLeft.seconds).padStart(2, "0")}s
          </span>
        </div>
      </section>

      {/* Features */}
      <div className="bg-white py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-[#3d5f12] hover:bg-[#4f3b30] text-white py-4 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              {f.icon}
              <span className="text-sm font-medium">{f.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
