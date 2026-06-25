import { useState } from "react";
import { FAQS_DATA } from "../data";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-pricing");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 relative bg-[#FAF9F6] dark:bg-[#120C08]">
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 bg-coffee-primary/10 dark:bg-coffee-gold/10 text-coffee-primary dark:text-coffee-gold text-xs font-mono font-bold uppercase tracking-widest rounded-full border border-coffee-gold/20 inline-block mb-3">
            ✦ COMMON QUESTIONS ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-coffee-text dark:text-[#F5F0EB] tracking-tight mb-4">
            Demystifying the <span className="coffee-gradient-text">Launch Process</span>
          </h2>
          <p className="text-sm sm:text-base text-coffee-mocha dark:text-coffee-bg/70 leading-relaxed">
            Get straightforward answers about our fee brackets, delivery SLAs, server transfers, and post-deployment maintenance plans. No technical jargon.
          </p>
        </div>

        {/* Accordion FAQ Grid */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div
                key={faq.id}
                className="glass-effect rounded-2xl border border-coffee-gold/10 overflow-hidden transition-all duration-200"
              >
                {/* Accordion Header trigger */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left text-coffee-text dark:text-[#F5F0EB] hover:bg-coffee-primary/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3.5 pr-4">
                    <HelpCircle className="w-5 h-5 text-coffee-gold shrink-0 mt-0.5" />
                    <span className="font-display font-bold text-sm sm:text-base leading-tight">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-coffee-mocha dark:text-coffee-gold transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`} />
                </button>

                {/* Accordion content height disclosure */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-coffee-mocha/90 dark:text-[#F5F0EB]/75 font-sans leading-relaxed border-t border-coffee-primary/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
}
