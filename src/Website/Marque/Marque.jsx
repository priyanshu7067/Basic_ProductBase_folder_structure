export default function Marquee({
    children,
    reverse = false,
    pauseOnHover = false,
    duration = 30000,
}) {
    const animationClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

    return (
        <div className={`w-full overflow-hidden relative ${pauseOnHover ? "group" : ""}`}>
            <div
                className={`
                    flex w-max gap-6 will-change-transform
                    ${animationClass}          /* ✅ Only one animation class */
                    ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}
                `}
                style={{ animationDuration: `${duration}ms` }}
            >
                {children}
                {children}
            </div>
        </div>
    );
}
