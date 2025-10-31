import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "/src/assets/img1.jpg";
import img2 from "/src/assets/img2.jpg";
import img3 from "/src/assets/img3.jpg";

const SleepKingShopper = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      easing: "ease-in-out",
      once: true, // animate only once
      mirror: false,
    });
  }, []);

  const categories = [
    {
      title: "MATTRESSES",
      description: "Discover ultimate comfort and support with our expertly crafted mattresses — made for restful, healthy sleep every night.",
      link: "/mattress",
      style: {
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      size: "large",
    },
    {
      title: "Pillows",
      description:
        "Soft, supportive, and breathable — our pillows cradle your head perfectly for deeper, more refreshing sleep.",
      link: "/pillow",
      style: {
        backgroundImage: `url(${img2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      size: "small-top",
    },
    {
      title: "PILLOW & MATTRESSES ACCESSORIES",
      description:
        "Complete your sleep setup with our premium collection of pillows, protectors, and mattress essentials for total comfort.",
      link: "/mattress",
      style: {
        backgroundImage: `url(${img3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      size: "small-bottom",
    },
  ];

  const CategoryCard = ({ title, description, link, style, size, index }) => {
    const heightClass =
      size === "large"
        ? "h-[200px] md:h-auto md:row-span-2"
        : "h-[200px] md:h-[195px]";

    return (
      <div
        className={`relative group overflow-hidden rounded-lg shadow-xl 
            cursor-pointer ${heightClass} transition-all duration-500 ease-in-out`}
        style={style}
        data-aos="fade-up"
        data-aos-delay={index * 150} // stagger animation for each card
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-30 
        group-hover:bg-opacity-10 transition-all duration-500"
        ></div>

        <div className="absolute top-6 left-6 text-black z-10 p-2">
          <h3 className="text-xl font-bold tracking-widest mb-1">{title}</h3>
          <p className="text-sm md:text-base font-light w-11/12">
            {description}
          </p>
        </div>

        <a
          href={link}
          className="absolute bottom-10 left-6 text-[#3d5f12] text-sm font-bold 
          tracking-wider underline opacity-90 group-hover:text-[#4f3b30] transition-colors
           duration-300 z-10"
        >
          SHOP {title.toUpperCase()}
        </a>

        <div
          className="absolute inset-0 z-0 transition-transform duration-700 
            ease-in-out group-hover:scale-[1.05]"
          style={style}
        ></div>
      </div>
    );
  };

  return (
    <div className="font-sans py-16 px-4 md:px-8 bg-gray-50">
      <div className="text-center mb-12 max-w-4xl mx-auto" data-aos="fade-down">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3d5f12] mb-4">
          Crafted by Nature, Perfected for Comfort
        </h1>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          Experience the gentle touch of Illavam Panju (Kapok) — soft,
          breathable, and eco-friendly. Enjoy nature’s comfort and lasting
          quality at a price that feels just right for you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-fr">
        {categories.map((card, index) => (
          <CategoryCard
            key={index}
            title={card.title}
            description={card.description}
            link={card.link}
            style={card.style}
            size={card.size}
            index={index} // pass index for stagger
          />
        ))}
      </div>
    </div>
  );
};

export default SleepKingShopper;
