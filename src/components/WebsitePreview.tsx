import { useState, useEffect } from "react";
import { WEBSITES_PREVIEW_DATA } from "../data";
import { Monitor, Tablet, Smartphone, ExternalLink, Shield, Globe, Star, ShoppingCart, Plus, CheckCircle2, Award, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WebsitePreviewProps {
  onViewConceptDetail?: (webId: string) => void;
}

export default function WebsitePreview({ onViewConceptDetail }: WebsitePreviewProps) {
  const [selectedWeb, setSelectedWeb] = useState("restaurant-preview");
  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  // Interactive mock States
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [calcInput, setCalcInput] = useState(15); // days of hosting / traffic multiplier
  const [bookedTable, setBookedTable] = useState(false);

  // Reset interactive mock states when switching websites
  useEffect(() => {
    setCartCount(0);
    setRsvpSuccess(false);
    setRsvpEmail("");
    setBookedTable(false);
  }, [selectedWeb]);

  const activeWebInfo = WEBSITES_PREVIEW_DATA.find(w => w.id === selectedWeb) || WEBSITES_PREVIEW_DATA[0];

  // Renders the live custom styled mockups inside the device frame
  const renderMockupContent = () => {
    switch (selectedWeb) {
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
            <div className="bg-gradient-to-r from-coffee-mocha/40 to-coffee-primary/40 p-3 rounded-lg text-center mb-3 border border-coffee-gold/10">
              <h4 className="font-display font-extrabold text-sm text-white mb-1">Artisan Coffee & Gourmet Dining</h4>
              <p className="text-[8px] opacity-80 max-w-xs mx-auto">Brewed at precision temperature. Cooked by master chefs.</p>
            </div>

            {/* Quick Menu Categories */}
            <div className="flex space-x-1.5 mb-3 overflow-x-auto pb-1">
              {["All", "Special Brews", "Delicacies", "Dessert"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-full shrink-0 text-[8px] ${
                    selectedCategory === cat ? "bg-coffee-gold text-coffee-dark font-bold" : "bg-white/5 text-[#F5F0EB]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {/* Item 1 */}
              {(selectedCategory === "All" || selectedCategory === "Special Brews") && (
                <div className="bg-white/5 border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="h-16 bg-[#1a130e] rounded-md flex items-center justify-center mb-1 text-base">☕</div>
                    <span className="font-bold block text-white">Golden Latte</span>
                    <span className="text-[7px] opacity-65 block">With 24K Gold flakes & local honey</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-coffee-gold font-bold">₹350</span>
                    <button onClick={() => setCartCount(c => c + 1)} className="bg-coffee-primary text-white p-1 rounded-md hover:bg-coffee-gold hover:text-coffee-dark transition-colors cursor-pointer">
                      + Add
                    </button>
                  </div>
                </div>
              )}
              {/* Item 2 */}
              {(selectedCategory === "All" || selectedCategory === "Special Brews") && (
                <div className="bg-white/5 border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="h-16 bg-[#1a130e] rounded-md flex items-center justify-center mb-1 text-base">❄️</div>
                    <span className="font-bold block text-white">Cold Infusion Nitro</span>
                    <span className="text-[7px] opacity-65 block">Steeped 24hrs in nitrogen tank</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-coffee-gold font-bold">₹280</span>
                    <button onClick={() => setCartCount(c => c + 1)} className="bg-coffee-primary text-white p-1 rounded-md hover:bg-coffee-gold hover:text-coffee-dark transition-colors cursor-pointer">
                      + Add
                    </button>
                  </div>
                </div>
              )}
              {/* Item 3 */}
              {(selectedCategory === "All" || selectedCategory === "Delicacies") && (
                <div className="bg-white/5 border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="h-16 bg-[#1a130e] rounded-md flex items-center justify-center mb-1 text-base">🍳</div>
                    <span className="font-bold block text-white">Classic Eggs Benedict</span>
                    <span className="text-[7px] opacity-65 block">Poached eggs on toasted brioche</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-coffee-gold font-bold">₹420</span>
                    <button onClick={() => setCartCount(c => c + 1)} className="bg-coffee-primary text-white p-1 rounded-md hover:bg-coffee-gold hover:text-coffee-dark transition-colors cursor-pointer">
                      + Add
                    </button>
                  </div>
                </div>
              )}
              {/* Item 4 */}
              {(selectedCategory === "All" || selectedCategory === "Dessert") && (
                <div className="bg-white/5 border border-white/5 p-2 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="h-16 bg-[#1a130e] rounded-md flex items-center justify-center mb-1 text-base">🍰</div>
                    <span className="font-bold block text-white">Mocha Tiramisu</span>
                    <span className="text-[7px] opacity-65 block">Layers of espresso & organic cocoa</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-coffee-gold font-bold">₹380</span>
                    <button onClick={() => setCartCount(c => c + 1)} className="bg-coffee-primary text-white p-1 rounded-md hover:bg-coffee-gold hover:text-coffee-dark transition-colors cursor-pointer">
                      + Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Table Reservation Area */}
            <div className="bg-coffee-primary/20 border border-coffee-gold/20 p-3 rounded-lg mb-2">
              <h5 className="font-bold text-coffee-gold mb-1">Instant Table Reservation</h5>
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
            <div className="flex items-center justify-between border-b border-coffee-mocha/10 pb-2 mb-3">
              <span className="font-display font-extrabold text-xs text-coffee-primary tracking-wider">MochaTrend Co.</span>
              <div className="relative cursor-pointer">
                <ShoppingCart className="w-4 h-4 text-coffee-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-coffee-gold text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>

            {/* Hero Offer */}
            <div className="bg-[#f0ece6] p-3 rounded-lg flex items-center justify-between mb-3 border border-coffee-primary/5">
              <div>
                <span className="bg-coffee-gold/20 text-coffee-primary font-bold text-[7px] px-1 py-0.2 rounded-full uppercase">Summer Drop</span>
                <h4 className="font-display font-bold text-xs text-coffee-primary mt-1">Premium Coffee Lifestyle</h4>
                <p className="text-[7px] text-coffee-mocha">Bespoke accessories & handcrafted single-origin beans.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#e3ded6] flex items-center justify-center text-lg shadow-inner">📦</div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-white border border-[#eae6df] p-2 rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-16 bg-[#faf9f6] rounded-md flex items-center justify-center text-xl mb-1">🏺</div>
                  <span className="font-bold text-coffee-text block">Handmade Clay Mug</span>
                  <span className="text-[7px] text-coffee-mocha block">Double fired terracotta body</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-coffee-primary">₹1,199</span>
                  <button onClick={() => setCartCount(c => c + 1)} className="bg-coffee-primary hover:bg-coffee-gold text-white p-1 rounded transition-all cursor-pointer">
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              <div className="bg-white border border-[#eae6df] p-2 rounded-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-16 bg-[#faf9f6] rounded-md flex items-center justify-center text-xl mb-1">🌾</div>
                  <span className="font-bold text-coffee-text block">Organic Peaberry Gold</span>
                  <span className="text-[7px] text-coffee-mocha block">Single-origin medium roast, 500g</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-coffee-primary">₹899</span>
                  <button onClick={() => setCartCount(c => c + 1)} className="bg-coffee-primary hover:bg-coffee-gold text-white p-1 rounded transition-all cursor-pointer">
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
          <div className="w-full h-full bg-[#F5F0EB] text-[#1A1A1A] p-4 flex flex-col justify-between overflow-y-auto font-sans text-[10px] leading-normal border-l-4 border-coffee-primary">
            {/* Minimal Side-like Header */}
            <div className="flex items-center justify-between border-b border-coffee-primary/10 pb-2 mb-4">
              <div>
                <span className="font-display font-bold text-xs tracking-wider block">Aura Spaces</span>
                <span className="text-[6.5px] font-mono uppercase tracking-widest text-coffee-mocha">Minimalist Architecture</span>
              </div>
              <div className="flex space-x-3 text-[7.5px] font-mono">
                <span className="underline cursor-pointer">Work</span>
                <span className="opacity-60 cursor-pointer">Studio</span>
                <span className="opacity-60 cursor-pointer">Contact</span>
              </div>
            </div>

            {/* Editorial introduction */}
            <div className="mb-4 max-w-sm">
              <h4 className="font-display font-bold text-sm tracking-tight text-coffee-primary mb-1.5 leading-tight">
                Crafting physical spaces of light, concrete, and silence.
              </h4>
              <p className="text-[7.5px] text-coffee-mocha leading-relaxed">
                Based in Bangalore, Aura Spaces designs high-end residential spaces, boutique coffee roasteries, and minimalist co-working lounges. Honoring raw materials.
              </p>
            </div>

            {/* Masonry-like projects preview */}
            <div className="grid grid-cols-12 gap-2 mb-4">
              <div className="col-span-8 bg-white border border-[#e5dfd8] p-2 rounded-lg">
                <div className="h-20 bg-gradient-to-tr from-[#dfd7ce] to-[#f5f0eb] rounded flex items-center justify-center text-lg mb-1">🏡</div>
                <span className="font-bold block text-coffee-primary">The Concrete Pavilion</span>
                <span className="text-[6.5px] text-coffee-mocha uppercase tracking-wider block">Completed: 2025 • Residential</span>
              </div>
              <div className="col-span-4 bg-white border border-[#e5dfd8] p-2 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="h-10 bg-[#e3ded6] rounded mb-1 flex items-center justify-center text-sm">🪟</div>
                  <span className="font-bold block text-[8px]">Glass Atrium</span>
                </div>
                <span className="text-[6px] text-coffee-mocha font-bold block">Pune</span>
              </div>
              <div className="col-span-4 bg-white border border-[#e5dfd8] p-2 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="h-10 bg-[#e3ded6] rounded mb-1 flex items-center justify-center text-sm">🪴</div>
                  <span className="font-bold block text-[8px]">Zen Yard</span>
                </div>
                <span className="text-[6px] text-coffee-mocha font-bold block">Chennai</span>
              </div>
              <div className="col-span-8 bg-white border border-[#e5dfd8] p-2 rounded-lg">
                <div className="h-20 bg-gradient-to-tr from-[#dfd7ce] to-[#f5f0eb] rounded flex items-center justify-center text-lg mb-1">☕</div>
                <span className="font-bold block text-coffee-primary">Mocha Velvet Roastery Shop</span>
                <span className="text-[6.5px] text-coffee-mocha uppercase tracking-wider block">Boutique Commercial • Mumbai</span>
              </div>
            </div>

            {/* Quote of philosophy */}
            <div className="border-t border-coffee-primary/10 pt-2 text-center text-[7px] italic text-coffee-mocha/80">
              &ldquo;Simplicity is the ultimate sophistication of modern spaces.&rdquo;
            </div>
          </div>
        );

      case "business-preview":
        return (
          <div className="w-full h-full bg-[#FAF9F6] text-[#212529] p-4 flex flex-col justify-between overflow-y-auto font-sans text-[10px] leading-normal">
            {/* Navbar */}
            <div className="flex items-center justify-between border-b border-[#e9ecef] pb-2 mb-3">
              <span className="font-display font-extrabold text-xs text-coffee-primary tracking-tight">Apex Ventures</span>
              <div className="flex items-center space-x-2 text-[7.5px] font-bold">
                <span className="text-[#6c757d]">Platform</span>
                <span className="text-[#6c757d]">Yields</span>
                <span className="bg-coffee-primary text-white px-2 py-0.5 rounded">Launch Live App</span>
              </div>
            </div>

            {/* Hero */}
            <div className="grid grid-cols-12 gap-3 mb-4 items-center">
              <div className="col-span-7">
                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[6.5px] rounded-full font-bold">● CLOUD VAULT LIVE</span>
                <h4 className="font-display font-extrabold text-sm text-[#212529] mt-1 leading-tight">Scale Your Business Capital With Precision</h4>
                <p className="text-[7.5px] text-[#6c757d] mt-1">Automatic liquidity distribution, analytics dashboards, and institutional custody.</p>
              </div>
              <div className="col-span-5 bg-[#120C08] p-2 rounded-lg text-[#FAF9F6]">
                <span className="text-[6px] opacity-60 uppercase block">Capital Managed</span>
                <span className="text-sm font-bold block text-coffee-gold">₹14.2 Cr+</span>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-coffee-gold h-full w-[84%]" />
                </div>
              </div>
            </div>

            {/* Interactive Calculator widget */}
            <div className="bg-white border border-[#dee2e6] rounded-lg p-3 shadow-sm mb-3">
              <div className="flex justify-between items-center mb-1">
                <h5 className="font-bold text-coffee-primary">Interactive Savings Forecast</h5>
                <span className="text-[7px] bg-coffee-gold/10 text-coffee-primary font-bold px-1 py-0.2 rounded">Annual Yield: 14%</span>
              </div>
              <p className="text-[6.5px] text-[#6c757d] mb-2">Adjust the slider to simulate capital placement over 1 to 30 Months.</p>
              
              <div className="space-y-1 mb-2">
                <div className="flex justify-between text-[7.5px] font-mono">
                  <span>Investment: {calcInput} Months</span>
                  <span className="font-bold text-emerald-600">Growth: ₹{(calcInput * 2400).toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={calcInput}
                  onChange={(e) => setCalcInput(parseInt(e.target.value))}
                  className="w-full accent-coffee-primary cursor-pointer"
                />
              </div>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#f8f9fa] p-1.5 rounded border border-[#e9ecef]">
                <span className="font-bold block text-xs">99.9%</span>
                <span className="text-[6.5px] text-[#6c757d] block">Uptime SLA</span>
              </div>
              <div className="bg-[#f8f9fa] p-1.5 rounded border border-[#e9ecef]">
                <span className="font-bold block text-xs">ISO</span>
                <span className="text-[6.5px] text-[#6c757d] block">Certified Security</span>
              </div>
              <div className="bg-[#f8f9fa] p-1.5 rounded border border-[#e9ecef]">
                <span className="font-bold block text-xs">Instant</span>
                <span className="text-[6.5px] text-[#6c757d] block">Payout Processing</span>
              </div>
            </div>
          </div>
        );

      case "landing-preview":
        return (
          <div className="w-full h-full bg-[#120C08] text-[#F5F0EB] p-4 flex flex-col justify-between overflow-y-auto font-sans text-[10px] leading-normal text-center">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
              <span className="font-display font-bold text-xs text-coffee-gold">Sip & Sync Cafe</span>
              <span className="px-1.5 py-0.2 bg-coffee-primary text-white rounded text-[7px]">Launch Invite</span>
            </div>

            {/* Main call to action */}
            <div className="my-auto py-2">
              <span className="px-2 py-0.5 bg-coffee-gold/20 text-coffee-gold text-[7px] font-mono rounded-full uppercase tracking-widest inline-block mb-2">
                ☕ CO-WORKING CAFE LAUNCH — BANGALORE
              </span>
              <h4 className="font-display font-extrabold text-base text-white tracking-tight mb-2 max-w-xs mx-auto leading-tight">
                Where High-Speed Fiber Meets Gourmet Single-Origin Espresso
              </h4>
              <p className="text-[8px] text-coffee-bg/80 max-w-sm mx-auto mb-4 leading-relaxed">
                We are opening Bangalore's finest workspace cafe. 1Gbps Wi-Fi, noise-insulated virtual call booths, and unlimited custom pour-overs. Join the premium preview list.
              </p>

              {/* Countdown timer simulation */}
              <div className="flex justify-center space-x-2.5 mb-5">
                <div className="bg-white/5 border border-white/10 px-2 py-1 rounded">
                  <span className="font-mono text-xs font-extrabold text-coffee-gold block">04</span>
                  <span className="text-[6px] opacity-70 block uppercase">Days</span>
                </div>
                <div className="bg-white/5 border border-white/10 px-2 py-1 rounded">
                  <span className="font-mono text-xs font-extrabold text-coffee-gold block">18</span>
                  <span className="text-[6px] opacity-70 block uppercase">Hours</span>
                </div>
                <div className="bg-white/5 border border-white/10 px-2 py-1 rounded">
                  <span className="font-mono text-xs font-extrabold text-coffee-gold block">42</span>
                  <span className="text-[6px] opacity-70 block uppercase">Mins</span>
                </div>
                <div className="bg-white/5 border border-white/10 px-2 py-1 rounded">
                  <span className="font-mono text-xs font-extrabold text-coffee-gold block">56</span>
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
                      className="bg-white/5 border border-white/10 rounded-l-md px-2 py-1.5 text-[8.5px] text-white w-2/3 outline-none focus:border-coffee-gold transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-coffee-gold text-coffee-dark font-bold rounded-r-md px-3 py-1.5 text-[8.5px] w-1/3 hover:bg-white transition-colors cursor-pointer"
                    >
                      Reserve Seat
                    </button>
                  </form>
                )}
                <span className="text-[6px] opacity-60 mt-1.5 block">🔒 100% Free. Only 150 total preview invites issued.</span>
              </div>
            </div>

            {/* Social proof bar */}
            <div className="flex items-center justify-center space-x-2 border-t border-white/5 pt-2 opacity-60 text-[6.5px]">
              <span>⭐ Rated 4.9/5 stars by Bangalore Techies</span>
              <span>•</span>
              <span>📍 Indiranagar Double Road</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSelectConcept = (webId: string) => {
    setSelectedWeb(webId);
    const element = document.getElementById("staging-playground");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="portfolio" className="py-24 relative bg-[#0B0806] text-[#F5F0EB] border-y border-coffee-gold/15 overflow-hidden">
      {/* Background decorations for a deep luxury ambiance */}
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(227,168,87,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(227,168,87,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-coffee-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-coffee-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-coffee-primary/15 border border-coffee-gold/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-coffee-gold animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-coffee-gold">
              DESIGN PREVIEW MODEL WORKCASE
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4"
          >
            Crafted <span className="coffee-gradient-text">Brand Concepts</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-coffee-bg/70 leading-relaxed font-sans"
          >
            A curated portfolio of ultra-premium café, lifestyle, and design-forward templates. 
            Click any concept model card to load its active interactive code within our live sandbox below.
          </motion.p>
        </div>

        {/* 1. Luxe Case Studies Grid (NoirPixel Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-28">
          {WEBSITES_PREVIEW_DATA.map((web, idx) => {
            const isActive = selectedWeb === web.id;
            return (
              <motion.div
                key={web.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                {/* Visual Mockup Card Block */}
                <div 
                  onClick={() => handleSelectConcept(web.id)}
                  className={`relative aspect-[16/10] w-full rounded-2xl bg-[#140E0B] border transition-all duration-500 overflow-hidden group cursor-pointer flex flex-col justify-between ${
                    isActive 
                      ? "border-coffee-gold shadow-[0_0_40px_rgba(227,168,87,0.22)] scale-[1.01]" 
                      : "border-white/10 hover:border-coffee-gold/50 hover:shadow-[0_0_30px_rgba(227,168,87,0.12)]"
                  }`}
                >
                  {/* Glowing halo backdrop on hovered/active */}
                  <div className={`absolute inset-0 bg-radial-gradient from-coffee-gold/10 to-transparent pointer-events-none transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  }`} />

                  {/* Dark Moody Image Background */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={web.imageUrl} 
                      alt={web.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-[0.3] group-hover:scale-105 transition-transform duration-[1500ms] ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0806] via-[#0C0806]/40 to-transparent" />
                  </div>

                  {/* Top Header Row of the Mockup */}
                  <div className="relative z-10 p-5 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center space-x-1.5">
                      <Sparkles className="w-3 h-3 text-coffee-gold animate-spin" style={{ animationDuration: '8s' }} />
                      <span className="text-[9px] font-mono uppercase tracking-widest text-coffee-gold font-bold">
                        ✦ WEBSITE CONCEPT
                      </span>
                    </div>

                    {/* Miniature nav simulation */}
                    <div className="hidden sm:flex items-center space-x-3 text-[8px] font-mono tracking-wider text-white/50">
                      {web.mockNav?.slice(0, 3).map((item) => (
                        <span key={item} className="hover:text-coffee-gold transition-colors">{item}</span>
                      ))}
                    </div>

                    <span className="text-[8px] font-mono bg-coffee-gold/10 text-coffee-gold border border-coffee-gold/20 px-2 py-0.5 rounded-full">
                      {web.mockAction}
                    </span>
                  </div>

                  {/* HUGE TYPOGRAPHY BRAND OVERLAY */}
                  <div className="relative z-10 px-6 flex flex-col items-center justify-center text-center flex-grow py-4">
                    <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-widest uppercase text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-none select-none transition-transform duration-500 group-hover:scale-95">
                      {web.mockTitle}
                    </h3>
                  </div>

                  {/* Bottom details inside Image block */}
                  <div className="relative z-10 p-5 flex items-end justify-between border-t border-white/5 bg-gradient-to-t from-[#0F0A08] to-transparent">
                    {/* Features in horizontal list */}
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {web.mockFeatures?.slice(0, 3).map((feat, fIdx) => (
                        <span 
                          key={fIdx} 
                          className="text-[7.5px] font-mono tracking-wide px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Color Dots Palette - Signature detail from mockup! */}
                    <div className="flex items-center space-x-1">
                      {web.colors?.map((col, cIdx) => (
                        <span 
                          key={cIdx} 
                          className="w-3 h-3 rounded-full border border-white/20 shadow-md transform transition-transform group-hover:scale-110" 
                          style={{ backgroundColor: col, transitionDelay: `${cIdx * 50}ms` }}
                          title={col}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub-Card Metadata Area */}
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold tracking-widest text-coffee-gold">
                        {web.num}
                      </span>
                      <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono">
                        ──── {web.conceptSub}
                      </span>
                    </div>
                    <h4 className="text-lg font-display font-bold text-[#F5F0EB]">
                      {web.title}
                    </h4>
                    <p className="text-xs text-coffee-bg/60 max-w-md font-sans">
                      {web.description}
                    </p>
                  </div>

                  {/* View Concept Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onViewConceptDetail) {
                        onViewConceptDetail(web.id);
                      } else {
                        handleSelectConcept(web.id);
                      }
                    }}
                    className="px-5 py-2.5 rounded-full text-[10px] font-button font-bold border border-coffee-gold/30 text-white hover:bg-coffee-gold hover:text-coffee-dark hover:border-coffee-gold transition-all duration-300 flex items-center space-x-1.5 shrink-0 self-start sm:self-center cursor-pointer shadow-sm hover:shadow-coffee-gold/20 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>VIEW CONCEPT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Divider / Anchor point for interactive device frame */}
        <div id="staging-playground" className="scroll-mt-28 border-t border-white/10 pt-20 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-coffee-gold uppercase tracking-widest block mb-1">
                ✦ LIVE CODESMITHING SANDBOX
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
                Interactive Staging Frame: <span className="coffee-gradient-text">{activeWebInfo.title}</span>
              </h3>
            </div>

            {/* Select Device Header Switcher */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1.5">
              <button
                onClick={() => setSelectedDevice("desktop")}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-button font-bold transition-all cursor-pointer ${
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
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-button font-bold transition-all cursor-pointer ${
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
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-button font-bold transition-all cursor-pointer ${
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
        </div>

        {/* Bento Grid Layout for Device Switcher & Mockup Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column with 3 Distinct Stacked Bento Boxes */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            
            {/* Bento Box 1: Core Details */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-coffee-gold font-bold block mb-1">
                  ✦ {activeWebInfo.category}
                </span>
                <h4 className="text-xl font-display font-bold text-white mb-2">
                  {activeWebInfo.title}
                </h4>
                <p className="text-xs text-white/60 leading-relaxed mb-4">
                  {activeWebInfo.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {activeWebInfo.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono px-2.5 py-0.5 bg-white/5 text-coffee-gold border border-white/5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features Checklist */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <span className="text-xs font-button font-bold text-white block">Key Coded Features:</span>
                {activeWebInfo.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-coffee-gold shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bento Box 2: Interactive Playground Guide */}
            <div className="bg-coffee-gold/5 backdrop-blur-md rounded-2xl p-5 border border-coffee-gold/20 shadow-sm">
              <span className="text-xs font-bold text-coffee-gold block mb-1.5 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coffee-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-coffee-gold"></span>
                </span>
                Interactive Sandbox Controls
              </span>
              <p className="text-xs text-white/60 leading-relaxed">
                Click inside the simulated frame on the right! Try booking table slots, selecting custom menus, checking items, or filling fields to watch full state workflows update in real-time.
              </p>
            </div>

            {/* Bento Box 3: Custom Domain & Build Call-to-Action */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 shadow-lg flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">STAGING URL DNS</span>
                <span className="text-xs font-mono font-bold text-coffee-gold flex items-center truncate mt-0.5">
                  <Globe className="w-3.5 h-3.5 mr-1 text-coffee-gold shrink-0" />
                  {activeWebInfo.liveUrlText}
                </span>
              </div>
              <a
                href="#contact"
                className="bg-coffee-gold text-coffee-dark hover:bg-white text-xs font-button font-bold px-4 py-3 rounded-xl transition-all flex items-center space-x-1.5 shrink-0 shadow-md active:scale-95 cursor-pointer"
              >
                <span>Build Website</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bento Box 4: Interactive Viewport frame (Left 8 cols) */}
          <div className="lg:col-span-8 bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-xl">
            
            {/* Device Mockups outer canvas wrapper */}
            <div className="w-full min-h-[460px] flex items-center justify-center p-4 bg-radial from-coffee-gold/5 via-transparent to-transparent relative z-10">
              
              {/* Desktop MacBook style */}
              {selectedDevice === "desktop" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-xl flex flex-col items-center"
                >
                  {/* Laptop Screen Body */}
                  <div className="w-full h-[320px] bg-coffee-dark rounded-t-2xl p-3 shadow-2xl relative border-4 border-coffee-mocha/40 flex flex-col">
                    {/* Camera notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-coffee-dark rounded-b-md z-20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                      <div className="w-1 h-1 rounded-full bg-blue-600" />
                    </div>

                    {/* Inside Mock Web Container */}
                    <div className="w-full h-full rounded-md overflow-hidden bg-white shadow-inner relative">
                      {renderMockupContent()}
                    </div>
                  </div>

                  {/* Laptop Keyboard base */}
                  <div className="w-[108%] h-3 bg-gradient-to-r from-[#8b5e3c] via-[#c19a6b] to-[#8b5e3c] rounded-b-xl shadow-lg relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#2a1e17] rounded-b-sm" />
                  </div>
                </motion.div>
              )}

              {/* Tablet iPad style */}
              {selectedDevice === "tablet" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-[340px] h-[450px] bg-coffee-dark rounded-[24px] p-4 shadow-2xl relative border-4 border-coffee-mocha/40 flex flex-col"
                >
                  {/* Power button / bezel camera */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/60 mt-1 z-20" />
                  
                  {/* Inside Mock Web Container */}
                  <div className="w-full h-full rounded-lg overflow-hidden bg-white shadow-inner relative">
                    {renderMockupContent()}
                  </div>
                </motion.div>
              )}

              {/* Mobile iPhone style */}
              {selectedDevice === "mobile" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-[240px] h-[460px] bg-[#1a130e] rounded-[36px] p-2.5 shadow-2xl relative border-[5px] border-coffee-gold/40 flex flex-col"
                >
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#120c08] rounded-full z-20 flex items-center justify-between px-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600/50" />
                    <div className="w-2.5 h-1 bg-emerald-500/25 rounded-full" />
                  </div>

                  {/* Inside Mock Web Container */}
                  <div className="w-full h-full rounded-[28px] overflow-hidden bg-white shadow-inner relative">
                    {renderMockupContent()}
                  </div>
                </motion.div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
