import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useCreateContact } from "@/hooks/use-contact";
import { FloatingShape } from "@/components/FloatingShape";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { 
  ArrowLeft, 
  Calendar, 
  TrendingDown, 
  Package, 
  ShoppingCart, 
  Scale, 
  FolderSync, 
  FileSpreadsheet, 
  Sparkles, 
  Laptop, 
  Cloud, 
  Send, 
  Check, 
  AlertTriangle, 
  Calculator, 
  Layers, 
  MessageSquare,
  AlertCircle,
  ArrowRight
} from "lucide-react";

export default function Pharmacy() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const createContact = useCreateContact();
  const [selectedPlan, setSelectedPlan] = useState<string>("Hybrid Cloud System (Offline + Online)");

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    // Append the selected deployment plan to the message for clarity
    const fullMessage = `[Plan Inquiry: ${selectedPlan}]\n\n${data.message}`;
    createContact.mutate({
      ...data,
      message: fullMessage,
    }, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const coreFeatures = [
    {
      title: "Automatic Expiry Alerts",
      description: "Never sell or get stuck with expired medicines again. The system continuously scans drug batches and flashes real-time warnings 30, 60, and 90 days before expiry.",
      icon: Calendar,
      tag: "Proactive Protection"
    },
    {
      title: "Intelligent Low Stock Alerts",
      description: "Stay ahead of demand. Set custom thresholds for every SKU and receive auto-alerts and prepared purchase drafts the moment a critical medicine runs low.",
      icon: AlertCircle,
      tag: "Inventory Pacing"
    },
    {
      title: "Complete Stock & Batch Tracking",
      description: "Robust inventory sorting with Generic name tagging, manufacturer listings, shelf locations, batch numbering, and automated barcode categorization.",
      icon: Package,
      tag: "High Organization"
    },
    {
      title: "Sales & POS Management",
      description: "Process sales in seconds. Supports lightning-fast barcode checkout, automated patient receipt printing, discounts, multi-tender support, and returns.",
      icon: ShoppingCart,
      tag: "High Performance"
    },
    {
      title: "Credit / Debit Customer Ledgers",
      description: "Manage accounts for regular customers and institutional accounts. Maintain clean individual ledgers with automated billing histories and payment tracking.",
      icon: Scale,
      tag: "Cashflow Control"
    },
    {
      title: "Loss & Damage Bookkeeping",
      description: "Accurately log broken bottles, damaged tablet strips, or expired discard stock to ensure your profit margins reflect exact, real-world numbers.",
      icon: TrendingDown,
      tag: "Margin Analytics"
    },
    {
      title: "Expense & Overhead Tracker",
      description: "Account for all pharmacy overheads including salaries, utilities, rent, shop maintenance, and generic business bills inside one cohesive ledger.",
      icon: Calculator,
      tag: "Financial Clarity"
    },
    {
      title: "Payables & Receivables Ledger",
      description: "Keep a transparent log of pending distributor invoices (payables) and client due tabs (receivables) with automated timeline charts.",
      icon: FileSpreadsheet,
      tag: "Liquidity Safety"
    },
    {
      title: "Custom Feature Integration",
      description: "Have unique workflows, custom distributor integrations, or specialized SMS notification structures? Our engineering team builds custom modules around your exact SOP.",
      icon: Sparkles,
      tag: "Unlimited Scale"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white overflow-x-hidden" ref={scrollRef}>
      
      {/* Premium Landing Sub-Navbar */}
      <header className="fixed top-2 left-0 right-0 z-50 px-6">
        <nav className="max-w-6xl mx-auto flex items-center justify-between pl-4 pr-4 md:pr-8 py-1.5 glass-card rounded-full border border-black/5 shadow-2xl relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-0" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-0" />
          
          {/* Logo & Back button */}
          <div className="flex items-center space-x-2 relative z-10">
            <Link href="/" className="flex items-center text-xs font-bold text-black/60 hover:text-black transition-colors duration-200 uppercase tracking-widest gap-1 border-r border-black/10 pr-3 mr-1 py-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>
            <div className="relative h-[30px] w-36 overflow-hidden flex items-center justify-center -ml-2">
              <img 
                src="/Logo.png" 
                alt="XENFLOW" 
                className="h-full w-full object-contain scale-[2.2] transform-gpu relative z-10"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative z-10">
            <button onClick={() => scrollToSection("overview")} className="text-[10px] font-bold text-black/80 hover:text-black transition-all duration-200 uppercase tracking-widest">
              Overview
            </button>
            <button onClick={() => scrollToSection("features")} className="text-[10px] font-bold text-black/80 hover:text-black transition-all duration-200 uppercase tracking-widest">
              Features
            </button>
            <button onClick={() => scrollToSection("deployment")} className="text-[10px] font-bold text-black/80 hover:text-black transition-all duration-200 uppercase tracking-widest">
              Deployment
            </button>
          </div>

          {/* Right CTA */}
          <div className="relative z-10">
            <button
              onClick={() => scrollToSection("inquiry")}
              className="px-5 py-2 rounded-full text-[10px] font-bold tracking-wide transform hover:scale-105 active:scale-95 btn-shiny-black"
            >
              Send Inquiry
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="overview" className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden pt-36 pb-20">
        <FloatingShape className="w-64 h-64 top-[10%] left-[5%] bg-primary/20" delay={0} duration={25} />
        <FloatingShape className="w-96 h-96 bottom-[10%] right-[5%] bg-primary/10" delay={2} duration={30} />
        <FloatingShape className="w-48 h-48 top-[35%] right-[20%] bg-black/5" delay={4} duration={20} />

        <div className="absolute top-[-30%] left-[-15%] w-[600px] h-[600px] bg-black/[0.3] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 inline-block"
          >
            <span className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-sans font-medium tracking-widest uppercase">
              Next-Gen Medical ERP Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[36px] sm:text-[54px] md:text-[76px] font-heading font-black leading-[1.05] text-[#111827] mb-8 uppercase flex flex-col items-center justify-center tracking-wider"
          >
            <span className="text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine drop-shadow-2xl">Intelligent</span>
            <span className="text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine drop-shadow-2xl">Pharmacy</span>
            <span className="text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine drop-shadow-2xl">Management.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto text-base sm:text-lg font-sans font-normal leading-[28px] text-[#4B5563] mb-12 text-center px-4"
          >
            Offline speed meets hybrid cloud redundancy. An custom-engineered software environment designed to safeguard margins with real-time expiry tracking, low-stock predictive triggers, lightning POS, and a bulletproof dual accounts ledger.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Button 
              size="lg" 
              onClick={() => scrollToSection("inquiry")} 
              className="rounded-full px-8 py-6 text-base w-full sm:w-auto btn-shiny-black"
            >
              Request System Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => scrollToSection("features")} 
              className="rounded-full px-8 py-6 text-base w-full sm:w-auto hover:bg-background/5 border-black/10 bg-transparent text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine"
            >
              Explore Core Features
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-24 relative border-t border-black/5 bg-secondary/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-sans font-medium text-xs tracking-[0.3em] uppercase mb-4">
              [ DIRECT APPLICATION INTERFACE ]
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine">
              Engineered for Speed & Clarity
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 text-sm">
              Take an interactive look at the production environment. Tailored visually to eliminate eye strain during 12-hour shifts while placing business diagnostics exactly where they belong.
            </p>
          </motion.div>

          {/* Interactive Screen Overlays */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Screen 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="relative rounded-3xl overflow-hidden glass-card p-1 bg-white/40">
                {/* macOS Controls */}
                <div className="flex items-center space-x-2 px-6 py-4 bg-white/60 border-b border-black/5 rounded-t-2xl">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-[10px] text-gray-400 font-mono tracking-wider ml-4">pharmacy-erp-billing.dashboard</span>
                </div>
                <div className="relative aspect-[16/10] bg-white overflow-hidden rounded-b-2xl">
                  <img 
                    src="/pharma1.png" 
                    alt="Sleek billing dashboard with real-time operations overview" 
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700" 
                  />
                </div>
              </div>
              <div className="px-4">
                <span className="text-primary font-sans font-medium text-xs tracking-widest uppercase block mb-2">[ BILLING & OPERATIONS SCREEN ]</span>
                <h3 className="text-2xl font-bold text-black mb-3">Lightning Fast Counter POS</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  The counter POS interface enables instantaneous barcode lookups, generic comparisons, stock tracking, and cash receipt processing. Fully integrated with automated drawer triggers and cloud backup, ensuring your transaction logging never slows down during peak customer rush hours.
                </p>
              </div>
            </motion.div>

            {/* Screen 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="relative rounded-3xl overflow-hidden glass-card p-1 bg-white/40">
                {/* macOS Controls */}
                <div className="flex items-center space-x-2 px-6 py-4 bg-white/60 border-b border-black/5 rounded-t-2xl">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-[10px] text-gray-400 font-mono tracking-wider ml-4">pharmacy-erp-ledger.analytics</span>
                </div>
                <div className="relative aspect-[16/10] bg-white overflow-hidden rounded-b-2xl">
                  <img 
                    src="/pharma2.png" 
                    alt="Advanced accounts ledger and detailed stock diagnostics screen" 
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700" 
                  />
                </div>
              </div>
              <div className="px-4">
                <span className="text-primary font-sans font-medium text-xs tracking-widest uppercase block mb-2">[ LEDGER & ACCOUNTING CONTROL ]</span>
                <h3 className="text-2xl font-bold text-black mb-3">Accounts, Payables & Expiries</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Track full distributor purchase tabs, client credits, and operational expenses in one unified portal. The expiration diagnostics panel gives you a multi-batch breakdown, warning you of upcoming inventory losses and allowing you to coordinate supplier returns and custom discounts seamlessly.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-32 relative bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <p className="text-primary font-sans font-medium text-xs tracking-[0.3em] uppercase mb-4">
              [ FULL FEATURE SUITE ]
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine">
              Complete Pharmacy Operational Blueprint
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 text-sm">
              We replace five fragmented systems with one integrated engine. Every operational aspect from drug expiry to detailed accounts ledger has been fully engineered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feat, index) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative p-8 rounded-3xl bg-white border border-black/5 shadow-xl hover:border-primary/50 transition-all duration-300 transform-gpu"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <feat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[10px] font-bold text-black/40 group-hover:text-primary transition-colors tracking-widest uppercase font-sans">
                        {feat.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 uppercase tracking-wide">
                      {feat.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-sans">
                      {feat.description}
                    </p>
                  </div>
                  
                  {feat.title === "Custom Feature Integration" && (
                    <button 
                      onClick={() => scrollToSection("inquiry")} 
                      className="flex items-center text-xs font-bold tracking-widest text-primary gap-1 group-hover:gap-2 transition-all uppercase"
                    >
                      Propose a Module <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Offers Section (Comparison) */}
      <section id="deployment" className="py-32 relative border-t border-black/5 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-primary font-sans font-medium text-xs tracking-[0.3em] uppercase mb-4">
              [ DEPLOYMENT ARCHITECTURE ]
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine">
              Choose Your Infrastructure
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 text-sm">
              We deploy the system according to your operational demands. Select local machine containment or multi-terminal global sync.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Offer 1 - Offline System Only */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 md:p-12 border border-black/5 bg-white/70 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-black/5">
                  <div>
                    <span className="px-3 py-1 rounded-full border border-black/15 text-[10px] uppercase font-bold tracking-widest text-black/60 bg-black/5">Local Hosting</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-black mt-3">Offline-Only System</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center">
                    <Laptop className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  Perfect for independent single-counter pharmacies wanting zero ongoing cloud fees, offline resilience against poor internet, and localized data security. Runs purely on your local workspace system.
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    "Zero monthly server hosting fees",
                    "Blazing fast speed (LAN network query speeds)",
                    "Continuous operation without internet",
                    "Automatic scheduled local disk backups",
                    "Multi-terminal connection via local LAN router",
                    "Absolute local database ownership & data privacy"
                  ].map((item) => (
                    <li key={item} className="flex items-start text-sm text-black/80 gap-3 font-sans font-medium">
                      <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-black" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                onClick={() => {
                  setSelectedPlan("Offline-Only System");
                  scrollToSection("inquiry");
                }}
                className="w-full h-12 text-sm font-heading font-bold uppercase tracking-wider rounded-xl hover:bg-black/5 border border-black/10 bg-transparent text-black transition-all"
              >
                Inquire About Offline Setup
              </Button>
            </motion.div>

            {/* Offer 2 - Hybrid Cloud Setup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="btn-shiny-black rounded-3xl p-8 md:p-12 border border-black flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              {/* Highlight badge */}
              <div className="absolute top-0 right-0 bg-primary/20 border-l border-b border-white/10 px-4 py-1.5 text-[8px] font-bold tracking-widest text-white uppercase rounded-bl-xl">
                Highly Recommended
              </div>

              <div>
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                  <div>
                    <span className="px-3 py-1 rounded-full border border-white/20 text-[10px] uppercase font-bold tracking-widest text-white bg-white/10">Hybrid Cloud Infrastructure</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-3">Hybrid Cloud System</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mb-8">
                  Engineered for growing pharmacies, multi-branch operations, and owners who need real-time data access on their mobile devices while retaining total system function when physical internet drops.
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    "Uninterrupted offline sales + Background auto-sync",
                    "Centralized cloud backup with zero data loss risk",
                    "Access sales analytics, ledgers, & expiries from anywhere",
                    "Multi-branch system sync & global stock searches",
                    "Mobile App & Tablet reporting dashboards",
                    "Secure cloud database with automatic replication"
                  ].map((item) => (
                    <li key={item} className="flex items-start text-sm text-white/90 gap-3 font-sans font-medium">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                onClick={() => {
                  setSelectedPlan("Hybrid Cloud System (Offline + Online)");
                  scrollToSection("inquiry");
                }}
                className="w-full h-12 text-sm font-heading font-bold uppercase tracking-wider rounded-xl bg-white text-black hover:bg-white/90 transition-all border-none"
              >
                Inquire About Hybrid Cloud Setup
              </Button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry" className="py-32 relative bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-black/10"
          >
            <div className="text-center mb-10">
              <p className="font-sans font-medium text-primary text-xs tracking-[0.4em] mb-4 uppercase">[ SUBMIT SYSTEM INQUIRY ]</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine">Request Your Custom Solution</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Fill out the inquiry form below. Our development team will review your pharmacy requirements, build a secure sandbox, and coordinate a live remote demo.
              </p>
            </div>

            {/* Plan Pre-selector Tabs */}
            <div className="mb-8">
              <label className="text-[10px] font-bold text-black uppercase tracking-widest block mb-3">[ PREFERRED DEPLOYMENT setup ]</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  "Offline-Only System", 
                  "Hybrid Cloud System (Offline + Online)", 
                  "Custom Integration Setup"
                ].map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`px-3 py-3 rounded-xl border text-xs font-bold tracking-wider transition-all uppercase duration-200 ${
                      selectedPlan === plan 
                        ? "bg-black border-black text-white" 
                        : "bg-transparent border-black/10 text-gray-500 hover:bg-black/5"
                    }`}
                  >
                    {plan.split(" (")[0]}
                  </button>
                ))}
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Name / Pharmacy Representative"
                          {...field}
                          className="bg-background/5 border-black/10 focus:border-primary/50 min-h-[50px] text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Business Email"
                          {...field}
                          className="bg-background/5 border-black/10 focus:border-primary/50 min-h-[50px] text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Phone Number / WhatsApp"
                          {...field}
                          value={field.value ?? ""}
                          className="bg-background/5 border-black/10 focus:border-primary/50 min-h-[50px] text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Please detail your pharmacy setup, daily transaction volume, or any custom feature requests you require..."
                          {...field}
                          className="bg-background/5 border-black/10 focus:border-primary/50 min-h-[120px] text-base resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={createContact.isPending}
                  className="w-full h-14 text-base font-heading font-bold tracking-wide rounded-xl btn-shiny-black"
                >
                  {createContact.isPending ? "Submitting Inquiry..." : `Send Inquiry for ${selectedPlan.split(" (")[0]} →`}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-12 border-t border-black/10 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="relative h-[32px] w-40 mx-auto overflow-hidden flex items-center justify-center mb-6">
            <img 
              src="/Logo.png" 
              alt="XENFLOW" 
              className="h-full w-full object-contain scale-[2.2]"
            />
          </div>
          <p className="text-[10px] font-sans font-medium text-gray-500 uppercase tracking-widest mb-4">
            © 2026 XENFLOW DIGITAL AGENCY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex justify-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-black/50">
            <Link href="/" className="hover:text-black transition-colors">Main Site</Link>
            <span>•</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-black transition-colors">Scroll to Top</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
