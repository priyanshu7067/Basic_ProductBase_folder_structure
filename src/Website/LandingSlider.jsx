import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, Shield, Headphones, DollarSign } from 'lucide-react';

const LandingSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: "Discover Your Perfect",
      subtitle: "Space",
      bgColor: "from-teal-900 to-teal-700",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop"
    },
    {
      title: "Luxury Comfort for",
      subtitle: "Your Home",
      bgColor: "from-slate-800 to-slate-600",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop"
    },
    {
      title: "Style Meets",
      subtitle: "Elegance",
      bgColor: "from-amber-900 to-amber-700",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&h=800&fit=crop"
    }
  ];

  const features = [
    { icon: Truck, text: "Easy Fast Shipping" },
    { icon: Shield, text: "Fast & Free Shipping" },
    { icon: Headphones, text: "24/7 Support" },
    { icon: DollarSign, text: "Money Back Guarantee" }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="w-full bg-primary mt-20">
      {/* Hero Slider Section */}
       <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden" style={{
        clipPath: 'polygon(0 0, 15% 0, 20% 4%, 100% 4%, 100% 100%,0 100%)'
      }}>
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor}`} />
            
            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
                {/* Text Content */}
                <div className="hidden md:block text-white z-10 text-center lg:text-left pt-12 lg:pt-0">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 animate-fade-in">
                    {slide.title}
                  </h1>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-8 animate-fade-in-delay">
                    {slide.subtitle}
                  </h2>
                  <button className="bg-white text-teal-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                    Shop Now
                  </button>
                </div>

                {/* Image Content */}
                <div className="relative h-64 lg:h-full flex items-center justify-center">
                  <div className="relative w-full max-w-xl">
                    <img
                      src={slide.image}
                      alt="Furniture"
                      className="w-full h-auto rounded-2xl shadow-2xl object-cover animate-slide-in"
                    />
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-full opacity-70 blur-xl" />
                    <div className="absolute -top-4 -left-4 w-32 h-32 bg-teal-400 rounded-full opacity-50 blur-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20 group"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-teal-800 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20 group"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-teal-800 group-hover:scale-110 transition-transform" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              } h-2 rounded-full`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-primary py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 hover:scale-105 transition-transform"
                >
                  <div className="bg-teal-100 p-3 md:p-4 rounded-full mb-3">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-teal-700" />
                  </div>
                  <p className="text-xs md:text-sm font-medium text-gray-700">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        .animate-slide-in {
          animation: slide-in 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default LandingSlider;