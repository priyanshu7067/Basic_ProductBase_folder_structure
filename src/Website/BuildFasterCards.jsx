
import { useEffect, useRef, useState } from "react";
import { Rocket, Shield, Zap, Globe, BarChart3, Users } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Lightning Fast",
    description:
      "Deploy in seconds with our optimized infrastructure and global CDN network.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption and compliance with industry-leading security standards.",
  },
  {
    icon: Zap,
    title: "Real-time Sync",
    description:
      "Collaborate seamlessly with instant updates across all devices and team members.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Reach customers worldwide with edge computing and multi-region deployment.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Deep insights with powerful analytics and customizable reporting dashboards.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Built for teams with role-based access, permissions, and workflow automation.",
  },
];

export default function FeaturesCardsSection() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) =>
                prev.includes(index) ? prev : [...prev, index]
              );
            }, index * 150);
          });
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className=""
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl  font-bold text-black">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-[#0db18d] to-green-500 bg-clip-text text-transparent ">
              build faster
            </span>
          </h2>

          <p className="text-lg text-gray-700">
            Powerful features designed to accelerate your development workflow
            and enhance productivity.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl border border-green-700
                bg-gradient-to-br from-white/5 to-white/[0.02]
                p-6 md:p-8 transition-all duration-500
                hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10
                ${
                  isVisible
                    ? "opacity-100 animate-in fade-in slide-in-from-bottom"
                    : "opacity-0"
                }`}
              >
                {/* glow */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />

                <div className="relative flex flex-col gap-4">
                  <div className="w-fit p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 transition-transform duration-300 hover:scale-110">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>

                  <h3 className="text-xl font-semibold text-black">
                    {feature.title}
                  </h3>

                  <p className="text-gray-900 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
