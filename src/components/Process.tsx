import { Coffee, Search, Palette, Code2, Rocket, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function Process() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Strategic Consultation",
      tagline: "Unearthing Brand Essence",
      desc: "We analyze your business operations, trace customer entry channels, and scope your target keywords. Together, we establish wireframe routes and specify structural goals before writing any code."
    },
    {
      num: "02",
      icon: Palette,
      title: "Luxury UI/UX Design",
      tagline: "Figma to High-Fidelity Masterpiece",
      desc: "Our design artisans craft custom visual layouts styled to reinforce trust. We select high-contrast colors, optimize font weights, and draft elegant micro-interactions tailored specifically to your target demographic."
    },
    {
      num: "03",
      icon: Code2,
      title: "Elite Web Development",
      tagline: "Robust React & Tailwind Coded Shell",
      desc: "We build your application natively using modern, clean code blocks. We integrate interactive 3D elements, configure CDN cache relays, and tune assets to secure lightning-quick speed indexes."
    },
    {
      num: "04",
      icon: Rocket,
      title: "Domain Setup & Launch",
      tagline: "SSL Encryption, SEO Index & Lift-off",
      desc: "We register your premium domain, configure SSL encryption protocols, hook up responsive business emails, index your maps on Google Search Console, and publish your new channel to the world."
    }
  ];

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-coffee-primary/5 dark:bg-[#120C08]/40 border-y border-coffee-gold/10">
      {/* Absolute decorative floating background bean */}
      <div className="absolute right-10 top-12 w-24 h-24 bg-coffee-gold/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="px-3 py-1 bg-coffee-primary/10 dark:bg-coffee-gold/10 text-coffee-primary dark:text-coffee-gold text-xs font-mono font-bold uppercase tracking-widest rounded-full border border-coffee-gold/20 inline-block mb-3">
            ✦ OUR PRODUCTION STAGE ✦
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-coffee-text dark:text-[#F5F0EB] tracking-tight mb-4">
            How We Brew Your <span className="coffee-gradient-text">Masterpiece</span>
          </h2>
          <p className="text-sm sm:text-base text-coffee-mocha dark:text-coffee-bg/75 leading-relaxed font-sans">
            Our 4-step development lifecycle balances strategic consulting, creative design typography, and flawless code deployment. We collaborate with you at every stage.
          </p>
        </div>

        {/* Timeline Path container */}
        <div className="relative">
          
          {/* Vertical path line on desktop, hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-coffee-primary/20 via-coffee-gold/40 to-coffee-mocha/20" />

          {/* Timeline Nodes Grid */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={step.num}
                  className={`flex flex-col lg:flex-row items-center justify-between ${isEven ? "" : "lg:flex-row-reverse"}`}
                >
                  {/* Left Side (Card content) */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full lg:w-[45%] glass-effect rounded-3xl p-8 border border-coffee-gold/10 shadow-md relative"
                  >
                    {/* Top corner luxury badge */}
                    <span className="absolute -top-4 right-6 bg-gradient-to-r from-coffee-primary to-coffee-gold text-white font-mono font-black text-sm px-4 py-1 rounded-full shadow-md">
                      STAGE {step.num}
                    </span>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-coffee-gold font-bold block mb-1">
                      {step.tagline}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-coffee-text dark:text-[#F5F0EB] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-coffee-mocha dark:text-coffee-bg/70 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </motion.div>

                  {/* Center Node Dot (on desktop) */}
                  <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-coffee-primary to-coffee-gold border-4 border-[#FAF9F6] dark:border-[#120C08] z-20 shadow-md transform hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Right Side (Empty spacing column to balance grid or secondary illustration placeholder) */}
                  <div className="hidden lg:block w-[45%]" />

                </div>
              );
            })}
          </div>

        </div>

      </motion.div>
    </section>
  );
}
