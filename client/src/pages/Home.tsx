import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { FloatingShape } from "@/components/FloatingShape";
import { useCreateContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bot, Phone, MessageCircle, CheckCircle, Calendar, Database } from "lucide-react";
import { useRef } from "react";
import { Globe as GlobeComponent } from "@/components/Globe";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { DashboardPreview } from "@/components/DashboardPreview";

export default function Home() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const createContact = useCreateContact();
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
    createContact.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  const services = [
    {
      title: "AI Chatbots",
      description: "Instant responses to every inquiry. Qualifies leads with smart questions. Books appointments automatically. No forms. No delays. No excuses.",
      icon: Bot,
    },
    {
      title: "Voice Agents",
      description: "Answers every call, day or night. Handles questions, qualifies prospects, schedules appointments. Sounds human. Works like a machine.",
      icon: Phone,
    },
    {
      title: "WhatsApp Automation",
      description: "Meet customers where they already are. Automated conversations that feel personal. From first message to booked appointment, completely hands-free.",
      icon: MessageCircle,
    },
    {
      title: "Lead Qualification",
      description: "Stop chasing tire-kickers. Our AI identifies serious buyers in seconds. Only qualified leads reach your team. Your time stays valuable.",
      icon: CheckCircle,
    },
    {
      title: "Smart Scheduling",
      description: "Syncs with your calendar in real-time. Clients book themselves. Reminders sent automatically. No-shows cut in half.",
      icon: Calendar,
    },
    {
      title: "Seamless Integration",
      description: "Plugs into your CRM, calendar, and communication tools. Every lead tracked. Every conversation logged. Nothing falls through the cracks.",
      icon: Database,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <Navbar />
      <FloatingChatbot />

      {/* Hero Section - compact spacing so CTAs stay fully visible on all viewports */}
      <section ref={scrollRef} className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <FloatingShape className="w-[500px] h-[500px] top-[-100px] left-[-100px] bg-primary/20" delay={0} duration={15} />
        <FloatingShape className="w-[300px] h-[300px] bottom-0 right-[-50px] bg-blue-600/20" delay={2} duration={12} />

        <motion.div
          style={{ y: heroY, opacity }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-3 sm:mb-5 md:mb-6 inline-block"
          >
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-sans font-medium tracking-widest uppercase">
              Never Miss a Lead Again
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-4 sm:mb-6 md:mb-8 leading-tight uppercase text-white"
          >
            24/7 LEAD
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              CAPTURE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 leading-relaxed"
          >
            AI-powered chatbots and voice agents that qualify leads, book appointments, and close deals while you sleep. Your business runs 24/7. Now your sales system does too.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <a href="#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-white rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto neon-glow">
                Book a Free Demo
              </Button>
            </a>
            <Button variant="outline" size="lg" className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto hover:bg-white/5 border-white/10">
              See How It Works
            </Button>
          </motion.div>
        </motion.div>
      </section>



      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">The System That Never Sleeps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-sans font-medium uppercase tracking-widest text-sm text-primary">
              Core Capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>



      {/* The Problem We Solve Section */}
      <section id="solutions" className="py-32 relative overflow-hidden bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-6 leading-tight">
                While You're Closed, <br />
                <span className="text-primary">Your Competitors Are Closing</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-8">
                <p>Every missed call is money walking out the door.</p>
                <p>Every inquiry waiting until morning is already talking to three other businesses.</p>
                <p>Every lead that hits voicemail? Gone.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                {[
                  { label: "Average business misses", value: "30% of calls" },
                  { label: "Customers buy from whoever responds first", value: "78%" },
                  { label: "After-hours inquiries convert", value: "2x higher" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 glass-card rounded-2xl border-white/5"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest font-sans font-medium text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <p className="mt-12 text-xl font-heading font-bold tracking-tight">
                You're not just losing leads. <br />
                <span className="text-primary">You're funding your competition.</span>
              </p>
              <p className="mt-4 text-muted-foreground italic underline decoration-primary/30">Xenflow fixes this.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video flex items-center justify-center"
            >
              <DashboardPreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="font-sans font-medium text-primary text-xs tracking-[0.4em] mb-4 uppercase">[ HOW IT WORKS ]</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight uppercase">Pure Automation at Scale</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "24/7 Lead Capture",
                desc: "Never miss an inquiry. Ever. Chat, voice, WhatsApp—we handle them all."
              },
              {
                step: "02",
                title: "Instant Qualification",
                desc: "Smart questions identify serious buyers in under 60 seconds."
              },
              {
                step: "03",
                title: "Automatic Booking",
                desc: "Appointments scheduled directly into your calendar. Confirmations sent. Reminders automated."
              },
              {
                step: "04",
                title: "Seamless Handoff",
                desc: "When you're ready to close, every detail is waiting. No context-switching. Just results."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/40 border border-white/5 p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="text-4xl font-heading font-bold text-white/10 mb-6 group-hover:text-primary/20 transition-colors">{step.step}</div>
                <h3 className="text-xl font-heading font-bold mb-4 uppercase">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="about" className="py-32 relative border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-card p-1"
            >
              <img
                src="/moiz.png"
                alt="Abdul Moeez - Founder"
                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <p className="font-sans font-medium text-primary text-sm mb-2 tracking-widest uppercase">[ FOUNDER & CEO ]</p>
                <h3 className="text-3xl font-extrabold tracking-headline">Abdul Moeez</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-sans font-medium text-primary text-xs tracking-[0.3em] mb-6 uppercase">[ THE VISION ]</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-8 leading-tight">
                One Problem. <br />
                <span className="text-primary">One Solution.</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  "I watched businesses lose $10K+ monthly because nobody picked up the phone at 8 PM."
                </p>
                <p>
                  After working with real estate agencies, medical clinics, and service businesses across the US, UK, UAE, and Pakistan, the pattern was obvious:
                </p>
                <p>
                  Great businesses. Terrible response times. Leads contact 10 companies simultaneously. First one to respond wins. Everyone else loses.
                </p>
                <p>
                  Xenflow was built to solve this. We don't build chatbots. We build revenue capture systems. AI that responds in seconds, qualifies in minutes, and books automatically.
                </p>
              </div>
              <div className="mt-10 flex items-center space-x-6">
                <div className="h-px w-12 bg-primary" />
                <span className="font-sans font-medium text-sm tracking-widest uppercase">Abdul Moeez</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="font-sans font-medium text-primary text-xs tracking-[0.3em] mb-4 uppercase">[ OUR TEAM ]</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight uppercase">The People Behind Xenflow</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Omer Farooq", role: "AI & Automation Lead", img: "/omer.png", desc: "Chatbot architecture and conversation design" },
              { name: "Saad Ahmed", role: "Voice Systems Engineer", img: "/saad.png", desc: "Natural language processing and voice AI" },
              { name: "Hashim Sultan", role: "Integration Specialist", img: "/hashim.png", desc: "CRM connections and workflow automation" },
              { name: "Ibrahim Zahid", role: "Client Success", img: "/hashim.png", desc: "Onboarding and optimization" }
            ].map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden glass-card mb-4">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-xl font-heading font-bold">{member.name}</h3>
                <p className="text-xs text-primary font-sans font-medium tracking-widest uppercase mt-1">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results That Matter Section */}
      <section className="py-32 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="font-sans font-medium text-primary text-xs tracking-[0.3em] mb-4 uppercase">[ IMPACT ]</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight uppercase">Results That Matter</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "$180K+", label: "Revenue captured for clients in 90 days" },
              { number: "10x", label: "Faster response times than human teams" },
              { number: "87%", label: "Average lead-to-appointment conversion" },
              { number: "24/7", label: "Uptime. No sick days. No breaks." }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group text-center"
              >
                <div className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-sans font-medium text-xs uppercase tracking-wider leading-relaxed">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-24 text-center border-t border-white/5 pt-12"
          >
            <p className="text-gray-500 font-sans font-medium text-sm tracking-widest uppercase mb-4">Built in Lahore, Pakistan</p>
            <p className="text-primary font-sans font-medium text-xs tracking-[0.5em] font-extrabold tracking-headline-sm">SERVING CLIENTS WORLDWIDE</p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-16 relative bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="font-sans font-medium text-primary text-xs tracking-[0.4em] mb-4 uppercase">[ CASE STUDIES ]</p>
          </motion.div>

          {/* Case Study 01 - E-Commerce */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="mb-8">
                <p className="font-sans font-medium text-gray-500 text-xs tracking-[0.3em] uppercase mb-2">E-Commerce & Retail</p>
                <p className="font-sans font-medium text-primary text-sm tracking-wider mb-4">[ CASE STUDY 01 ]</p>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-headline text-white mb-2">
                  From Inbox Chaos<br />
                  to $420K in Recovered Revenue
                </h3>
                <p className="text-gray-400 font-sans font-medium text-sm">Client: International Beauty Brand</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* The Breakdown */}
                <div>
                  <h4 className="text-primary font-extrabold tracking-headline text-lg mb-4">The Breakdown</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Support team drowning in 2,000+ daily messages across Instagram, WhatsApp, and web chat. Average response time: 3+ hours.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4 text-sm">
                    By the time replies went out, buyers had moved on. Cart abandonment at 71%. Support team burned out. Revenue bleeding.
                  </p>
                </div>

                {/* What We Built */}
                <div>
                  <h4 className="text-primary font-extrabold tracking-headline-sm text-lg mb-4">The Solution</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Multi-channel AI assistant deployed across all platforms: Instant product recommendations, order tracking, and smart follow-ups.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4 text-sm font-bold border-l-2 border-primary pl-4">
                    Full integration with Shopify and Klaviyo.
                  </p>
                </div>

                {/* The Results */}
                <div>
                  <h4 className="text-primary font-extrabold tracking-headline-sm text-lg mb-4">The Impact</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">Response time: 3 hrs → 8 secs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">Cart completion: +156% in 60d</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">Monthly impact: $35K+ recovered</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Case Study 02 - B2B SaaS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="mb-8">
                <p className="font-sans font-medium text-gray-500 text-xs tracking-[0.3em] uppercase mb-2">B2B SaaS</p>
                <p className="font-sans font-medium text-primary text-sm tracking-wider mb-4">[ CASE STUDY 02 ]</p>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-headline text-white mb-2">
                  3x Pipeline Growth<br />
                  Without Hiring a Single SDR
                </h3>
                <p className="text-gray-400 font-sans font-medium text-sm">Client: Enterprise Workflow Platform</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* The Breakdown */}
                <div>
                  <h4 className="text-primary font-extrabold tracking-headline-sm text-lg mb-4">The Breakdown</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Sales team buried in unqualified demo requests. Reps spending 60% of time on discovery calls. High-intent buyers waiting 24-48 hours.
                  </p>
                </div>

                {/* What We Built */}
                <div>
                  <h4 className="text-primary font-extrabold tracking-headline-sm text-lg mb-4">The Solution</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    AI sales system that qualifies every lead based on budget, use case, and timeline. Routes hot prospects to AEs.
                  </p>
                </div>

                {/* The Results */}
                <div>
                  <h4 className="text-primary font-extrabold tracking-headline-sm text-lg mb-4">The Impact</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">Qualified demos: 3.4x increase</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">Sales cycle: -38% faster close</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">Revenue: $240K addl ARR Q1</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Case Study 03 - Real Estate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="mb-8">
                <p className="font-sans font-medium text-gray-500 text-xs tracking-[0.3em] uppercase mb-2">Real Estate</p>
                <p className="font-sans font-medium text-primary text-sm tracking-wider mb-4">[ CASE STUDY 03 ]</p>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-headline text-white mb-2">
                  42 Extra Deals Closed<br />
                  From Calls They Used to Miss
                </h3>
                <p className="text-gray-400 font-sans font-medium text-sm">Client: Luxury Property Agency, Dubai Marina</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h4 className="text-primary font-extrabold tracking-headline-sm text-lg mb-4">The Breakdown</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    International buyers calling at all hours. 40% of inquiries after 6 PM going to voicemail. Lost opportunities at $180K+ annually.
                  </p>
                </div>

                <div>
                  <h4 className="text-primary font-extrabold tracking-headline-sm text-lg mb-4">The Solution</h4>
                  <p className="text-gray-300 leading-relaxed text-sm">
                    24/7 voice AI receptionist that answers property questions, qualifies intent, and books viewings directly into calendars.
                  </p>
                </div>

                <div>
                  <h4 className="text-primary font-extrabold tracking-headline-sm text-lg mb-4">The Impact</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">After-hours bookings: 42/mo</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">Deals closed: 14 extra in Q4</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300 text-sm">Commission: $340K+ recovered</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 relative overflow-hidden bg-[#F9F8F3]">
        <div className="w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 px-4"
          >
            <p className="font-sans font-medium text-gray-600 text-xs tracking-[0.4em] mb-4 uppercase">[ TESTIMONIALS ]</p>
            <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-black mb-2">
              Don't take our word for it<span className="text-primary">*</span>
            </h2>
            <p className="font-sans font-medium text-primary text-xs tracking-[0.5em] font-extrabold tracking-headline-sm">*TAKE THEIRS.</p>
          </motion.div>

          {/* Marquee Container */}
          <div className="relative overflow-hidden py-12">
            <div className="flex animate-marquee gap-16 py-12">
              {[
                {
                  quote: "Xenflow didn't just improve our response time—they completely eliminated the problem. We book 18 more appointments monthly.",
                  name: "Dr. Sarah Al-Rashid",
                  role: "FOUNDER",
                  company: "DUBAI DENTAL WELLNESS",
                  image: "/client1.jpeg"
                },
                {
                  quote: "ROI was visible in week one. The AI handles qualification better than our junior SDRs did. Our team now only talks to buyers ready to sign.",
                  name: "Marcus Chen",
                  role: "VP SALES",
                  company: "CLOUDSYNC TECHNOLOGIES",
                  image: "/client2.jpeg"
                },
                {
                  quote: "We were skeptical about AI handling customer conversations. Three months in, it's our highest-performing 'team member.'",
                  name: "Fatima Hassan",
                  role: "OPERATIONS DIRECTOR",
                  company: "ELITE PROPERTY GROUP",
                  image: "/Fatima_Hassan.jpeg"
                },
                {
                  quote: "The seamless integration with our CRM was a game-changer. Every lead is tracked, tagged, and followed up automatically.",
                  name: "James Wilson",
                  role: "MARKETING HEAD",
                  company: "GLOBAL RETAIL SOLUTIONS",
                  image: "/client4.jpeg"
                },
                {
                  quote: "Finally a system that actually understands context. Our lead-to-booking conversion rate has skyrocketed by 45%.",
                  name: "Aisha Khan",
                  role: "DIRECTOR",
                  company: "NOVA LOGISTICS",
                  image: "/client5.jpeg"
                }
              ].concat([
                {
                  quote: "Xenflow didn't just improve our response time—they completely eliminated the problem. We book 18 more appointments monthly.",
                  name: "Dr. Sarah Al-Rashid",
                  role: "FOUNDER",
                  company: "DUBAI DENTAL WELLNESS",
                  image: "/client1.jpeg"
                },
                {
                  quote: "ROI was visible in week one. The AI handles qualification better than our junior SDRs did. Our team now only talks to buyers ready to sign.",
                  name: "Marcus Chen",
                  role: "VP SALES",
                  company: "CLOUDSYNC TECHNOLOGIES",
                  image: "/client2.jpeg"
                },
                {
                  quote: "We were skeptical about AI handling customer conversations. Three months in, it's our highest-performing 'team member.'",
                  name: "Fatima Hassan",
                  role: "OPERATIONS DIRECTOR",
                  company: "ELITE PROPERTY GROUP",
                  image: "/client1.jpeg"
                },
                {
                  quote: "The seamless integration with our CRM was a game-changer. Every lead is tracked, tagged, and followed up automatically.",
                  name: "James Wilson",
                  role: "MARKETING HEAD",
                  company: "GLOBAL RETAIL SOLUTIONS",
                  image: "/client4.jpeg"
                },
                {
                  quote: "Finally a system that actually understands context. Our lead-to-booking conversion rate has skyrocketed by 45%.",
                  name: "Aisha Khan",
                  role: "DIRECTOR",
                  company: "NOVA LOGISTICS",
                  image: "/client5.jpeg"
                }
              ]).map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[320px]"
                  style={{
                    marginTop: index % 2 === 0 ? '0px' : '60px'
                  }}
                >
                  <div className="group bg-black p-8 rounded-[40px] h-[380px] transition-all duration-500 hover:bg-primary/90 border border-black/5 shadow-2xl flex flex-col justify-between">
                    <p className="font-sans text-lg text-white/90 italic leading-relaxed mb-6 group-hover:text-black transition-colors duration-500">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-primary/50 transition-colors">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-heading font-bold tracking-wide text-sm uppercase group-hover:text-black transition-colors duration-500">
                          {testimonial.name}
                        </h4>
                        <p className="font-sans font-medium text-primary text-[9px] uppercase tracking-[0.2em] group-hover:text-black/70 transition-colors duration-500">
                          [{testimonial.role} @ {testimonial.company}]
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <FloatingShape className="w-[400px] h-[400px] right-0 bottom-0 bg-primary/10" duration={20} />

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <div className="text-center mb-10">
              <p className="font-sans font-medium text-primary text-xs tracking-[0.4em] mb-4 uppercase">[ STRATEGY CALL ]</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">Book Your Free Strategy Call</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We'll analyze your current lead flow, show you exactly where you're losing money, and build a custom plan to capture every opportunity.
              </p>
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
                          placeholder="Your Name"
                          {...field}
                          className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[50px] text-lg"
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
                          className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[50px] text-lg"
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
                          placeholder="Phone / WhatsApp"
                          {...field}
                          value={field.value ?? ""}
                          className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[50px] text-lg"
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
                          placeholder="What's your biggest lead challenge right now?"
                          {...field}
                          className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[150px] text-lg resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={createContact.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-heading font-bold tracking-wide rounded-xl neon-glow"
                >
                  {createContact.isPending ? "Sending..." : "Book My Free Demo →"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/10 bg-black relative overflow-hidden">
        {/* Top Divider */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary shadow-[0_0_10px_#FF0000]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Center CTA */}
          <div className="text-center mb-32">
            <h2 className="text-6xl md:text-8xl font-heading font-extrabold tracking-tighter mb-12 uppercase text-white">
              THE FUTURE IS AUTOMATED.
            </h2>
            <a href="#contact">
              <Button className="bg-primary hover:bg-white text-black px-12 py-5 rounded-none font-heading font-bold text-sm tracking-widest transition-all hover:text-black hover:shadow-[0_0_30px_#FF0000] active:scale-95 uppercase">
                START CAPTURING LEADS 24/7 →
              </Button>
            </a>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-24 border-b border-white/10">
            {/* Col 1 - Logo & Status */}
            <div>
              <a href="#" className="text-2xl font-heading font-bold text-white mb-6 block">
                XEN<span className="text-primary">FLOW</span>
              </a>
              <div className="flex items-center space-x-2 font-sans font-medium text-[10px] tracking-widest uppercase text-gray-400">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span>SYSTEMS: OPERATIONAL</span>
              </div>
            </div>

            {/* Col 2 - Quick Links */}
            <div>
              <p className="font-sans font-medium text-gray-500 text-xs tracking-widest uppercase mb-8">[ QUICK LINKS ]</p>
              <ul className="space-y-4 font-sans font-medium text-sm uppercase tracking-wider">
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#solutions" className="hover:text-primary transition-colors">Solutions</a></li>
                <li><a href="#case-studies" className="hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Book Demo</a></li>
              </ul>
            </div>

            {/* Col 3 - Connect */}
            <div>
              <p className="font-sans font-medium text-gray-500 text-xs tracking-widest uppercase mb-8">[ CONNECT ]</p>
              <ul className="space-y-4 font-sans font-medium text-sm uppercase tracking-wider">
                <li><a href="https://www.linkedin.com/feed/update/urn:li:activity:7427690910181675008" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="https://x.com/Xenflowtech" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">X (Twitter)</a></li>
                <li><a href="https://www.instagram.com/xenflow.tech/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="https://wa.me/923274550477" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a></li>
              </ul>
            </div>

            {/* Col 4 - Contact */}
            <div>
              <p className="font-sans font-medium text-gray-500 text-xs tracking-widest uppercase mb-8">[ CONTACT ]</p>
              <div className="font-sans font-medium text-sm text-gray-400 leading-relaxed uppercase tracking-wider space-y-4">
                <p>+92 327 455 0477</p>
                <p>hello@xenflowtech@gmail.com</p>
                <p>
                  Remote-First Company<br />
                  Based in Lahore, Pakistan
                </p>
              </div>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="pt-12 flex items-center justify-between">
            <p className="text-[10px] font-sans font-medium text-gray-600 uppercase tracking-widest">
              © 2026 XENFLOW AI. ALL RIGHTS RESERVED.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-primary hover:text-white transition-colors"
            >
              <span className="text-xl font-bold font-sans font-medium uppercase tracking-widest">↑</span>
            </button>
          </div>
        </div>
      </footer>
    </div >
  );
}
