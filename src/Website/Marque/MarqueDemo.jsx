import Marquee from "./Marque";
import ReviewCard from "./ReviewCard";
const reviews = [
    { name: "Jack", username: "@aack", body: "Amazing!", img: "https://avatar.vercel.sh/jack" },
    { name: "Jack", username: "@jack", body: "Amazing!", img: "https://avatar.vercel.sh/jack" },
    { name: "Jane", username: "@kane", body: "So smooth!", img: "https://avatar.vercel.sh/jane" },
    { name: "Jenny", username: "@penny", body: "Beautiful work!", img: "https://avatar.vercel.sh/jenny" },
    { name: "James", username: "@hames", body: "Perfect!", img: "https://avatar.vercel.sh/james" },
    { name: "James", username: "@tames", body: "Perfect!", img: "https://avatar.vercel.sh/james" },
    { name: "James", username: "@wames", body: "Perfect!", img: "https://avatar.vercel.sh/james" },
    { name: "Jill", username: "@jill", body: "This is unreal!", img: "https://avatar.vercel.sh/jill" },
    { name: "John", username: "@rohn", body: "Loved it!", img: "https://avatar.vercel.sh/john" },
    { name: "John", username: "@pohn", body: "Loved it!", img: "https://avatar.vercel.sh/john" },
    { name: "John", username: "@qohn", body: "Loved it!", img: "https://avatar.vercel.sh/john" },
    { name: "Jane", username: "@jane", body: "So smooth!", img: "https://avatar.vercel.sh/jane" },
    { name: "Jenny", username: "@menny", body: "Beautiful work!", img: "https://avatar.vercel.sh/jenny" },
    { name: "James", username: "@names", body: "Perfect!", img: "https://avatar.vercel.sh/james" },
    { name: "James", username: "@vames", body: "Perfect!", img: "https://avatar.vercel.sh/james" },
    { name: "James", username: "@cames", body: "Perfect!", img: "https://avatar.vercel.sh/james" },
];

const firstRow = reviews.slice(3);
const secondRow = reviews.slice(3);

export default function MarqueeDemo() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">

            {/* TOP: Right → Left */}
            <Marquee pauseOnHover duration={60000}>
                {firstRow.map(r => <ReviewCard key={r.username} {...r} />)}
            </Marquee>

            {/* BOTTOM: Left → Right */}
            <Marquee reverse pauseOnHover duration={60000}>
                {secondRow.map(r => <ReviewCard key={r.username} {...r} />)}
            </Marquee>



            {/* Fade left */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-background"></div>

            {/* Fade right */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-background "></div>
        </div>
    );
}
