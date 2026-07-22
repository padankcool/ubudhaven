'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

// --- KOMPONEN IMAGE SLIDER (Dengan Fungsi Swipe & Drag) ---
const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State untuk melacak posisi sentuhan/kursor
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // --- FUNGSI SWIPE (HP) ---
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
    setTouchStart(0);
    setTouchEnd(0);
  };

  // --- FUNGSI DRAG (MOUSE) ---
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
  };
  const handleMouseMove = (e) => {
    if (touchStart) setTouchEnd(e.clientX);
  };
  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(0);
      setTouchEnd(0);
      return;
    }
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(0);
    setTouchEnd(0);
  };
  const handleMouseLeave = () => {
    if (touchStart) handleMouseUp();
  };

  return (
    <div 
      className="relative w-full h-full min-h-[300px] group bg-neutral-200 overflow-hidden cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Menggunakan <img> biasa agar tidak diblokir oleh Next.js Domain Config */}
      <img
        src={images[currentIndex]}
        alt={`Villa view ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500 pointer-events-none select-none"
      />
      
      {/* Tombol Panah Kiri/Kanan (Muncul saat di-hover di Desktop) */}
      <div className="absolute inset-0 flex justify-between items-center px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-900/60 hover:bg-neutral-900 text-white backdrop-blur-md transition-all pointer-events-auto"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-900/60 hover:bg-neutral-900 text-white backdrop-blur-md transition-all pointer-events-auto"
        >
          ›
        </button>
      </div>

      {/* Indikator Titik (Dots) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-5 bg-white shadow-sm' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// --- DATA VILLA LENGKAP ---
const villasData = [
  {
    id: 1,
    name: 'Ricefield Pool Villa',
    shortDesc: 'Intimate pool villa with emerald rice field views.',
    pricePerNight: 15000000,
    maxAdults: 2,
    maxChildren: 2,
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771731478-44eb1c28c688?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    ],
    specs: [
      'Rice and Mountain View',
      '290 m2 / 3,121sqft',
      'Max Occupancy 2 adults / 2 adults and 1 child up to 12 years',
      'King Size Bed'
    ],
    amenities: [
      'Private Infinity Pool',
      'Complimentary Minibar',
      'Complimentary WIFI',
      'Complimentary Laundry'
    ],
    description: [
      'The Mountain / Rice Paddies Pool Villas unwind in an intricate pattern of interior spaces connected by landscaped gardens and courtyards.',
      'Making these elegant villas the ideal choice for those looking to get away from it all. Relax on the sun-drenched lawns fringing the private pool, or in the shade of the outdoor lounge pavilion.',
      'Artfully designed, the villa’s architecture integrates Bali’s stunning landscape into the overall spatial experience, framing sweeping views across the emerald expanse of rice fields that stretch towards the mystical Mount Batukaru on the distant horizon.'
    ]
  },
  {
    id: 2,
    name: 'Deluxe Resident Villa',
    shortDesc: 'Spacious three-bedroom luxury sanctuary.',
    pricePerNight: 20000000,
    maxAdults: 6,
    maxChildren: 4,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop',
    ],
    specs: [
      'Resort / Garden View',
      '805 m2 / 8,665 sqft.',
      'Three-Bedroom Residence',
      'Perfect for families or groups'
    ],
    amenities: [
      'Private Infinity Pool',
      'Complimentary Minibar',
      'Complimentary WIFI',
      'Complimentary Laundry'
    ],
    description: [
      'The exclusive Three-Bedroom Residence offers contemporary living at its finest, subtly infused with the essence of the tropics.',
      'Designed with utmost care and attention to details, each residence is a distinctive example of harmoniously combined spaces that form an exclusive, peaceful and elegant sanctuary.',
      'Set on two levels, generous living areas seamlessly flow from one to the next, interspersed by landscaped gardens and soothing water features. Outdoor pavilions and terraces, bordered by an infinity pool, look out towards the resort area (garden view).'
    ]
  }
];

export default function BookingPage() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [detailsModal, setDetailsModal] = useState(null);

  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(price);
  };

  const availableVillas = villasData.filter(villa => adults <= villa.maxAdults);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (clickedDate < today) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate > startDate) setEndDate(clickedDate);
      else setStartDate(clickedDate);
    }
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const today = new Date();
    if (prev.getMonth() >= today.getMonth() || prev.getFullYear() > today.getFullYear()) setCurrentMonth(prev);
  };

  const calculateNights = () => {
    if (!startDate || !endDate) return 0;
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 pb-20 font-sans overflow-x-hidden">
      <Navbar />

      <div className="pt-32 pb-16 bg-neutral-900 text-center">
        <h1 className="text-3xl md:text-5xl font-serif text-white tracking-wider mb-4">
          Reserve Your Stay
        </h1>
        <p className="text-neutral-400 text-sm tracking-widest uppercase">
          Find Your Perfect Sanctuary
        </p>
      </div>

      <div className="max-w-5xl mx-auto -mt-10 px-4 relative z-10">
        
        {/* PANEL PILIH GUEST */}
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-neutral-200 mb-10">
          <div className="w-full md:w-1/2 flex items-center justify-between px-4 py-2 border-b md:border-b-0 md:border-r border-neutral-200">
            <div>
              <p className="font-semibold uppercase tracking-wider text-xs text-neutral-500">Adults</p>
              <p className="text-[10px] text-neutral-400">Ages 13 or above</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-amber-600 hover:text-amber-600 transition-colors">-</button>
              <span className="w-4 text-center font-medium">{adults}</span>
              <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-amber-600 hover:text-amber-600 transition-colors">+</button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-between px-4 py-2">
            <div>
              <p className="font-semibold uppercase tracking-wider text-xs text-neutral-500">Children</p>
              <p className="text-[10px] text-neutral-400">Ages 2-12</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-amber-600 hover:text-amber-600 transition-colors">-</button>
              <span className="w-4 text-center font-medium">{children}</span>
              <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-amber-600 hover:text-amber-600 transition-colors">+</button>
            </div>
          </div>
        </div>

        {/* DAFTAR VILLA */}
        <div className="space-y-8">
          {availableVillas.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-neutral-200 shadow-sm">
              <p className="text-neutral-500">No villas available for {adults} adults.</p>
            </div>
          ) : (
            availableVillas.map((villa) => (
              <div key={villa.id} className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row border border-neutral-100 group">
                
                {/* Image Slider Section */}
                <div className="relative w-full md:w-2/5 flex-shrink-0">
                  <ImageSlider images={villa.images} />
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-3/5">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-serif text-neutral-900">{villa.name}</h3>
                    </div>
                    <p className="text-sm text-neutral-500 mb-3">{villa.shortDesc}</p>
                    
                    <ul className="text-xs text-neutral-500 mb-4 flex flex-col sm:flex-row sm:gap-4 gap-2">
                      <li className="flex items-center"><span className="text-amber-600 mr-2">👤</span> Max {villa.maxAdults} Adults</li>
                      <li className="flex items-center"><span className="text-amber-600 mr-2">🛏️</span> {villa.specs[0]}</li>
                    </ul>

                    {/* Tombol Popup Detail */}
                    <button 
                      onClick={() => setDetailsModal(villa)}
                      className="text-xs font-semibold uppercase tracking-widest text-amber-600 hover:text-amber-700 underline underline-offset-4"
                    >
                      View Villa Details
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between mt-6 border-t border-neutral-100 pt-6 gap-4">
                    <div className="text-center md:text-left w-full md:w-auto">
                      <p className="text-xl font-semibold text-neutral-900">{formatIDR(villa.pricePerNight)}</p>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">per night</p>
                    </div>
                    <button
                      onClick={() => setSelectedVilla(villa)}
                      className="w-full md:w-auto px-8 py-3.5 bg-neutral-900 text-white text-xs font-semibold tracking-widest uppercase rounded-lg hover:bg-amber-600 transition-colors shadow-md"
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

      {/* =========================================
          MODAL POPUP DETAIL VILLA
      ========================================= */}
      {detailsModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm" onClick={() => setDetailsModal(null)}></div>
          
          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Header Modal Detail */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-100 bg-white z-10">
              <h3 className="text-2xl font-serif">{detailsModal.name}</h3>
              <button onClick={() => setDetailsModal(null)} className="text-neutral-400 hover:text-neutral-900 text-xl font-bold px-2">✕</button>
            </div>

            {/* Isi Konten Detail (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-grow bg-neutral-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Kolom Kiri: Slider Besar & Spek */}
                <div>
                  <div className="h-72 rounded-xl overflow-hidden shadow-sm mb-6">
                    <ImageSlider images={detailsModal.images} />
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl border border-neutral-100">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Villa Specifications</h4>
                    <ul className="space-y-3 text-sm text-neutral-700">
                      {detailsModal.specs.map((spec, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-amber-500 mr-3 mt-0.5">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Kolom Kanan: Deskripsi & Amenities */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Overview</h4>
                  <div className="space-y-4 text-sm text-neutral-600 font-light leading-relaxed mb-8">
                    {detailsModal.description.map((par, i) => (
                      <p key={i}>{par}</p>
                    ))}
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Complimentary Amenities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {detailsModal.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center text-xs md:text-sm text-neutral-700 bg-white p-3 rounded-lg border border-neutral-100">
                        <span className="text-emerald-600 mr-2 font-bold">✓</span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Modal Detail */}
            <div className="p-6 bg-white border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4 z-10">
              <div className="text-center sm:text-left">
                <p className="text-lg font-bold">{formatIDR(detailsModal.pricePerNight)}</p>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">per night</p>
              </div>
              <button
                onClick={() => {
                  setSelectedVilla(detailsModal);
                  setDetailsModal(null);
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-600 text-white text-xs font-semibold tracking-widest uppercase rounded-lg hover:bg-amber-500 transition-colors shadow-md"
              >
                Select Dates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL KALENDER
      ========================================= */}
      {selectedVilla && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm" onClick={() => { setSelectedVilla(null); setStartDate(null); setEndDate(null); }}></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-serif">{selectedVilla.name}</h3>
                <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Select Check-in & Check-out</p>
              </div>
              <button onClick={() => { setSelectedVilla(null); setStartDate(null); setEndDate(null); }} className="text-neutral-400 hover:text-neutral-900 text-xl font-bold">✕</button>
            </div>

            <div className="flex justify-between items-center mb-4 px-2">
              <button onClick={prevMonth} className="p-2 hover:bg-neutral-100 rounded-full font-bold transition-colors">←</button>
              <h4 className="font-semibold text-sm uppercase tracking-wider">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h4>
              <button onClick={nextMonth} className="p-2 hover:bg-neutral-100 rounded-full font-bold transition-colors">→</button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-neutral-400 mb-2">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>

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

                let dayClasses = "p-2 text-sm rounded-full cursor-pointer transition-all mx-auto w-9 h-9 flex items-center justify-center ";
                
                if (isPast) {
                  dayClasses += "text-neutral-300 cursor-not-allowed";
                } else if (isStart || isEnd) {
                  dayClasses += "bg-amber-600 text-white font-bold shadow-md";
                } else if (isBetween) {
                  dayClasses += "bg-amber-100 text-amber-900 rounded-none w-full";
                } else {
                  dayClasses += "hover:bg-neutral-100 text-neutral-700";
                }

                return (
                  <div key={dayNumber} onClick={() => handleDateClick(dayNumber)} className={dayClasses}>
                    {dayNumber}
                  </div>
                );
              })}
            </div>

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
              onClick={() => alert(`Booking Confirmed!\nVilla: ${selectedVilla.name}\nTotal: ${formatIDR(selectedVilla.pricePerNight * calculateNights())}`)}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </main>
  );
}