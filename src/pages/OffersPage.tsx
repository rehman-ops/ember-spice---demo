import React, { useState } from 'react';
import { Check, Plus, Calendar } from 'lucide-react';
import {
  OFFERS_DATA,
  OfferItem,
  MenuItem,
  PageId,
} from '../data/restaurantData';
import { ResilientImage } from '../components/ResilientImage';

interface OffersPageProps {
  onAddToCart: (item: MenuItem) => void;
  onNavigate: (page: PageId) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  onAddToCart,
  onNavigate,
}) => {
  const [claimedId, setClaimedId] = useState<string | null>(null);

  const handleOrderOffer = (offer: OfferItem) => {
    const bundleItem: MenuItem = {
      id: offer.id,
      name: `${offer.title} (${offer.subtitle})`,
      category: 'BBQ',
      description: offer.description,
      price: offer.price,
      image: offer.image,
      servingInfo: offer.validity,
    };
    onAddToCart(bundleItem);
    setClaimedId(offer.id);
    setTimeout(() => {
      setClaimedId((prev) => (prev === offer.id ? null : prev));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#111110] py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#FAF7F2]/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#C5A059]">
              <span>Demonstration Promotions</span>
              <span aria-hidden="true">·</span>
              <span>Sargodha Family &amp; Group Value</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#FAF7F2]">
              Special Offers &amp; Bundles
            </h1>
            <p className="text-sm sm:text-base text-[#FAF7F2]/75 max-w-2xl">
              Curated platters and celebratory packages designed for families,
              students, weekday lunches, and birthday hosts. All offers below
              are fictional demonstration deals.
            </p>
          </div>
        </div>

        {/* Offers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {OFFERS_DATA.map((offer, idx) => {
            const isClaimed = claimedId === offer.id;
            const isFeatured = idx === 0;
            return (
              <article
                key={offer.id}
                className={`rounded-xl bg-[#181715] border ${
                  isFeatured
                    ? 'border-[#C5A059]/50 lg:col-span-2'
                    : 'border-[#FAF7F2]/10'
                } overflow-hidden grid grid-cols-1 ${
                  isFeatured ? 'lg:grid-cols-12' : ''
                }`}
              >
                <div
                  className={`${
                    isFeatured
                      ? 'lg:col-span-5 aspect-[16/10] lg:aspect-auto'
                      : 'aspect-[16/9]'
                  } w-full overflow-hidden bg-[#141311]`}
                >
                  <ResilientImage
                    src={offer.image}
                    alt={`${offer.title} — ${offer.subtitle}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className={`${
                    isFeatured ? 'lg:col-span-7 p-7 sm:p-9' : 'p-6 sm:p-7'
                  } flex flex-col justify-between space-y-6`}
                >
                  <div className="space-y-3">
                    {/* Zero-pill metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#C5A059]">
                      <span>{offer.tag}</span>
                      <span aria-hidden="true">·</span>
                      <span>{offer.validity}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#FAF7F2]/60">Demo Offer</span>
                    </div>

                    <h2 className="font-display text-3xl font-bold text-[#FAF7F2]">
                      {offer.title}
                    </h2>

                    <p className="text-sm sm:text-base font-medium text-[#FAF7F2]/90">
                      {offer.subtitle}
                    </p>

                    <p className="text-sm text-[#FAF7F2]/75 leading-relaxed">
                      {offer.description}
                    </p>

                    <ul className="pt-2 space-y-1.5 text-xs sm:text-sm text-[#FAF7F2]/80 border-t border-[#FAF7F2]/10">
                      {offer.includes.map((line) => (
                        <li key={line} className="flex items-start gap-2">
                          <span className="text-[#C5A059] font-bold">·</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#FAF7F2]/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block text-[11px] text-[#FAF7F2]/50">
                        Promotional Price
                      </span>
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono-num text-2xl font-bold text-[#C5A059]">
                          PKR {offer.price.toLocaleString()}
                        </span>
                        <span className="font-mono-num text-xs text-[#FAF7F2]/45 line-through">
                          PKR {offer.regularPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleOrderOffer(offer)}
                        className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                          isClaimed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#D95326] hover:bg-[#C04319] text-white'
                        }`}
                      >
                        {isClaimed ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Order</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add Deal to Order</span>
                          </>
                        )}
                      </button>

                      {offer.id === 'offer-birthday-celebration' && (
                        <button
                          type="button"
                          onClick={() => onNavigate('reservations')}
                          className="px-4 py-2.5 rounded-lg border border-[#FAF7F2]/20 hover:border-[#C5A059] text-xs sm:text-sm font-semibold text-[#FAF7F2] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <Calendar className="w-4 h-4 text-[#C5A059]" />
                          <span>Book Birthday Table</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
