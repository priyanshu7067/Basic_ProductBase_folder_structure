import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Testimonials Component
const Testimonials2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "Bessie Cooper",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. U.",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=1"
        },
        {
            name: "Jane Smith",
            text: "Amazing products! My skin has never looked better. The quality is outstanding and I've seen real results.",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=2"
        },
        {
            name: "Sarah Johnson",
            text: "Best skincare routine I've ever tried. Highly recommend to anyone looking for professional results.",
            rating: 5,
            image: "https://i.pravatar.cc/150?img=3"
        }
    ];

    const customers = [
        "https://i.pravatar.cc/150?img=5",
        "https://i.pravatar.cc/150?img=6",
        "https://i.pravatar.cc/150?img=7",
        "https://i.pravatar.cc/150?img=8",
        "https://i.pravatar.cc/150?img=9"
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className=" px-4 mt-5">
            <div className="mx-auto">
                <p className="text-green-700 text-sm md:text-xl font-medium text-center mb-2">Testimonials</p>
                <h2 className="text-3xl font-bold text-center mb-3">
                    Testimonials from
                    Our <span className="text-orange-400">Loyal Customers</span>
                </h2>

                <div className="flex justify-center items-center gap-2 mb-8">
                    {customers.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt="Customer"
                            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                        />
                    ))}
                </div>

                <div className="relative rounded-2xl bg-gray-100 p-8 max-w-5xl mx-auto">
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-1 top-1/2 -translate-y-1/2 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition -translate-x-6"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-white hover:bg-green-800 transition translate-x-6"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <h3 className="text-xl font-bold text-center mb-4">
                        The Best Thing I've Used for My Skin!
                    </h3>

                    <p className="text-gray-600 text-center mb-6 leading-relaxed">
                        {testimonials[currentIndex].text}
                    </p>

                    <div className="flex justify-center gap-1 mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} size={20} fill="#FCD34D" stroke="#FCD34D" />
                        ))}
                    </div>

                    <p className="text-center font-semibold text-gray-800">
                        {testimonials[currentIndex].name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Testimonials2;