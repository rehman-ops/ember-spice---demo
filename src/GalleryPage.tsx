import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import {
  GALLERY_ITEMS,
  GalleryItem,
  PageId,
} from '../data/restaurantData';
import { ResilientImage } from '../components/ResilientImage';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

const GALLERY_CATEGORIES = [
  'All',
  'Food',
  'Interior',
  'BBQ',
  'Family Dining',
  'Desserts',
] as const;

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] =
    useState<(typeof GALLERY_CATEGORIES)[number]>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredGallery.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredGallery.length) % filteredGallery.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  const activeLightboxItem: GalleryItem | null =
    lightboxIndex !== null && filteredGallery[lightboxIndex]
      ? filteredGallery[lightboxIndex]
      : null;

  return (
    <div className="min-h-screen bg-[#111110] py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#FAF7F2]/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#C5A059]">
              <span>Visual Tour</span>
              <span aria-hidden="true">·</span>
              <span>Food, Charcoal Grill &amp; Ambiance</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#FAF7F2]">
              Inside Ember &amp; Spice
            </h1>
            <p className="text-sm sm:text-base text-[#FAF7F2]/75 max-w-2xl">
              Explore our signature dishes, live charcoal grill, warm evening
              dining room, and family booth seating. Click any photograph to
              open full screen.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('reservations')}
            className="self-start md:self-auto px-5 py-3 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Book Your Table</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Gallery Categories"
          className="flex items-center gap-2 overflow-x-auto pb-2"
        >
          {GALLERY_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setActiveCategory(category);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#D95326] text-white'
                    : 'bg-[#181715] text-[#FAF7F2]/75 hover:text-[#FAF7F2] border border-[#FAF7F2]/10'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Masonry / Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => {
            const spanClass =
              item.aspect === 'wide' && activeCategory === 'All'
                ? 'md:col-span-2'
                : '';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className={`group relative rounded-xl overflow-hidden bg-[#181715] border border-[#FAF7F2]/10 text-left flex flex-col focus-visible:outline-2 focus-visible:outline-[#D95326] cursor-pointer ${spanClass}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#141311]">
                  <ResilientImage
                    src={item.image}
                    alt={item.title}
                    objectPosition={item.imagePosition}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111110]/90 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Click to enlarge</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#FAF7F2]">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#FAF7F2]/75 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
        >
          <div
            className="fixed inset-0"
            onClick={() => setLightboxIndex(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl w-full bg-[#181715] border border-[#FAF7F2]/15 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#FAF7F2]/10">
              <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                <span>{activeLightboxItem.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num">
                  {lightboxIndex + 1} / {filteredGallery.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="w-9 h-9 rounded-lg border border-[#FAF7F2]/15 flex items-center justify-center text-[#FAF7F2] hover:border-[#C5A059]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full bg-[#111110]">
              <ResilientImage
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                objectPosition={activeLightboxItem.imagePosition}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + filteredGallery.length) %
                      filteredGallery.length
                  )
                }
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111110]/85 border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2] hover:border-[#C5A059]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)
                }
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111110]/85 border border-[#FAF7F2]/20 flex items-center justify-center text-[#FAF7F2] hover:border-[#C5A059]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-bold text-[#FAF7F2]">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-sm text-[#FAF7F2]/75">
                  {activeLightboxItem.caption}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(null);
                  onNavigate(
                    activeLightboxItem.relatedDishId ? 'menu' : 'reservations'
                  );
                }}
                className="px-5 py-2.5 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
              >
                {activeLightboxItem.relatedDishId
                  ? 'Order This Dish'
                  : 'Reserve a Table'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
