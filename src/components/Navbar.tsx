import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { PageId } from '../data/restaurantData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'offers', label: 'Offers' },
  { id: 'reservations', label: 'Reservations' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#111110]/95 backdrop-blur-md border-b border-[#FAF7F2]/10 no-print">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-display text-2xl md:text-[28px] font-bold tracking-[0.06em] text-[#FAF7F2] hover:text-[#C5A059] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D95326]"
        >
          EMBER &amp; SPICE
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium"
        >
          {NAV_ITEMS.map((item, idx) => {
            const isActive = currentPage === item.id;
            const visibilityClass = idx >= 5 ? 'hidden xl:inline-flex' : 'inline-flex';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`${visibilityClass} relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D95326] ${
                  isActive
                    ? 'text-[#FAF7F2] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D95326]'
                    : 'text-[#FAF7F2]/75 hover:text-[#FAF7F2]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open Order Bag (${cartCount} items)`}
            className="relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-[#FAF7F2]/15 text-xs sm:text-sm font-medium text-[#FAF7F2] hover:border-[#C5A059] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95326]"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
            <span className="font-mono-num">{cartCount}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (cartCount > 0) {
                onOpenCart();
              } else {
                handleNavClick('menu');
              }
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF7F2]"
          >
            Order Now
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#FAF7F2]/15 text-[#FAF7F2] hover:border-[#C5A059] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#D95326]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181715] border-b border-[#FAF7F2]/10 px-4 pt-3 pb-6">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-150 flex items-center justify-between ${
                    isActive
                      ? 'bg-[#FAF7F2]/10 text-[#FAF7F2] font-semibold'
                      : 'text-[#FAF7F2]/80 hover:bg-[#FAF7F2]/5 hover:text-[#FAF7F2]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs text-[#C5A059] font-normal">Current</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#FAF7F2]/10 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (cartCount > 0) {
                  onOpenCart();
                } else {
                  handleNavClick('menu');
                }
              }}
              className="w-full py-3 px-4 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-sm font-semibold text-center whitespace-nowrap"
            >
              Order Now
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('reservations')}
              className="w-full py-3 px-4 rounded-lg border border-[#C5A059]/50 text-[#FAF7F2] hover:bg-[#C5A059]/10 text-sm font-semibold text-center whitespace-nowrap"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
