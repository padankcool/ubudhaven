'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

// --- DATA VILLA SESUAI PERMINTAAN ---
const villasData = [
  {
    id: 1,
    name: 'Ricefield Pool Villa',
    description: 'Beautiful tranquil views • Private Pool • Intimate setting',
    pricePerNight: 15000000,
    maxAdults: 2,
    maxChildren: 2,
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Deluxe Resident Villa',
    description: 'Spacious luxury • Infinity Pool • Perfect for families or groups',
    pricePerNight: 20000000,
    maxAdults: 6, // Bisa menampung lebih dari 2 dewasa
    maxChildren: 4,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
  }
];

export default function BookingPage() {
  // State untuk Alur Booking
  const [step, setStep] = useState(1); // Step 1: Guest, Step 2: Villas
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  // State untuk Modal & Kalender
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fungsi Format Rupiah
  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Logika Filter Villa berdasarkan Tamu (Adults)
  const availableVillas = villasData.filter(villa => adults <= villa.maxAdults);

  // Logika Kalender Kustom
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (clickedDate < today) return; // Tidak bisa pilih hari yang sudah lewat

    if (!startDate || (startDate && endDate)) {
      // Jika belum ada pilihan, atau sudah pilih keduanya -> Reset mulai dari awal
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // Jika check-in sudah dipilih, sekarang pilih check-out
      if (clickedDate > startDate) {
        setEndDate(clickedDate);
      } else {
        // Jika klik tanggal sebelum check-in, jadikan itu check-in baru
        setStartDate(clickedDate);
      }
    }
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const today = new Date();
    if (prev.getMonth() >= today.getMonth() || prev.getFullYear() > today.getFullYear()) {
      setCurrentMonth(prev);
    }
  };

  const calculateNights = () => {
    if (!startDate || !endDate) return 0;
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 pb-20 font-sans">
      <Navbar />

      <div className="pt-32 pb-12 bg-neutral-900 text-center">
        <h1 className="text-3xl md:text-5xl font-serif text-white tracking-wider mb-4">
          Reserve Your Stay
        </h1>
        <p className="text-neutral-400 text-sm tracking-widest uppercase">
          {step === 1 ? 'Step 1: Who is staying?' : 'Step 2: Select your Sanctuary'}
        </p>
      </div>

      <div className="max-w-5xl mx-auto -mt-8 px-4 relative z-10">
        
        {/* STEP 1: PILIH GUEST */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-xl mx-auto border border-neutral-200">
            <h2 className="text-xl font-serif mb-6 text-center">Number of Guests</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold uppercase tracking-wider text-sm">Adults</p>
                  <p className="text-xs text-neutral-500">Ages 13 or above</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-xl hover:border-amber-600 hover:text-amber-600 transition-colors">-</button>
                  <span className="w-4 text-center font-medium">{adults}</span>
                  <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-xl hover:border-amber-600 hover:text-amber-600 transition-colors">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold uppercase tracking-wider text-sm">Children</p>
                  <p className="text-xs text-neutral-500">Ages 2-12</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-xl hover:border-amber-600 hover:text-amber-600 transition-colors">-</button>
                  <span className="w-4 text-center font-medium">{children}</span>
                  <button onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-xl hover:border-amber-600 hover:text-amber-600 transition-colors">+</button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-amber-600 text-white font-semibold tracking-widest uppercase rounded-lg hover:bg-amber-500 transition-all shadow-md"
            >
              Show Available Villas
            </button>
          </div>
        )}

        {/* STEP 2: TAMPILKAN VILLA */}
        {step === 2 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <button 
                onClick={() => setStep(1)} 
                className="text-sm text-neutral-500 hover:text-amber-600 flex items-center space-x-2"
              >
                <span>←</span> <span>Change Guests ({adults} Adults, {children} Children)</span>
              </button>
            </div>

            <div className="space-y-8">
              {availableVillas.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-neutral-200">
                  <p className="text-neutral-500">No villas available for this party size.</p>
                </div>
              ) : (
                availableVillas.map((villa) => (
                  <div key={villa.id} className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row border border-neutral-100">
                    <div className="relative w-full md:w-2/5 h-64 md:h-auto bg-neutral-200">
                      <Image src={villa.image} alt={villa.name} fill className="object-cover" />
                    </div>

                    <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-3/5">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-serif text-neutral-900">{villa.name}</h3>
                        </div>
                        <p className="text-sm text-neutral-500 mb-4">{villa.description}</p>
                        <ul className="text-xs text-neutral-600 mb-6 space-y-1">
                          <li>• Max Adults: {villa.maxAdults}</li>
                          <li>• Max Children: {villa.maxChildren}</li>
                        </ul>
                      </div>

                      <div className="flex items-center justify-between mt-4 border-t border-neutral-100 pt-6">
                        <div>
                          <p className="text-xl font-semibold text-neutral-900">{formatIDR(villa.pricePerNight)}</p>
                          <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">per night</p>
                        </div>
                        <button
                          onClick={() => setSelectedVilla(villa)}
                          className="px-6 py-3 bg-neutral-900 text-white text-xs font-semibold tracking-widest uppercase rounded-lg hover:bg-amber-600 transition-colors shadow-md"
                        >
                          Select Dates
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL KALENDER CUSTOM */}
      {selectedVilla && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Latar Belakang Blur */}
          <div 
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            onClick={() => {
              setSelectedVilla(null);
              setStartDate(null);
              setEndDate(null);
            }}
          ></div>
          
          {/* Konten Modal Kalender */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 overflow-hidden">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-serif">{selectedVilla.name}</h3>
                <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Select Check-in & Check-out</p>
              </div>
              <button 
                onClick={() => { setSelectedVilla(null); setStartDate(null); setEndDate(null); }}
                className="text-neutral-400 hover:text-neutral-900"
              >
                ✕
              </button>
            </div>

            {/* Navigasi Bulan */}
            <div className="flex justify-between items-center mb-4 px-2">
              <button onClick={prevMonth} className="p-2 hover:bg-neutral-100 rounded-full font-bold">←</button>
              <h4 className="font-semibold text-sm uppercase tracking-wider">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h4>
              <button onClick={nextMonth} className="p-2 hover:bg-neutral-100 rounded-full font-bold">→</button>
            </div>

            {/* Grid Nama Hari */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-neutral-400 mb-2">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>

            {/* Grid Tanggal */}
            <div className="grid grid-cols-7 gap-1 text-center mb-6">
              {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                <div key={`empty-${idx}`} className="p-2"></div>
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNumber = idx + 1;
                const thisDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                const isPast = thisDate < today;
                const isStart = startDate && thisDate.getTime() === startDate.getTime();
                const isEnd = endDate && thisDate.getTime() === endDate.getTime();
                const isBetween = startDate && endDate && thisDate > startDate && thisDate < endDate;

                // Logika Warna CSS berdasarkan state tanggal
                let dayClasses = "p-2 text-sm rounded-full cursor-pointer transition-all mx-auto w-9 h-9 flex items-center justify-center ";
                
                if (isPast) {
                  dayClasses += "text-neutral-300 cursor-not-allowed";
                } else if (isStart || isEnd) {
                  dayClasses += "bg-amber-600 text-white font-bold shadow-md";
                } else if (isBetween) {
                  dayClasses += "bg-amber-100 text-amber-900 rounded-none w-full"; // Efek blok warna
                } else {
                  dayClasses += "hover:bg-neutral-100 text-neutral-700";
                }

                return (
                  <div
                    key={dayNumber}
                    onClick={() => handleDateClick(dayNumber)}
                    className={dayClasses}
                  >
                    {dayNumber}
                  </div>
                );
              })}
            </div>

            {/* Hitungan Harga Langsung di Bawah Kalender */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-6">
              {(!startDate || !endDate) ? (
                <p className="text-center text-sm text-neutral-500">Please select both dates to see total price.</p>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-500">Total for {calculateNights()} night(s)</p>
                    <p className="text-xl font-bold text-neutral-900">
                      {formatIDR(selectedVilla.pricePerNight * calculateNights())}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              disabled={!startDate || !endDate}
              className={`w-full py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all shadow-md ${
                (!startDate || !endDate) 
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
                  : 'bg-neutral-900 text-white hover:bg-amber-600'
              }`}
              onClick={() => alert(`Confirmed booking for ${selectedVilla.name}!\nTotal: ${formatIDR(selectedVilla.pricePerNight * calculateNights())}`)}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

    </main>
  );
}