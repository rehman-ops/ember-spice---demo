import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Check, UtensilsCrossed } from 'lucide-react';
import { PageId, RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#0D0C0B] text-[#FAF7F2] border-t border-[#FAF7F2]/10 pb-20 lg:pb-0 no-print">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Short Description */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-display text-2xl sm:text-3xl font-bold tracking-[0.06em] text-[#FAF7F2] hover:text-[#C5A059] transition-colors text-left"
            >
              EMBER &amp; SPICE
            </button>
            <p className="text-sm text-[#FAF7F2]/70 leading-relaxed max-w-sm">
              Modern Pakistani dining, live charcoal BBQ, handcrafted burgers,
              and warm family hospitality right on Main Boulevard, Sargodha.
            </p>
            <div className="pt-1 flex items-center gap-4 text-xs text-[#C5A059]">
              <span>Dine-In</span>
              <span aria-hidden="true">·</span>
              <span>Takeaway</span>
              <span aria-hidden="true">·</span>
              <span>Family Events</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#FAF7F2]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF7F2]/70">
              {(
                [
                  ['home', 'Home'],
                  ['menu', 'Menu'],
                  ['about', 'About'],
                  ['gallery', 'Gallery'],
                  ['offers', 'Offers'],
                  ['reservations', 'Reservations'],
                  ['contact', 'Contact'],
                ] as [PageId, string][]
              ).map(([id, label]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(id)}
                    className="hover:text-[#D95326] transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#FAF7F2]">
              Contact &amp; Location
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/75">
              <li>
                <span className="text-[#C5A059] block text-xs">Address</span>
                {RESTAURANT_INFO.address}
              </li>
              <li>
                <span className="text-[#C5A059] block text-xs">Phone (Demo)</span>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  className="hover:text-[#FAF7F2] font-mono-num"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li>
                <span className="text-[#C5A059] block text-xs">WhatsApp</span>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=${encodeURIComponent(
                    'Assalam-o-Alaikum Ember & Spice Sargodha! I would like to inquire about your menu / table reservation.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF7F2]"
                >
                  Chat on WhatsApp ({RESTAURANT_INFO.phone})
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="block text-xs text-[#FAF7F2]/50 mb-2">
                Follow Us (Fictional Demo Profiles)
              </span>
              <div className="flex items-center gap-4 text-xs font-medium text-[#FAF7F2]/80">
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#D95326] transition-colors"
                >
                  Instagram
                </button>
                <span aria-hidden="true" className="text-[#FAF7F2]/30">·</span>
                <button
                  type="button"
                  onClick={() => onNavigate('offers')}
                  className="hover:text-[#D95326] transition-colors"
                >
                  Facebook
                </button>
                <span aria-hidden="true" className="text-[#FAF7F2]/30">·</span>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#D95326] transition-colors"
                >
                  TikTok
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#FAF7F2]">
              Get our latest offers
            </h3>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
              Receive seasonal BBQ platters, Ramadan &amp; Eid family deals, and
              weekday lunch specials in Sargodha.
            </p>
            {subscribed ? (
              <div className="p-3.5 rounded-lg bg-[#181715] border border-[#C5A059]/40 text-xs text-[#FAF7F2] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed to demo offers list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <label htmlFor="footer-newsletter" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#181715] border border-[#FAF7F2]/15 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/40 focus:outline-none focus:border-[#D95326]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Demo Attribution */}
        <div className="mt-12 pt-8 border-t border-[#FAF7F2]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/55">
          <p>© 2026 Ember &amp; Spice. Demo Website.</p>
          <p>
            Designed as a restaurant website concept · Fictional Sargodha Brand
            Showcase
          </p>
        </div>
      </div>
    </footer>
  );
};

interface MobileStickyBarProps {
  onNavigate: (page: PageId) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onNavigate,
}) => {
  return (
    <div
      aria-label="Quick Mobile Actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111110]/95 backdrop-blur-md border-t border-[#FAF7F2]/15 h-13 px-2 flex items-center justify-around no-print"
    >
      <a
        href={`tel:${RESTAURANT_INFO.phoneClean}`}
        className="flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-medium text-[#FAF7F2] hover:text-[#C5A059] whitespace-nowrap"
      >
        <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>Call</span>
      </a>
      <span aria-hidden="true" className="text-[#FAF7F2]/15">|</span>
      <a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=${encodeURIComponent(
          'Assalam-o-Alaikum Ember & Spice Sargodha! I would like to place an order / book a table.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-medium text-[#FAF7F2] hover:text-[#25D366] whitespace-nowrap"
      >
        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
        <span>WhatsApp</span>
      </a>
      <span aria-hidden="true" className="text-[#FAF7F2]/15">|</span>
      <button
        type="button"
        onClick={() => onNavigate('menu')}
        className="flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-semibold text-[#D95326] whitespace-nowrap"
      >
        <UtensilsCrossed className="w-3.5 h-3.5" />
        <span>Menu</span>
      </button>
      <span aria-hidden="true" className="text-[#FAF7F2]/15">|</span>
      <button
        type="button"
        onClick={() => onNavigate('contact')}
        className="flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-medium text-[#FAF7F2] hover:text-[#C5A059] whitespace-nowrap"
      >
        <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>Directions</span>
      </button>
    </div>
  );
};
