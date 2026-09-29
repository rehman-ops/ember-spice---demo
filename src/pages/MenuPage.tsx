import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  MessageCircle,
  Plus,
  Check,
  ShoppingBag,
  Printer,
} from 'lucide-react';
import {
  MenuCategory,
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuItem,
  RESTAURANT_INFO,
} from '../data/restaurantData';
import { ResilientImage } from '../components/ResilientImage';

interface MenuPageProps {
  onAddToCart: (item: MenuItem) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onAddToCart,
  cartCount,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'All'>(
    'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<
    'all' | 'spicy' | 'vegetarian' | 'popular'
  >('all');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [pdfNotice, setPdfNotice] = useState(false);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDietary =
        dietaryFilter === 'all' ||
        (dietaryFilter === 'spicy' && item.isSpicy) ||
        (dietaryFilter === 'vegetarian' && item.isVegetarian) ||
        (dietaryFilter === 'popular' && item.isPopular);
      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => {
      setAddedId((prev) => (prev === item.id ? null : prev));
    }, 1200);
  };

  const handleDownloadMenuFile = () => {
    const grouped = MENU_CATEGORIES.map((cat) => {
      const catItems = MENU_ITEMS.filter((i) => i.category === cat);
      return [
        `==================================================`,
        `${cat.toUpperCase()}`,
        `==================================================`,
        ...catItems.map(
          (i) =>
            `• ${i.name} — PKR ${i.price.toLocaleString()} (${i.servingInfo})${
              i.isSpicy ? ' [Spiced]' : ''
            }${i.isVegetarian ? ' [Vegetarian]' : ''}\n  ${i.description}`
        ),
        '',
      ].join('\n');
    }).join('\n');

    const content = [
      `EMBER & SPICE — SARGODHA, PUNJAB`,
      `"Bold Flavours. Memorable Moments."`,
      `Address: ${RESTAURANT_INFO.address}`,
      `Phone / WhatsApp (Demo): ${RESTAURANT_INFO.phone}`,
      `Note: Fictional Restaurant Concept Menu for Portfolio Demonstration`,
      ``,
      grouped,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ember-and-Spice-Sargodha-Menu.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setPdfNotice(true);
    setTimeout(() => setPdfNotice(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#111110] py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#FAF7F2]/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#C5A059]">
              <span>Full Dining &amp; Takeaway Menu</span>
              <span aria-hidden="true">·</span>
              <span>Prices in PKR</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#FAF7F2]">
              Crafted Over Live Fire &amp; Spice
            </h1>
            <p className="text-sm sm:text-base text-[#FAF7F2]/75 max-w-2xl">
              Browse all nine kitchen sections — from smoky charcoal skewers and
              iron-wok Pakistani karahi to gourmet smash burgers, steaks, and
              molten desserts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 no-print">
            <button
              type="button"
              onClick={handleDownloadMenuFile}
              className="px-4 py-2.5 rounded-lg border border-[#FAF7F2]/20 hover:border-[#C5A059] text-xs sm:text-sm font-semibold text-[#FAF7F2] inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#C5A059]" />
              <span>Download Menu PDF</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-lg border border-[#FAF7F2]/15 hover:border-[#C5A059] text-xs sm:text-sm font-medium text-[#FAF7F2]/80 hover:text-[#FAF7F2] inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#C5A059]" />
              <span>Print View</span>
            </button>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappClean}?text=${encodeURIComponent(
                'Assalam-o-Alaikum Ember & Spice Sargodha! I would like to place an order from your menu.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5B] text-[#111110] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>

        {pdfNotice && (
          <div className="p-4 rounded-xl bg-[#181715] border border-[#C5A059]/50 text-xs sm:text-sm text-[#FAF7F2] flex items-center justify-between gap-4">
            <span>
              Complete Ember &amp; Spice Sargodha menu downloaded! You can also
              use &ldquo;Print View&rdquo; to save as a formatted PDF.
            </span>
            <button
              type="button"
              onClick={() => setPdfNotice(false)}
              className="text-xs text-[#C5A059] underline"
            >
              Close
            </button>
          </div>
        )}

        {/* Category Navigation & Search Filter Bar */}
        <div className="space-y-4 no-print">
          {/* 9 Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Menu Categories"
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'All'}
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#D95326] text-white'
                  : 'bg-[#181715] text-[#FAF7F2]/75 hover:text-[#FAF7F2] border border-[#FAF7F2]/10'
              }`}
            >
              All Categories ({MENU_ITEMS.length})
            </button>
            {MENU_CATEGORIES.map((cat) => {
              const count = MENU_ITEMS.filter((i) => i.category === cat).length;
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#D95326] text-white'
                      : 'bg-[#181715] text-[#FAF7F2]/75 hover:text-[#FAF7F2] border border-[#FAF7F2]/10'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Search & Dietary Segmented Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#181715] p-3.5 rounded-xl border border-[#FAF7F2]/10">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#FAF7F2]/45 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <label htmlFor="menu-search" className="sr-only">
                Search dishes by name or ingredient
              </label>
              <input
                id="menu-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Karahi, Malai Boti, Burger, Alfredo, Kulfi..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#111110] border border-[#FAF7F2]/12 text-sm text-[#FAF7F2] placeholder:text-[#FAF7F2]/40 focus:outline-none focus:border-[#D95326]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(
                [
                  ['all', 'All Dishes'],
                  ['popular', 'Guest Favourites'],
                  ['spicy', 'Spiced'],
                  ['vegetarian', 'Vegetarian'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDietaryFilter(key)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    dietaryFilter === key
                      ? 'bg-[#FAF7F2] text-[#111110] font-semibold'
                      : 'bg-[#111110] text-[#FAF7F2]/75 hover:text-[#FAF7F2]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#181715] rounded-xl border border-[#FAF7F2]/10 space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#FAF7F2]">
              No matching dishes found
            </h2>
            <p className="text-sm text-[#FAF7F2]/70">
              Try clearing your search or switching to All Categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="px-5 py-2.5 rounded-lg bg-[#D95326] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((dish) => {
              const isAdded = addedId === dish.id;
              return (
                <article
                  key={dish.id}
                  className="group rounded-xl bg-[#181715] border border-[#FAF7F2]/10 overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#141311]">
                      <ResilientImage
                        src={dish.image}
                        alt={`${dish.name} — ${dish.category} at Ember & Spice Sargodha`}
                        objectPosition={dish.imagePosition}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6 space-y-2.5">
                      {/* Clean unboxed metadata with typographic separators */}
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#C5A059]">
                        <span>{dish.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{dish.servingInfo}</span>
                        {dish.isSpicy && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#D95326] font-medium">
                              Spicy
                            </span>
                          </>
                        )}
                        {dish.isVegetarian && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-400 font-medium">
                              Vegetarian
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="font-display text-2xl font-bold text-[#FAF7F2]">
                        {dish.name}
                      </h2>

                      <p className="text-sm text-[#FAF7F2]/75 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-[#FAF7F2]/10 flex items-center justify-between gap-4">
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
                      onClick={() => handleAdd(dish)}
                      className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer no-print ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#D95326] hover:bg-[#C04319] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Order Bag Callout */}
        {cartCount > 0 && (
          <div className="p-6 rounded-xl bg-[#181715] border border-[#C5A059]/45 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-[#D95326]/20 border border-[#D95326]/40 flex items-center justify-center text-[#D95326]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#FAF7F2]">
                  You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in
                  your order bag
                </h3>
                <p className="text-xs text-[#FAF7F2]/70">
                  Review your subtotal, select Pickup or Sargodha Delivery, and
                  send via WhatsApp.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              Proceed to Order Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
