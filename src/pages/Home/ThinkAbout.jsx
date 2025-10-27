import React, { useEffect } from "react";
import Slider from "react-slick"; // Import Slick Slider
import avatar1 from "/src/assets/girl.png";
import avatar2 from "/src/assets/man.png";
import avatar3 from "/src/assets/woman.png";
import avatar4 from "/src/assets/man-2.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

const ThinkAbout = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Desktop
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const reviews = [
    {
      name: "Anita",
      location: "Chennai",
      text: "Absolutely love this mattress! It’s soft yet supportive — I wake up feeling fresh every morning. Great quality and totally worth the price.",
      avatar: avatar1,
    },
    {
      name: "Ravi",
      location: "Bangalore",
      text: "Best sleep I've had in years! Excellent bounce and support.",
      avatar: avatar2,
    },
    {
      name: "Sita",
      location: "Mumbai",
      text: "High quality mattress and amazing service. Highly recommended!",
      avatar: avatar3,
    },
    {
      name: "Karthik",
      location: "Delhi",
      text: "Very comfortable mattress. Good for back support.",
      avatar: avatar4,
    },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-10 py-10 rounded-2xl bg-[#c6eedf] max-w-6xl mx-auto mt-5">
      <h1
        className="text-center text-lg sm:text-2xl md:text-4xl text-[#3d5f12] font-bold mb-10"
        data-aos="fade-down"
      >
        What People Think About
      </h1>

      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="px-2 sm:px-3" 
               data-aos="fade-up" 
               data-aos-delay={index * 100} 
               data-aos-duration="800"
               data-aos-once="true"
          >
            <div className="flex flex-col gap-4 bg-white rounded-xl p-4 sm:p-6 shadow-md md:h-50">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-[#4f3b30] text-sm sm:text-base">
                    {review.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">{review.location}</p>
                </div>
              </div>
              <p className="text-gray-700 text-xs sm:text-sm">{review.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ThinkAbout;
