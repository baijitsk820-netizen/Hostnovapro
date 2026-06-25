import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Send, Calendar, CheckCircle2, Phone, Sparkles, Clock, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

interface ContactFormProps {
  selectedPlanName?: string;
  selectedPlanPrice?: number;
}

export interface ContactFormRef {
  preFillForm: (planName: string, price: number) => void;
}

export const ContactForm = forwardRef<ContactFormRef, ContactFormProps>(({ selectedPlanName = "", selectedPlanPrice }, ref) => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    websiteType: "Business Website",
    budget: "₹5,000 - ₹10,000",
    projectDetails: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  
  // Schedule state
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedTime, setSelectedTime] = useState("11:00 AM IST");
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  // Expose pre-fill method to parents
  useImperativeHandle(ref, () => ({
    preFillForm(planName: string, price: number) {
      setFormData(prev => ({
        ...prev,
        websiteType: planName.includes("Starter") 
          ? "Single-Page Launch Landing Page" 
          : planName.includes("Business") 
            ? "Business Website" 
            : "Ecommerce Store",
        budget: price <= 5000 
          ? "₹4,999 (Starter)" 
          : price <= 10000 
            ? "₹9,999 (Business)" 
            : "₹19,999+ (Premium)",
        projectDetails: `Hi HostNovaPro, I am interested in building a website with the ${planName} (Estimated ₹${price.toLocaleString("en-IN")}). Please contact me regarding requirements!`,
      }));
    }
  }));

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Enter a valid email address";
    }
    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/[\s-+]/g, ""))) {
      tempErrors.phoneNumber = "Enter a valid 10-digit phone number";
    }
    if (!formData.projectDetails.trim()) tempErrors.projectDetails = "Please outline basic project scopes";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const numericBudget = parseInt(formData.budget.replace(/[^0-9]/g, "")) || 10000;
      const contactData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        serviceRequired: formData.websiteType,
        budget: numericBudget,
        message: formData.companyName ? `[Company: ${formData.companyName}] ${formData.projectDetails}` : formData.projectDetails,
        status: "new" as const,
        date: new Date().toISOString().split("T")[0]
      };

      // Store in Firestore "admin_contacts"
      try {
        await addDoc(collection(db, "admin_contacts"), contactData);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, "admin_contacts");
      }

      // Store notification in Firestore "admin_notifications"
      try {
        await addDoc(collection(db, "admin_notifications"), {
          type: "contact" as const,
          title: `New Project Inquiry`,
          description: `From ${formData.fullName} - Budget: ${formData.budget}`,
          time: "Just Now",
          read: false,
          date: new Date().toISOString()
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, "admin_notifications");
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Error writing contact request to Firestore:", err);
      setIsSubmitting(false);
      setSubmitSuccess(true); // Fallback to let user proceed
    }
  };

  const handleScheduleConfirm = () => {
    setScheduledSuccess(true);
    setTimeout(() => {
      setScheduledSuccess(false);
      setShowScheduler(false);
    }, 2500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-coffee-primary/5 dark:bg-black/20">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-coffee-mocha/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Text and Contact info col */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="px-3 py-1 bg-coffee-primary/10 dark:bg-coffee-gold/10 text-coffee-primary dark:text-coffee-gold text-xs font-mono font-bold uppercase tracking-widest rounded-full border border-coffee-gold/20 inline-block mb-3">
                ✦ DISPATCH A REQUEST ✦
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-coffee-text dark:text-[#F5F0EB] tracking-tight leading-tight mb-4">
                Let&apos;s Build Something <span className="coffee-gradient-text">Legendary</span>
              </h2>
              <p className="text-sm sm:text-base text-coffee-mocha dark:text-coffee-bg/70 leading-relaxed font-sans">
                Tell us about your brand requirements. Receive an architectural roadmap and exact timeline quotation within 4 business hours. No obligations, 100% free consultation.
              </p>
            </div>

            {/* Quick stats / features */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-coffee-primary/10 flex items-center justify-center text-coffee-primary dark:text-coffee-gold shrink-0">
                  <Clock className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-sm font-button font-bold text-coffee-text dark:text-[#F5F0EB]">4-Hour Initial SLA Response</h4>
                  <p className="text-xs text-coffee-mocha dark:text-[#F5F0EB]/65">We review submissions swiftly, delivering a personalized draft scope proposal.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-coffee-primary/10 flex items-center justify-center text-coffee-primary dark:text-coffee-gold shrink-0">
                  <Phone className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-sm font-button font-bold text-coffee-text dark:text-[#F5F0EB]">Direct WhatsApp/Call Support</h4>
                  <p className="text-xs text-coffee-mocha dark:text-[#F5F0EB]/65">Chat natively with dedicated designers and developers anytime. No ticketing queues.</p>
                </div>
              </div>
            </div>

            {/* Office Coordinates details */}
            <div className="p-6 bg-white dark:bg-[#1a130e] rounded-3xl border border-coffee-gold/15">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-coffee-gold mb-2">HostNovaPro HQ Coordinates</h5>
              <div className="text-xs space-y-1.5 text-coffee-mocha dark:text-coffee-bg/85 font-mono">
                <p>📍 Vaishali Nagar, Jaipur, Rajasthan - 302021</p>
                <p>📞 +91 911 650 9000 (Consulting Desk)</p>
                <p>📧 consulting@hostnovapro.com</p>
              </div>
            </div>
          </div>

          {/* Form wrapper column */}
          <div className="lg:col-span-7">
            <div className="glass-effect rounded-3xl p-6 sm:p-8 border border-coffee-gold/15 shadow-xl relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-display font-extrabold text-coffee-text dark:text-[#F5F0EB] mb-2">
                      Request Dispatched Successfully!
                    </h3>
                    <p className="text-sm text-coffee-mocha dark:text-coffee-bg/70 max-w-md mx-auto mb-8 font-sans">
                      Thank you for contacting HostNovaPro, <strong>{formData.fullName}</strong>. Our senior web architect is already reviewing your specs. We will follow up via your email ({formData.email}) or phone inside 4 hours!
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        onClick={() => {
                          setSubmitSuccess(false);
                          setFormData({
                            fullName: "",
                            companyName: "",
                            email: "",
                            phoneNumber: "",
                            websiteType: "Business Website",
                            budget: "₹5,000 - ₹10,000",
                            projectDetails: "",
                          });
                        }}
                        className="px-5 py-2.5 bg-coffee-primary/10 text-coffee-primary dark:text-coffee-gold font-button font-bold text-xs rounded-xl hover:bg-coffee-primary/20 transition-all cursor-pointer"
                      >
                        ← Submit Another Query
                      </button>
                      <button
                        onClick={() => setShowScheduler(true)}
                        className="px-5 py-2.5 bg-coffee-primary text-white dark:bg-coffee-gold dark:text-coffee-dark font-button font-bold text-xs rounded-xl hover:bg-coffee-mocha transition-all flex items-center space-x-1 shadow cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        <span>Schedule Instant 1-on-1 Call</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmitQuote}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-button font-bold text-coffee-text/80 dark:text-coffee-bg/80 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full bg-white dark:bg-black/10 border rounded-xl px-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-colors ${
                            errors.fullName ? "border-rose-500" : "border-coffee-gold/20"
                          }`}
                          placeholder="e.g. Priyanshu Sharma"
                        />
                        {errors.fullName && <p className="text-[10px] text-rose-500 mt-1 font-mono">{errors.fullName}</p>}
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-button font-bold text-coffee-text/80 dark:text-coffee-bg/80 mb-1.5">
                          Company / Brand Name
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full bg-white dark:bg-black/10 border border-coffee-gold/20 rounded-xl px-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-colors"
                          placeholder="e.g. Apex Organic Blends"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-button font-bold text-coffee-text/80 dark:text-coffee-bg/80 mb-1.5">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-white dark:bg-black/10 border rounded-xl px-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-colors ${
                            errors.email ? "border-rose-500" : "border-coffee-gold/20"
                          }`}
                          placeholder="e.g. you@yourbrand.com"
                        />
                        {errors.email && <p className="text-[10px] text-rose-500 mt-1 font-mono">{errors.email}</p>}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-button font-bold text-coffee-text/80 dark:text-coffee-bg/80 mb-1.5">
                          WhatsApp / Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className={`w-full bg-white dark:bg-black/10 border rounded-xl px-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-colors ${
                            errors.phoneNumber ? "border-rose-500" : "border-coffee-gold/20"
                          }`}
                          placeholder="e.g. 98765 43210"
                        />
                        {errors.phoneNumber && <p className="text-[10px] text-rose-500 mt-1 font-mono">{errors.phoneNumber}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Website Type */}
                      <div>
                        <label className="block text-xs font-button font-bold text-coffee-text/80 dark:text-coffee-bg/80 mb-1.5">
                          Website Type
                        </label>
                        <select
                          value={formData.websiteType}
                          onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                          className="w-full bg-white dark:bg-[#201712] border border-coffee-gold/20 rounded-xl px-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-colors cursor-pointer"
                        >
                          <option value="Website Design">Custom business website</option>
                          <option value="Ecommerce Store">Online E-commerce store</option>
                          <option value="Restaurant Website">Restaurant menu & booking</option>
                          <option value="Landing Page">1-Page landing launch pad</option>
                          <option value="Custom app">Custom React Enterprise Portal</option>
                        </select>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-xs font-button font-bold text-coffee-text/80 dark:text-coffee-bg/80 mb-1.5">
                          Project Budget Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full bg-white dark:bg-[#201712] border border-coffee-gold/20 rounded-xl px-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-colors cursor-pointer"
                        >
                          <option value="₹4,999 (Starter)">₹4,999 (Starter Package)</option>
                          <option value="₹9,999 (Business)">₹9,999 (Business Package)</option>
                          <option value="₹19,999+ (Premium)">₹19,999 (Premium eCommerce)</option>
                          <option value="₹30,000+ (Custom Enterprise)">₹30,000+ (Custom Enterprise / App)</option>
                        </select>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div>
                      <label className="block text-xs font-button font-bold text-coffee-text/80 dark:text-coffee-bg/80 mb-1.5">
                        Tell Us About Your Brand &amp; Goals *
                      </label>
                      <textarea
                        rows={3}
                        value={formData.projectDetails}
                        onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                        className={`w-full bg-white dark:bg-black/10 border rounded-xl px-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-colors resize-none ${
                          errors.projectDetails ? "border-rose-500" : "border-coffee-gold/20"
                        }`}
                        placeholder="e.g. We run a gourmet coffee brand in Bangalore. We need an online store with elegant fonts and a direct WhatsApp integration to receive custom blends..."
                      />
                      {errors.projectDetails && <p className="text-[10px] text-rose-500 mt-1 font-mono">{errors.projectDetails}</p>}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-1/2 py-3.5 bg-coffee-primary text-white hover:bg-coffee-mocha dark:bg-coffee-gold dark:text-coffee-dark dark:hover:bg-white rounded-xl text-xs font-button font-bold tracking-wider shadow-lg hover:shadow-coffee-primary/20 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4 shrink-0" />
                        <span>{isSubmitting ? "Dispatching..." : "Request Free Quote"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowScheduler(true)}
                        className="w-full sm:w-1/2 py-3.5 bg-white dark:bg-white/5 border border-coffee-primary/20 dark:border-coffee-bg/20 text-coffee-primary dark:text-coffee-gold hover:bg-coffee-primary/5 dark:hover:bg-white/5 rounded-xl text-xs font-button font-bold tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
                      >
                        <Calendar className="w-4 h-4 text-coffee-gold shrink-0" />
                        <span>Schedule Live Discovery Call</span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </motion.div>

      {/* Scheduler Overlay Popup Dialog */}
      <AnimatePresence>
        {showScheduler && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-white dark:bg-[#120c08] border border-coffee-gold/20 p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl relative"
            >
              <h3 className="text-xl font-display font-extrabold text-coffee-text dark:text-[#F5F0EB] mb-1.5 flex items-center">
                <Calendar className="w-5.5 h-5.5 text-coffee-gold mr-2 shrink-0" />
                <span>HostNovaPro Live Scheduler</span>
              </h3>
              <p className="text-xs text-coffee-mocha dark:text-coffee-bg/70 mb-5 leading-normal">
                Pick a secure 15-minute Google Meet / Phone briefing slot with our senior product developer.
              </p>

              {scheduledSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-coffee-text dark:text-white mb-1">Briefing Scheduled!</h4>
                  <p className="text-xs text-coffee-mocha dark:text-[#F5F0EB]/80">
                    Invitation link dispatched to your WhatsApp &amp; Calendar. See you {selectedDate} at {selectedTime}!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  
                  {/* Select Date */}
                  <div>
                    <label className="block text-xs font-button font-bold text-coffee-text/80 dark:text-coffee-bg/85 mb-1.5">
                      Select Date:
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      {["Tomorrow", "In 2 Days", "In 3 Days"].map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`py-2 px-1 rounded-xl font-bold border transition-all cursor-pointer ${
                            selectedDate === date 
                              ? "bg-coffee-primary border-coffee-primary text-white dark:bg-coffee-gold dark:border-coffee-gold dark:text-coffee-dark" 
                              : "border-coffee-gold/15 hover:border-coffee-gold text-coffee-text/85 dark:text-coffee-bg/80"
                          }`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Time */}
                  <div>
                    <label className="block text-xs font-button font-bold text-coffee-text/80 dark:text-coffee-bg/85 mb-1.5">
                      Select Hour (IST):
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                      {["11:00 AM IST", "2:00 PM IST", "4:30 PM IST", "6:00 PM IST"].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-1 rounded-xl font-bold border transition-all cursor-pointer ${
                            selectedTime === time 
                              ? "bg-coffee-primary border-coffee-primary text-white dark:bg-coffee-gold dark:border-coffee-gold dark:text-coffee-dark" 
                              : "border-coffee-gold/15 hover:border-coffee-gold text-coffee-text/85 dark:text-coffee-bg/80"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Confirm Action */}
                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => setShowScheduler(false)}
                      className="w-1/2 py-2.5 bg-coffee-primary/10 text-coffee-primary dark:text-coffee-gold font-button font-bold text-xs rounded-xl hover:bg-coffee-primary/20 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleScheduleConfirm}
                      className="w-1/2 py-2.5 bg-coffee-primary dark:bg-coffee-gold text-white dark:text-coffee-dark font-button font-bold text-xs rounded-xl hover:bg-coffee-mocha transition-all cursor-pointer shadow-md"
                    >
                      Confirm Briefing
                    </button>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
});

ContactForm.displayName = "ContactForm";
