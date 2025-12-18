import { Sparkle } from "lucide-react";

const MarqueeStrip = () => {
  const items = [
    "App Design",
    "Website Design",
    "Dashboard",
    "Wireframe",
    "Branding",
    "UI/UX",
  ];

  return (
    <div className="relative overflow-hidden bg-white mt-10  py-3 border-y-2 border-green-900">
      {/* Top-right green triangle */}
      <div 
        className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-green-900 border-l-[80px] border-l-transparent z-20"
        style={{ borderTopWidth: '60px', borderLeftWidth: '80px' }}
      />
      
      {/* Bottom-left green triangle */}
      <div 
        className="absolute bottom-0 left-0 w-0 h-0 border-b-[60px] border-b-green-900 border-r-[80px] border-r-transparent z-50"
        style={{ borderBottomWidth: '60px', borderRightWidth: '80px' }}
      />

      <div className="whitespace-nowrap flex items-center animate-marquee relative z-10">
        {items.map((item, index) => (
          <div key={index} className="flex items-center mx-6 text-gray-900 font-semibold text-lg">
            {item}
            <Sparkle className="mx-6 w-5 h-5" />
          </div>
        ))}

        {/* Duplicate for smooth infinite scroll */}
        {items.map((item, index) => (
          <div key={`copy-${index}`} className="flex items-center mx-6  text-gray-900 font-semibold text-lg">
            {item}
            <Sparkle className="mx-6 w-5 h-5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;