/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, MenuItem } from './data/restaurantData';
import { Navbar } from './components/Navbar';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { Footer, MobileStickyBar } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { OffersPage } from './pages/OffersPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { ContactPage } from './pages/ContactPage';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const pageTitles: Record<PageId, string> = {
      home: 'Ember & Spice Sargodha | Restaurant, BBQ & Family Dining',
      menu: 'Menu — Ember & Spice Sargodha | BBQ, Karahi, Burgers & Steaks',
      about: 'Our Story — Ember & Spice Sargodha | Modern Pakistani Hospitality',
      gallery: 'Gallery — Ember & Spice Sargodha | Food & Restaurant Ambiance',
      offers: 'Special Offers & Family Deals — Ember & Spice Sargodha',
      reservations: 'Reserve a Table — Ember & Spice Sargodha',
      contact: 'Contact & Location — Ember & Spice Sargodha (Main Boulevard)',
    };
    document.title = pageTitles[currentPage];
  }, [currentPage]);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });

    setToastMessage(`${item.name} added to your order`);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.item.id === id
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((entry) => entry.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#111110] text-[#FAF7F2]">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartItems}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentPage === 'menu' && (
          <MenuPage
            onAddToCart={handleAddToCart}
            cartCount={totalCartItems}
            onOpenCart={() => setCartDrawerOpen(true)}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'offers' && (
          <OffersPage
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'reservations' && <ReservationsPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={handleNavigate} />

      <MobileStickyBar onNavigate={handleNavigate} />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddItem={handleAddToCart}
        onClearCart={handleClearCart}
        onNavigateToMenu={() => handleNavigate('menu')}
      />

      {/* Subtle Order Feedback Toast */}
      {toastMessage && !cartDrawerOpen && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-16 lg:bottom-6 right-4 sm:right-6 z-40 bg-[#181715] border border-[#C5A059]/60 text-[#FAF7F2] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3.5 text-xs sm:text-sm no-print"
        >
          <ShoppingBag className="w-4 h-4 text-[#D95326] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setCartDrawerOpen(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-xs font-semibold whitespace-nowrap cursor-pointer"
          >
            View Order ({totalCartItems})
          </button>
        </div>
      )}
    </div>
  );
}
