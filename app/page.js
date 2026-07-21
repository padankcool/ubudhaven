"use client";
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <Hero />
    

  const [currentIndex, setCurrentIndex] = useState(0);

  // skading kadung pang dung ding, dung padungking
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Slider Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {photos.map((src, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        ))}

        {/* Tombol Panah */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 bg-white/50 p-3 rounded-full hover:bg-white transition">←</button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 bg-white/50 p-3 rounded-full hover:bg-white transition">→</button>
        
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
          <h1 className="text-white text-6xl font-serif tracking-tighter">Ubud Haven</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl font-serif mb-6">Experience True Serenity</h2>
      </div>
    </main>
  );
}