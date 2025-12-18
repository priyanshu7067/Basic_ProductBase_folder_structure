"use client";

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
            className=" "
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className=" mx-auto text-center mb-16 space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
                        Everything you need to
                        <br /> 
                        <span className="bg-gradient-to-r from-[#22ac8e] to-green-500 bg-clip-text text-transparent">
                            build faster
                        </span>
                    </h2>
                    <p className="text-lg text-gray-800">
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
                                className={`group relative rounded-2xl border border-gray-300 bg-white
  p-6 md:p-8 transition-all duration-500 ease-out
  hover:-translate-y-3 hover:border-[#22ac8e]
  hover:shadow-2xl hover:shadow-[#22ac8e]/20
  ${isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                                    }`}
                            >
                                {/* animated border glow */}
                                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
    bg-gradient-to-r from-[#22ac8e]/20 via-transparent to-green-400/20" />

                                {/* content */}
                                <div className="relative z-10 flex flex-col gap-4">
                                    {/* icon box */}
                                    <div className="w-fit rounded-xl p-3 bg-gradient-to-br from-[#22ac8e]/15 to-green-400/20
      transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                        <Icon className="w-6 h-6 text-[#22ac8e]" />
                                    </div>

                                    <h3 className="text-xl font-semibold text-black group-hover:text-[#22ac8e] transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-gray-700 leading-relaxed">
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
