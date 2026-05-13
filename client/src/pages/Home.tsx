import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { FloatingShape } from "@/components/FloatingShape";
import { useCreateContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectSection } from "@/components/ProjectSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Globe, Zap, Puzzle, Megaphone, Brain } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef } from "react";

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
      title: "Software Development",
      description: "Custom software built for your business workflows — from desktop tools to full-scale enterprise systems. Scalable, maintainable, and engineered to last.",
      icon: Code2,
    },
    {
      title: "Web Development",
      description: "We craft both immersive 3D interactive web experiences and high-performance static sites. From Three.js-powered visuals to lightning-fast landing pages.",
      icon: Globe,
    },
    {
      title: "AI Automation",
      description: "End-to-end workflow automation using n8n, LangChain, or custom-built pipelines. We identify bottlenecks in your operations and eliminate them with AI.",
      icon: Zap,
    },
    {
      title: "Custom Solutions",
      description: "No template fits your problem? We build from scratch. Bespoke tools, integrations, and systems precisely engineered around your unique requirements.",
      icon: Puzzle,
    },

    {
      title: "AI Systems",
      description: "Production-grade ML models, voice calling agents, autonomous AI chatbots, and fully automated chatbot generation tools — built and deployed end to end.",
      icon: Brain,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section - compact spacing so CTAs stay fully visible on all viewports */}
      <section id="home" ref={scrollRef} className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-24">
        {/* Dynamic Shapes */}
        <FloatingShape className="w-64 h-64 top-[10%] left-[5%] bg-primary/20" delay={0} duration={25} />
        <FloatingShape className="w-96 h-96 bottom-[20%] right-[10%] bg-primary/10" delay={2} duration={30} />
        <FloatingShape className="w-48 h-48 top-[40%] right-[25%] bg-black/5" delay={5} duration={20} />

        <div className="absolute top-[-30%] left-[-15%] w-[600px] h-[600px] bg-black/[0.3] blur-[140px] rounded-full pointer-events-none will-change-[filter]" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[600px] h-[600px] bg-black/[0.3] blur-[140px] rounded-full pointer-events-none will-change-[filter]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity }}
          className="relative z-10 max-w-5xl mx-auto text-center will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-3 sm:mb-5 md:mb-6 inline-block"
          >
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-sans font-medium tracking-widest uppercase">
              AI-Native Software Company
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[40px] md:text-[72px] font-heading font-black leading-[1.0] text-[#111827] mb-6 sm:mb-8 md:mb-10 uppercase flex flex-col items-center justify-center text-center tracking-tighter"
          >
            <span>Software</span>
            <span className="text-primary">That Thinks.</span>
            <span className="text-black/40">Not Just Runs.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto text-[15px] font-sans font-normal leading-[25.5px] text-[#4B5563] mb-6 sm:mb-8 md:mb-10 text-center"
          >
            We build mobile apps, web platforms, POS systems, ERP, CRM, and management software with AI embedded by default. Not bolted on. Not optional. Native.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <Button size="lg" className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto btn-shiny-black">
                Start a Project
              </Button>
            </a>
            <Button variant="outline" size="lg" onClick={() => { const el = document.getElementById('projects'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }} className="rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto hover:bg-background/5 border-black/10">
              View Our Work
            </Button>
          </motion.div>
        </motion.div>
      </section>



      {/* Services Section */}
      <section id="services" className="py-32 relative bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-primary font-sans font-medium text-xs tracking-[0.3em] uppercase mb-4">
              [ WHAT WE BUILD ]
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">Services Built for the Real World</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>





      {/* Founder Section */}
      <section id="about" className="py-32 relative border-t border-black/5 bg-secondary/40">
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
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
              <div className="absolute bottom-8 left-8">
                <p className="font-sans font-medium text-white text-sm mb-2 tracking-widest uppercase">[ FOUNDER ]</p>
                <h3 className="text-3xl font-extrabold tracking-headline text-white">Abdul Moeez</h3>
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
                <p className="font-bold italic text-black">
                  "We believe that true growth shouldn't be bottlenecked by outdated systems or inefficient processes."
                </p>
                <p>
                  Working with businesses globally, the pattern is obvious: companies struggle when they lack cohesive ecosystems. Without a unified digital presence and smooth internal processes, they bleed time and money.
                </p>
                <p>
                  Xenflow was built to solve this. We engineer custom solutions tailored exactly to your needs. If you lack a professional digital footprint and need high-performance systems to guarantee growth, we deliver the complete solution.
                </p>
                <p>
                  We implement robust POS systems and integrate them with seamless workflow automations to streamline your operations. We put your business on autopilot so you can focus on scaling.
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
      <section id="team" className="py-32 relative bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="font-sans font-medium text-white/50 text-xs tracking-[0.3em] mb-4 uppercase">[ OUR TEAM ]</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight uppercase text-white">The People Behind Xenflow</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Abdul Moeez",
                role: "Founder",
                img: "/moiz.png",
                desc: "Visionary behind Xenflow. Drives strategy, product direction, and client relationships."
              },
              {
                name: "Saad Ahmed",
                role: "Project Manager",
                img: "/saad.png",
                desc: "Keeps every project on track — from kickoff to delivery, on time and on scope."
              },
              {
                name: "Omer Farooq",
                role: "Team Lead",
                img: "/omer.png",
                desc: "Technical leadership across development, AI, and automation engagements."
              },
              {
                name: "Hashim Sultan",
                role: "Operations Head",
                img: "/hashim.png",
                desc: "Manages internal systems, processes, and ensures smooth day-to-day operations."
              }
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
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">{member.name}</h3>
                <p className="text-xs text-gray-400 font-sans font-medium tracking-widest uppercase mt-1">{member.role}</p>
                <p className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <p className="font-sans font-medium text-primary text-xs tracking-[0.3em] mb-4 uppercase">[ HOW WE WORK ]</p>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-6 text-black">A Clear Path from Brief to Results</h2>
            <p className="max-w-2xl mx-auto text-[15px] font-sans font-normal leading-relaxed text-gray-500">
              No guesswork. No scope creep. Just a repeatable process that works.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-x-4 lg:gap-x-8 lg:px-0 md:px-12">
            {[
              { title: "Discovery", desc: "Understanding your vision and defining success metrics." },
              { title: "Strategize", desc: "Mapping the blueprint for your custom system." },
              { title: "Build", desc: "Engineering your solution with precision and scale." },
              { title: "Deploy", desc: "Seamless integration and production launch." },
              { title: "Management", desc: "Continuous optimization and proactive growth." }
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`flex flex-col items-center group ${
                  i % 2 === 0 ? "md:translate-y-8" : "md:-translate-y-8"
                }`}
              >
                <div className="w-full h-[220px] xl:h-[240px] rounded-3xl p-6 lg:p-4 xl:p-8 flex flex-col items-center justify-center text-center btn-shiny-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6 text-white font-black text-xl group-hover:bg-primary/50 group-hover:border-primary transition-all">
                    {i + 1}
                  </div>
                  <h3 className="text-base xl:text-lg font-heading font-black text-white mb-3 uppercase tracking-wider">{step.title}</h3>
                  <p className="text-[10px] xl:text-[11px] text-gray-400 font-sans leading-relaxed group-hover:text-white transition-colors">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <ProjectSection />
      <TestimonialsSection />

      <section id="contact" className="py-32 relative bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-black/10"
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
                          className="bg-background/5 border-black/10 focus:border-primary/50 min-h-[50px] text-lg"
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
                          className="bg-background/5 border-black/10 focus:border-primary/50 min-h-[50px] text-lg"
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
                          className="bg-background/5 border-black/10 focus:border-primary/50 min-h-[50px] text-lg"
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
                          className="bg-background/5 border-black/10 focus:border-primary/50 min-h-[150px] text-lg resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={createContact.isPending}
                  className="w-full h-14 text-lg font-heading font-bold tracking-wide rounded-xl btn-shiny-black"
                >
                  {createContact.isPending ? "Sending..." : "Book My Free Demo →"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-16 border-t border-black/10 bg-secondary/30 relative overflow-hidden">
        {/* Top Divider */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary" />
        
        {/* BG Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Center CTA */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-heading font-extrabold tracking-tighter mb-12 uppercase text-black">
              THE FUTURE IS BUILT.
            </h2>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <Button className="px-12 py-5 rounded-none font-heading font-bold text-sm tracking-widest uppercase btn-shiny-black">
                START YOUR PROJECT →
              </Button>
            </a>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-black/10">
            {/* Col 1 - Logo & Status */}
            <div>
              <a href="#" className="mb-6 block">
              <div className="relative h-[38px] md:h-[48px] w-48 md:w-64 overflow-hidden flex items-center justify-start -ml-4 md:-ml-8">
                <img 
                  src="/Logo.png" 
                  alt="XENFLOW" 
                  className="h-full w-full object-contain scale-[2.2] md:scale-[2.8]"
                />
              </div>
              </a>
            </div>

            {/* Col 2 - Quick Links */}
            <div>
              <p className="font-sans font-medium text-black text-xs tracking-widest uppercase mb-8">[ QUICK LINKS ]</p>
              <ul className="space-y-4 font-sans font-medium text-sm uppercase tracking-wider">
                <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                <li><a href="#team" className="hover:text-primary transition-colors">Our Team</a></li>
                <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Col 3 - Connect */}
            <div>
              <p className="font-sans font-medium text-black text-xs tracking-widest uppercase mb-8">[ CONNECT ]</p>
              <ul className="space-y-4 font-sans font-medium text-sm uppercase tracking-wider">
                <li><a href="https://www.linkedin.com/feed/update/urn:li:activity:7427690910181675008" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="https://x.com/Xenflowtech" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">X (Twitter)</a></li>
                <li><a href="https://www.instagram.com/xenflow.tech/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="https://wa.me/923274550477" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a></li>
              </ul>
            </div>

            {/* Col 4 - Contact */}
            <div>
              <p className="font-sans font-medium text-black text-xs tracking-widest uppercase mb-8">[ CONTACT ]</p>
              <div className="font-sans font-medium text-sm text-black leading-relaxed uppercase tracking-wider space-y-4">
                <p>+92 327 455 0477</p>
                <p>support@xenflow.agency</p>
                <p>
                  Remote-First Company<br />
                  Based in Lahore, Pakistan
                </p>
              </div>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-sans font-medium text-gray-600 uppercase tracking-widest text-center md:text-left">
              © 2026 XENFLOW AI. ALL RIGHTS RESERVED.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-primary hover:text-foreground transition-colors"
            >
              <span className="text-xl font-bold font-sans font-medium uppercase tracking-widest">↑</span>
            </button>
          </div>
        </div>
      </footer>
    </div >
  );
}