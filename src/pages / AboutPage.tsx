import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  PageId,
  IMAGES,
  TIMELINE_EVENTS,
} from '../data/restaurantData';
import { ResilientImage } from '../components/ResilientImage';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#111110] text-[#FAF7F2]">
      {/* Story Hero */}
      <section className="py-16 lg:py-24 border-b border-[#FAF7F2]/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                <span>Sargodha, Punjab</span>
                <span aria-hidden="true">·</span>
                <span>Fictional Brand Story</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF7F2] leading-tight">
                Our Story
              </h1>

              <p className="text-base sm:text-lg text-[#FAF7F2]/85 leading-relaxed">
                Ember &amp; Spice was imagined for the way Sargodha truly dines:
                around generous tables where three generations share the same
                meal, where the aroma of live tamarind-wood charcoal greets you
                at the door, and where every guest is welcomed like family.
              </p>

              <p className="text-sm sm:text-base text-[#FAF7F2]/75 leading-relaxed">
                Known across Punjab for its vibrant citrus orchards and warm,
                spirited hospitality, Sargodha deserved a dining destination
                that honoured authentic Pakistani karahi and seekh kebabs while
                delivering the comfort, hygiene, and modern presentation of a
                contemporary grill house.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="px-6 py-3.5 rounded-lg bg-[#D95326] hover:bg-[#C04319] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('reservations')}
                  className="px-6 py-3.5 rounded-lg border border-[#FAF7F2]/20 hover:border-[#C5A059] text-sm font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Reserve a Table
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-[#FAF7F2]/12 bg-[#181715]">
                <ResilientImage
                  src={IMAGES.interior}
                  alt="Warm dining room interior at Ember & Spice Sargodha"
                  className="w-full aspect-[16/10] object-cover"
                />
                <div className="p-5 border-t border-[#FAF7F2]/10 flex items-center justify-between text-xs text-[#FAF7F2]/75">
                  <span>Main Boulevard Dining Room · Sargodha</span>
                  <span className="text-[#C5A059]">Family &amp; Event Seating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 lg:py-24 bg-[#FAF7F2] text-[#181715]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D95326]">
              Our Philosophy
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#181715]">
              &ldquo;Good food brings people together.&rdquo;
            </h2>
            <p className="text-base text-[#181715]/75 leading-relaxed">
              Every decision in our kitchen and dining room is guided by four
              non-negotiable commitments to our guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                num: '01',
                title: 'Fresh Local Ingredients',
                text: 'Daily farm-fresh chicken and prime cuts, vine-ripened Punjab tomatoes, whole roasted spices ground in-house, and orchard-fresh Sargodha citrus.',
              },
              {
                num: '02',
                title: 'Live Fire Craftsmanship',
                text: 'Our BBQ skewers are marinated for 24 hours and seared over natural wood charcoal — never pre-cooked or reheated.',
              },
              {
                num: '03',
                title: 'Warm Family Hospitality',
                text: 'Thoughtfully spaced booths, calm lighting, and attentive hosts ensure families, couples, and corporate groups feel right at home.',
              },
              {
                num: '04',
                title: 'Modern Presentation',
                text: 'Whether served on a sizzling cast-iron platter in our hall or packed in insulated takeaway boxes, every dish arrives looking as good as it tastes.',
              },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="p-6 rounded-xl bg-white border border-[#181715]/10 space-y-3"
              >
                <span className="font-mono-num text-xs font-semibold text-[#D95326]">
                  {pillar.num}
                </span>
                <h3 className="font-display text-2xl font-bold text-[#181715]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#181715]/75 leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-24 bg-[#181715] border-b border-[#FAF7F2]/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#C5A059]">
              <span>Concept Journey</span>
              <span aria-hidden="true">·</span>
              <span>Demonstration Timeline</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FAF7F2]">
              From a Local Idea to Sargodha&apos;s Table
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {TIMELINE_EVENTS.map((milestone) => (
              <div
                key={milestone.step}
                className="p-6 rounded-xl bg-[#111110] border border-[#FAF7F2]/10 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-num">
                    <span className="text-[#D95326]">
                      Step {milestone.step}
                    </span>
                    <span className="text-[#C5A059]">{milestone.year}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#FAF7F2]">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-[#FAF7F2]/75 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#FAF7F2]/10 text-xs text-[#FAF7F2]/50">
                  Ember &amp; Spice · Sargodha
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
