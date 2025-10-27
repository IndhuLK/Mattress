import React, { createContext, useContext, useState, useEffect } from "react";

const SliderContext = createContext();

export const SliderProvider = ({ children }) => {
  const [sliderData, setSliderData] = useState(() => {
    const stored = localStorage.getItem("sliderData");
    return stored
      ? JSON.parse(stored)
      : {
          image: "/src/assets/Hero.jpg",
          title: "Wake Up Refreshed Every Morning",
          description: "Explore Our Collection of Comfort-First Mattresses Today",
          buttonText: "Shop Now",
          offerTitle: "Celebrate Diwali with Restful Sleep",
          discountText: "Up to 45% OFF",
          countdownDate: "2025-11-15T00:00:00",
        };
  });

  // 🔁 Every time you update sliderData, also update localStorage
  useEffect(() => {
    localStorage.setItem("sliderData", JSON.stringify(sliderData));
  }, [sliderData]);

  return (
    <SliderContext.Provider value={{ sliderData, setSliderData }}>
      {children}
    </SliderContext.Provider>
  );
};

export const useSlider = () => useContext(SliderContext);
