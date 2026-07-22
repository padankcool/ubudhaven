'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function BookingPage() {
  // State untuk form booking
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isSearched, setIsSearched] = useState(false);

  // Data Dummy Villa
  const villas = [
    {
      id: 1,
      name: 'Royal Pool Villa',
      description: '1 Bedroom • Private Pool • Jungle View',
      pricePerNight: 2500000,
      capacity: 2,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Family Haven Suite',
      description: '2 Bedrooms • Private Pool • Garden View',
      pricePerNight: 4000000,
      capacity: 4,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Presidential Sanctuary',
      description: '3 Bedrooms • Infinity Pool • Valley View',
      pricePerNight: 7500000,
      capacity: 6,
      image: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=800&auto=format&fit=crop',
    }
  ];

  // Hitung jumlah malam
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();

  // Handle tombol search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert('Please select both Check-in and Check-out dates.');
      return;
    }
    setIsSearched(true);
  };

  // Format ke Rupiah
  const formatIDR = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 pb-20">
      {/* Kita panggil Navbar yang sudah dibuat sebelumnya */}
      <Navbar />

      {/* Header Halaman Booking */}
      <div className="pt-32 pb-12 bg-neutral-900 text-center">
        <h1 className="text-3xl md:text-5xl font-serif text-white tracking-wider mb-4">
          Reserve Your Stay
        </h1>
        <p className="text-neutral-400 text-sm tracking-widest uppercase">
          Find Your Perfect Sanctuary
        </p>
      </div>

      {/* Kotak Form Pencarian (Rooms, Guests, Dates) */}
      <div className="max-w-5xl mx-auto -mt-8 px-4 relative z-10">
        <form 
          onSubmit={handleSearch}
          className="bg-white rounded-xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-end gap-6 border border-neutral-200"
        >
          {/* Tanggal Check-in */}
          <div className="w-full md:w-1/4">
            <label className="block text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
              Check-In
            </label>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split('T')[0]} // Blokir tanggal masa lalu
              onChange={(e) => {
                setCheckIn(e.target.value);
                setIsSearched(false);
              }}
              className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-600 bg-transparent text-sm"
              required
            />
          </div>

          {/* Tanggal Check-out */}
          <div className="w-full md:w-1/4">
            <label className="block text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
              Check-Out
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || new Date().toISOString().split('T')[0]} // Blokir tanggal sebelum check-in
              onChange={(e) => {
                setCheckOut(e.target.value);
                setIsSearched(false);
              }}
              className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-amber-600 bg-transparent text-sm"
              required
            />
          </div>

          {/* Guest: Adults */}
          <div className="w-full md:w-1/6">
            <label className="block text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
              Adults
            </label>
            <div className="flex items-center justify-between border-b border-neutral-300 py-1">
              <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="text-xl text-neutral-400 hover:text-amber-600 px-2">-</button>
              <span className="text-sm font-medium">{adults}</span>
              <button type="button" onClick={() => setAdults(adults + 1)} className="text-xl text-neutral-400 hover:text-amber-600 px-2">+</button>
            </div>
          </div>

          {/* Guest: Children */}
          <div className="w-full md:w-1/6">
            <label className="block text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-2">
              Children
            </label>
            <div className="flex items-center justify-between border-b border-neutral-300 py-1">
              <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="text-xl text-neutral-400 hover:text-amber-600 px-2">-</button>
              <span className="text-sm font-medium">{children}</span>
              <button type="button" onClick={() => setChildren(children + 1)} className="text-xl text-neutral-400 hover:text-amber-600 px-2">+</button>
            </div>
          </div>

          {/* Tombol Search */}
          <div className="w-full md:w-auto flex-grow">
            <button
              type="submit"
              className="w-full bg-neutral-900 text-white text-xs tracking-widest uppercase font-semibold py-4 rounded-lg hover:bg-amber-600 transition-colors shadow-lg"
            >
              Search Villas
            </button>
          </div>
        </form>
      </div>

      {/* Hasil Pencarian (Muncul setelah diklik Search) */}
      {isSearched && nights > 0 && (
        <div className="max-w-5xl mx-auto mt-16 px-4">
          <div className="mb-8 flex justify-between items-end border-b border-neutral-200 pb-4">
            <div>
              <h2 className="text-2xl font-serif">Available Rooms</h2>
              <p className="text-sm text-neutral-500 mt-1">
                For {nights} night(s) • {adults} Adult(s), {children} Child(ren)
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {villas.map((villa) => {
              const totalPrice = villa.pricePerNight * nights;

              return (
                <div key={villa.id} className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row border border-neutral-100 transition-all hover:shadow-xl">
                  {/* Foto Villa */}
                  <div className="relative w-full md:w-1/3 h-64 md:h-auto bg-neutral-200">
                    <Image
                      src={villa.image}
                      alt={villa.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Detail Villa & Harga */}
                  <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-2/3">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-serif font-medium text-neutral-900">{villa.name}</h3>
                        <span className="text-xs tracking-widest uppercase bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full">
                          Max {villa.capacity} Guests
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500 mb-6">{villa.description}</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mt-auto border-t border-neutral-100 pt-6">
                      <div className="mb-4 md:mb-0 w-full md:w-auto text-left">
                        <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Total for {nights} night(s)</p>
                        <p className="text-2xl font-semibold text-neutral-900">{formatIDR(totalPrice)}</p>
                        <p className="text-xs text-neutral-400 mt-1">Includes taxes & fees</p>
                      </div>

                      <button
                        onClick={() => alert(`Booking process for ${villa.name} initiated!`)}
                        className="w-full md:w-auto px-8 py-3.5 bg-amber-600 text-white text-xs font-semibold tracking-widest uppercase rounded-lg hover:bg-amber-500 transition-colors shadow-md"
                      >
                        Book Villa
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}