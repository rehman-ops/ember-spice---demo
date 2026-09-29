import React, { useState } from 'react';
import {
  MapPin,
  ArrowRight,
  Plus,
  Check,
  Phone,
  MessageCircle,
  Clock,
  Instagram,
} from 'lucide-react';
import {
  PageId,
  MenuItem,
  MENU_ITEMS,
  IMAGES,
  RESTAURANT_INFO,
  TESTIMONIALS_DATA,
  GALLERY_ITEMS,
} from '../data/restaurantData';
import { ResilientImage } from '../components/ResilientImage';
import { SargodhaMap } from '../components/SargodhaMap';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAddToCart,
}) => {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [instagramModalOpen, setInstagramModalOpen] = useState(false);

  const popularDishes = MENU_ITEMS.filter((item) => item.isPopular);

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1400);
  };

  return (
    <div className="space-y-0">
      {/* Section 1 — Hero */}
      <section className="relative min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden border-b border-[#FAF7F2]/10">
        <div className="absolute inset-0">
          <ResilientImage
            src={IMAGES.heroBbq}
            alt="Sizzling Pakistani charcoal BBQ platter with seekh kebabs, chicken tikka, lamb chops, and warm garlic naan at Ember & Spice Sargodha"
            priority={true}
            className="w-full h-full object-cover scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111110]/95 via-[#111110]/80 to-[#111110]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-[#111110]/40" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#C5A059] tracking-wide">
              <span aria-hidden="true">📍</span>
              <span>Sargodha, Punjab</span>
              <span aria-hidden="true" className="text-[#FAF7F2]/30">·</span>
              <span className="text-[#FAF7F2]/80">Main Boulevard</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-[64px] font-bold text-[#FAF7F2] leading-[1.08] tracking-tight">
              Bold Flavours. Memorable Moments.
            </h1>

            <p className="text-base sm:text-lg text-[#FAF7F2]/85 leading-relaxed max-w-xl">
              Modern Pakistani dining, sizzling BBQ, handcrafted burgers and
              unforgettable family moments — right here in Sargodha.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="px-7 py-3.5 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>View Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('reservations')}
                className="px-7 py-3.5 rounded-lg bg-[#111110]/80 hover:bg-[#FAF7F2] text-[#FAF7F2] hover:text-[#111110] border border-[#FAF7F2]/30 text-sm sm:text-base font-semibold tracking-wide transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                Reserve a Table
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#FAF7F2]/65">
              <span>Live Charcoal Grill</span>
              <span aria-hidden="true">·</span>
              <span>Spacious Family Hall</span>
              <span aria-hidden="true">·</span>
              <span>Direct WhatsApp Ordering</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Trust / Quick Information */}
      <section
        aria-label="Restaurant Highlights"
        className="bg-[#181715] border-b border-[#FAF7F2]/10"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                index: '01',
                title: 'Freshly Prepared',
                desc: 'Cooked to order over live charcoal & traditional iron woks',
              },
              {
                index: '02',
                title: 'Family Friendly',
                desc: 'Comfortable booth seating & welcoming private dining zones',
              },
              {
                index: '03',
                title: 'Dine-In & Takeaway',
                desc: 'Full table service or hot insulated packaging for home',
              },
              {
                index: '04',
                title: 'Easy Reservations',
                desc: 'Instant online table requests or quick WhatsApp booking',
              },
            ].map((item) => (
              <div
                key={item.index}
                className="border-l border-[#C5A059]/35 pl-4 space-y-1"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono-num text-xs text-[#C5A059]">
                    {item.index}.
                  </span>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-[#FAF7F2]">
                    {item.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Popular Dishes */}
      <section className="py-20 lg:py-24 bg-[#111110]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-[#C5A059]">
                Signature Kitchen Selection
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F2]">
                Made to Be Craved
              </h2>
              <p className="text-sm sm:text-base text-[#FAF7F2]/75 max-w-xl">
                Some of the favourites our guests keep coming back for.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-semibold text-[#C5A059] hover:text-[#D95326] transition-colors cursor-pointer"
            >
              <span>Explore Full 9-Category Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {popularDishes.map((dish) => {
              const isAdded = recentlyAddedId === dish.id;
              return (
                <article
                  key={dish.id}
                  className="group rounded-xl bg-[#181715] border border-[#FAF7F2]/10 overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141311]">
                    <ResilientImage
                      src={dish.image}
                      alt={`${dish.name} at Ember & Spice Sargodha`}
                      objectPosition={dish.imagePosition}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      {/* Zero-pill metadata line */}
                      <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                        <span>{dish.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{dish.servingInfo}</span>
                        {dish.isSpicy && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#D95326]">Spiced</span>
                          </>
                        )}
                        {dish.isVegetarian && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-400">Vegetarian</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-display text-2xl font-bold text-[#FAF7F2]">
                        {dish.name}
                      </h3>

                      <p className="text-sm text-[#FAF7F2]/75 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#FAF7F2]/10 flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-[11px] text-[#FAF7F2]/50">
                          Price
                        </span>
                        <span className="font-mono-num text-lg font-semibold text-[#FAF7F2]">
                          PKR {dish.price.toLocaleString()}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleQuickAdd(dish)}
                        className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#D95326] hover:bg-[#C04319] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Order</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4 — About Preview (Warm Cream Contrast Section) */}
      <section className="py-20 lg:py-24 bg-[#FAF7F2] text-[#181715]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D95326]">
                <span>Hospitality in Sargodha</span>
                <span aria-hidden="true">·</span>
                <span>Est. 2021 (Demo Concept)</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#181715] leading-tight">
                More Than Just a Meal
              </h2>

              <p className="text-base text-[#181715]/80 leading-relaxed">
                At Ember &amp; Spice, we believe the best evenings in Sargodha
                revolve around a shared table. Whether you are celebrating a
                family milestone over a steaming iron-wok Chicken Karahi,
                catching up with university friends over handcrafted burgers, or
                hosting out-of-town guests for live charcoal BBQ, every plate is
                prepared with warmth and generosity.
              </p>

              <p className="text-sm sm:text-base text-[#181715]/75 leading-relaxed">
                From locally sourced Punjab produce and freshly ground spices to
                our calm, family-first dining room on Main Boulevard, we bring
                together traditional Pakistani soul and modern culinary craft.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-lg bg-[#181715] hover:bg-[#D95326] text-[#FAF7F2] text-sm font-semibold transition-colors duration-150 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="px-5 py-3 rounded-lg border border-[#181715]/20 hover:border-[#181715] text-sm font-semibold text-[#181715] transition-colors duration-150 cursor-pointer"
                >
                  View Restaurant Gallery
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-[#181715]/10 shadow-lg bg-[#181715]">
                <ResilientImage
                  src={IMAGES.interior}
                  alt="Warm contemporary family dining interior at Ember & Spice Sargodha"
                  className="w-full aspect-[16/10] object-cover"
                />
                <div className="p-4 sm:p-5 bg-[#181715] text-[#FAF7F2] flex items-center justify-between gap-4 text-xs">
                  <span>
                    Warm evening atmosphere · Main Family Hall &amp; Private
                    Booths
                  </span>
                  <span className="text-[#C5A059] font-mono-num shrink-0">
                    120+ Guest Capacity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Special Offer Banner */}
      <section className="py-16 lg:py-20 bg-[#111110] border-b border-[#FAF7F2]/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/35 bg-[#181715]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
                <div className="flex items-center gap-2 text-xs font-medium text-[#C5A059]">
                  <span>Featured Demo Promotion</span>
                  <span aria-hidden="true">·</span>
                  <span>Dine-In &amp; Takeaway</span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#FAF7F2]">
                  Family Feast
                </h2>

                <p className="text-lg sm:text-xl text-[#FAF7F2]/90 font-medium">
                  BBQ platter + 4 drinks + dessert
                </p>

                <p className="text-sm text-[#FAF7F2]/75 leading-relaxed max-w-xl">
                  Gather the whole family for our signature charcoal BBQ platter
                  (seekh kebabs, malai boti, chicken tikka, and lamb chops),
                  freshly baked tandoori naan basket, 4 chilled Mint Margaritas,
                  and warm Chocolate Lava Cake.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6">
                  <div>
                    <span className="block text-xs text-[#FAF7F2]/55">
                      Special Bundle Price
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono-num text-3xl sm:text-4xl font-bold text-[#C5A059]">
                        PKR 3,999
                      </span>
                      <span className="font-mono-num text-sm text-[#FAF7F2]/45 line-through">
                        PKR 5,250
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate('offers')}
                      className="px-6 py-3.5 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-sm font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      <span>View Today&apos;s Offers</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
                <ResilientImage
                  src={IMAGES.heroBbq}
                  alt="Family Feast BBQ platter promotion at Ember & Spice"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — Restaurant Experience */}
      <section className="py-20 lg:py-24 bg-[#111110] border-b border-[#FAF7F2]/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <p className="text-xs font-medium uppercase tracking-widest text-[#C5A059]">
              Every Occasion Covered
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
              The Ember &amp; Spice Experience
            </h2>
            <p className="text-sm sm:text-base text-[#FAF7F2]/75">
              Designed around how Sargodha families, professionals, and friends
              love to dine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                num: '01',
                title: 'Dine In',
                subtitle: 'Comfortable family-friendly environment.',
                detail:
                  'Spacious booths, warm evening acoustics, and attentive table service on Main Boulevard.',
                image: IMAGES.interior,
                ctaText: 'Reserve a Table',
                target: 'reservations' as PageId,
              },
              {
                num: '02',
                title: 'Takeaway',
                subtitle: 'Fresh food packed for the journey home.',
                detail:
                  'Foil-sealed karahi, crisp vented burger boxes, and neat chutney portions ready in 20–25 minutes.',
                image: IMAGES.karahi,
                ctaText: 'Order Takeaway',
                target: 'menu' as PageId,
              },
              {
                num: '03',
                title: 'Events',
                subtitle: 'Birthdays, gatherings and private celebrations.',
                detail:
                  'Custom group menus for 10 to 60 guests with dedicated family lounge seating and dessert platters.',
                image: IMAGES.lavaDessert,
                ctaText: 'Inquire for Events',
                target: 'reservations' as PageId,
              },
            ].map((exp) => (
              <div
                key={exp.title}
                className="rounded-xl bg-[#181715] border border-[#FAF7F2]/10 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#141311]">
                    <ResilientImage
                      src={exp.image}
                      alt={`${exp.title} experience at Ember & Spice Sargodha`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-2.5">
                    <span className="font-mono-num text-xs text-[#C5A059]">
                      {exp.num} · Experience
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#FAF7F2]">
                      {exp.title}
                    </h3>
                    <p className="text-sm font-medium text-[#FAF7F2]/90">
                      {exp.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#FAF7F2]/70 leading-relaxed">
                      {exp.detail}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate(exp.target)}
                    className="text-xs font-semibold text-[#C5A059] hover:text-[#D95326] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{exp.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — Customer Reviews */}
      <section className="py-20 lg:py-24 bg-[#181715] border-b border-[#FAF7F2]/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                <span>Guest Impressions</span>
                <span aria-hidden="true">·</span>
                <span>Fictional Demo Testimonials</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
                What Our Guests Say
              </h2>
            </div>
            <p className="text-xs text-[#FAF7F2]/60 max-w-sm">
              Sample guest feedback illustrating how social proof builds dining
              confidence for families in Sargodha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS_DATA.map((item) => (
              <blockquote
                key={item.id}
                className="rounded-xl bg-[#111110] border border-[#FAF7F2]/10 p-6 sm:p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="text-xs text-[#C5A059]">
                    <span>{item.highlight}</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#FAF7F2]/90 leading-relaxed italic font-display text-[19px]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <footer className="pt-4 border-t border-[#FAF7F2]/10">
                  <div className="font-semibold text-sm text-[#FAF7F2]">
                    {item.author}
                  </div>
                  <div className="text-xs text-[#FAF7F2]/60 mt-0.5">
                    {item.role}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8 — Instagram / Social Preview */}
      <section className="py-20 lg:py-24 bg-[#111110] border-b border-[#FAF7F2]/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                <span>{RESTAURANT_INFO.instagramHandle}</span>
                <span aria-hidden="true">·</span>
                <span>Demo Social Feed</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
                Follow the Flavour
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setInstagramModalOpen(true)}
              className="self-start sm:self-auto px-5 py-2.5 rounded-lg border border-[#FAF7F2]/20 hover:border-[#C5A059] text-xs sm:text-sm font-semibold text-[#FAF7F2] inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-[#D95326]" />
              <span>Follow Us on Instagram</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {GALLERY_ITEMS.slice(0, 6).map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => onNavigate('gallery')}
                className="group relative aspect-square rounded-lg overflow-hidden bg-[#181715] border border-[#FAF7F2]/10 text-left focus-visible:outline-2 focus-visible:outline-[#D95326] cursor-pointer"
              >
                <ResilientImage
                  src={post.image}
                  alt={post.title}
                  objectPosition={post.imagePosition}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-3 flex flex-col justify-end">
                  <span className="text-[11px] text-[#C5A059] font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#FAF7F2] font-semibold line-clamp-1">
                    {post.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {instagramModalOpen && (
            <div className="mt-6 p-5 rounded-xl bg-[#181715] border border-[#C5A059]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-mono-num text-[#C5A059]">
                  DEMO SOCIAL PROFILE · {RESTAURANT_INFO.instagramHandle}
                </p>
                <p className="text-sm text-[#FAF7F2]/85">
                  This is a fictional social handle created for the Ember &amp;
                  Spice portfolio demonstration. You can browse all full-size
                  food &amp; interior photography in our interactive Gallery.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="px-4 py-2 rounded-lg bg-[#D95326] text-white text-xs font-semibold whitespace-nowrap cursor-pointer"
                >
                  Open Full Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setInstagramModalOpen(false)}
                  className="px-3 py-2 rounded-lg border border-[#FAF7F2]/15 text-xs text-[#FAF7F2]/70 hover:text-[#FAF7F2] cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 9 — Location */}
      <section className="py-20 lg:py-24 bg-[#181715] border-b border-[#FAF7F2]/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-widest text-[#C5A059]">
                  Find Us in Sargodha
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
                  Visit Ember &amp; Spice
                </h2>
                <p className="text-sm text-[#FAF7F2]/75 leading-relaxed">
                  Conveniently located on Main Boulevard with dedicated family
                  parking, step-free access, and climate-controlled indoor
                  halls.
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#FAF7F2]/10 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D95326] shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs text-[#C5A059]">Address</span>
                    <span className="text-[#FAF7F2] font-medium">
                      {RESTAURANT_INFO.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D95326] shrink-0 mt-1" />
                  <div className="w-full">
                    <span className="block text-xs text-[#C5A059] mb-1">
                      Opening Hours
                    </span>
                    <div className="space-y-1 text-xs sm:text-sm text-[#FAF7F2]/85">
                      {RESTAURANT_INFO.hours.map((h) => (
                        <div
                          key={h.days}
                          className="flex items-center justify-between gap-4"
                        >
                          <span>{h.days}</span>
                          <span className="font-mono-num text-[#FAF7F2]">
                            {h.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D95326] shrink-0 mt-1" />
                  <div>
                    <span className="block text-xs text-[#C5A059]">
                      Phone (Fictional Demo Contact)
                    </span>
                    <a
                      href={`tel:${RESTAURANT_INFO.phoneClean}`}
                      className="font-mono-num text-[#FAF7F2] hover:text-[#C5A059] font-medium"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=${encodeURIComponent(
                    'Assalam-o-Alaikum Ember & Spice Sargodha! Please share your location pin and today’s table availability.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-[#111110] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  className="px-5 py-3 rounded-lg border border-[#FAF7F2]/20 hover:border-[#C5A059] text-xs sm:text-sm font-semibold text-[#FAF7F2] inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <SargodhaMap compact={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 10 — Final CTA */}
      <section className="relative py-24 lg:py-28 overflow-hidden bg-[#111110]">
        <div className="absolute inset-0">
          <ResilientImage
            src={IMAGES.interior}
            alt="Evening ambiance at Ember & Spice Sargodha"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-[#111110]/85 to-[#111110]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-medium uppercase tracking-widest text-[#C5A059]">
            Ember &amp; Spice · Sargodha
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF7F2]">
            Your Table Is Waiting.
          </h2>
          <p className="text-base sm:text-lg text-[#FAF7F2]/80">
            Good food tastes even better when shared.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('reservations')}
              className="px-8 py-4 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              Reserve a Table
            </button>
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="px-8 py-4 rounded-lg border border-[#FAF7F2]/25 hover:border-[#C5A059] bg-[#181715]/90 text-[#FAF7F2] text-sm sm:text-base font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              View Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
