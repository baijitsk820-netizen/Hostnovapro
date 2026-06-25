import { Service, WebsitePreview, PricingPlan, Testimonial, FAQItem } from "./types";

export const SERVICES_DATA: Service[] = [
  {
    id: "web-design",
    title: "Website Design",
    description: "Custom crafted high-performance business websites styled to echo your brand's unique character and drive maximum conversions.",
    iconName: "Monitor",
    details: [
      "Custom UI/UX Premium Layout",
      "Responsive on Mobile & Tablet",
      "Speed & Core Web Vitals Optimized",
      "Interactive Framer Motion effects"
    ],
    priceText: "Starts at ₹4,999"
  },
  {
    id: "ecommerce",
    title: "Ecommerce Store",
    description: "Beautiful online stores designed to showcase your products, deliver flawless purchasing flows, and maximize sales revenue.",
    iconName: "ShoppingBag",
    details: [
      "Secure Payment Gateway Integration",
      "Dynamic Inventory & Cart Systems",
      "Customer Order Tracking",
      "Optimized Checkout Funnels"
    ],
    priceText: "Starts at ₹9,999"
  },
  {
    id: "restaurant",
    title: "Restaurant Website",
    description: "Interactive dining menus, dynamic online table reservations, and seamless direct food ordering systems to power your restaurant.",
    iconName: "Utensils",
    details: [
      "Interactive Digital Food Menu",
      "Real-time Table Reservation Form",
      "Direct WhatsApp / Call Ordering",
      "Elegant Food Gallery Layout"
    ],
    priceText: "Starts at ₹4,999"
  },
  {
    id: "hosting",
    title: "Hosting Setup",
    description: "Blazing fast cloud server setup, custom professional business emails, and robust 99.9% uptime guarantees for peace of mind.",
    iconName: "Cloud",
    details: [
      "SSL Certificate & Custom Domain Setup",
      "High-Performance CDN Configuration",
      "Professional Google Workspace / Zoho Emails",
      "Daily Automated Backups"
    ],
    priceText: "Included in Packages"
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description: "Advanced search engine optimization strategies to drive organic Google search rankings and get discovered by local customers.",
    iconName: "TrendingUp",
    details: [
      "Local SEO & Google Business Profile setup",
      "Strategic Keyword Research",
      "Page Speed & Performance Tuning",
      "Schema Markup & Analytics Tracking"
    ],
    priceText: "Starts at ₹4,999"
  },
  {
    id: "maintenance",
    title: "Website Maintenance",
    description: "Ongoing monthly security monitoring, plugin updates, content edits, and reliable high-priority technical support when you need it.",
    iconName: "ShieldCheck",
    details: [
      "24/7 Security & Uptime Monitoring",
      "Monthly Content & Image Updates",
      "Weekly Core & Plugin Patching",
      "Priority Developer Support Line"
    ],
    priceText: "Starts at ₹1,499/mo"
  }
];

export const WEBSITES_PREVIEW_DATA: WebsitePreview[] = [
  {
    id: "restaurant-preview",
    title: "Aura Brew",
    category: "Restaurant Website",
    description: "A calm café concept designed to make a new coffee brand feel warm, premium, and memorable.",
    tags: ["Visual Design", "Booking Engine", "Local SEO"],
    features: ["Interactive Brew Menu", "Live Table Reservation", "Modern Rich Typography"],
    liveUrlText: "aurabrew.hostnovapro.com",
    num: "01",
    conceptSub: "WARM LUXURY CAFÉ BRAND",
    colors: ["#FAF5F0", "#E3A857", "#4A2E1B"],
    mockTitle: "AURA BREW",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
    mockNav: ["HOME", "MENU", "GALLERY", "LOCATION", "ABOUT"],
    mockAction: "BOOK A TABLE",
    mockFeatures: ["☕ COFFEE", "🍲 FOOD", "🛋️ AMBIENCE", "📅 BOOKING"],
    technologies: ["React 18", "Tailwind CSS", "Motion", "Vite", "Lucide Icons", "CSS Glassmorphism"],
    longDescription: "Aura Brew is a warm, elegant restaurant concept tailored for modern coffee bistro spaces. It pairs cream-colored visual sheets with high-contrast espresso tones and gold accents, projecting a luxurious yet cozy environment.",
    challenge: "Traditional restaurant pages are either slow to load on mobile devices or use clunky external iframe solutions that break user immersion during booking workflows.",
    solution: "We engineered an organic, highly optimized single-page interface with real-time responsive component states. Users can reserve tables in under 30 seconds with instant UI state feedback."
  },
  {
    id: "ecommerce-preview",
    title: "District Roast",
    category: "Ecommerce Website",
    description: "An urban café website direction built around fast ordering, strong atmosphere, and local trust.",
    tags: ["E-Commerce", "Custom Cart", "Framer Transitions"],
    features: ["Instant Product Search", "Interactive Cart Drawer", "SSL Secured Processing"],
    liveUrlText: "districtroast.hostnovapro.com",
    num: "02",
    conceptSub: "MODERN CITY CAFÉ DIRECTION",
    colors: ["#FFFFFF", "#2C1E14", "#D4AF37"],
    mockTitle: "DISTRICT ROAST",
    imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=600",
    mockNav: ["SHOP", "BREWS", "SUBSCRIPTION", "LOCATIONS"],
    mockAction: "ORDER NOW",
    mockFeatures: ["🎒 MERCH", "☕ BEANS", "⚙️ GEAR", "📍 FIND US"],
    technologies: ["React 18", "Tailwind CSS", "Motion", "Vite", "Secure Checkout Mock", "Responsive Grid Layout"],
    longDescription: "District Roast represents a bold, high-contrast eCommerce storefront tailored for specialty coffee roasters who sell beans, merchandise, and subscriptions directly to urban consumers.",
    challenge: "Most small business eCommerce pages feel slow, cluttering the mobile screen with heavy assets and confusing navigations.",
    solution: "We designed a lightweight, high-performance product browsing grid. It utilizes a sliding cart drawer and animated interactions to feel completely native, even on slow 3G connections."
  },
  {
    id: "portfolio-preview",
    title: "Golden Crust",
    category: "Portfolio Website",
    description: "A heritage bakery presentation highlighting organic sourdoughs, daily baking schedules, and recipe stories.",
    tags: ["Minimalist Grid", "Creative", "Fast Loading"],
    features: ["Interactive Project Gallery", "Masonry Image Showcase", "Smooth Scroll Parallax"],
    liveUrlText: "goldencrust.hostnovapro.com",
    num: "03",
    conceptSub: "ARTISAN PATISSERIE DIRECTION",
    colors: ["#FAF9F6", "#D4AF37", "#8B5A2B"],
    mockTitle: "GOLDEN CRUST",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
    mockNav: ["OUR STORY", "MENU", "GALLERY", "DAILY BAKE"],
    mockAction: "ORDER BREAD",
    mockFeatures: ["🍞 SOURDOUGH", "🥐 PASTRY", "🥧 PIES", "☕ ESPRESSO"],
    technologies: ["React 18", "Tailwind CSS", "Motion", "Framer Transitions", "Lucide Icons", "Baking Schedule Scheduler"],
    longDescription: "Golden Crust brings traditional, rustic, and organic bakery aesthetics into the modern web. Highlighting earth tones and high-impact bread macro-photography, it portrays raw visual luxury.",
    challenge: "Local bakeries fail to communicate their baking schedule effectively, causing customer disappointment when artisan sourdoughs sell out before they arrive.",
    solution: "We implemented an interactive 'Daily Bake' live schedule banner, showing exactly when fresh goods emerge from the oven. This creates organic foot traffic and builds deep local loyalty."
  },
  {
    id: "business-preview",
    title: "Hot Chick",
    category: "Business Website",
    description: "A spicy, high-impact fast-casual diner interface structured to capture hot-chicken deliveries and group bookings.",
    tags: ["SaaS", "Lead Generation", "Analytics Charts"],
    features: ["Interactive Savings Calculator", "Real-Time Visual Chart", "Team Bios Slider"],
    liveUrlText: "hotchick.hostnovapro.com",
    num: "04",
    conceptSub: "BOLD FAST-CASUAL DIRECTION",
    colors: ["#FFFFFF", "#DC2626", "#111111"],
    mockTitle: "HOT CHICK",
    imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&q=80&w=600",
    mockNav: ["MENU", "ABOUT", "FRANCHISE", "DELIVERY"],
    mockAction: "ORDER ONLINE",
    mockFeatures: ["🍗 TENDERS", "🍔 BURGERS", "🍟 SIDES", "🥤 SHAKES"],
    technologies: ["React 18", "Tailwind CSS", "Motion", "Vite", "Interactions Engine", "Spicy Theme Accents"],
    longDescription: "Hot Chick features a high-energy, vibrant, and incredibly punchy web layout created for bold food concepts. Red accents and crisp typography maximize hunger cues and speed up buying decisions.",
    challenge: "Vibrant fast food menus are often stored as rigid PDF files, making it extremely frustrating for mobile users to browse options, pricing, and ingredients.",
    solution: "We engineered a clean, completely responsive mobile-first menu drawer system. It allows customers to easily view categories, toggle dietary items, and calculate orders on the fly."
  },
  {
    id: "landing-preview",
    title: "Sip & Sync",
    category: "Landing Page",
    description: "High-impact event registration and co-working workspace launch landing page designed strictly to harvest maximum sign-up conversions.",
    tags: ["Conversion Optimized", "Event Page", "Dynamic Forms"],
    features: ["Countdown Event Timer", "Seamless Event Registration", "Social Proof Showcase"],
    liveUrlText: "sipsync.hostnovapro.com",
    num: "05",
    conceptSub: "EXCLUSIVE CLUB & WORKSPACE",
    colors: ["#FFFFFF", "#0284C7", "#0F172A"],
    mockTitle: "SIP & SYNC",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
    mockNav: ["CO-WORKING", "SOCIALS", "MEMBERSHIP", "AMENITIES"],
    mockAction: "JOIN TODAY",
    mockFeatures: ["⚡ SPEED WIFI", "🖥️ STATIONS", "☕ SPECIALS", "📅 NETWORKS"],
    technologies: ["React 18", "Tailwind CSS", "Motion", "Vite", "Real-time RSVPs Tracker", "Lucide Icons"],
    longDescription: "Sip & Sync is an exclusive lounge, café, and co-working social club landing page designed around membership generation and premium high-profile corporate social registrations.",
    challenge: "Most co-working landing pages are generic templates filled with lifeless text, resulting in very low inquiry-to-visit conversion rates.",
    solution: "We built an interactive co-working amenities explorer. Combined with an active membership reservation form and a beautiful countdown clock, it inspires active, urgent registration behavior."
  }
];

export const PRICING_PLANS_DATA: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Package",
    price: "₹4,999",
    priceNum: 4999,
    description: "Perfect for local businesses, shops, and professionals who need an elegant, fast-loading online presence to attract clients.",
    deliveryTime: "3 - 5 Days Delivery",
    popular: false,
    features: [
      { text: "1-Page Premium Parallax Design", included: true },
      { text: "Fully Responsive Mobile Layout", included: true },
      { text: "Free SSL Secure Certificate", included: true },
      { text: "1 Year Free Domain & High-speed Hosting", included: true },
      { text: "Google Maps & Local Search Setup", included: true },
      { text: "Direct WhatsApp Ordering/Inquiry", included: true },
      { text: "Premium Custom Business Email (1 Account)", included: true },
      { text: "Ecommerce Store & Cart Features", included: false },
      { text: "Monthly Analytics Dashboard Integration", included: false },
      { text: "24/7 Priority Support & Maintenance", included: false }
    ]
  },
  {
    id: "business",
    name: "Business Package",
    price: "₹9,999",
    priceNum: 9999,
    description: "Our most popular setup for expanding businesses, service agencies, or restaurants demanding dynamic features and lead optimization.",
    deliveryTime: "5 - 7 Days Delivery",
    popular: true,
    features: [
      { text: "Up to 5 Pages Premium Custom Design", included: true },
      { text: "Fully Responsive Mobile & Tablet Layout", included: true },
      { text: "Free SSL Secure Certificate", included: true },
      { text: "1 Year Free Domain & High-speed Hosting", included: true },
      { text: "Google Maps & Local Search Setup", included: true },
      { text: "Direct WhatsApp Ordering/Inquiry", included: true },
      { text: "Premium Custom Business Emails (5 Accounts)", included: true },
      { text: "Interactive Booking/Reservation Engine", included: true },
      { text: "Monthly Analytics Dashboard Integration", included: true },
      { text: "Ecommerce Store & Cart Features", included: false },
      { text: "24/7 Priority Support & Maintenance", included: true }
    ]
  },
  {
    id: "premium",
    name: "Premium E-Shop / App",
    price: "₹19,999",
    priceNum: 19999,
    description: "The ultimate solution for scaling merchants or bespoke agencies requiring a custom built, highly functional eCommerce storefront or app.",
    deliveryTime: "7 - 12 Days Delivery",
    popular: false,
    features: [
      { text: "Unlimited Custom Designed Pages", included: true },
      { text: "Fully Responsive + App-like Shell Experience", included: true },
      { text: "Free SSL Secure Certificate", included: true },
      { text: "1 Year Ultra High-Speed Dedicated Cloud Hosting", included: true },
      { text: "Google Maps, Local SEO & Brand Marketing Plan", included: true },
      { text: "Advanced eCommerce Engine (Cart & Checkout)", included: true },
      { text: "Online Payment Gateway Integration (Instamojo, Razorpay)", included: true },
      { text: "Unlimited Corporate Professional Business Emails", included: true },
      { text: "Interactive Booking/Reservation Engine", included: true },
      { text: "Monthly Analytics Dashboard Integration", included: true },
      { text: "24/7 Priority Support & Maintenance (6 Months Free)", included: true }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Aravind Sharma",
    company: "The Chai Bistro, Jaipur",
    review: "HostNovaPro did an outstanding job! They built our restaurant menu and booking system. We saw a 45% increase in direct reservations within the first month. The coffee-themed styling looks exceptionally premium!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "t2",
    name: "Priya Nair",
    company: "Studio Aura Architects, Bangalore",
    review: "As an architect, I am extremely picky about design layout and typography. The team exceeded all expectations. They created a gorgeous minimalist portfolio that perfectly displays our spatial creations. Outstanding performance!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "t3",
    name: "Rohan Das",
    company: "GlowGourmet Coffee Roasters, Mumbai",
    review: "Incredible speed and conversion optimization! Our online order cart is super slick and secure. The 3D animation visual elements make us look like an international brand. Worth every single rupee spent!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "t4",
    name: "Meera Sen",
    company: "ZenSpace Co-Working, Pune",
    review: "Our landing page for the new coworking space has achieved a 28% sign-up conversion rate! The process was incredibly fast, and the custom email setup works flawlessly. Highly recommend HostNovaPro to any local business.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-pricing",
    question: "Are there any hidden costs beyond the package price?",
    answer: "Absolutely not. All our listed prices (₹4,999, ₹9,999, ₹19,999) are 100% transparent and inclusive of design, development, 1-year free custom domain (.com, .in, etc.), high-speed hosting setup, SSL certificate, and business emails. There are zero hidden costs."
  },
  {
    id: "faq-delivery",
    question: "How long does it take to deliver the fully completed website?",
    answer: "Delivery depends on the package: Starter takes 3-5 days; Business takes 5-7 days; and Premium E-Shop takes 7-12 days. We pride ourselves on speed and quality, and we supply interactive staging links to view progress live."
  },
  {
    id: "faq-hosting",
    question: "What hosting do you provide, and is it free forever?",
    answer: "We provide high-speed cloud hosting (optimized for speedy load times, securing a near-perfect mobile PageSpeed score). Hosting and domain are 100% FREE for the first entire year. Renewal after year one starts at a very reasonable ₹1,499/year."
  },
  {
    id: "faq-maintenance",
    question: "What is included in the Website Maintenance?",
    answer: "Our ongoing maintenance covers monthly security logs, core software/plugin updates, automated database backups, SEO tuning updates, and dedicated priority support to make content or text changes anytime you need."
  },
  {
    id: "faq-support",
    question: "Do you offer post-launch technical support?",
    answer: "Yes, we provide 24/7 technical support. All our websites include a lifetime warranty against any backend bugs, broken links, or server crashes. If anything goes wrong, our dedicated team resolves it immediately."
  }
];
