'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/bali-villa.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay (Agar teks di atasnya terbaca jelas dan dramatis) */}
      <div className="absolute inset-0 bg-neutral-950/50 z-10" />

      {/* Konten Teks di Atas Video */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-20">
        <span className="text-amber-400 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block font-medium">
          Welcome to Paradise
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-wider mb-6 leading-tight">
          Experience Ultimate Luxury in Ubud
        </h1>
        <p className="text-neutral-200 text-sm md:text-base tracking-wide max-w-2xl mx-auto mb-10 font-light">
          A secluded sanctuary where modern elegance meets the tranquil beauty of Bali's lush tropical nature.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#booking"
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-medium tracking-widest uppercase bg-amber-600 text-white rounded-full hover:bg-amber-500 transition-all shadow-lg"
          >
            Book Your Stay
          </Link>
          <Link
            href="#villas"
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-medium tracking-widest uppercase bg-transparent text-white border border-white/40 rounded-full hover:bg-white/10 transition-all"
          >
            Explore Villas
          </Link>
        </div>
      </div>
    </section>
  );
}