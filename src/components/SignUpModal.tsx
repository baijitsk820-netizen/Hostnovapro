import React, { useState, useEffect } from "react";
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Briefcase,
  LogOut,
  Globe,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth, UserProfile } from "../hooks/useAuth";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    user,
    profile,
    loading,
    error,
    signUpWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
    resendVerification,
    refreshAuth,
    setError
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  
  // Registration form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    businessName: "",
    password: "",
    confirmPassword: "",
  });

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "Weak",
    color: "bg-rose-500",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isVerifyingState, setIsVerifyingState] = useState(false);
  const [resendStatus, setResendStatus] = useState<"idle" | "sent" | "error">("idle");
  const [localError, setLocalError] = useState("");
  const [authSuccessMsg, setAuthSuccessMsg] = useState("");

  // Track password strength dynamically
  useEffect(() => {
    const pw = registerForm.password;
    if (!pw) {
      setPasswordStrength({ score: 0, label: "Weak", color: "bg-rose-500" });
      return;
    }

    let points = 0;
    if (pw.length >= 6) points += 1;
    if (pw.length >= 10) points += 1;
    if (/[A-Z]/.test(pw)) points += 1;
    if (/[0-9]/.test(pw)) points += 1;
    if (/[^A-Za-z0-9]/.test(pw)) points += 1;

    let label = "Weak";
    let color = "bg-rose-500";

    if (points >= 5) {
      label = "Superb Secure";
      color = "bg-emerald-500";
    } else if (points >= 3) {
      label = "Good";
      color = "bg-amber-500";
    } else if (points >= 2) {
      label = "Fair";
      color = "bg-orange-400";
    }

    setPasswordStrength({ score: points, label, color });
  }, [registerForm.password]);

  // Handle Tab changes
  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
    setLocalError("");
    setError(null);
    setAuthSuccessMsg("");
  };

  // Email Register Submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setAuthSuccessMsg("");

    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setLocalError("Please complete all required fields.");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    if (passwordStrength.score < 2) {
      setLocalError("Please create a stronger password (at least 6 characters, mixed case, numbers).");
      return;
    }

    try {
      await signUpWithEmail(
        registerForm.email,
        registerForm.password,
        registerForm.name,
        registerForm.businessName
      );
      setAuthSuccessMsg("Account created! Please check your email inbox to verify your account.");
      setRegisterForm({
        name: "",
        email: "",
        businessName: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      // Error handled by useAuth state
    }
  };

  // Email Login Submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setAuthSuccessMsg("");

    if (!loginForm.email || !loginForm.password) {
      setLocalError("Please enter both email and password.");
      return;
    }

    try {
      await loginWithEmail(loginForm.email, loginForm.password);
      setAuthSuccessMsg("Login successful!");
      setLoginForm({ email: "", password: "" });
    } catch (err: any) {
      // Error handled by useAuth state
    }
  };

  // Google SSO
  const handleGoogleLogin = async () => {
    setLocalError("");
    setAuthSuccessMsg("");
    try {
      await loginWithGoogle();
      setAuthSuccessMsg("Successfully logged in with Google!");
    } catch (err: any) {
      // Error handled by useAuth state
    }
  };

  // Refresh Verification State
  const handleCheckVerification = async () => {
    setIsVerifyingState(true);
    setLocalError("");
    try {
      await refreshAuth();
      if (user?.emailVerified) {
        setAuthSuccessMsg("Email successfully verified!");
      } else {
        setLocalError("Email not verified yet. Please check your spam folder or request a new link.");
      }
    } catch (err: any) {
      setLocalError("Failed to check verification status.");
    } finally {
      setIsVerifyingState(false);
    }
  };

  // Resend Verification Email
  const handleResendVerification = async () => {
    setResendStatus("idle");
    try {
      await resendVerification();
      setResendStatus("sent");
      setTimeout(() => setResendStatus("idle"), 5000);
    } catch (err: any) {
      setResendStatus("error");
    }
  };

  // Clean error messages on close
  const handleClose = () => {
    setLocalError("");
    setError(null);
    setAuthSuccessMsg("");
    onClose();
  };

  const displayError = localError || error;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", duration: 0.45 }}
            id="auth-modal-card"
            className="bg-white/95 dark:bg-[#120c08]/95 border border-coffee-gold/20 p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative overflow-hidden backdrop-blur-lg"
          >
            {/* Ambient Background Glow Effect inside Card */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-coffee-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-coffee-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              id="auth-modal-close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-coffee-mocha hover:bg-coffee-primary/10 hover:text-coffee-primary dark:hover:text-coffee-gold transition-all cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {loading ? (
              /* Loading Spinner Overlay */
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-4 border-coffee-gold/20 border-t-coffee-gold animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-coffee-gold" />
                  </div>
                </div>
                <p className="text-xs font-mono text-coffee-mocha dark:text-coffee-bg/60 uppercase tracking-widest">
                  Authenticating connection...
                </p>
              </div>
            ) : user ? (
              /* ================== LOGGED IN DASHBOARD VIEW ================== */
              <div className="space-y-6 pt-2">
                <div className="text-center">
                  <div className="w-14 h-14 bg-coffee-gold/10 rounded-2xl flex items-center justify-center text-coffee-gold mx-auto mb-3 border border-coffee-gold/25 shadow-inner">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-coffee-text dark:text-coffee-bg">
                    Client Workspace Portal
                  </h3>
                  <p className="text-xs text-coffee-mocha dark:text-[#F5F0EB]/70 leading-normal mt-1 max-w-xs mx-auto">
                    Secure workspace administrative console for project staging and telemetry logs.
                  </p>
                </div>

                {/* Email Verification Banner */}
                {!user.emailVerified && (
                  <div className="bg-amber-500/10 border border-amber-500/25 p-4 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block">
                        Account Verification Required
                      </span>
                      <p className="text-[11px] text-coffee-mocha dark:text-coffee-bg/75 leading-relaxed">
                        We sent a verification link to <span className="font-bold">{user.email}</span>. Please verify your email to unlock all secure staging links.
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <button
                          onClick={handleCheckVerification}
                          disabled={isVerifyingState}
                          className="flex items-center space-x-1.5 px-3 py-1 bg-amber-500 text-white hover:bg-amber-600 rounded-lg text-[10px] font-bold transition-all disabled:opacity-50 cursor-pointer"
                        >
                          <RefreshCw className={`w-3 h-3 ${isVerifyingState ? "animate-spin" : ""}`} />
                          <span>{isVerifyingState ? "Checking..." : "Verify & Refresh"}</span>
                        </button>
                        <button
                          onClick={handleResendVerification}
                          className="text-[10px] text-coffee-primary dark:text-coffee-gold hover:underline font-bold"
                        >
                          {resendStatus === "idle" && "Resend Email"}
                          {resendStatus === "sent" && "✓ Email Dispatched"}
                          {resendStatus === "error" && "⚠ Error sending"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Details Box */}
                <div className="bg-white/40 dark:bg-black/20 border border-coffee-gold/15 p-5 rounded-2xl space-y-3 shadow-inner">
                  <div className="flex items-center justify-between border-b border-coffee-gold/10 pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-coffee-gold font-bold">
                      ✦ Client Metadata Record
                    </span>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
                      user.emailVerified 
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    }`}>
                      {user.emailVerified ? "Verified Account" : "Verification Pending"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                    <div>
                      <span className="opacity-50 font-mono text-[10px] block">Full Name:</span>
                      <span className="font-bold text-coffee-text dark:text-coffee-bg">
                        {profile?.name || user.displayName || "Client Partner"}
                      </span>
                    </div>
                    <div>
                      <span className="opacity-50 font-mono text-[10px] block">Corporate Entity:</span>
                      <span className="font-bold text-coffee-text dark:text-coffee-bg">
                        {profile?.businessName || "Pending Setup"}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="opacity-50 font-mono text-[10px] block">Verified Workspace Email:</span>
                      <span className="font-mono font-bold text-coffee-text dark:text-coffee-bg truncate block">
                        {user.email}
                      </span>
                    </div>
                    <div>
                      <span className="opacity-50 font-mono text-[10px] block">Access Clearance:</span>
                      <span className="font-bold text-coffee-primary dark:text-coffee-gold">
                        {profile?.role || "Client Access"}
                      </span>
                    </div>
                    <div>
                      <span className="opacity-50 font-mono text-[10px] block">Registration Date:</span>
                      <span className="font-mono text-coffee-text dark:text-coffee-bg/80">
                        {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Today"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Display Messages */}
                {displayError && (
                  <p className="text-[10px] text-rose-500 font-mono text-center">⚠ {displayError}</p>
                )}
                {authSuccessMsg && (
                  <p className="text-[10px] text-emerald-500 font-mono text-center">✓ {authSuccessMsg}</p>
                )}

                {/* Dashboard Controls */}
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-grow py-3 border border-coffee-gold/20 rounded-xl text-xs font-button font-bold text-coffee-text dark:text-coffee-bg hover:bg-coffee-primary/5 dark:hover:bg-white/5 transition-all cursor-pointer text-center"
                  >
                    Enter Workspace
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    aria-label="Log out"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ================== SIGN IN / REGISTER TABS VIEW ================== */
              <div>
                {/* Visual Header */}
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-coffee-primary/10 rounded-2xl flex items-center justify-center text-coffee-primary dark:text-coffee-gold mx-auto mb-3 border border-coffee-primary/10">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-coffee-text dark:text-coffee-bg">
                    Client Portal
                  </h3>
                  <p className="text-xs text-coffee-mocha dark:text-[#F5F0EB]/70 leading-normal mt-1">
                    Sign in to check staging, verify development briefs, or access 24/7 billing logs.
                  </p>
                </div>

                {/* Glassmorphic Tabs Switcher */}
                <div className="flex bg-coffee-primary/5 dark:bg-black/20 p-1 rounded-2xl border border-coffee-gold/10 mb-6 relative">
                  <button
                    onClick={() => handleTabChange("login")}
                    className={`flex-grow py-2.5 text-xs font-bold font-button rounded-xl transition-all cursor-pointer z-10 ${
                      activeTab === "login" 
                        ? "bg-coffee-primary text-white dark:bg-coffee-gold dark:text-coffee-dark shadow-md" 
                        : "text-coffee-text/70 dark:text-coffee-bg/70 hover:text-coffee-primary dark:hover:text-coffee-gold"
                    }`}
                  >
                    Email Login
                  </button>
                  <button
                    onClick={() => handleTabChange("register")}
                    className={`flex-grow py-2.5 text-xs font-bold font-button rounded-xl transition-all cursor-pointer z-10 ${
                      activeTab === "register" 
                        ? "bg-coffee-primary text-white dark:bg-coffee-gold dark:text-coffee-dark shadow-md" 
                        : "text-coffee-text/70 dark:text-coffee-bg/70 hover:text-coffee-primary dark:hover:text-coffee-gold"
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Display Status / Error Messages */}
                {displayError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl p-3 mb-4 text-[11px] font-mono text-center flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{displayError}</span>
                  </motion.div>
                )}
                {authSuccessMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl p-3 mb-4 text-[11px] font-mono text-center flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4 shrink-0" />
                    <span>{authSuccessMsg}</span>
                  </motion.div>
                )}

                {/* LOGIN FORM */}
                {activeTab === "login" && (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-coffee-mocha/60" />
                      <input
                        type="email"
                        required
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="w-full bg-white/50 dark:bg-black/15 border border-coffee-gold/20 rounded-xl pl-10 pr-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-all"
                        placeholder="Corporate / Work Email"
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-coffee-mocha/60" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full bg-white/50 dark:bg-black/15 border border-coffee-gold/20 rounded-xl pl-10 pr-10 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-all"
                        placeholder="Portal Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-coffee-mocha/60 hover:text-coffee-primary"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      id="auth-login-submit"
                      className="w-full py-3.5 bg-coffee-primary text-white hover:bg-coffee-mocha dark:bg-coffee-gold dark:text-coffee-dark dark:hover:bg-white rounded-xl text-xs font-button font-bold tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <span>Authorize Portal Session</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* REGISTRATION FORM */}
                {activeTab === "register" && (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-coffee-mocha/60" />
                      <input
                        type="text"
                        required
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        className="w-full bg-white/50 dark:bg-black/15 border border-coffee-gold/20 rounded-xl pl-10 pr-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-all"
                        placeholder="Your Full Name"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-coffee-mocha/60" />
                        <input
                          type="email"
                          required
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          className="w-full bg-white/50 dark:bg-black/15 border border-coffee-gold/20 rounded-xl pl-10 pr-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-all"
                          placeholder="Work Email"
                        />
                      </div>
                      <div className="relative">
                        <Briefcase className="absolute left-3.5 top-3.5 w-4 h-4 text-coffee-mocha/60" />
                        <input
                          type="text"
                          value={registerForm.businessName}
                          onChange={(e) => setRegisterForm({ ...registerForm, businessName: e.target.value })}
                          className="w-full bg-white/50 dark:bg-black/15 border border-coffee-gold/20 rounded-xl pl-10 pr-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-all"
                          placeholder="Entity Name (Optional)"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-coffee-mocha/60" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="w-full bg-white/50 dark:bg-black/15 border border-coffee-gold/20 rounded-xl pl-10 pr-10 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-all"
                        placeholder="Create Portal Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-coffee-mocha/60 hover:text-coffee-primary"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {registerForm.password && (
                      <div className="bg-coffee-primary/5 dark:bg-black/20 p-2.5 rounded-xl border border-coffee-gold/10">
                        <div className="flex justify-between items-center text-[10px] font-mono text-coffee-mocha dark:text-coffee-bg/60 mb-1.5">
                          <span>Security Check: {passwordStrength.label}</span>
                          <span>{passwordStrength.score}/5 Specs</span>
                        </div>
                        <div className="w-full h-1 bg-coffee-primary/10 rounded-full flex gap-1 overflow-hidden">
                          {[...Array(5)].map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-full w-1/5 rounded-full transition-all ${
                                idx < passwordStrength.score ? passwordStrength.color : "bg-transparent"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] text-coffee-mocha/60 dark:text-[#F5F0EB]/40 block mt-1 leading-normal">
                          Include numbers, mixed letter casing, and symbol keys to secure completely.
                        </span>
                      </div>
                    )}

                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-coffee-mocha/60" />
                      <input
                        type="password"
                        required
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        className="w-full bg-white/50 dark:bg-black/15 border border-coffee-gold/20 rounded-xl pl-10 pr-4 py-3 text-xs text-coffee-text dark:text-coffee-bg outline-none focus:border-coffee-primary dark:focus:border-coffee-gold transition-all"
                        placeholder="Re-type Portal Password"
                      />
                    </div>

                    <button
                      type="submit"
                      id="auth-register-submit"
                      className="w-full py-3.5 bg-coffee-primary text-white hover:bg-coffee-mocha dark:bg-coffee-gold dark:text-coffee-dark dark:hover:bg-white rounded-xl text-xs font-button font-bold tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <span>Create Portal Profile</span>
                      <Sparkles className="w-4 h-4 text-coffee-gold" />
                    </button>
                  </form>
                )}

                {/* Separator block */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-coffee-gold/15" />
                  </div>
                  <div className="relative flex justify-center text-[10px] font-mono uppercase">
                    <span className="bg-white dark:bg-[#120c08] px-3 text-coffee-mocha dark:text-coffee-bg/60">
                      Instantly Authenticate
                    </span>
                  </div>
                </div>

                {/* Google SSO Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  id="google-sso-btn"
                  className="w-full py-3 bg-white dark:bg-white/5 border border-coffee-gold/25 rounded-xl text-xs font-button font-bold text-coffee-text dark:text-coffee-bg hover:bg-coffee-primary/5 dark:hover:bg-white/5 transition-all flex items-center justify-center space-x-2.5 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.77-2.14-.77-4.48 0-6.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l2.85 2.22c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span>Continue with Google OAuth</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
