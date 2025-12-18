import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/dashboard/slider/img1.jpg";
import img2 from "../assets/dashboard/slider/img2.jpg";
import img3 from "../assets/dashboard/slider/img3.jpg";
import img4 from "../assets/dashboard/slider/img4.jpg";

const HomePageAnimation = () => {
    const swiperImages = [img1, img2, img3, img4];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(
                (prevIndex) => (prevIndex + 1) % swiperImages.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex md:gap-4 gap-2 md:h-96 h-32 justify-center">
            {swiperImages.map((img, index) => {
                const isActive = index === activeIndex;
                return (
                    <motion.div
                        key={index}
                        className="h-full overflow-hidden rounded-lg transition-all"
                        layout
                        animate={{
                            width: isActive ? "66.67%" : "8.33%",
                        }}
                        transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                        }}
                    >
                        <img
                            src={img}
                            className="w-full h-full object-cover"
                            alt={`Slide ${index + 1}`}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
};

export default HomePageAnimation;
