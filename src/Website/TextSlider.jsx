import React from "react";

const TextSlider = () => {
  const texts = [
    "Balanced Nutrients",
    "Alternative Foods",
    "Fresh Veggies",
    "Healthy Diet",
    "Plant-Based Lifestyle",
    "Eco-Friendly Choices",
  ];

  const doubledTexts = [...texts, ...texts];

  return (
    <div className="overflow-hidden bg-bg-color text-white py-[1rem]">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubledTexts.map((text, idx) => (
          <span
            key={idx}
            className="text-[1.8rem] font-medium tracking-wide mx-8"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextSlider;