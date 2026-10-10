import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Calendar, Users, CheckCircle2, Sparkles, Utensils } from 'lucide-react';
import { restaurantLocations } from '../data/foodData';
import confetti from 'canvas-confetti';

export const LocationsPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(restaurantLocations[0].id);
  const [reservationForm, setReservationForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '2026-10-15',
    time: '19:30',
    guests: '2 Guests',
    seating: 'Chef Counter (Live Hearth View)',
    occasion: 'Casual Dining',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const activeOutlet = restaurantLocations.find((l) => l.id === selectedLocation) || restaurantLocations[0];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const code = `CRV-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(code);
    setBookingSuccess(true);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-block">
            Sanctuaries of Taste
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Our Outlets & Reservations
          </h1>
          <p className="text-stone-400 text-sm sm:text-base">
            Join us in person for an electric dining experience surrounded by burning oak hearths and sizzling planchas.
          </p>
        </div>

        {/* 2 Column Layout: Locations Directory & Reservation Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Locations Selector & Information */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-black">Select an Outlet</h2>

            <div className="space-y-4">
              {restaurantLocations.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                    selectedLocation === loc.id
                      ? 'bg-stone-900 border-amber-400 shadow-xl'
                      : 'bg-stone-900/50 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-extrabold text-lg text-white">{loc.name}</h3>
                    {selectedLocation === loc.id && (
                      <span className="text-xs bg-amber-500 text-black font-extrabold px-2.5 py-0.5 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>

                  <p className="text-stone-400 text-xs flex items-center gap-2 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{loc.address}</span>
                  </p>

                  <p className="text-stone-400 text-xs flex items-center gap-2 mb-2">
                    <Clock className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    <span>{loc.hours}</span>
                  </p>

                  <p className="text-stone-400 text-xs flex items-center gap-2 mb-4">
                    <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>{loc.phone}</span>
                  </p>

                  <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                    {loc.dineIn && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white">
                        Dine-In
                      </span>
                    )}
                    {loc.takeout && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white">
                        Takeout
                      </span>
                    )}
                    {loc.delivery && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white">
                        Delivery
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Table Reservation Desk */}
          <div className="lg:col-span-7 bg-stone-900 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
            
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-black">Reserve a Table</h3>
                <p className="text-xs text-stone-400">
                  Instant live confirmation at <span className="text-amber-400 font-bold">{activeOutlet.name}</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
            </div>

            {bookingSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h4 className="text-2xl font-black">Table Confirmed!</h4>
                <p className="text-stone-300 text-sm max-w-sm mx-auto">
                  We look forward to hosting you at {activeOutlet.name}. A confirmation SMS and email have been dispatched.
                </p>
                <div className="bg-stone-950 p-4 rounded-2xl max-w-xs mx-auto border border-white/10">
                  <span className="text-[11px] text-stone-400 uppercase tracking-widest block font-mono">Reservation Code</span>
                  <span className="text-xl font-mono font-black text-amber-400">{confirmationCode}</span>
                </div>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold rounded-full transition-colors mt-4"
                >
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {/* Full name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={reservationForm.name}
                      onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                      placeholder="e.g. Jordan Hayes"
                      className="w-full bg-stone-950 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={reservationForm.phone}
                      onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-stone-950 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Email & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={reservationForm.email}
                      onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                      placeholder="jordan@example.com"
                      className="w-full bg-stone-950 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      Party Size
                    </label>
                    <select
                      value={reservationForm.guests}
                      onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                      className="w-full bg-stone-950 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option>1 Guest (Solo Foodie)</option>
                      <option>2 Guests (Date Night)</option>
                      <option>3-4 Guests (Small Group)</option>
                      <option>5-8 Guests (Celebration Feast)</option>
                      <option>9+ Guests (Private Room)</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={reservationForm.date}
                      onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                      className="w-full bg-stone-950 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                      Preferred Time Slot
                    </label>
                    <select
                      value={reservationForm.time}
                      onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                      className="w-full bg-stone-950 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="12:00">12:00 PM (Lunch)</option>
                      <option value="13:30">1:30 PM (Lunch)</option>
                      <option value="17:30">5:30 PM (Early Dinner)</option>
                      <option value="19:00">7:00 PM (Prime Dinner)</option>
                      <option value="19:30">7:30 PM (Prime Dinner)</option>
                      <option value="20:30">8:30 PM (Late Dinner)</option>
                      <option value="21:30">9:30 PM (Late Night)</option>
                    </select>
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                    Seating Atmosphere
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      'Chef Counter (Live Hearth View)',
                      'Intimate Leather Booth',
                      'Open-Air Garden Patio',
                    ].map((seat) => (
                      <button
                        type="button"
                        key={seat}
                        onClick={() => setReservationForm({ ...reservationForm, seating: seat })}
                        className={`p-3 rounded-2xl text-xs font-bold text-center border transition-all ${
                          reservationForm.seating === seat
                            ? 'bg-white text-stone-950 font-black border-white shadow-md'
                            : 'bg-stone-950 border-white/10 text-stone-400 hover:text-white'
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black tracking-wide text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all mt-4"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Table Reservation</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
