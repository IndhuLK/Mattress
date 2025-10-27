import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img1 from '/src/assets/img1.jpg';
import img2 from '/src/assets/img2.jpg';
import img3 from '/src/assets/img3.jpg';

const SleepKingShopper = () => {

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      easing: 'ease-in-out',
      once: true, // animate only once
      mirror: false,
    });
  }, []);

  const categories = [
    {
      title: "MATTRESSES",
      description: "Explore our wide range of mattresses",
      link: "#",
      style: {
        backgroundImage: `url(${img1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      size: 'large',
    },
    {
      title: "BED",
      description: "Designed to complement any space — from cozy apartments to spacious homes.",
      link: "#",
      style: {
        backgroundImage:  `url(${img2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      size: 'small-top',
    },
    {
      title: "BED & MATTRESSES ACCESSORIES",
      description: "Your one-stop destination for beds, mattresses, and accessories.",
      link: "#",
      style: {
        backgroundImage:  `url(${img3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      size: 'small-bottom',
    },
  ];

  const CategoryCard = ({ title, description, link, style, size, index }) => {
    const heightClass = size === 'large' ? 'h-[200px] md:h-auto md:row-span-2' : 'h-[200px] md:h-[195px]';

    return (
      <div
        className={`relative group overflow-hidden rounded-lg shadow-xl 
            cursor-pointer ${heightClass} transition-all duration-500 ease-in-out`}
        style={style}
        data-aos="fade-up"
        data-aos-delay={index * 150} // stagger animation for each card
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 
        group-hover:bg-opacity-10 transition-all duration-500"></div>

        <div className="absolute top-6 left-6 text-black z-10 p-2">
          <h3 className="text-xl font-bold tracking-widest mb-1">{title}</h3>
          <p className="text-sm md:text-base font-light w-11/12">{description}</p>
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
        >
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans py-16 px-4 md:px-8 bg-gray-50">
      
      <div className="text-center mb-12 max-w-4xl mx-auto" data-aos="fade-down">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#3d5f12] mb-4">
          Sleep Like a King, Spend Like a Smart Shopper
        </h1>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          Enjoy top-tier comfort, support, and style without stretching your budget.
           Premium materials, expert design, and unbeatable value — all for your best night's
            sleep.
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
