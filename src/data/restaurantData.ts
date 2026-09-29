export type PageId =
  | 'home'
  | 'menu'
  | 'about'
  | 'gallery'
  | 'offers'
  | 'reservations'
  | 'contact';

export type MenuCategory =
  | 'Starters'
  | 'BBQ'
  | 'Pakistani'
  | 'Burgers'
  | 'Chinese'
  | 'Pasta'
  | 'Steaks'
  | 'Desserts'
  | 'Beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  image: string;
  imagePosition?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  servingInfo: string;
}

export interface OfferItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  regularPrice: number;
  validity: string;
  image: string;
  includes: string[];
  tag: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Food' | 'Interior' | 'BBQ' | 'Family Dining' | 'Desserts';
  caption: string;
  image: string;
  aspect: 'wide' | 'tall' | 'standard';
  imagePosition?: string;
  relatedDishId?: string;
}

export const IMAGES = {
  heroBbq: '/src/assets/images/hero_bbq_feast_1790673918895.jpg',
  karahi: '/src/assets/images/dish_chicken_karahi_1790673939572.jpg',
  burger: '/src/assets/images/dish_smoky_burger_1790673953183.jpg',
  alfredoSteak: '/src/assets/images/dish_alfredo_steak_1790673968229.jpg',
  lavaDessert: '/src/assets/images/dish_lava_dessert_1790673989023.jpg',
  interior: '/src/assets/images/restaurant_interior_ambiance_1790674007555.jpg',
} as const;

export const RESTAURANT_INFO = {
  name: 'Ember & Spice',
  tagline: 'Bold Flavours. Memorable Moments.',
  locationShort: 'Sargodha, Punjab',
  address: 'Main Boulevard, Sargodha, Punjab, Pakistan',
  phone: '+92 300 0000000',
  phoneClean: '923000000000',
  whatsappClean: '923000000000',
  email: 'hello@emberandspice.example',
  instagramHandle: '@emberandspice.sgd',
  hours: [
    { days: 'Monday – Thursday', time: '12:00 PM – 11:00 PM' },
    { days: 'Friday', time: '2:00 PM – 12:00 AM' },
    { days: 'Saturday – Sunday', time: '12:00 PM – 12:00 AM' },
  ],
};

export const MENU_CATEGORIES: MenuCategory[] = [
  'Starters',
  'BBQ',
  'Pakistani',
  'Burgers',
  'Chinese',
  'Pasta',
  'Steaks',
  'Desserts',
  'Beverages',
];

export const MENU_ITEMS: MenuItem[] = [
  // Popular Dishes (Explicitly featured on Home Page & Menu)
  {
    id: 'bbq-platter',
    name: 'BBQ Platter',
    category: 'BBQ',
    description:
      'Charcoal-grilled beef seekh kebabs, malai boti, smoky chicken tikka, lamb chops, warm garlic naan, and house mint chutney.',
    price: 3450,
    image: IMAGES.heroBbq,
    imagePosition: 'center center',
    isPopular: true,
    isSpicy: true,
    servingInfo: 'Serves 3–4',
  },
  {
    id: 'smoky-chicken-burger',
    name: 'Smoky Chicken Burger',
    category: 'Burgers',
    description:
      'Char-grilled thigh fillet glazed in house ember sauce, aged cheddar, caramelized onions, and brioche bun with skin-on fries.',
    price: 980,
    image: IMAGES.burger,
    imagePosition: 'left center',
    isPopular: true,
    isSpicy: true,
    servingInfo: 'Served with fries',
  },
  {
    id: 'chicken-karahi',
    name: 'Chicken Karahi',
    category: 'Pakistani',
    description:
      'Traditional iron-wok organic chicken cooked over high flame with vine tomatoes, crushed black pepper, ginger juliennes, and green chilies.',
    price: 2250,
    image: IMAGES.karahi,
    imagePosition: 'center center',
    isPopular: true,
    isSpicy: true,
    servingInfo: 'Full Wok · Serves 3',
  },
  {
    id: 'creamy-alfredo-pasta',
    name: 'Creamy Alfredo Pasta',
    category: 'Pasta',
    description:
      'Artisanal fettuccine tossed in velvety parmesan-garlic cream reduction, topped with char-grilled herb chicken strips and parsley.',
    price: 1350,
    image: IMAGES.alfredoSteak,
    imagePosition: 'left center',
    isPopular: true,
    servingInfo: 'With garlic bread',
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Fries',
    category: 'Starters',
    description:
      'Double-cooked crispy potato fries layered with smoked chicken chunks, molten cheddar sauce, pickled jalapeños, and roasted garlic aioli.',
    price: 790,
    image: IMAGES.burger,
    imagePosition: 'right bottom',
    isPopular: true,
    isSpicy: true,
    servingInfo: 'Sharing portion',
  },
  {
    id: 'chocolate-lava-cake',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    description:
      'Warm dark couverture chocolate cake with a molten center, served with Madagascar vanilla bean ice cream and roasted pistachio crumble.',
    price: 850,
    image: IMAGES.lavaDessert,
    imagePosition: 'center center',
    isPopular: true,
    isVegetarian: true,
    servingInfo: 'Baked fresh · 12 min',
  },

  // Additional Starters
  {
    id: 'dynamite-prawns',
    name: 'Ember Dynamite Prawns',
    category: 'Starters',
    description:
      'Tempura-battered tiger prawns tossed in a tangy sriracha-honey glaze, served over crisp iceberg lettuce and toasted sesame.',
    price: 1290,
    image: IMAGES.burger,
    imagePosition: 'center top',
    isSpicy: true,
    servingInfo: '6 Pieces',
  },
  {
    id: 'hummus-warm-pita',
    name: 'Smoked Chickpea Hummus & Naan',
    category: 'Starters',
    description:
      'Velvety tahini chickpea dip infused with roasted garlic and smoked paprika oil, served with freshly baked clay-oven roghni naan.',
    price: 680,
    image: IMAGES.heroBbq,
    imagePosition: 'right bottom',
    isVegetarian: true,
    servingInfo: 'Serves 2',
  },
  {
    id: 'stuffed-peri-bites',
    name: 'Charcoal Peri-Peri Chicken Bites',
    category: 'Starters',
    description:
      'Tender chicken fillets stuffed with herb cream cheese and green chili, crumbed crisp and served with house peri dip.',
    price: 890,
    image: IMAGES.burger,
    imagePosition: 'center center',
    isSpicy: true,
    servingInfo: '6 Pieces',
  },

  // Additional BBQ
  {
    id: 'malai-boti',
    name: 'Royal Kastoori Malai Boti',
    category: 'BBQ',
    description:
      'Boneless chicken cubes marinated overnight in fresh cream, crushed white pepper, cardamom, and cheddar, grilled over live charcoal.',
    price: 1250,
    image: IMAGES.heroBbq,
    imagePosition: 'left center',
    servingInfo: '10 Skewered Pieces',
  },
  {
    id: 'beef-seekh-kebab',
    name: 'Peshawari Beef Seekh Kebabs',
    category: 'BBQ',
    description:
      'Hand-minced prime beef seasoned with roasted coriander seeds, caramelized onion, and green chilies, flame-seared on iron skewers.',
    price: 1180,
    image: IMAGES.heroBbq,
    imagePosition: 'center top',
    isSpicy: true,
    servingInfo: '4 Long Skewers',
  },
  {
    id: 'charcoal-lamb-chops',
    name: 'Smoky Namkeen Lamb Chops',
    category: 'BBQ',
    description:
      'Tender rack chops marinated in ginger juice, cracked black pepper, and rock salt, slow-charred over glowing tamarind wood embers.',
    price: 2650,
    image: IMAGES.heroBbq,
    imagePosition: 'right center',
    servingInfo: '6 Prime Chops',
  },

  // Additional Pakistani
  {
    id: 'mutton-makhni-handi',
    name: 'Mutton Peshawari Karahi',
    category: 'Pakistani',
    description:
      'Farm-fresh tender goat meat slow-simmered in its own juices with ripe red tomatoes, Himalayan pink salt, and fresh green chilies.',
    price: 3400,
    image: IMAGES.karahi,
    imagePosition: 'left center',
    isSpicy: true,
    servingInfo: 'Full Wok · Serves 3–4',
  },
  {
    id: 'murgh-makhni-handi',
    name: 'Boneless Chicken Mughlai Handi',
    category: 'Pakistani',
    description:
      'Char-grilled chicken tikka simmered in a rich clay-pot gravy of roasted cashews, butter, sun-dried fenugreek leaves, and cream.',
    price: 1890,
    image: IMAGES.karahi,
    imagePosition: 'right center',
    servingInfo: 'Clay Handi · Serves 2–3',
  },
  {
    id: 'tarka-daal-makhni',
    name: 'Slow-Simmered Black Daal Makhni',
    category: 'Pakistani',
    description:
      'Whole black lentils cooked overnight over dying charcoal embers, finished with churned white butter, ginger, and tempered cumin.',
    price: 950,
    image: IMAGES.karahi,
    imagePosition: 'center bottom',
    isVegetarian: true,
    servingInfo: 'Serves 2–3',
  },
  {
    id: 'garlic-butter-naan',
    name: 'Artisanal Tandoori Bread Basket',
    category: 'Pakistani',
    description:
      'Assortment of freshly baked garlic butter naan, kalonji roghni naan, and flaky whole-wheat lacha paratha straight from our clay tandoor.',
    price: 490,
    image: IMAGES.heroBbq,
    imagePosition: 'left bottom',
    isVegetarian: true,
    servingInfo: '4 Breads',
  },

  // Additional Burgers
  {
    id: 'double-smash-beef-burger',
    name: 'The Sargodha Double Smash Beef',
    category: 'Burgers',
    description:
      'Two lacy-edged prime beef patties smashed with sweet white onions, double American cheese, house pickles, and smoky mustard sauce.',
    price: 1190,
    image: IMAGES.burger,
    imagePosition: 'center center',
    servingInfo: 'Served with fries',
  },
  {
    id: 'crispy-zing-heat-burger',
    name: 'Crunch Ember Zinger Burger',
    category: 'Burgers',
    description:
      'Buttermilk-brined spicy fried chicken breast, Nashville hot chili dust, tangy slaw, and jalapeño ranch on a toasted potato bun.',
    price: 920,
    image: IMAGES.burger,
    imagePosition: 'right top',
    isSpicy: true,
    servingInfo: 'Served with fries',
  },

  // Chinese
  {
    id: 'chicken-manchurian-rice',
    name: 'Classic Chicken Manchurian & Egg Fried Rice',
    category: 'Chinese',
    description:
      'Wok-seared chicken medallions in a glossy garlic-tomato soy reduction, accompanied by fragrant jasmine egg fried rice.',
    price: 1280,
    image: IMAGES.karahi,
    imagePosition: 'center top',
    servingInfo: 'Generous single platter',
  },
  {
    id: 'szechuan-chili-dry',
    name: 'Szechuan Beef Chili Dry',
    category: 'Chinese',
    description:
      'Julienne beef flash-fried in a smoking wok with roasted red chilies, scallions, ginger strips, and aromatic Szechuan peppercorns.',
    price: 1540,
    image: IMAGES.karahi,
    imagePosition: 'right bottom',
    isSpicy: true,
    servingInfo: 'Served with vegetable rice',
  },
  {
    id: 'garlic-vegetable-chowmein',
    name: 'Wok-Charred Chicken Hakka Chowmein',
    category: 'Chinese',
    description:
      'Hand-pulled egg noodles tossed over high flame with marinated chicken, crisp bell peppers, cabbage, and toasted sesame oil.',
    price: 1150,
    image: IMAGES.alfredoSteak,
    imagePosition: 'left bottom',
    servingInfo: 'Sharing portion',
  },

  // Additional Pasta
  {
    id: 'spicy-arrabbiata-penne',
    name: 'Smoked Chicken Penne Arrabbiata',
    category: 'Pasta',
    description:
      'Al dente penne rigate in a slow-simmered San Marzano tomato sauce with crushed red chili, kalamata olives, basil, and parmesan.',
    price: 1290,
    image: IMAGES.alfredoSteak,
    imagePosition: 'center top',
    isSpicy: true,
    servingInfo: 'With garlic bread',
  },

  // Steaks
  {
    id: 'chargrilled-peppercorn-steak',
    name: 'Cast-Iron Cracked Peppercorn Beef Steak',
    category: 'Steaks',
    description:
      'Prime 280g beef tenderloin seared over charcoal, served on a sizzling platter with creamy green peppercorn sauce, mash, and sautéed vegetables.',
    price: 2490,
    image: IMAGES.alfredoSteak,
    imagePosition: 'right center',
    servingInfo: 'Choice of doneness',
  },
  {
    id: 'moroccan-herb-chicken-steak',
    name: 'Flame-Grilled Tarragon Chicken Steak',
    category: 'Steaks',
    description:
      'Twin char-grilled chicken fillets basted in herb butter, topped with creamy mushroom-tarragon velouté and garlic herb rice.',
    price: 1790,
    image: IMAGES.alfredoSteak,
    imagePosition: 'center center',
    servingInfo: 'Two sides included',
  },

  // Additional Desserts
  {
    id: 'shahi-pistachio-kulfi',
    name: 'Saffron & Pistachio Matka Kulfi',
    category: 'Desserts',
    description:
      'Traditional slow-reduced milk kulfi infused with Iranian saffron, cardamom, and roasted Multani pistachios, served in a chilled clay matka.',
    price: 590,
    image: IMAGES.lavaDessert,
    imagePosition: 'right center',
    isVegetarian: true,
    servingInfo: 'Chilled clay pot',
  },
  {
    id: ' sizzling-walnut-brownie',
    name: 'Sizzling Fudge Brownie Skillet',
    category: 'Desserts',
    description:
      'Gooey dark chocolate walnut brownie served on a hot cast-iron platter with vanilla bean ice cream and warm salted caramel pour.',
    price: 820,
    image: IMAGES.lavaDessert,
    imagePosition: 'left center',
    isVegetarian: true,
    servingInfo: 'Tabletop pour',
  },

  // Beverages
  {
    id: 'mint-margarita',
    name: 'Fresh Garden Mint Margarita',
    category: 'Beverages',
    description:
      'Hand-picked Sargodha garden mint blended with fresh lime juice, black salt, crushed ice, and sparkling lemon soda.',
    price: 390,
    image: IMAGES.lavaDessert,
    imagePosition: 'center top',
    isVegetarian: true,
    servingInfo: 'Tall chilled glass',
  },
  {
    id: 'kinnow-citrus-cooler',
    name: 'Sargodha Kinnow & Rosemary Cooler',
    category: 'Beverages',
    description:
      'A tribute to Sargodha’s famous orchards — freshly pressed sweet kinnow mandarin juice infused with rosemary syrup and sparkling water.',
    price: 450,
    image: IMAGES.interior,
    imagePosition: 'center center',
    isVegetarian: true,
    servingInfo: 'House Signature',
  },
  {
    id: 'Belgian-cold-coffee',
    name: 'Artisanal Hazelnut Cold Coffee',
    category: 'Beverages',
    description:
      'Double-shot espresso blended with rich milk, roasted hazelnut syrup, and vanilla ice cream.',
    price: 580,
    image: IMAGES.lavaDessert,
    imagePosition: 'left bottom',
    isVegetarian: true,
    servingInfo: '350ml Glass',
  },
  {
    id: 'cardamom-peshawari-kahwa',
    name: 'Smoky Cardamom & Saffron Kahwa',
    category: 'Beverages',
    description:
      'Fragrant green tea brewed in a brass samovar with crushed green cardamom, cinnamon bark, and slivered almonds.',
    price: 350,
    image: IMAGES.interior,
    imagePosition: 'right bottom',
    isVegetarian: true,
    servingInfo: 'Pot for 2',
  },
];

export const OFFERS_DATA: OfferItem[] = [
  {
    id: 'offer-family-feast',
    title: 'Family Feast',
    subtitle: 'BBQ platter + 4 drinks + dessert',
    description:
      'Our flagship sharing experience for families and groups. Includes our full Charcoal BBQ Platter, half Chicken Karahi, 4 Tandoori Naans, 4 Fresh Mint Margaritas, and 2 Chocolate Lava Cakes.',
    price: 3999,
    regularPrice: 5250,
    validity: 'Available Daily · Dine-In & Takeaway',
    image: IMAGES.heroBbq,
    includes: [
      'Full Charcoal BBQ Platter (Seekh Kebabs, Malai Boti, Tikka)',
      '4 Fresh Mint Margaritas or Soft Drinks',
      'Warm Chocolate Lava Cake for Sharing',
      'Freshly Baked Garlic & Roghni Naan Basket',
    ],
    tag: 'Most Popular Demo Offer',
  },
  {
    id: 'offer-lunch-special',
    title: 'Lunch Special',
    subtitle: 'Midday executive & family combo',
    description:
      'Step away from a busy day in Sargodha for a freshly prepared two-course lunch. Choose any Pasta, Burger, or Chinese Entrée paired with our signature starter and a chilled Kinnow Cooler.',
    price: 1499,
    regularPrice: 1950,
    validity: 'Monday – Thursday · 12:00 PM to 4:00 PM',
    image: IMAGES.alfredoSteak,
    includes: [
      'Choice of Creamy Alfredo Pasta, Chicken Manchurian, or Smash Burger',
      'Half Portion Loaded Fries or Soup of the Day',
      '1 Chilled Sargodha Kinnow Cooler or Mint Margarita',
    ],
    tag: 'Weekday Value',
  },
  {
    id: 'offer-bbq-night',
    title: 'BBQ Night',
    subtitle: 'Live charcoal grill & karahi pairing',
    description:
      'Every Thursday and Sunday evening, enjoy our live courtyard ember grill pairing a full Chicken Karahi with 8 pieces of Royal Malai Boti, 4 Beef Seekh Kebabs, and unlimited Peshawari Kahwa.',
    price: 3299,
    regularPrice: 4100,
    validity: 'Thursday & Sunday · 6:30 PM to 11:30 PM',
    image: IMAGES.karahi,
    includes: [
      'Full Iron-Wok Chicken Karahi',
      '8 Pcs Royal Malai Boti & 4 Beef Seekh Kebabs',
      '3 Garlic Butter Naans & Mint Raita',
      'Complimentary Pot of Cardamom Kahwa',
    ],
    tag: 'Evening Signature',
  },
  {
    id: 'offer-student-deal',
    title: 'Student Deal',
    subtitle: 'Handcrafted burger + loaded fries + drink',
    description:
      'Crafted for University of Sargodha and local college students. Enjoy our Smoky Chicken Burger or Crunch Zinger alongside crispy cheese-loaded fries and a tall chilled beverage.',
    price: 999,
    regularPrice: 1390,
    validity: 'All Week · Valid with Student ID',
    image: IMAGES.burger,
    includes: [
      '1 Smoky Chicken Burger or Crunch Zinger Burger',
      'Regular Cheese & Jalapeño Loaded Fries',
      '1 Soft Drink or Fresh Lime Soda',
    ],
    tag: 'Campus Favourite',
  },
  {
    id: 'offer-birthday-celebration',
    title: 'Birthday Celebration',
    subtitle: 'Reserved family table + feast for 6 + molten dessert platter',
    description:
      'Host an unforgettable birthday evening in our private booth section. Includes complete table styling, a 6-person Pakistani & Continental feast, and a complimentary celebratory dessert platter.',
    price: 8499,
    regularPrice: 10500,
    validity: 'Advance Reservation Recommended · All Week',
    image: IMAGES.lavaDessert,
    includes: [
      'Grand BBQ & Karahi Feast for 6 Guests',
      '2 Creamy Alfredo Pastas & Starter Platter',
      'Complimentary Celebratory Chocolate Lava & Brownie Platter',
      'Dedicated Table Host & Warm Booth Seating',
    ],
    tag: 'Group Celebration',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Live Charcoal BBQ Feast',
    category: 'BBQ',
    caption: 'Skewered beef seekh kebabs, malai boti, and smoky lamb chops seared over glowing tamarind charcoal.',
    image: IMAGES.heroBbq,
    aspect: 'wide',
    imagePosition: 'center center',
    relatedDishId: 'bbq-platter',
  },
  {
    id: 'gal-2',
    title: 'Evening Family Dining Hall',
    category: 'Interior',
    caption: 'Warm brass pendant lighting, plush leather booths, and acoustic comfort designed for relaxed family conversations.',
    image: IMAGES.interior,
    aspect: 'wide',
    imagePosition: 'center center',
  },
  {
    id: 'gal-3',
    title: 'Traditional Iron-Wok Chicken Karahi',
    category: 'Food',
    caption: 'Prepared fresh to order over roaring flame with vine-ripened tomatoes, ginger juliennes, and green chilies.',
    image: IMAGES.karahi,
    aspect: 'standard',
    imagePosition: 'center center',
    relatedDishId: 'chicken-karahi',
  },
  {
    id: 'gal-4',
    title: 'Molten Dark Chocolate Lava Cake',
    category: 'Desserts',
    caption: 'Baked to order with a flowing dark chocolate core, paired with Madagascar vanilla bean ice cream and pistachio crumble.',
    image: IMAGES.lavaDessert,
    aspect: 'standard',
    imagePosition: 'center center',
    relatedDishId: 'chocolate-lava-cake',
  },
  {
    id: 'gal-5',
    title: 'Handcrafted Smoky Burger & Loaded Fries',
    category: 'Food',
    caption: 'Toasted brioche bun, aged melted cheddar, and house ember glaze served beside double-cooked loaded fries.',
    image: IMAGES.burger,
    aspect: 'standard',
    imagePosition: 'center center',
    relatedDishId: 'smoky-chicken-burger',
  },
  {
    id: 'gal-6',
    title: 'Private Booths for Family Gatherings',
    category: 'Family Dining',
    caption: 'Spacious seating arrangements accommodating multi-generational families, birthday dinners, and corporate guests.',
    image: IMAGES.interior,
    aspect: 'tall',
    imagePosition: 'left center',
  },
  {
    id: 'gal-7',
    title: 'Cast-Iron Steak & Creamy Fettuccine Alfredo',
    category: 'Food',
    caption: 'Prime tenderloin steak alongside velvety parmesan fettuccine alfredo with char-grilled herb chicken.',
    image: IMAGES.alfredoSteak,
    aspect: 'standard',
    imagePosition: 'center center',
    relatedDishId: 'creamy-alfredo-pasta',
  },
  {
    id: 'gal-8',
    title: 'Artisanal Skewers & Tandoori Breads',
    category: 'BBQ',
    caption: 'Every skewer is basted with clarified butter and served with bubbling garlic naan straight from our clay tandoor.',
    image: IMAGES.heroBbq,
    aspect: 'tall',
    imagePosition: 'right center',
    relatedDishId: 'malai-boti',
  },
  {
    id: 'gal-9',
    title: 'Warm Hospitality & Celebrations',
    category: 'Family Dining',
    caption: 'Thoughtful table service and warm ambient lighting make every dinner feel like an occasion.',
    image: IMAGES.interior,
    aspect: 'standard',
    imagePosition: 'right center',
  },
  {
    id: 'gal-10',
    title: 'Sweet Endings & Handcrafted Desserts',
    category: 'Desserts',
    caption: 'From sizzling walnut brownie skillets to saffron matka kulfi, crafted to complete your evening.',
    image: IMAGES.lavaDessert,
    aspect: 'standard',
    imagePosition: 'left bottom',
    relatedDishId: 'shahi-pistachio-kulfi',
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: 'rev-1',
    quote:
      'Great food, beautiful atmosphere and generous portions. We hosted a 10-person family dinner here and the BBQ Platter and Chicken Karahi arrived piping hot at the same time.',
    author: 'Tariq Mahmood',
    role: 'Family Dinner Guest · Satellite Town, Sargodha',
    highlight: 'Ordered Family Feast & Mutton Karahi',
  },
  {
    id: 'rev-2',
    quote:
      'Finally a spot on Main Boulevard where both our parents love the traditional handi and our kids get proper gourmet smash burgers and alfredo pasta. The WhatsApp reservation was effortless.',
    author: 'Dr. Ayesha Kamran',
    role: 'Weekend Diner · Civil Lines, Sargodha',
    highlight: 'Reserved Table for 6 via WhatsApp',
  },
  {
    id: 'rev-3',
    quote:
      'The Smoky Chicken Burger and Chocolate Lava Cake are genuinely top-tier. Calm lighting, clean seating, and attentive staff who never rush your table.',
    author: 'Hamza & Zainab Tariq',
    role: 'Evening Guests · University Road, Sargodha',
    highlight: 'Ordered Burgers, Steaks & Desserts',
  },
];

export const TIMELINE_EVENTS = [
  {
    step: '01',
    year: '2021',
    title: 'The Idea',
    description:
      'Born from late-evening conversations in Sargodha: why choose between authentic charcoal BBQ and a refined, contemporary dining room where families and friends can linger comfortably?',
  },
  {
    step: '02',
    year: '2022',
    title: 'First Kitchen',
    description:
      'Months of recipe trials perfecting our iron-wok karahi spice blends, 24-hour BBQ marinades, and handcrafted brioche burger buns using fresh local produce from Punjab.',
  },
  {
    step: '03',
    year: '2024',
    title: 'Growing Community',
    description:
      'Welcoming families, university students, and corporate hosts across Sargodha — becoming a trusted destination for birthdays, graduations, and weekend dinners.',
  },
  {
    step: '04',
    year: '2026',
    title: 'Ember & Spice Today',
    description:
      'A complete hospitality experience on Main Boulevard combining live charcoal craftsmanship, continental favourites, seamless table reservations, and direct online ordering.',
  },
];

export const SARGODHA_DELIVERY_ZONES = [
  { name: 'Main Boulevard & Queens Road', time: '25–35 mins', fee: 120 },
  { name: 'Satellite Town (Blocks A–D)', time: '30–40 mins', fee: 150 },
  { name: 'University Road & Civil Lines', time: '30–40 mins', fee: 150 },
  { name: 'Cantt & PAF Road Area', time: '35–45 mins', fee: 180 },
  { name: 'Model Town & Canal Park', time: '35–45 mins', fee: 180 },
];
