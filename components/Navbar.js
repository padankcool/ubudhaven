'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efek untuk mendeteksi scroll halaman
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-900/90 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Website */}
        <Link href="/" className="text-2xl font-serif tracking-widest text-white">
          UBUD HAVEN
        </Link>

        {/* Menu Navigasi Desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-sm tracking-wider text-neutral-200">
          <Link href="#villas" className="hover:text-amber-400 transition-colors">
            THE VILLAS
          </Link>
          <Link href="#experience" className="hover:text-amber-400 transition-colors">
            EXPERIENCE
          </Link>
          <Link href="#location" className="hover:text-amber-400 transition-colors">
            LOCATION
          </Link>
          <Link href="#about" className="hover:text-amber-400 transition-colors">
            ABOUT
          </Link>
        </nav>

        {/* Tombol Call to Action (CTA) Book Now */}
        <div className="hidden md:block">
          <Link
            href="#booking"
            className="px-6 py-2.5 text-xs font-medium tracking-widest uppercase bg-amber-600 text-white rounded-full hover:bg-amber-500 transition-all shadow-md"
          >
            Book Now
          </Link>
        </div>

        {/* Tombol Hamburger untuk Mobile (HP) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Dropdown untuk Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-800 shadow-xl py-6 px-6 flex flex-col space-y-4 text-center">
          <Link
            href="#villas"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-200 hover:text-amber-400 py-2 tracking-wider"
          >
            THE VILLAS
          </Link>
          <Link
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-200 hover:text-amber-400 py-2 tracking-wider"
          >
            EXPERIENCE
          </Link>
          <Link
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-200 hover:text-amber-400 py-2 tracking-wider"
          >
            LOCATION
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-200 hover:text-amber-400 py-2 tracking-wider"
          >
            ABOUT
          </Link>
          <Link
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 text-xs font-medium tracking-widest uppercase bg-amber-600 text-white rounded-full hover:bg-amber-500 transition-all"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}