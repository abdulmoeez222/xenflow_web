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
      description: "Intelligent chatbots that answer questions, qualify leads, and book appointments automatically. No forms. No waiting. Just results.",
      icon: Bot,
    },
    {
      title: "Voice Agents",
      description: "AI-powered phone systems that pick up every call, handle inquiries, and schedule appointments. Like a receptionist that never sleeps.",
      icon: Phone,
    },
    {
      title: "WhatsApp Automation",
      description: "Automated conversations where your customers already are. Qualify leads and book appointments directly through WhatsApp.",
      icon: MessageCircle,
    },
    {
      title: "Lead Qualification",
      description: "Stop wasting time on bad leads. Our AI asks the right questions and only sends you serious buyers ready to take action.",
      icon: CheckCircle,
    },
    {
      title: "Appointment Booking",
      description: "Fully automated scheduling that syncs with your calendar in real time. Clients book themselves. You just show up.",
      icon: Calendar,
    },
    {
      title: "CRM Integration",
      description: "Connects with your existing tools. Every lead tracked, every follow-up automated. Nothing falls through the cracks.",
      icon: Database,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <Navbar />
      <FloatingChatbot />

      {/* Hero Section */}
      <section ref={scrollRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
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
            className="mb-6 inline-block"
          >
            <span className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono tracking-widest uppercase">
              Never Miss a Lead Again
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-tight"
          >
            CAPTURING
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              REVENUE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12 leading-relaxed"
          >
            We build intelligent chatbots and voice agents that qualify leads, book appointments, and close deals 24/7. While you sleep, we work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-white rounded-full px-8 py-6 text-lg w-full sm:w-auto neon-glow">
                Book a Free Demo
              </Button>
            </a>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg w-full sm:w-auto hover:bg-white/5 border-white/10">
              View Case Studies
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <div className="w-full py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-mono text-muted-foreground mb-8 uppercase tracking-widest">
            Trusted by innovators worldwide
          </p>
          <div className="relative flex overflow-x-hidden group">
            <div className="animate-marquee whitespace-nowrap flex space-x-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Repeated logos for marquee effect */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex space-x-24">
                  {["NVIDIA", "OPENAI", "MICROSOFT", "GOOGLE", "AMAZON", "META", "IBM"].map((partner) => (
                    <span key={partner} className="text-2xl font-bold font-mono text-white/40">{partner}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">Core Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your business runs 24/7. Your sales system should too.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 relative overflow-hidden bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono leading-tight">
                While You Close Deals, <br />
                <span className="text-primary">We Handle Everything Else</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We don't just build chatbots. We build revenue systems that work around the clock. Every inquiry answered. Every lead qualified. Every appointment booked. Automatically.
              </p>

              <div className="space-y-4">
                {[
                  "24/7 Lead Capture",
                  "Instant Response System",
                  "Automated Appointment Booking",
                  "WhatsApp & Voice Integration"
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              {/* Abstract 3D shape placeholder from Unsplash */}
              {/* geometric abstract dark red black */}
              <img
                src="/feature-image.png"
                alt="Abstract AI Visualization"
                className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-700"
              />

            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-32 relative border-t border-white/5 bg-black/40">
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
                <p className="font-mono text-primary text-sm mb-2 tracking-widest uppercase">[ FOUNDER & CEO ]</p>
                <h3 className="text-3xl font-bold">Abdul Moeez</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-primary text-xs tracking-[0.3em] mb-6 uppercase">[ THE VISION ]</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-mono leading-tight">
                Built to Solve <br />
                <span className="text-primary">One Real Problem</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  "Businesses lose thousands every month just because nobody answered the phone. I fixed that."
                </p>
                <p>
                  I've worked with real estate agencies, medical clinics, law firms, and service businesses across three continents. The problem is always the same—leads don't wait.
                </p>
                <p>
                  At Xenflow we build AI systems that respond instantly, qualify seriously, and book automatically. No missed calls. No lost leads. No wasted opportunities.
                </p>
              </div>
              <div className="mt-10 flex items-center space-x-6">
                <div className="h-px w-12 bg-primary" />
                <span className="font-mono text-sm tracking-widest uppercase">Abdul Moeez</span>
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
            <p className="font-mono text-primary text-xs tracking-[0.3em] mb-4 uppercase">[ OUR TEAM ]</p>
            <h2 className="text-4xl md:text-5xl font-bold font-mono uppercase tracking-tighter">The People Behind Xenflow</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Omer Farooq", role: "AI Chatbot Specialist", img: "/omer.png" },
              { name: "Saad Ahmed", role: "Voice Agent Developer", img: "/saad.png" },
              { name: "Hashim Sultan", role: "Systems & Integrations", img: "/hashim.png" },
              { name: "Ibrahim Zahid", role: "Client Experience", img: "/hashim.png" }
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
                <h3 className="text-xl font-bold font-mono">{member.name}</h3>
                <p className="text-sm text-primary font-mono tracking-widest uppercase mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-32 relative overflow-hidden bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="font-mono text-gray-500 text-xs tracking-[0.4em] uppercase mb-2">( ABOUT US )</p>
            <h2 className="text-4xl md:text-5xl font-bold font-mono text-white mt-4">We Are Xenflow</h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Left Column - Statistics */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {[
                { number: "$50K+", label: "Revenue Generated for Clients" },
                { number: "24/7", label: "Systems That Never Sleep" },
                { number: "100%", label: "Done For You Setup" },
                { number: "10x", label: "Faster Lead Response" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Middle Column - Text Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center h-full"
            >
              <h3 className="text-2xl font-bold mb-6 font-mono text-white">
                Engineering <br />
                <span className="text-primary">The Future</span>
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We are a dedicated team of AI specialists, system architects, and creative problem solvers.
                Our mission is simple: to eliminate inefficiency and unlock the full potential of your business through intelligent automation.
              </p>

              <div className="space-y-2">
                <p className="text-white text-lg font-mono">Built in Lahore, Pakistan</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 font-mono text-sm uppercase tracking-wider">SERVING CLIENTS WORLDWIDE</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Big Logo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center h-full min-h-[400px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-3xl blur-3xl" />
              <img
                src="/xenflow.png"
                alt="Xenflow Logo"
                className="relative w-full max-w-[400px] object-contain drop-shadow-[0_0_50px_rgba(255,0,0,0.3)]"
              />
            </motion.div>
          </div>
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
            <p className="font-mono text-primary text-xs tracking-[0.4em] mb-4 uppercase">[ CASE STUDIES ]</p>
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
                <p className="font-mono text-gray-500 text-xs tracking-[0.3em] uppercase mb-2">E-Commerce & Retail</p>
                <p className="font-mono text-primary text-sm tracking-wider mb-4">[ CASE STUDY 01 ]</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  From Missed Messages<br />
                  to 24/7 Revenue Machine
                </h3>
                <p className="text-gray-400 font-mono text-sm">Client: Global Beauty Brand</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* The Problem */}
                <div>
                  <h4 className="text-primary font-bold text-lg mb-4 font-mono">The Problem</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Thousands of Instagram and WhatsApp messages coming in daily. One small support team trying to keep up. Customers asking basic questions about products, orders, and returns—waiting hours for a reply.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    By the time someone responded, the customer had already left. Carts abandoned. Sales lost. Team burned out.
                  </p>
                </div>

                {/* What We Built */}
                <div>
                  <h4 className="text-primary font-bold text-lg mb-4 font-mono">What We Built</h4>
                  <p className="text-gray-300 leading-relaxed">
                    We deployed an AI assistant across Instagram, WhatsApp, and their website that handles everything automatically.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    It answers product questions instantly, tracks orders in real time, handles returns, and recommends products based on what the customer is looking for. Connected directly to their store and CRM so everything stays in sync.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    We also set up smart follow-up flows that message customers who left without buying. Personalized reminders, special offers—the right message at the right time.
                  </p>
                </div>

                {/* The Results */}
                <div>
                  <h4 className="text-primary font-bold text-lg mb-4 font-mono">The Results</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Response time dropped from 2 hours to under 10 seconds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Completed checkouts increased 150% in 60 days</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Support workload cut in half, team now focuses on VIP customers only</span>
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
                <p className="font-mono text-gray-500 text-xs tracking-[0.3em] uppercase mb-2">B2B SaaS</p>
                <p className="font-mono text-primary text-sm tracking-wider mb-4">[ CASE STUDY 02 ]</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  3x More Qualified Demos<br />
                  Without Hiring a Single SDR
                </h3>
                <p className="text-gray-400 font-mono text-sm">Client: Workflow Automation Platform</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* The Problem */}
                <div>
                  <h4 className="text-primary font-bold text-lg mb-4 font-mono">The Problem</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Sales reps were drowning in low quality demo requests. Spending hours every day just figuring out which leads were worth talking to. High intent buyers were slipping through because nobody got to them fast enough.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    Pipeline was messy. Forecasting was guesswork. Good leads were going cold.
                  </p>
                </div>

                {/* What We Built */}
                <div>
                  <h4 className="text-primary font-bold text-lg mb-4 font-mono">What We Built</h4>
                  <p className="text-gray-300 leading-relaxed">
                    We built an AI SDR that qualifies every single inbound lead before a human ever gets involved.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    It asks the right questions—company size, tech stack, budget, use case. Scores the lead automatically. Routes hot prospects directly to the right account executive with full context already filled in.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    Connected everything to HubSpot so the team always knows exactly where each lead stands and what to say next.
                  </p>
                </div>

                {/* The Results */}
                <div>
                  <h4 className="text-primary font-bold text-lg mb-4 font-mono">The Results</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300">3x more qualified demos booked every week, same team size</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Sales cycle shortened by 40% because reps showed up prepared</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-300">Pipeline quality improved, leadership could finally forecast accurately</span>
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
            <p className="font-mono text-gray-600 text-xs tracking-[0.4em] mb-4 uppercase">[ TESTIMONIALS ]</p>
            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-2">
              Don't take our word for it<span className="text-primary">*</span>
            </h2>
            <p className="font-mono text-primary text-xs tracking-[0.5em] font-bold">*TAKE THEIRS.</p>
          </motion.div>

          {/* Marquee Container */}
          <div className="relative overflow-hidden py-12">
            <div className="flex animate-marquee gap-16">
              {/* First Set */}
              {[
                {
                  quote: "Xenflow transformed our entire operational workflow. The AI integration was seamless and the results exceeded our expectations. Our team can now focus on strategic initiatives while the autonomous agents handle routine tasks.",
                  name: "Max Trudel",
                  role: "DIRECTOR / DOP",
                  company: "SIDE HIT FILMS",
                  image: "/team-alex-rivera.jpg"
                },
                {
                  quote: "Working with Xenflow was an absolute game-changer. Their neural architecture approach allowed us to scale our operations 10x without increasing headcount. The autonomous agents they built are essentially employees that never sleep.",
                  name: "Tj Walker",
                  role: "HEAD OF PRODUCTION",
                  company: "BOOMBOX",
                  image: "/team-sarah-chen.jpg"
                },
                {
                  quote: "Xenflow's ability to understand our business needs and architect custom AI solutions is unmatched. They didn't just deploy technology—they reimagined our entire process. Highly recommend for any serious business looking to leverage AI.",
                  name: "Charles Lacasse",
                  role: "FOUNDER",
                  company: "WE SCALE IT",
                  image: "/team-marcus-thorne.jpg"
                },
                {
                  quote: "The team at Xenflow combines technical excellence with creative vision. They built us a custom AI ecosystem that has revolutionized how we operate. The ROI was visible within the first quarter.",
                  name: "Jeremie Bouchard",
                  role: "DIRECTOR + EDITOR",
                  company: "W. HONORS",
                  image: "/team-elena-voss.jpg"
                },
                {
                  quote: "Xenflow's cognitive strategy approach helped us identify AI integration points we never considered. Their autonomous agents handle complex multi-step reasoning that would have required multiple team members.",
                  name: "Sarah Mitchell",
                  role: "CTO",
                  company: "NEXUS CORP",
                  image: "/team-alex-rivera.jpg"
                },
                {
                  quote: "The motion systems Xenflow created for us are extraordinary. They unified our brand identity with generative motion, creating dynamic interfaces that respond and evolve with user interaction at scale.",
                  name: "Marcus Sterling",
                  role: "FOUNDER",
                  company: "VOID LABS",
                  image: "/team-sarah-chen.jpg"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-[280px] md:w-[320px]"
                  style={{
                    marginTop: index % 2 === 0 ? '0px' : '80px'
                  }}
                >
                  <div className="group bg-black p-6 rounded-[24px] h-full transition-all duration-500 hover:bg-primary hover:scale-105 cursor-pointer border border-white/5 flex flex-col justify-between">
                    <p className="font-serif text-base md:text-lg text-white/90 italic leading-relaxed mb-6 group-hover:text-dark transition-colors duration-500">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xs uppercase group-hover:text-dark transition-colors duration-500">
                          {testimonial.name}
                        </h4>
                        <p className="font-mono text-primary text-[8px] uppercase tracking-widest group-hover:text-dark/70 transition-colors duration-500">
                          [{testimonial.role} @ {testimonial.company}]
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Duplicate Set for Seamless Loop */}
              {[
                {
                  quote: "Xenflow transformed our entire operational workflow. The AI integration was seamless and the results exceeded our expectations. Our team can now focus on strategic initiatives while the autonomous agents handle routine tasks.",
                  name: "Max Trudel",
                  role: "DIRECTOR / DOP",
                  company: "SIDE HIT FILMS",
                  image: "/team-alex-rivera.jpg"
                },
                {
                  quote: "Working with Xenflow was an absolute game-changer. Their neural architecture approach allowed us to scale our operations 10x without increasing headcount. The autonomous agents they built are essentially employees that never sleep.",
                  name: "Tj Walker",
                  role: "HEAD OF PRODUCTION",
                  company: "BOOMBOX",
                  image: "/team-sarah-chen.jpg"
                },
                {
                  quote: "Xenflow's ability to understand our business needs and architect custom AI solutions is unmatched. They didn't just deploy technology—they reimagined our entire process. Highly recommend for any serious business looking to leverage AI.",
                  name: "Charles Lacasse",
                  role: "FOUNDER",
                  company: "WE SCALE IT",
                  image: "/team-marcus-thorne.jpg"
                },
                {
                  quote: "The team at Xenflow combines technical excellence with creative vision. They built us a custom AI ecosystem that has revolutionized how we operate. The ROI was visible within the first quarter.",
                  name: "Jeremie Bouchard",
                  role: "DIRECTOR + EDITOR",
                  company: "W. HONORS",
                  image: "/team-elena-voss.jpg"
                },
                {
                  quote: "Xenflow's cognitive strategy approach helped us identify AI integration points we never considered. Their autonomous agents handle complex multi-step reasoning that would have required multiple team members.",
                  name: "Sarah Mitchell",
                  role: "CTO",
                  company: "NEXUS CORP",
                  image: "/team-alex-rivera.jpg"
                },
                {
                  quote: "The motion systems Xenflow created for us are extraordinary. They unified our brand identity with generative motion, creating dynamic interfaces that respond and evolve with user interaction at scale.",
                  name: "Marcus Sterling",
                  role: "FOUNDER",
                  company: "VOID LABS",
                  image: "/team-sarah-chen.jpg"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-[280px] md:w-[320px]"
                  style={{
                    marginTop: index % 2 === 0 ? '0px' : '80px'
                  }}
                >
                  <div className="group bg-black p-6 rounded-[24px] h-full transition-all duration-500 hover:bg-primary hover:scale-105 cursor-pointer border border-white/5 flex flex-col justify-between">
                    <p className="font-serif text-base md:text-lg text-white/90 italic leading-relaxed mb-6 group-hover:text-dark transition-colors duration-500">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xs uppercase group-hover:text-dark transition-colors duration-500">
                          {testimonial.name}
                        </h4>
                        <p className="font-mono text-primary text-[8px] uppercase tracking-widest group-hover:text-dark/70 transition-colors duration-500">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">Ready to Stop Losing Leads?</h2>
              <p className="text-muted-foreground">
                Let's talk. Tell us about your business and we'll show you exactly how Xenflow can work for you.
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
                          placeholder="Your Email"
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Tell Us Your Biggest Challenge With Leads"
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
                  className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg font-bold rounded-xl neon-glow"
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
            <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter uppercase text-transparent bg-clip-text" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              THE FUTURE IS AUTOMATED.
            </h2>
            <a href="#contact">
              <Button className="bg-primary text-black px-12 py-5 rounded-none font-mono text-sm tracking-widest font-bold transition-all hover:bg-white hover:text-black hover:shadow-[0_0_30px_#FF0000] active:scale-95 uppercase">
                NEVER MISS A LEAD AGAIN →
              </Button>
            </a>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-24 border-b border-white/10">
            {/* Col 1 - Logo & Status */}
            <div>
              <a href="#" className="text-2xl font-black tracking-tighter text-white mb-6 block">
                XEN<span className="text-primary">FLOW</span>
              </a>
              <div className="flex items-center space-x-2 font-mono text-[10px] tracking-widest uppercase text-gray-400">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span>SYSTEMS: OPERATIONAL</span>
              </div>
            </div>

            {/* Col 2 - Quick Links */}
            <div>
              <p className="font-mono text-gray-500 text-xs tracking-widest uppercase mb-8">[ QUICK LINKS ]</p>
              <ul className="space-y-4 font-mono text-sm uppercase tracking-wider">
                <li><a href="#work" className="hover:text-primary transition-colors">Work</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                <li><a href="#case-studies" className="hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Book a Demo</a></li>
              </ul>
            </div>

            {/* Col 3 - Connect */}
            <div>
              <p className="font-mono text-gray-500 text-xs tracking-widest uppercase mb-8">[ CONNECT ]</p>
              <ul className="space-y-4 font-mono text-sm uppercase tracking-wider">
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">X (Twitter)</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">WhatsApp</a></li>
              </ul>
            </div>

            {/* Col 4 - Contact */}
            <div>
              <p className="font-mono text-gray-500 text-xs tracking-widest uppercase mb-8">[ CONTACT ]</p>
              <div className="font-mono text-sm text-gray-400 leading-relaxed uppercase tracking-wider space-y-4">
                <p>+923274550477</p>
                <p>
                  Remote / Global.<br />
                  Based in Lahore, Pakistan
                </p>
              </div>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="pt-12 flex items-center justify-between">
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              © 2026 XENFLOW AI. ALL RIGHTS RESERVED.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-primary hover:text-white transition-colors"
            >
              <span className="text-xl font-bold font-mono uppercase tracking-widest">↑</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
