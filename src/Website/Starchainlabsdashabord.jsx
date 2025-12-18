import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { Monitor, Sparkles, Zap, TrendingUp } from "lucide-react";
import dash1 from "../assets/dash1.png"
import dash2 from "../assets/dash2.png"
import dash3 from "../assets/dash3.png"
const dashboards = [
    { id: 1, title: "Analytics Dashboard", color: "from-violet-500 to-purple-600", image: dash1 },
    { id: 2, title: "Sales Overview", color: "from-blue-500 to-cyan-500", image: dash2 },
    { id: 3, title: "Marketing Stats", color: "from-pink-500 to-rose-500", image: dash3 },
    { id: 4, title: "User Insights", color: "from-amber-500 to-orange-500", image: dash1 },
    { id: 5, title: "Revenue Tracker", color: "from-emerald-500 to-teal-500", image: dash2 },
    { id: 6, title: "Performance Hub", color: "from-indigo-500 to-blue-600", image: dash3 },
    { id: 7, title: "Customer Portal", color: "from-fuchsia-500 to-pink-500", image: dash1 },
    { id: 8, title: "Inventory System", color: "from-lime-500 to-green-500", image: dash2 },
    { id: 9, title: "Project Manager", color: "from-red-500 to-orange-500", image: dash3 },
    { id: 10, title: "Financial Reports", color: "from-sky-500 to-blue-500", image: dash1 },
    { id: 11, title: "Team Dashboard", color: "from-purple-500 to-violet-600", image: dash2 },
    { id: 12, title: "E-commerce Hub", color: "from-teal-500 to-cyan-500", image: dash3 },
];


const DashboardCard = ({ dashboard, isCenter }) => {
    return (
        <motion.div
            className={`relative flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px] aspect-[16/10]
        rounded-2xl overflow-hidden shadow-2xl cursor-pointer
        ${isCenter ? "z-20 scale-110" : "z-10"}`}
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{
                scale: isCenter ? 1.15 : 1.05,
                rotateY: 0,
                z: 50,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >

            {/* Glow Effect Background */}
            <div
                className={`absolute -inset-1 bg-gradient-to-r ${dashboard.color}
          rounded-2xl blur-xl opacity-50`}
            />

            {/* IMAGE WRAPPER */}
            <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10">

                {/* Actual Image */}
                <img
                    src={dashboard.image}
                    alt={dashboard.title}
                    className="w-full h-full object-fill"
                />

                {/* Top Title Bar */}
                <div className="absolute top-0 left-0 w-full flex items-center gap-2 
          px-4 py-2 bg-black/40 backdrop-blur-sm border-b border-white/10">
                    <span className="text-xs text-white/70">{dashboard.title}</span>
                </div>

                {/* Shine Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-150%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </motion.div>
    );
};


const DashboardShowcase = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % dashboards.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 rounded-full blur-3xl" />
            </div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <span className="text-sm font-medium text-violet-300">
                            Premium Dashboard Collection
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                        Stunning{" "}
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                            Dashboards
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                        Explore our collection of beautifully crafted dashboard designs with
                        real-time analytics and modern interfaces
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center gap-8 md:gap-16 mb-16"
                >
                    {[
                        { icon: Monitor, label: "Dashboards", value: "12+" },
                        { icon: Zap, label: "Components", value: "500+" },
                        { icon: TrendingUp, label: "Active Users", value: "10K+" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 mb-3">
                                <stat.icon className="w-5 h-5 text-violet-400" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-white">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-500">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* 3D Carousel */}
                <div
                    className="relative h-[400px] md:h-[500px] flex items-center justify-center"
                    style={{ perspective: "1500px" }}
                >
                    <motion.div
                        className="flex gap-6 md:gap-10"
                        animate={{
                            x: -currentIndex * 320,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.32, 0.72, 0, 1],
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {[...dashboards, ...dashboards].map((dashboard, index) => {
                            const actualIndex = index % dashboards.length;
                            const isCenter = actualIndex === currentIndex;
                            const offset = actualIndex - currentIndex;

                            return (
                                <motion.div
                                    key={index}
                                    animate={{
                                        rotateY: offset * -15,
                                        z: isCenter ? 100 : -Math.abs(offset) * 50,
                                        opacity: Math.abs(offset) > 2 ? 0.3 : 1,
                                    }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <DashboardCard
                                        dashboard={dashboard}
                                        index={actualIndex}
                                        isCenter={isCenter}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-10">
                    {dashboards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "w-8 bg-gradient-to-r from-violet-500 to-fuchsia-500"
                                    : "w-2 bg-white/20 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>

                {/* Floating Elements */}
                <motion.div
                    className="absolute top-20 left-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-transparent border border-violet-500/20 backdrop-blur-sm"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-transparent border border-fuchsia-500/20 backdrop-blur-sm"
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/2 right-20 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/20 backdrop-blur-sm hidden lg:block"
                    animate={{
                        x: [0, 10, 0],
                        y: [0, -10, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </section>
    );
};

export default DashboardShowcase;
