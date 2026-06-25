import { SERVICES_DATA } from "../data";
import { Monitor, ShoppingBag, Utensils, Cloud, TrendingUp, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const iconMap: { [key: string]: any } = {
  Monitor,
  ShoppingBag,
  Utensils,
  Cloud,
  TrendingUp,
  ShieldCheck,
};

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-coffee-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-coffee-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-3.5 py-1.5 bg-coffee-primary/10 dark:bg-coffee-gold/10 text-coffee-primary dark:text-coffee-gold text-xs font-mono font-bold uppercase tracking-widest rounded-full border border-coffee-gold/20 inline-block mb-4">
              ✦ CORE CAPABILITIES ✦
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-coffee-text dark:text-coffee-bg tracking-tight mb-4">
              Bespoke Solutions for <span className="coffee-gradient-text">Exceptional Results</span>
            </h2>
            <p className="text-base sm:text-lg text-coffee-mocha dark:text-coffee-bg/70 leading-relaxed font-sans">
              We reject cookie-cutter templates. Every system we launch is engineered from the ground up for elite performance, premium branding, and maximum transaction conversions.
            </p>
          </motion.div>
        </div>

        {/* Services Grid with Asymmetric Bento Spans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Monitor;
            
            // Asymmetric Bento col spans
            let colSpanClass = "lg:col-span-6";
            if (index === 0) colSpanClass = "lg:col-span-8";
            else if (index === 1) colSpanClass = "lg:col-span-4";
            else if (index === 2) colSpanClass = "lg:col-span-4";
            else if (index === 3) colSpanClass = "lg:col-span-8";
            else if (index === 4) colSpanClass = "lg:col-span-6";
            else if (index === 5) colSpanClass = "lg:col-span-6";

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`${colSpanClass} bg-white/40 dark:bg-[#2A1E17]/40 backdrop-blur-sm rounded-3xl p-8 relative overflow-hidden group shadow-md hover:shadow-xl hover:shadow-coffee-primary/10 border border-coffee-primary/10 dark:border-white/5 hover:border-coffee-gold transition-all duration-300 flex flex-col justify-between`}
              >
                {/* Upper glowing background shape */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-bl from-coffee-gold/15 to-transparent rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110 blur-xl" />

                <div>
                  {/* Floating 3D-styled Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-coffee-primary to-coffee-mocha dark:from-coffee-gold dark:to-coffee-mocha text-white flex items-center justify-center mb-6 shadow-md shadow-coffee-primary/20 group-hover:rotate-6 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-coffee-bg group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-display font-extrabold text-coffee-text dark:text-coffee-bg group-hover:text-coffee-gold transition-colors duration-200 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-coffee-mocha/90 dark:text-coffee-bg/70 leading-relaxed font-sans mb-6">
                    {service.description}
                  </p>

                  {/* Detailed Feature List inside card */}
                  <ul className="space-y-2.5 mb-8">
                    {service.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start text-xs font-sans text-coffee-text/80 dark:text-coffee-bg/80">
                        <CheckCircle className="w-4 h-4 text-coffee-gold mr-2 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-coffee-primary/10 dark:border-coffee-bg/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-coffee-primary dark:text-coffee-gold">
                    {service.priceText}
                  </span>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="flex items-center space-x-1 text-xs font-button font-bold text-coffee-primary dark:text-coffee-gold hover:text-coffee-mocha dark:hover:text-white transition-colors cursor-pointer group/btn"
                  >
                    <span>Instant Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
