'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  
  const dropdownRef = useRef(null);

  // Menggunakan gambar bendera resmi berbasis URL agar tampil konsisten di semua komputer/HP
  const languages = [
    { name: 'English', code: 'en', flag: 'https://flagcdn.com/w40/gb.png' },
    { name: 'Indonesia', code: 'id', flag: 'https://flagcdn.com/w40/id.png' },
    { name: '日本語', code: 'ja', flag: 'https://flagcdn.com/w40/jp.png' },
    { name: 'Español', code: 'es', flag: 'https://flagcdn.com/w40/es.png' },
    { name: '中文', code: 'zh-CN', flag: 'https://flagcdn.com/w40/cn.png' },
  ];

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Inisialisasi Google Translate & Hilangkan Banner Mengganggu
  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,id,ja,es,zh-CN',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };
  }, []);

  const changeLanguage = (lang) => {
    setCurrentLang(lang.name);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);

    const selectField = document.querySelector('.goog-te-combo');
    if (selectField) {
      selectField.value = lang.code;
      selectField.dispatchEvent(new Event('change'));
    }
  };

  return (
    <>
      <div id="google_translate_element" className="hidden"></div>
      <style jsx global>{`
        body {
          top: 0 !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
        .skiptranslate {
          display: none !important;
        }
        #goog-gt-tt {
          display: none !important;
        }
        .goog-tooltip {
          display: none !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `}</style>

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
            <Link href="#villas" className="hover:text-amber-400 transition-colors">THE VILLAS</Link>
            <Link href="#experience" className="hover:text-amber-400 transition-colors">EXPERIENCE</Link>
            <Link href="#location" className="hover:text-amber-400 transition-colors">LOCATION</Link>
            <Link href="#about" className="hover:text-amber-400 transition-colors">ABOUT</Link>
          </nav>

          {/* Bagian Kanan: Ikon Bola Dunia & Tombol Book Now */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Dropdown Bahasa (Ikon Bola Dunia) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-all focus:outline-none"
                title="Change Language"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden py-1 z-50">
                  <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-800 font-semibold">
                    Select Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang)}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 text-xs text-left transition-colors ${
                        currentLang === lang.name
                          ? 'bg-amber-600/20 text-amber-400 font-semibold'
                          : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 object-cover rounded-sm shadow-sm" />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tombol Book Now */}
            <Link
              href="#booking"
              className="px-6 py-2.5 text-xs font-medium tracking-widest uppercase bg-amber-600 text-white rounded-full hover:bg-amber-500 transition-all shadow-md"
            >
              Book Now
            </Link>
          </div>

          {/* Tombol Hamburger untuk Mobile */}
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
            
            <div className="flex justify-center items-center space-x-3 py-2 border-b border-neutral-800">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang)}
                  className={`p-2 rounded-lg transition-all ${
                    currentLang === lang.name
                      ? 'bg-amber-600 scale-105'
                      : 'bg-neutral-800 hover:bg-neutral-700'
                  }`}
                  title={lang.name}
                >
                  <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 object-cover rounded-sm" />
                </button>
              ))}
            </div>

            <Link href="#villas" onClick={() => setMobileMenuOpen(false)} className="text-neutral-200 hover:text-amber-400 py-2 tracking-wider">THE VILLAS</Link>
            <Link href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-neutral-200 hover:text-amber-400 py-2 tracking-wider">EXPERIENCE</Link>
            <Link href="#location" onClick={() => setMobileMenuOpen(false)} className="text-neutral-200 hover:text-amber-400 py-2 tracking-wider">LOCATION</Link>
            <Link href="#about" onClick={() => setMobileMenuOpen(false)} className="text-neutral-200 hover:text-amber-400 py-2 tracking-wider">ABOUT</Link>
            
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
    </>
  );
}