import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Truck, Package, Wallet, BadgeCheck } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "/src/config/firebase";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
  const fetchSlides = async () => {
    const snapshot = await getDocs(collection(db, "sliders"));
    const list = snapshot.docs.map((doc) => doc.data());
    setSlides(list);
  };
  fetchSlides();
}, []);

  // ✅ Load sliders from localStorage (from SliderManagement.jsx)
  useEffect(() => {
    const storedSliders = JSON.parse(localStorage.getItem("sliders") || "[]");
    if (storedSliders.length > 0) {
      setSlides(storedSliders);
    } else {
      // fallback default slides
      setSlides([
        {
          imagePreview: "/src/assets/mattress1.jpg",
          title: "Welcome to Our Store",
          description: "Best deals and discounts just for you!",
          button: "Shop Now",
          offerTitle: "Special Offer!",
          offerText: "Hurry! Limited Time Offer",
          days: 0,
          hours: 5,
          minutes: 0,
          seconds: 0,
        },
      ]);
    }
  }, []);

  // ✅ Countdown Timer (from first slide)
  useEffect(() => {
    if (slides.length === 0) return;

    const { days, hours, minutes, seconds } = slides[0];
    const totalSeconds =
      (days || 0) * 86400 + (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);

    let remaining = totalSeconds;
    const timer = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        remaining -= 1;
        const d = Math.floor(remaining / 86400);
        const h = Math.floor((remaining % 86400) / 3600);
        const m = Math.floor((remaining % 3600) / 60);
        const s = remaining % 60;
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [slides]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const features = [
    { icon: <Truck size={24} />, title: "Free & Fast Shipping" },
    { icon: <Package size={24} />, title: "10 Days Free Trial" },
    { icon: <Wallet size={24} />, title: "No Cost EMI" },
    { icon: <BadgeCheck size={24} />, title: "10 Years Warranty" },
  ];

  return (
    <>
      {/* ---------- HERO SECTION ---------- */}
      <div className="relative w-full h-[80vh] overflow-hidden rounded-bl-[255px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center flex flex-col justify-center 
                items-center text-center relative"
                style={{
                  backgroundImage: `url(${slide.imagePreview})`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Text Content */}
                <div className="relative z-10 text-white px-6" data-aos="fade-up">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                  <button
      onClick={() => navigate("/mattress")}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 cursor-pointer
        rounded-lg font-medium transition-transform duration-300 hover:scale-105"
      data-aos="zoom-in"
    >
      {slide.button}
    </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ---------- STATIC OFFER BAR ---------- */}
        <div className="absolute bottom-8 left-1/5  flex 
        items-center gap-3  text-gray-900 px-6 py-3 rounded-lg shadow-lg text-sm
         md:text-base font-semibold z-20 justify-between ">
          <span className="bg-blue-800 text-white px-2 py-1 rounded-md text-sm md:text-base">
            {slides[0]?.offerTitle || "Special Offer!"}
          </span>
          <span className="text-white font-bold text-lg">
            {slides[0]?.offerText || "Hurry! Limited Time Offer"}
          </span>
          <span className=" ml-2 font-medium bg-yellow-700 text-white px-4 py-1 rounded-lg">
            {String(timeLeft.days).padStart(2, "0")}d :{" "}
            {String(timeLeft.hours).padStart(2, "0")}h :{" "}
            {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
            {String(timeLeft.seconds).padStart(2, "0")}s
          </span>
        </div>
      </div>

      {/* ---------- FEATURES SECTION ---------- */}
      <div className="bg-white py-10">
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
    </>
  );
};

export default Hero;
