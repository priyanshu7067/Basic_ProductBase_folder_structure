import React from 'react';
import { Award } from 'lucide-react';

export default function ProductShowcase() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-8">
      <div className=" mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Product Images */}
          <div className="relative">
            {/* Main Product Image - Top Left */}
            <div className="relative z-10 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl bg-white p-4">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop" 
                alt="Product 1"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Quality Badge */}
            <div className="absolute top-32 left-48 z-20 bg-emerald-800 text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-xl">
              <Award className="w-8 h-8 mb-1" />
              <span className="text-xs font-bold">Premium</span>
              <span className="text-xs">Quality</span>
            </div>

            {/* Second Product Image - Top Right */}
            <div className="absolute top-0 right-0 w-48 h-64 rounded-3xl overflow-hidden shadow-2xl bg-white p-3">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop" 
                alt="Product 2"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Third Product Image - Bottom Left */}
            <div className="absolute bottom-0 left-12 w-56 h-72 rounded-3xl overflow-hidden shadow-2xl bg-white p-3">
              <img 
                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=600&fit=crop" 
                alt="Product 3"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-amber-200 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 -left-6 w-12 h-12 bg-emerald-200 rounded-full opacity-50"></div>
            <div className="absolute top-12 right-24 w-3 h-3 bg-amber-400 rounded-full"></div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              {/* <p className="text-emerald-700 font-medium mb-2">About Us</p>e */}
              <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                Your Journey to<br />
                <span className="text-emerald-700">Effortless Elegance</span>
              </h1>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Discover all areas, connected and adapting to life changes. An unparalleled experience in quality and style.
              </p>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-3xl p-8 text-white shadow-xl">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center border-r border-emerald-600">
                  <p className="text-4xl font-bold mb-1">24+</p>
                  <p className="text-sm text-emerald-200">Years Experience</p>
                </div>
                <div className="text-center border-r border-emerald-600">
                  <p className="text-4xl font-bold mb-1">2500+</p>
                  <p className="text-sm text-emerald-200">Happy Clients</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">99%</p>
                  <p className="text-sm text-emerald-200">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="pt-4">
              <p className="text-3xl font-serif italic text-gray-700">AmyJanado</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}