import React, { useState } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Clock,
  Users,
  MapPin,
} from 'lucide-react';
import { RESTAURANT_INFO, IMAGES } from '../data/restaurantData';
import { ResilientImage } from '../components/ResilientImage';

export const ReservationsPage: React.FC = () => {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(tomorrow);
  const [time, setTime] = useState('8:00 PM');
  const [guests, setGuests] = useState('4 Guests');
  const [seatingArea, setSeatingArea] = useState('Main Family Hall');
  const [specialRequest, setSpecialRequest] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<{
    refCode: string;
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: string;
    seatingArea: string;
    specialRequest: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const refCode = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedBooking({
      refCode,
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests,
      seatingArea,
      specialRequest: specialRequest.trim(),
    });
  };

  const whatsappBookingMessage = [
    `*Table Reservation Request — ${RESTAURANT_INFO.name} (Sargodha)*`,
    `Name: ${name || 'Guest'}`,
    `Phone: ${phone || 'Not provided'}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Party Size: ${guests}`,
    `Preferred Area: ${seatingArea}`,
    specialRequest ? `Special Request: ${specialRequest}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div className="min-h-screen bg-[#111110] py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                <span>Table Booking · Main Boulevard, Sargodha</span>
                <span aria-hidden="true">·</span>
                <span>Demo Reservation System</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#FAF7F2]">
                Reserve Your Table
              </h1>
              <p className="text-sm sm:text-base text-[#FAF7F2]/75 leading-relaxed">
                Planning a family dinner, birthday gathering, or corporate meal
                in Sargodha? Reserve your table below or message our floor host
                directly on WhatsApp.
              </p>
            </div>

            {submittedBooking ? (
              <div className="rounded-xl bg-[#181715] border border-[#C5A059]/50 p-6 sm:p-8 space-y-6">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono-num text-[#C5A059]">
                      DEMO RESERVATION REQUEST RECEIVED · #{submittedBooking.refCode}
                    </span>
                    <h2 className="font-display text-3xl font-bold text-[#FAF7F2] mt-1">
                      We Look Forward to Hosting You, {submittedBooking.name}
                    </h2>
                    <p className="text-sm text-[#FAF7F2]/75 mt-1 leading-relaxed">
                      This is a demonstration confirmation showing how guests
                      receive instant reassurance after requesting a table.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-[#111110] border border-[#FAF7F2]/10 text-xs">
                  <div>
                    <span className="block text-[#FAF7F2]/50">Date &amp; Time</span>
                    <span className="font-mono-num font-semibold text-[#FAF7F2] mt-0.5 block">
                      {submittedBooking.date} · {submittedBooking.time}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#FAF7F2]/50">Guests</span>
                    <span className="font-semibold text-[#FAF7F2] mt-0.5 block">
                      {submittedBooking.guests}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#FAF7F2]/50">Seating Zone</span>
                    <span className="font-semibold text-[#C5A059] mt-0.5 block">
                      {submittedBooking.seatingArea}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${
                      RESTAURANT_INFO.whatsappClean
                    }?text=${encodeURIComponent(whatsappBookingMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-[#111110] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Details via WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmittedBooking(null)}
                    className="px-4 py-3 rounded-lg border border-[#FAF7F2]/15 hover:border-[#C5A059] text-xs sm:text-sm font-medium text-[#FAF7F2]/80 hover:text-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    Modify Reservation
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl bg-[#181715] border border-[#FAF7F2]/10 p-6 sm:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="res-name"
                      className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Usman Gondal"
                      className="w-full px-4 py-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/35 focus:outline-none focus:border-[#D95326]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="res-phone"
                      className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5"
                    >
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 0300 0000000"
                      className="w-full px-4 py-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/35 focus:outline-none focus:border-[#D95326]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label
                      htmlFor="res-date"
                      className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5"
                    >
                      Date *
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] font-mono-num focus:outline-none focus:border-[#D95326]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="res-time"
                      className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5"
                    >
                      Preferred Time *
                    </label>
                    <select
                      id="res-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#D95326]"
                    >
                      {[
                        '1:00 PM',
                        '2:00 PM',
                        '3:30 PM',
                        '6:30 PM',
                        '7:30 PM',
                        '8:00 PM',
                        '8:30 PM',
                        '9:00 PM',
                        '9:30 PM',
                        '10:30 PM',
                      ].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="res-guests"
                      className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5"
                    >
                      Number of Guests *
                    </label>
                    <select
                      id="res-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#D95326]"
                    >
                      {[
                        '2 Guests',
                        '3 Guests',
                        '4 Guests',
                        '5 Guests',
                        '6 Guests',
                        '8 Guests (Family Table)',
                        '10–15 Guests (Large Family Booth)',
                        '20+ Guests (Private Event Inquiry)',
                      ].map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5">
                    Preferred Dining Section
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      'Main Family Hall',
                      'Private Family Booth',
                      'Evening Charcoal Lounge',
                    ].map((zone) => (
                      <button
                        key={zone}
                        type="button"
                        onClick={() => setSeatingArea(zone)}
                        className={`py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                          seatingArea === zone
                            ? 'bg-[#D95326]/20 border-[#D95326] text-[#FAF7F2]'
                            : 'bg-[#111110] border-[#FAF7F2]/12 text-[#FAF7F2]/70 hover:text-[#FAF7F2]'
                        }`}
                      >
                        {zone}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="res-special"
                    className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5"
                  >
                    Special Request (Optional)
                  </label>
                  <textarea
                    id="res-special"
                    rows={3}
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Birthday cake arrangement, high-chair for child, wheelchair access, or pre-ordering BBQ platter..."
                    className="w-full px-4 py-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/35 focus:outline-none focus:border-[#D95326]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Request Reservation
                  </button>

                  <a
                    href={`https://wa.me/${
                      RESTAURANT_INFO.whatsappClean
                    }?text=${encodeURIComponent(whatsappBookingMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-lg border border-[#FAF7F2]/20 hover:border-[#25D366] text-xs sm:text-sm font-semibold text-[#FAF7F2] inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Prefer WhatsApp?</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Hospitality Info & Photo */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl overflow-hidden border border-[#FAF7F2]/12 bg-[#181715]">
              <ResilientImage
                src={IMAGES.interior}
                alt="Evening family booth seating at Ember & Spice Sargodha"
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="p-6 space-y-4">
                <h2 className="font-display text-2xl font-bold text-[#FAF7F2]">
                  Dining &amp; Event Guidelines
                </h2>
                <ul className="space-y-3 text-xs sm:text-sm text-[#FAF7F2]/75">
                  <li className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>
                      Tables are held for 20 minutes past your reservation time.
                      Need to adjust? Just message us on WhatsApp.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>
                      For birthday parties and corporate groups of 12+ guests,
                      we offer pre-set BBQ &amp; Karahi menus so food is served
                      promptly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>
                      Complimentary valet and dedicated family car &amp; bike
                      parking right outside our Main Boulevard entrance.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
