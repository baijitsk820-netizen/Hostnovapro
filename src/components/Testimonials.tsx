import { useState } from "react";
import { TESTIMONIALS_DATA } from "../data";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const activeTest = TESTIMONIALS_DATA[currentIdx];

  return (
    <section className="py-24 relative overflow-hidden bg-coffee-primary/5 dark:bg-[#120C08]/20 border-y border-coffee-gold/10">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-coffee-gold/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 bg-coffee-primary/10 dark:bg-coffee-gold/10 text-coffee-primary dark:text-coffee-gold text-xs font-mono font-bold uppercase tracking-widest rounded-full border border-coffee-gold/20 inline-block mb-3">
            ✦ TRUSTED VOICES ✦
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-coffee-text dark:text-[#F5F0EB] tracking-tight mb-4">
            Delighting Dynamic <span className="coffee-gradient-text">Indian Businesses</span>
          </h2>
          <p className="text-sm sm:text-base text-coffee-mocha dark:text-coffee-bg/70 leading-relaxed">
            See how HostNovaPro helps restaurant hubs, local boutiques, and startups scale their conversion metrics through elite custom code engineering.
          </p>
        </div>

        {/* Testimonial slider body */}
        <div className="relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTest.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="glass-effect rounded-3xl p-8 sm:p-12 border border-coffee-gold/15 shadow-xl relative"
            >
              {/* Huge stylized double quote behind */}
              <Quote className="absolute top-6 left-6 w-20 h-20 text-coffee-gold/10 pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                {/* Photo */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-coffee-gold/30 shadow-md">
                  <img
                    src={activeTest.avatarUrl}
                    alt={activeTest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4 text-center md:text-left flex-1">
                  
                  {/* Rating Stars */}
                  <div className="flex justify-center md:justify-start space-x-1">
                    {[...Array(activeTest.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-coffee-gold text-coffee-gold" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-base sm:text-lg text-coffee-text dark:text-[#F5F0EB]/90 leading-relaxed font-sans italic">
                    &ldquo;{activeTest.review}&rdquo;
                  </p>

                  {/* Client Metadata */}
                  <div>
                    <h4 className="font-display font-bold text-base text-coffee-primary dark:text-coffee-gold">
                      {activeTest.name}
                    </h4>
                    <span className="text-xs text-coffee-mocha/80 dark:text-coffee-bg/60 font-mono">
                      {activeTest.company}
                    </span>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left/Right controls */}
          <div className="flex justify-center md:justify-end items-center gap-3 mt-6">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-xl glass-effect border border-coffee-gold/15 flex items-center justify-center text-coffee-primary hover:bg-coffee-primary hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-1.5 mx-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIdx === idx ? "bg-coffee-primary dark:bg-coffee-gold w-6" : "bg-coffee-gold/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-xl glass-effect border border-coffee-gold/15 flex items-center justify-center text-coffee-primary hover:bg-coffee-primary hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
