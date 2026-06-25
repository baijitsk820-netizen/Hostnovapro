import { useState, useEffect, useRef } from "react";
import { Award, Users, HeartHandshake, ShieldCheck, HelpCircle, Trophy } from "lucide-react";
import { motion, useInView } from "motion/react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, isInView]);

  return (
    <span ref={elementRef} className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-coffee-primary dark:text-coffee-gold tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const perks = [
    {
      icon: Trophy,
      title: "World-Class Engineering",
      desc: "Our systems boast speed indexes sub 0.6 seconds, giving you a competitive edge in user retention and search engine rankings."
    },
    {
      icon: Users,
      title: "Bespoke Consulting",
      desc: "We work as your remote technical partner, helping you identify user friction points and implement optimal sales funnels."
    },
    {
      icon: HeartHandshake,
      title: "Zero Stress Process",
      desc: "From hosting setups and SSL locks to business emails and SEO mappings, we manage the entire tech stack from A to Z."
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 relative bg-[#FAF9F6] dark:bg-[#120C08]">
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 flex justify-between max-w-7xl mx-auto px-4 opacity-5 pointer-events-none">
        <div className="w-px h-full bg-coffee-primary" />
        <div className="w-px h-full bg-coffee-primary hidden md:block" />
        <div className="w-px h-full bg-coffee-primary" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Statistics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          
          {/* Stat 1 */}
          <div className="glass-effect rounded-3xl p-6 sm:p-8 border border-coffee-gold/15 text-center shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-coffee-primary dark:bg-coffee-gold" />
            <AnimatedCounter end={500} suffix="+" />
            <span className="text-xs sm:text-sm font-button font-bold text-coffee-mocha dark:text-coffee-bg/80 block mt-2 uppercase tracking-wider">
              Websites Delivered
            </span>
          </div>

          {/* Stat 2 */}
          <div className="glass-effect rounded-3xl p-6 sm:p-8 border border-coffee-gold/15 text-center shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-coffee-primary dark:bg-coffee-gold" />
            <AnimatedCounter end={98} suffix="%" />
            <span className="text-xs sm:text-sm font-button font-bold text-coffee-mocha dark:text-coffee-bg/80 block mt-2 uppercase tracking-wider">
              Client Satisfaction
            </span>
          </div>

          {/* Stat 3 */}
          <div className="glass-effect rounded-3xl p-6 sm:p-8 border border-coffee-gold/15 text-center shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-coffee-primary dark:bg-coffee-gold" />
            <span className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-coffee-primary dark:text-coffee-gold tracking-tight">
              24/7
            </span>
            <span className="text-xs sm:text-sm font-button font-bold text-coffee-mocha dark:text-coffee-bg/80 block mt-2 uppercase tracking-wider">
              Live Support
            </span>
          </div>

          {/* Stat 4 */}
          <div className="glass-effect rounded-3xl p-6 sm:p-8 border border-coffee-gold/15 text-center shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-coffee-primary dark:bg-coffee-gold" />
            <AnimatedCounter end={1000} suffix="+" />
            <span className="text-xs sm:text-sm font-button font-bold text-coffee-mocha dark:text-coffee-bg/80 block mt-2 uppercase tracking-wider">
              Happy Clients
            </span>
          </div>

        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <span className="px-3 py-1 bg-coffee-primary/10 dark:bg-coffee-gold/10 text-coffee-primary dark:text-coffee-gold text-xs font-mono font-bold uppercase tracking-widest rounded-full border border-coffee-gold/20 inline-block mb-3">
              ✦ TRUSTED GROWTH PARTNER ✦
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-coffee-text dark:text-coffee-bg tracking-tight leading-tight mb-4">
              Why Premier Indian Brands <span className="coffee-gradient-text">Choose HostNovaPro</span>
            </h2>
            <p className="text-sm sm:text-base text-coffee-mocha dark:text-coffee-bg/75 leading-relaxed font-sans mb-6">
              In modern commerce, your website is your digital business lobby. A slow-loading, poorly formatted template repels customers and drains marketing capital. We fuse flawless 3D design, rapid server code, and smart local search (SEO) strategies to guarantee your brand stands out in Jaipur, Bangalore, Mumbai, or Delhi.
            </p>
            <div className="p-4 bg-coffee-gold/10 rounded-2xl border border-coffee-gold/20">
              <span className="text-xs font-bold text-coffee-primary dark:text-coffee-gold block mb-1">🤝 Lifetime Bug-free Warranty:</span>
              <p className="text-xs text-coffee-mocha dark:text-[#F5F0EB]/80 leading-normal">
                If your website ever displays broken layout blocks, crashes, or encounters technical domain hiccups down the line, our rapid-response developer team repairs it absolutely free. No monthly subscription required.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div 
                  key={idx} 
                  className={`p-6 rounded-3xl glass-effect border border-coffee-gold/10 ${idx === 2 ? "sm:col-span-2" : ""}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-coffee-primary/10 dark:bg-coffee-gold/10 flex items-center justify-center text-coffee-primary dark:text-coffee-gold mb-4">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-coffee-text dark:text-[#F5F0EB] mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-coffee-mocha/90 dark:text-[#F5F0EB]/70 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </motion.div>
    </section>
  );
}
