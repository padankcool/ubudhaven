'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({ name: 'English', code: 'en', flag: '🇬🇧' });
  
  const dropdownRef = useRef(null);

  // Daftar bahasa yang diminta
  const languages = [
    { name: 'English', code: 'en', flag: '🇬🇧' },
    { name: 'Indonesia', code: 'id', flag: '🇮🇩' },
    { name: '日本語', code: 'ja', flag: '🇯🇵' },
    { name: 'Español', code: 'es', flag: '🇪🇸' },
    { name: '中文', code: 'zh-CN', flag: '🇨🇳' },
  ];

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

  // Menutup dropdown bahasa jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Inisialisasi Google Translate Widget secara tersembunyi
  useEffect(() => {
    const addGoogleTranslateScript = () => {
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
    };

    addGoogleTranslateScript();
  }, []);

  // Fungsi untuk mengubah bahasa secara otomatis lewat script Google Translate
  const changeLanguage = (lang) => {
    setCurrentLang(lang);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);

    // Mencari elemen select bawaan Google Translate yang disembunyikan
    const selectField = document.querySelector('.goog-te-combo');
    if (selectField) {
      selectField.value = lang.code;
      selectField.dispatchEvent(new Event('change'));
    }
  };

  return (
    <>
      {/* Elemen Google Translate disembunyikan agar desain tetap bersih */}
      <div id="google_translate_element" className="hidden"></div>

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

          {/* Bagian Kanan: Pemilih Bahasa & Tombol Book Now */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Dropdown Bahasa */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-2 text-xs uppercase tracking-wider text-neutral-300 bg-neutral-800/60 hover:bg-neutral-800 px-3 py-2 rounded-full border border-neutral-700 transition-all"
              >
                <span>{currentLang.flag}</span>
                <span className="font-medium">{currentLang.code}</span>
                <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang)}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 text-xs text-left transition-colors ${
                        currentLang.code === lang.code
                          ? 'bg-amber-600/20 text-amber-400 font-semibold'
                          : 'text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
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
            
            {/* Pilihan Bahasa Versi Mobile */}
            <div className="flex justify-center items-center space-x-2 py-2 border-b border-neutral-800">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang)}
                  className={`px-2.5 py-1.5 rounded-lg text-sm transition-all ${
                    currentLang.code === lang.code
                      ? 'bg-amber-600 text-white scale-105'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                  title={lang.name}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

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
    </>
  );
}