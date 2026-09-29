import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { SargodhaMap } from '../components/SargodhaMap';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#111110] py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-2 pb-8 border-b border-[#FAF7F2]/10">
          <div className="flex items-center gap-2 text-xs text-[#C5A059]">
            <span>Get in Touch</span>
            <span aria-hidden="true">·</span>
            <span>Fictional Demo Contact Information</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#FAF7F2]">
            Contact &amp; Directions
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F2]/75 max-w-2xl">
            Have a question about our menu, group catering, or private family
            events in Sargodha? Reach out via phone, WhatsApp, or our inquiry
            form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Cards & Opening Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl bg-[#181715] border border-[#FAF7F2]/10 p-6 sm:p-7 space-y-6">
              <h2 className="font-display text-2xl font-bold text-[#FAF7F2]">
                Direct Contact (Demo)
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#D95326] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs text-[#C5A059]">Address</span>
                    <p className="text-[#FAF7F2] font-medium mt-0.5">
                      {RESTAURANT_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#D95326] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs text-[#C5A059]">
                      Phone Number
                    </span>
                    <a
                      href={`tel:${RESTAURANT_INFO.phoneClean}`}
                      className="font-mono-num text-[#FAF7F2] hover:text-[#C5A059] font-medium mt-0.5 block"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#D95326] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs text-[#C5A059]">Email</span>
                    <a
                      href={`mailto:${RESTAURANT_INFO.email}`}
                      className="text-[#FAF7F2] hover:text-[#C5A059] font-medium mt-0.5 block"
                    >
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#FAF7F2]/10 grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=${encodeURIComponent(
                    'Assalam-o-Alaikum Ember & Spice Sargodha! I have a question regarding dining / ordering.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-[#111110] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  className="py-3 px-4 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="rounded-xl bg-[#181715] border border-[#FAF7F2]/10 p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#C5A059]" />
                <h2 className="font-display text-2xl font-bold text-[#FAF7F2]">
                  Opening Hours
                </h2>
              </div>

              <div className="space-y-3 pt-2 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-[#FAF7F2]/10">
                  <span className="text-[#FAF7F2]/80">Monday – Thursday</span>
                  <span className="font-mono-num text-[#FAF7F2] font-medium">
                    12:00 PM – 11:00 PM
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#FAF7F2]/10">
                  <span className="text-[#FAF7F2]/80">Friday</span>
                  <span className="font-mono-num text-[#FAF7F2] font-medium">
                    2:00 PM – 12:00 AM
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#FAF7F2]/80">Saturday – Sunday</span>
                  <span className="font-mono-num text-[#C5A059] font-medium">
                    12:00 PM – 12:00 AM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-[#181715] border border-[#FAF7F2]/10 p-6 sm:p-8">
              <h2 className="font-display text-3xl font-bold text-[#FAF7F2] mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/70 mb-6">
                For feedback, event catering quotes, or general questions.
              </p>

              {sent ? (
                <div className="p-6 rounded-xl bg-[#111110] border border-[#C5A059]/50 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    <h3 className="font-display text-2xl font-bold text-[#FAF7F2]">
                      Message Received (Demo)
                    </h3>
                  </div>
                  <p className="text-sm text-[#FAF7F2]/75 leading-relaxed">
                    Thank you, {name}. In a production website for a Sargodha
                    restaurant, this inquiry is routed directly to management
                    email and WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-4 py-2 rounded-lg border border-[#FAF7F2]/20 text-xs font-semibold text-[#FAF7F2] hover:border-[#C5A059] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/35 focus:outline-none focus:border-[#D95326]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0300 0000000"
                        className="w-full px-4 py-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/35 focus:outline-none focus:border-[#D95326]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5"
                    >
                      Topic
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#D95326]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Birthday / Private Event">
                        Birthday / Private Event
                      </option>
                      <option value="Corporate Dinner">Corporate Dinner</option>
                      <option value="Guest Feedback">Guest Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-[#FAF7F2]/85 mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-lg bg-[#111110] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/35 focus:outline-none focus:border-[#D95326]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div className="pt-4">
          <SargodhaMap />
        </div>
      </div>
    </div>
  );
};
