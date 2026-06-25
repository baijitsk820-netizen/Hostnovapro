import { useState, useEffect } from "react";
import { WebsitePreview } from "../types";
import { 
  X, Monitor, Tablet, Smartphone, Globe, ExternalLink, 
  CheckCircle2, ArrowLeft, Cpu, Star, Shield, ShoppingCart, 
  Plus, Sparkles, Award, Compass, Zap, Check 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectDetailViewProps {
  project: WebsitePreview;
  onClose: () => void;
  onBuildRequested: () => void;
  key?: string;
}

export default function ProjectDetailView({ project, onClose, onBuildRequested }: ProjectDetailViewProps) {
  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  // Interactive mock states
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [calcInput, setCalcInput] = useState(15);
  const [bookedTable, setBookedTable] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project.id]);

  // Reset interactive mock states when switching websites
  useEffect(() => {
    setCartCount(0);
    setRsvpSuccess(false);
    setRsvpEmail("");
    setBookedTable(false);
  }, [project.id]);

  // Dimensions of viewport frames
  const getDeviceDimensions = () => {
    switch (selectedDevice) {
      case "mobile":
        return "w-[280px] h-[480px] border-[12px] border-[#1f1610] rounded-[36px] shadow-[0_25px_60px_rgba(0,0,0,0.8)]";
      case "tablet":
        return "w-[560px] h-[390px] border-[16px] border-[#1f1610] rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.8)]";
      case "desktop":
      default:
        return "w-full max-w-[760px] h-[440px] border-[10px] border-[#1f1610] rounded-[16px] shadow-[0_25px_60px_rgba(0,0,0,0.8)]";
    }
  };

  // Render simulated client interactive websites natively inside the iframe-like frame
  const renderMockupContent = () => {
    switch (project.id) {
      case "restaurant-preview":
        return (
          <div className="w-full h-full bg-[#120C08] text-[#F5F0EB] p-4 flex flex-col justify-between overflow-y-auto font-sans text-[10px] leading-normal selection:bg-coffee-gold/30">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <span className="font-display font-bold text-xs text-coffee-gold tracking-tight">The Roastery Hub</span>
              <div className="flex items-center space-x-2">
                <span className="text-[8px] opacity-70">Menu</span>
                <span className="text-[8px] opacity-70">Book</span>
                <span className="bg-coffee-gold text-coffee-dark px-1.5 py-0.5 rounded-full font-bold">Menu ⭐</span>
              </div>
            </div>

            {/* Hero banner */}
            <div className="bg-gradient-to-r from-coffee-mocha/40 to-[#4A2E1B]/40 p-3 rounded-lg text-center mb-3 border border-coffee-gold/10">
              <h4 className="font-display font-extrabold text-sm text-white mb-1">Artisan Coffee & Gourmet Dining</h4>
              <p className="text-[8px] opacity-80 max-w-xs mx-auto">Brewed at precision temperature. Cooked by master chefs.</p>
            </div>

            {/* Quick Menu Categories */}
            <div className="flex space-x-1.5 mb-3 overflow-x-auto pb-1">
              {["All", "Special Brews", "Delicacies", "Dessert"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-full shrink-0 text-[8px] transition-all cursor-pointer ${
                    selectedCategory === cat ? "bg-coffee-gold text-coffee-dark font-bold" : "bg-white/5 text-[#F5F0EB]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {(selectedCategory === "All" || selectedCategory === "Special Brews") && (
                <div className="bg-white/5 border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="h-16 bg-[#1a130e] rounded-md flex items-center justify-center mb-1 text-base">☕</div>
                    <span className="font-bold block text-white">Golden Latte</span>
                    <span className="text-[7px] opacity-65 block">With 24K Gold flakes & local honey</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-coffee-gold font-bold">₹350</span>
                    <button onClick={() => setCartCount(c => c + 1)} className="bg-coffee-gold text-coffee-dark px-2 py-0.5 rounded-md hover:bg-white transition-colors cursor-pointer text-[8px] font-bold">
                      + Add
                    </button>
                  </div>
                </div>
              )}
              {(selectedCategory === "All" || selectedCategory === "Special Brews") && (
                <div className="bg-white/5 border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="h-16 bg-[#1a130e] rounded-md flex items-center justify-center mb-1 text-base">❄️</div>
                    <span className="font-bold block text-white">Cold Infusion Nitro</span>
                    <span className="text-[7px] opacity-65 block">Steeped 24hrs in nitrogen tank</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-coffee-gold font-bold">₹280</span>
                    <button onClick={() => setCartCount(c => c + 1)} className="bg-coffee-gold text-coffee-dark px-2 py-0.5 rounded-md hover:bg-white transition-colors cursor-pointer text-[8px] font-bold">
                      + Add
                    </button>
                  </div>
                </div>
              )}
              {(selectedCategory === "All" || selectedCategory === "Delicacies") && (
                <div className="bg-white/5 border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="h-16 bg-[#1a130e] rounded-md flex items-center justify-center mb-1 text-base">🍳</div>
                    <span className="font-bold block text-white">Classic Eggs Benedict</span>
                    <span className="text-[7px] opacity-65 block">Poached eggs on toasted brioche</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-coffee-gold font-bold">₹420</span>
                    <button onClick={() => setCartCount(c => c + 1)} className="bg-coffee-gold text-coffee-dark px-2 py-0.5 rounded-md hover:bg-white transition-colors cursor-pointer text-[8px] font-bold">
                      + Add
                    </button>
                  </div>
                </div>
              )}
              {(selectedCategory === "All" || selectedCategory === "Dessert") && (
                <div className="bg-white/5 border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="h-16 bg-[#1a130e] rounded-md flex items-center justify-center mb-1 text-base">🍰</div>
                    <span className="font-bold block text-white">Mocha Tiramisu</span>
                    <span className="text-[7px] opacity-65 block">Layers of espresso & organic cocoa</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-coffee-gold font-bold">₹380</span>
                    <button onClick={() => setCartCount(c => c + 1)} className="bg-coffee-gold text-coffee-dark px-2 py-0.5 rounded-md hover:bg-white transition-colors cursor-pointer text-[8px] font-bold">
                      + Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Table Reservation Area */}
            <div className="bg-[#4A2E1B]/20 border border-coffee-gold/20 p-3 rounded-lg mb-2">
              <h5 className="font-bold text-coffee-gold mb-1 text-xs">Instant Table Reservation</h5>
              <p className="text-[7px] opacity-80 mb-2">Reserve your dining slot inside 30 seconds.</p>
              {bookedTable ? (
                <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded text-center font-bold text-[8px] flex items-center justify-center space-x-1 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Table Booked for Today, 7:00 PM!</span>
                </div>
              ) : (
                <div className="flex gap-1">
                  <input type="text" placeholder="Your Name" readOnly value="Priya" className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[8px] text-white w-1/2 outline-none" />
                  <button onClick={() => setBookedTable(true)} className="bg-coffee-gold text-coffee-dark font-bold rounded px-2.5 py-0.5 text-[8px] w-1/2 cursor-pointer hover:bg-white transition-colors">
                    Book Table
                  </button>
                </div>
              )}
            </div>

            {/* Footer banner */}
            <div className="flex items-center justify-between text-[7px] border-t border-white/5 pt-2 opacity-60">
              <span>📍 MG Road, Bangalore</span>
              <span>📞 +91 80 499 9000</span>
            </div>
          </div>
        );

      case "ecommerce-preview":
        return (
          <div className="w-full h-full bg-[#fcfbf9] text-[#1a1a1a] p-4 flex flex-col justify-between overflow-y-auto font-sans text-[10px] leading-normal">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2C1E14]/10 pb-2 mb-3">
              <span className="font-display font-extrabold text-xs text-[#2C1E14] tracking-wider">MochaTrend Co.</span>
              <div className="relative cursor-pointer">
                <ShoppingCart className="w-4 h-4 text-[#2C1E14]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>

            {/* Hero Offer */}
            <div className="bg-[#f0ece6] p-3 rounded-lg flex items-center justify-between mb-3 border border-[#2C1E14]/5">
              <div>
                <span className="bg-[#D4AF37]/20 text-[#2C1E14] font-bold text-[7px] px-1 py-0.2 rounded-full uppercase">Summer Drop</span>
                <h4 className="font-display font-bold text-xs text-[#2C1E14] mt-1">Premium Coffee Lifestyle</h4>
                <p className="text-[7px] text-[#2C1E14]/70">Bespoke accessories & handcrafted single-origin beans.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#e3ded6] flex items-center justify-center text-lg shadow-inner">📦</div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-white border border-[#eae6df] p-2 rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-16 bg-[#faf9f6] rounded-md flex items-center justify-center text-xl mb-1">🏺</div>
                  <span className="font-bold text-[#1a1a1a] block">Handmade Clay Mug</span>
                  <span className="text-[7px] text-[#2C1E14]/70 block font-light">Double fired terracotta body</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-[#2C1E14]">₹1,199</span>
                  <button onClick={() => setCartCount(c => c + 1)} className="bg-[#2C1E14] hover:bg-[#D4AF37] text-white p-1 rounded transition-all cursor-pointer">
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#eae6df] p-2 rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-16 bg-[#faf9f6] rounded-md flex items-center justify-center text-xl mb-1">🌾</div>
                  <span className="font-bold text-[#1a1a1a] block">Organic Peaberry Gold</span>
                  <span className="text-[7px] text-[#2C1E14]/70 block font-light">Single-origin medium roast, 500g</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-[#2C1E14]">₹899</span>
                  <button onClick={() => setCartCount(c => c + 1)} className="bg-[#2C1E14] hover:bg-[#D4AF37] text-white p-1 rounded transition-all cursor-pointer">
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick checkout trust badge */}
            <div className="bg-emerald-500/5 border border-emerald-500/10 p-2 rounded-md flex items-center space-x-1.5 mb-2 text-[7px] text-emerald-800">
              <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Safe Checkout via Razorpay. Free delivery on orders above ₹1,500.</span>
            </div>
          </div>
        );

      case "portfolio-preview":
        return (
          <div className="w-full h-full bg-[#FAF9F6] text-[#1A1A1A] p-4 flex flex-col justify-between overflow-y-auto font-sans text-[10px] leading-normal border-l-4 border-[#8B5A2B]">
            {/* Minimal Side-like Header */}
            <div className="flex items-center justify-between border-b border-[#8B5A2B]/10 pb-2 mb-4">
              <div>
                <span className="font-display font-bold text-xs tracking-wider block">Golden Crust</span>
                <span className="text-[6.5px] font-mono uppercase tracking-widest text-[#8B5A2B]">Artisan Patisserie</span>
              </div>
              <div className="flex space-x-3 text-[7.5px] font-mono">
                <span className="underline cursor-pointer">Our Story</span>
                <span className="opacity-60 cursor-pointer">Menu</span>
                <span className="opacity-60 cursor-pointer">Daily Bake</span>
              </div>
            </div>

            {/* Editorial introduction */}
            <div className="mb-4 max-w-sm">
              <h4 className="font-display font-bold text-sm tracking-tight text-[#8B5A2B] mb-1.5 leading-tight">
                Authentic, slowly leavened sourdough bread and luxury butter pastries.
              </h4>
              <p className="text-[7.5px] text-[#8B5A2B]/80 leading-relaxed">
                Golden Crust brings raw, organic, wheat sourdoughs and modern European confectionery back to basics in Jaipur. Baked daily in hearth ovens.
              </p>
            </div>

            {/* Masonry-like projects preview */}
            <div className="grid grid-cols-12 gap-2 mb-4">
              <div className="col-span-8 bg-white border border-[#e5dfd8] p-2 rounded-lg">
                <div className="h-20 bg-gradient-to-tr from-[#dfd7ce] to-[#FAF9F6] rounded flex items-center justify-center text-lg mb-1">🍞</div>
                <span className="font-bold block text-[#8B5A2B]">Signature French Country Sourdough</span>
                <span className="text-[6.5px] text-gray-500 uppercase tracking-wider block">Naturally Fermented 36 Hours • ₹250</span>
              </div>
              <div className="col-span-4 bg-white border border-[#e5dfd8] p-2 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="h-10 bg-[#e3ded6] rounded mb-1 flex items-center justify-center text-sm">🥐</div>
                  <span className="font-bold block text-[8px]">Double Butter</span>
                </div>
                <span className="text-[6px] text-gray-500 font-bold block">₹140</span>
              </div>
              <div className="col-span-4 bg-white border border-[#e5dfd8] p-2 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="h-10 bg-[#e3ded6] rounded mb-1 flex items-center justify-center text-sm">🥧</div>
                  <span className="font-bold block text-[8px]">Heritage Apple Pie</span>
                </div>
                <span className="text-[6px] text-gray-500 font-bold block">₹320</span>
              </div>
              <div className="col-span-8 bg-white border border-[#e5dfd8] p-2 rounded-lg">
                <div className="h-20 bg-gradient-to-tr from-[#dfd7ce] to-[#FAF9F6] rounded flex items-center justify-center text-lg mb-1">🍮</div>
                <span className="font-bold block text-[#8B5A2B]">Daily Fresh Butter Croissant Tray</span>
                <span className="text-[6.5px] text-gray-500 uppercase tracking-wider block">Laminated pastry • Out of oven at 8:00 AM</span>
              </div>
            </div>

            {/* Quote of philosophy */}
            <div className="border-t border-[#8B5A2B]/10 pt-2 text-center text-[7px] italic text-[#8B5A2B]/80">
              &ldquo;Only pure water, organic stone-ground grain, and sea salt.&rdquo;
            </div>
          </div>
        );

      case "business-preview":
        return (
          <div className="w-full h-full bg-white text-[#111111] p-4 flex flex-col justify-between overflow-y-auto font-sans text-[10px] leading-normal border-t-4 border-red-600">
            {/* Navbar */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
              <span className="font-display font-extrabold text-xs text-red-600 tracking-tight">Hot Chick Diner</span>
              <div className="flex items-center space-x-2 text-[7.5px] font-bold">
                <span className="text-gray-500">Menu</span>
                <span className="text-gray-500">Franchise</span>
                <span className="bg-red-600 text-white px-2 py-0.5 rounded cursor-pointer hover:bg-black transition-colors">Order Online</span>
              </div>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-12 gap-3 mb-4 items-center">
              <div className="col-span-7">
                <span className="px-1.5 py-0.2 bg-red-100 text-red-700 text-[6.5px] rounded-full font-extrabold">🌶️ SPICY LEVEL EXTREME</span>
                <h4 className="font-display font-extrabold text-sm text-[#111111] mt-1 leading-tight">Nashville Style Hot Tenders</h4>
                <p className="text-[7.5px] text-gray-500 mt-1">Cayenne pepper glaze, house pickles, and Texas toast.</p>
              </div>
              <div className="col-span-5 bg-black p-2 rounded-lg text-white">
                <span className="text-[6px] opacity-60 uppercase block">Active Bookings Today</span>
                <span className="text-sm font-bold block text-red-500">42 Groups</span>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-red-600 h-full w-[92%]" />
                </div>
              </div>
            </div>

            {/* Interactive Calculator widget */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm mb-3">
              <div className="flex justify-between items-center mb-1">
                <h5 className="font-bold text-red-600">Simulate Spice Level Gauge</h5>
                <span className="text-[7px] bg-red-100 text-red-700 font-bold px-1 py-0.2 rounded">Heat Factor: {calcInput * 10} SHU</span>
              </div>
              <p className="text-[6.5px] text-gray-500 mb-2">Adjust the gauge to match your tolerance capacity.</p>
              
              <div className="space-y-1 mb-2">
                <div className="flex justify-between text-[7.5px] font-mono">
                  <span>Level: {calcInput} ({calcInput < 10 ? "Mild Spark" : calcInput < 20 ? "Inferno Flare" : "Nuclear Melt"})</span>
                  <span className="font-bold text-red-600">Hotness Multiplier: {calcInput}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={calcInput}
                  onChange={(e) => setCalcInput(parseInt(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                <span className="font-bold block text-xs">100%</span>
                <span className="text-[6.5px] text-gray-500 block">Organic Halal</span>
              </div>
              <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                <span className="font-bold block text-xs">₹0</span>
                <span className="text-[6.5px] text-gray-500 block">Free Delivery</span>
              </div>
              <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                <span className="font-bold block text-xs">Under 20m</span>
                <span className="text-[6.5px] text-gray-500 block">Express Delivery</span>
              </div>
            </div>
          </div>
        );

      case "landing-preview":
        return (
          <div className="w-full h-full bg-[#0F172A] text-white p-4 flex flex-col justify-between overflow-y-auto font-sans text-[10px] leading-normal text-center">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="font-display font-bold text-xs text-sky-400">Sip & Sync Club</span>
              <span className="px-1.5 py-0.2 bg-sky-600 text-white rounded text-[7px]">Launch Invite</span>
            </div>

            {/* Main call to action */}
            <div className="my-auto py-2">
              <span className="px-2 py-0.5 bg-sky-500/20 text-sky-400 text-[7px] font-mono rounded-full uppercase tracking-widest inline-block mb-2">
                ⚡ EXCLUSIVE WORKSPACE — BANGALORE
              </span>
              <h4 className="font-display font-extrabold text-base text-white tracking-tight mb-2 max-w-xs mx-auto leading-tight">
                Where High-Speed Fiber Meets Gourmet Single-Origin Espresso
              </h4>
              <p className="text-[8px] text-gray-400 max-w-sm mx-auto mb-4 leading-relaxed">
                We are opening Bangalore's finest workspace cafe. 1Gbps Wi-Fi, noise-insulated virtual call booths, and unlimited custom pour-overs. Join the premium preview list.
              </p>

              {/* Countdown timer simulation */}
              <div className="flex justify-center space-x-2.5 mb-5">
                <div className="bg-white/5 border border-white/10 px-2 py-1 rounded animate-pulse">
                  <span className="font-mono text-xs font-extrabold text-sky-400 block">04</span>
                  <span className="text-[6px] opacity-70 block uppercase">Days</span>
                </div>
                <div className="bg-white/5 border border-white/10 px-2 py-1 rounded">
                  <span className="font-mono text-xs font-extrabold text-sky-400 block">18</span>
                  <span className="text-[6px] opacity-70 block uppercase">Hours</span>
                </div>
                <div className="bg-white/5 border border-white/10 px-2 py-1 rounded">
                  <span className="font-mono text-xs font-extrabold text-sky-400 block">42</span>
                  <span className="text-[6px] opacity-70 block uppercase">Mins</span>
                </div>
                <div className="bg-white/5 border border-white/10 px-2 py-1 rounded">
                  <span className="font-mono text-xs font-extrabold text-sky-400 block">56</span>
                  <span className="text-[6px] opacity-70 block uppercase">Secs</span>
                </div>
              </div>

              {/* Lead registration form */}
              <div className="max-w-xs mx-auto">
                {rsvpSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 p-2.5 rounded-lg text-xs font-bold flex items-center justify-center space-x-1"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Seat Reserved! Free welcome coffee emailed.</span>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (rsvpEmail) setRsvpSuccess(true);
                    }}
                    className="flex"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter your work email"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-l-md px-2 py-1.5 text-[8.5px] text-white w-2/3 outline-none focus:border-sky-400 transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-sky-500 text-slate-900 font-bold rounded-r-md px-3 py-1.5 text-[8.5px] w-1/3 hover:bg-white transition-colors cursor-pointer"
                    >
                      Reserve Seat
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-[7px] border-t border-white/5 pt-2 opacity-40">
              <span>📍 Indiranagar, Bangalore</span>
              <span>⚡ Powered by HostNovaPro</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-[#0B0806] z-[100] overflow-y-auto text-[#F5F0EB] font-sans selection:bg-coffee-gold/20"
    >
      {/* Decorative premium background meshes */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(227,168,87,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(227,168,87,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-50" />
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-coffee-gold/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-coffee-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Header Navigation Rail */}
      <header className="sticky top-0 z-50 bg-[#0B0806]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-xs font-mono tracking-wider font-bold text-coffee-bg/70 hover:text-coffee-gold transition-colors duration-200 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO PORTFOLIO</span>
          </button>

          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-coffee-gold rounded-full animate-ping" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-coffee-gold font-bold">
              ACTIVE CASE: {project.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:text-coffee-gold hover:border-coffee-gold/40 transition-colors duration-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Main Page Content wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        
        {/* Case Header Details */}
        <div className="mb-12 sm:mb-20 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="text-sm font-mono font-bold tracking-widest text-coffee-gold">
                  CASE {project.num}
                </span>
                <span className="text-xs text-white/40 tracking-widest uppercase font-mono">
                  ──── {project.conceptSub}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-none text-white">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-coffee-bg/70 max-w-2xl font-sans font-light">
                {project.longDescription}
              </p>
            </div>

            {/* Direct Visit Live Demo Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 self-center sm:self-end">
              <a
                href={`https://${project.liveUrlText}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-coffee-gold hover:bg-white text-coffee-dark rounded-xl text-xs font-button font-bold flex items-center justify-center space-x-1.5 shadow-xl shadow-coffee-gold/10 hover:shadow-white/5 transition-all duration-300 active:scale-95 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Visit Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onBuildRequested}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/10 hover:border-coffee-gold/40 text-white rounded-xl text-xs font-button font-bold flex items-center justify-center space-x-1.5 transition-all duration-300 active:scale-95 hover:bg-white/10 cursor-pointer"
              >
                <span>Launch This Brand</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Splitted Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Details, Challenge, Solution, Tech Stack */}
          <div className="lg:col-span-5 space-y-10 sm:space-y-12">
            
            {/* Tech Stack Box */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-2.5 mb-4">
                <Cpu className="w-5 h-5 text-coffee-gold" />
                <h3 className="text-base font-display font-bold text-white tracking-tight">
                  Technologies Leveraged
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 rounded-lg bg-[#140E0B] border border-white/5 text-coffee-gold/90 text-xs font-mono font-medium flex items-center space-x-1.5 hover:border-coffee-gold/25 transition-colors"
                  >
                    <span className="w-1 h-1 bg-coffee-gold rounded-full" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Challenge Block */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono tracking-wider uppercase rounded-full">
                <span>✦ THE CRITICAL CHALLENGE</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white tracking-tight">
                Addressing The Industry Friction
              </h3>
              <p className="text-sm text-coffee-bg/70 leading-relaxed font-sans font-light">
                {project.challenge}
              </p>
            </div>

            {/* Solution Block */}
            <div className="space-y-4 border-t border-white/5 pt-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-wider uppercase rounded-full">
                <span>✦ OUR OPTIMIZED SOLUTION</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white tracking-tight">
                Architecting Frictionless Code
              </h3>
              <p className="text-sm text-coffee-bg/70 leading-relaxed font-sans font-light">
                {project.solution}
              </p>
            </div>

            {/* Case Stats Cards */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
              <div className="bg-[#140E0B] rounded-2xl p-5 border border-white/5">
                <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono block">Speed Index</span>
                <span className="text-3xl font-display font-black text-coffee-gold block mt-1">99 / 100</span>
                <span className="text-[9px] text-emerald-400 font-mono block mt-1">● Mobile Performance</span>
              </div>
              <div className="bg-[#140E0B] rounded-2xl p-5 border border-white/5">
                <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono block">Deployment</span>
                <span className="text-2xl font-display font-bold text-white block mt-1">Ready</span>
                <span className="text-[9px] text-coffee-bg/55 font-mono block mt-1.5">Vite CDN Node Edge</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Device Sandbox Frame */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">
              <div>
                <span className="text-[9px] font-mono text-coffee-gold uppercase tracking-widest block mb-0.5">
                  ✦ LIVE PREVIEW SANDBOX
                </span>
                <h4 className="text-sm font-display font-bold text-white">
                  Simulated Responsive Browser
                </h4>
              </div>

              {/* Device switcher buttons */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setSelectedDevice("desktop")}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-button font-bold transition-all cursor-pointer ${
                    selectedDevice === "desktop"
                      ? "bg-coffee-gold text-coffee-dark shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setSelectedDevice("tablet")}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-button font-bold transition-all cursor-pointer ${
                    selectedDevice === "tablet"
                      ? "bg-coffee-gold text-coffee-dark shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>
                <button
                  onClick={() => setSelectedDevice("mobile")}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-button font-bold transition-all cursor-pointer ${
                    selectedDevice === "mobile"
                      ? "bg-coffee-gold text-coffee-dark shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Sandbox viewport mock */}
            <div className="w-full bg-[#140E0B] border border-white/5 rounded-2xl min-h-[520px] p-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-coffee-gold/5 to-transparent pointer-events-none" />
              
              <div className={`${getDeviceDimensions()} transition-all duration-500 overflow-hidden bg-[#120C08] relative`}>
                
                {/* Simulated browser bar when on desktop */}
                {selectedDevice === "desktop" && (
                  <div className="bg-[#1c120c] px-4 py-2 border-b border-white/5 flex items-center justify-between text-white/30 text-[9px]">
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-red-500/60" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                      <span className="w-2 h-2 rounded-full bg-green-500/60" />
                    </div>
                    <div className="bg-black/30 text-white/50 px-3 py-0.5 rounded-md font-mono text-[8px] flex items-center space-x-1.5 max-w-[240px] truncate">
                      <Globe className="w-3 h-3 text-coffee-gold" />
                      <span>{project.liveUrlText}</span>
                    </div>
                    <div className="w-10" />
                  </div>
                )}

                {/* Simulated tablet bar */}
                {selectedDevice === "tablet" && (
                  <div className="bg-[#1c120c] py-1 border-b border-white/5 flex items-center justify-center">
                    <span className="w-8 h-1 bg-white/20 rounded-full" />
                  </div>
                )}

                {/* Mock Client UI */}
                <div className="w-full h-full relative">
                  {renderMockupContent()}
                </div>

                {/* Floating active cart count simulated indicator */}
                {cartCount > 0 && (
                  <div className="absolute bottom-4 right-4 bg-coffee-gold text-coffee-dark px-3 py-1.5 rounded-xl shadow-lg border border-white/10 flex items-center space-x-1.5 animate-pulse text-xs font-bold font-button">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Cart Count: {cartCount} Items</span>
                  </div>
                )}
              </div>

            </div>

            {/* Sandbox tips */}
            <div className="p-4 bg-coffee-gold/5 border border-coffee-gold/15 rounded-xl text-center">
              <p className="text-xs text-coffee-bg/80 leading-relaxed font-sans">
                💡 <span className="text-coffee-gold font-bold">Interactive Sandbox:</span> Click inputs, tabs, and checkboxes inside the preview screen to evaluate custom client interactions and reactive state triggers.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* Footer disclaimer */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 bg-[#080605] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-sm font-display font-bold text-white">
              HostNova<span className="text-coffee-gold">Pro</span> Premium Case Study
            </h4>
            <p className="text-[11px] text-white/40">
              © {new Date().getFullYear()} HostNovaPro Elite Digital. Dedicated conceptual blueprints registered.
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white/5 border border-white/10 text-white hover:text-coffee-gold rounded-lg text-xs font-mono tracking-wider font-bold transition-all cursor-pointer"
          >
            RETURN TO DIRECTORY
          </button>
        </div>
      </footer>

    </motion.div>
  );
}
