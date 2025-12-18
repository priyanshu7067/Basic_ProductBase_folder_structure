import React from "react";
import Footer from "./Footer";
import LandingSlider from "./LandingSlider";
import NavBar from "./NavBar";
import MarqueeDemo from "./Marque/MarqueDemo";
import MarqueeStrip from "./Marque/NewMeque";
import ProductShowcase from "./ProductShowcase";
import Testimonials2 from "./Testmonial";
import DashboardShowcase from "./Starchainlabsdashabord";
import FeaturesCardsSection from "./FeaturesCardsSection";


const LandingPage = () => {
    return (
        <div className=" flex flex-col gap-4">
            <NavBar />
            <div className="">
                {/* <DashboardShowcase/> */}
                <LandingSlider />
                <FeaturesCardsSection />
                {/* <CryptoDashboard /> */}
                <MarqueeStrip/>
                {/* <VeganMeaning /> */}
                <ProductShowcase/>
                {/* <TextSlider /> */}
                
                <MarqueeDemo />
                {/* <Products /> */}
                {/* <HomePageAnimation /> */}
                <Testimonials2 />
                {/* <Banner /> */}
                
                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;
