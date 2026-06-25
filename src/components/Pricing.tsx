import { useState } from "react";
import { PRICING_PLANS_DATA } from "../data";
import { Check, X, Shield, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface PricingProps {
  onSelectPlan: (planName: string, calculatedPrice: number) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  // Custom interactive add-ons state
  const [logoAddon, setLogoAddon] = useState(false);
  const [langAddon, setLangAddon] = useState(false);
  const [slaAddon, setSlaAddon] = useState(false);

  // Calculate prices based on add-ons
  const getCalculatedPrice = (basePrice: number) => {
    let total = basePrice;
    if (logoAddon) total += 1500;
    if (langAddon) total += 2500;
    if (slaAddon) total += 3999;
    return total;
  };

  return (
    <section id="pricing" className="py-24 relative bg-[#FAF9F6] dark:bg-[#120C08]">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-coffee-gold/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 bg-coffee-primary/10 dark:bg-coffee-gold/10 text-coffee-primary dark:text-coffee-gold text-xs font-mono font-bold uppercase tracking-widest rounded-full border border-coffee-gold/20 inline-block mb-3">
            ✦ TRANSPARENT PACKAGES ✦
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-coffee-text dark:text-[#F5F0EB] tracking-tight mb-4">
            Elite Digital Engineering <span className="coffee-gradient-text">Within Reach</span>
          </h2>
          <p className="text-sm sm:text-base text-coffee-mocha dark:text-coffee-bg/75 leading-relaxed font-sans">
            Choose a structured blueprint optimized for your operational scale. Zero hidden domain or hosting server commissions, 100% intellectual property ownership.
          </p>
        </div>

        {/* Custom Interactive Add-ons Selector */}
        <div className="max-w-xl mx-auto bg-white dark:bg-[#1a130e] border border-coffee-gold/15 p-5 sm:p-6 rounded-3xl shadow-sm mb-16 text-center">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-coffee-gold block mb-2">
            ✦ OPTIONAL CUSTOM ADD-ONS ✦
          </span>
          <p className="text-xs text-coffee-mocha dark:text-coffee-bg/70 mb-4">
            Add specialized layers to customize your package in real-time. Prices below update dynamically.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            
            {/* Addon 1 */}
            <label className={`flex items-center space-x-2 p-2.5 rounded-xl border text-left cursor-pointer transition-all w-full sm:w-auto text-xs ${
              logoAddon 
                ? "bg-coffee-primary/5 border-coffee-primary text-coffee-primary dark:border-coffee-gold dark:text-coffee-gold" 
                : "border-coffee-gold/10 dark:bg-black/10 text-coffee-text dark:text-coffee-bg/80"
            }`}>
              <input 
                type="checkbox" 
                checked={logoAddon} 
                onChange={(e) => setLogoAddon(e.target.checked)} 
                className="accent-coffee-primary shrink-0"
              />
              <div>
                <span className="font-bold block">Brand Logo Design</span>
                <span className="text-[10px] opacity-75">+ ₹1,500</span>
              </div>
            </label>

            {/* Addon 2 */}
            <label className={`flex items-center space-x-2 p-2.5 rounded-xl border text-left cursor-pointer transition-all w-full sm:w-auto text-xs ${
              langAddon 
                ? "bg-coffee-primary/5 border-coffee-primary text-coffee-primary dark:border-coffee-gold dark:text-coffee-gold" 
                : "border-coffee-gold/10 dark:bg-black/10 text-coffee-text dark:text-coffee-bg/80"
            }`}>
              <input 
                type="checkbox" 
                checked={langAddon} 
                onChange={(e) => setLangAddon(e.target.checked)} 
                className="accent-coffee-primary shrink-0"
              />
              <div>
                <span className="font-bold block">Multi-lingual support</span>
                <span className="text-[10px] opacity-75">+ ₹2,500</span>
              </div>
            </label>

            {/* Addon 3 */}
            <label className={`flex items-center space-x-2 p-2.5 rounded-xl border text-left cursor-pointer transition-all w-full sm:w-auto text-xs ${
              slaAddon 
                ? "bg-coffee-primary/5 border-coffee-primary text-coffee-primary dark:border-coffee-gold dark:text-coffee-gold" 
                : "border-coffee-gold/10 dark:bg-black/10 text-coffee-text dark:text-coffee-bg/80"
            }`}>
              <input 
                type="checkbox" 
                checked={slaAddon} 
                onChange={(e) => setSlaAddon(e.target.checked)} 
                className="accent-coffee-primary shrink-0"
              />
              <div>
                <span className="font-bold block">1-Yr Premium SLA</span>
                <span className="text-[10px] opacity-75">+ ₹3,999</span>
              </div>
            </label>

          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS_DATA.map((plan) => {
            const finalPrice = getCalculatedPrice(plan.priceNum);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5 }}
                className={`glass-effect rounded-3xl p-8 relative flex flex-col justify-between border transition-all ${
                  plan.popular
                    ? "border-coffee-primary dark:border-coffee-gold ring-2 ring-coffee-primary/20 dark:ring-coffee-gold/20 shadow-xl scale-100 lg:scale-[1.03] z-10"
                    : "border-coffee-gold/10 shadow-md"
                }`}
              >
                {/* Popular Ribbon */}
                {plan.popular && (
                  <div className="absolute top-5 right-5 bg-gradient-to-r from-coffee-primary to-coffee-gold text-white text-[10px] font-mono font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                    🔥 Most Popular
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest text-coffee-gold block mb-2">
                    {plan.name}
                  </span>
                  
                  {/* Price display with calculation */}
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl sm:text-4xl font-display font-black text-coffee-text dark:text-[#F5F0EB]">
                      ₹{finalPrice.toLocaleString("en-IN")}
                    </span>
                    {(logoAddon || langAddon || slaAddon) && (
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold ml-2">
                        (Updated with Add-ons)
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-coffee-mocha dark:text-coffee-bg/70 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <div className="flex items-center space-x-2 bg-coffee-primary/5 dark:bg-white/5 p-2.5 rounded-xl mb-6">
                    <AlertCircle className="w-4 h-4 text-coffee-gold shrink-0" />
                    <span className="text-xs font-button font-bold text-coffee-text/90 dark:text-coffee-bg/95">
                      {plan.deliveryTime}
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 border-t border-coffee-primary/10 dark:border-coffee-bg/10 pt-6 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs font-sans">
                        {feature.included ? (
                          <Check className="w-4.5 h-4.5 text-emerald-500 mr-2 shrink-0" />
                        ) : (
                          <X className="w-4.5 h-4.5 text-rose-500 mr-2 shrink-0 opacity-40" />
                        )}
                        <span className={feature.included ? "text-coffee-text/80 dark:text-[#F5F0EB]/85" : "text-coffee-mocha/40 dark:text-coffee-bg/30 line-through"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Package Action */}
                <button
                  onClick={() => onSelectPlan(plan.name, finalPrice)}
                  className={`w-full py-3.5 rounded-xl text-xs font-button font-bold tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95 ${
                    plan.popular
                      ? "bg-coffee-primary text-white hover:bg-coffee-mocha shadow-lg hover:shadow-coffee-primary/20 dark:bg-coffee-gold dark:text-coffee-dark dark:hover:bg-white"
                      : "bg-white dark:bg-white/5 border border-coffee-primary/25 dark:border-coffee-bg/25 text-coffee-primary dark:text-coffee-gold hover:bg-coffee-primary/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>Select {plan.name.split(" ")[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Secure Transaction badge */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-2.5 text-xs text-coffee-mocha dark:text-coffee-bg/60">
          <Shield className="w-4.5 h-4.5 text-coffee-gold" />
          <span>Complete client transparency: 50% upfront, 50% upon successful live deployment. SSL Secured billing.</span>
        </div>

      </motion.div>
    </section>
  );
}
