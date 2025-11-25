import React from "react";
import Hero from "./Hero";
import SleepKingShopper from "./SleepKingShopper";
import ProductCard from "./ProductCard";
import TrustedQuality from "./TrustedQuality";
import BounceComfort from "./BounceComfort";
import ThinkAbout from "./ThinkAbout";
import SleepComfort from "./SleepComfort";
import BenefitsSection from "./BenefitsSection";
import OurServices from "./OurServices";
import YoutubeVideos from "./YoutubeVideos";

//[#745e46] [#607442]
const Home = () => {
  return (
    <div>
      <Hero />
      <SleepKingShopper />
      <ProductCard />
      <TrustedQuality />
      <BenefitsSection />
      <BounceComfort />
      <OurServices />
      <ThinkAbout />
      <SleepComfort />
      <YoutubeVideos />
    </div>
  );
};

export default Home;
