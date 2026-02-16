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
import { Brain, Cpu, Globe, Rocket, Shield, Zap } from "lucide-react";
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
      title: "AI Integration",
      description: "Seamlessly integrate state-of-the-art AI models into your existing infrastructure for enhanced automation.",
      icon: Brain,
    },
    {
      title: "Neural Networks",
      description: "Custom deep learning architectures designed to solve your specific complex data problems.",
      icon: Cpu,
    },
    {
      title: "Global Scale",
      description: "Distributed AI systems that scale effortlessly across regions with minimal latency.",
      icon: Globe,
    },
    {
      title: "Rapid Deployment",
      description: "From prototype to production in record time using our proprietary MLOps pipeline.",
      icon: Rocket,
    },
    {
      title: "Secure Core",
      description: "Enterprise-grade security protocols ensuring your models and data remain protected.",
      icon: Shield,
    },
    {
      title: "Real-time Processing",
      description: "Edge computing solutions for millisecond-latency inference in critical applications.",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <Navbar />

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
              The Future is Now
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-tight"
          >
            SCALING
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              INTELLIGENCE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12 leading-relaxed"
          >
            We build the neural infrastructure for the next generation of digital experiences.
            Automate, optimize, and evolve with Xenflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-white rounded-full px-8 py-6 text-lg w-full sm:w-auto neon-glow">
                Initialize Project
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
              Our technological stack is built on the bleeding edge of artificial intelligence research.
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
                Architecting the <br />
                <span className="text-primary">Digital Consciousness</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We don't just build software; we create adaptive systems that learn and evolve with your business. 
                Our approach combines rigorous mathematical modeling with intuitive user experience design.
              </p>
              
              <div className="space-y-4">
                {[
                  "Predictive Analytics Engine",
                  "Natural Language Processing",
                  "Computer Vision Systems",
                  "Autonomous Agent Swarms"
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
              className="relative aspect-square rounded-2xl overflow-hidden glass-card p-1"
            >
              {/* Abstract 3D shape placeholder from Unsplash */}
              {/* geometric abstract dark red black */}
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60"
                alt="Abstract AI Visualization"
                className="w-full h-full object-cover rounded-xl opacity-80 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60"
                alt="Julian Xenflow - Founder"
                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <p className="font-mono text-primary text-sm mb-2 tracking-widest uppercase">[ FOUNDER & CEO ]</p>
                <h3 className="text-3xl font-bold">Julian Xenflow</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-primary text-xs tracking-[0.3em] mb-6 uppercase">[ THE VISION ]</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-mono leading-tight">
                The Intersection of <br />
                <span className="text-primary">Logic and Creativity</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  "Evolution has taught us a single lesson: that artificial intelligence should not just replace labor, but amplify human potential."
                </p>
                <p>
                  After years of pioneering AI labs from Baltic systems to quantum intelligence, I built Xenflow to bring that clarity back into the system-level process.
                </p>
                <p>
                  At Xenflow, we don't just 'deploy' AI. We architect bespoke ecosystems where intuition meets hyper-modal logic. We create systems that allow founders to step away from the mundane and back into their true vision.
                </p>
              </div>
              <div className="mt-10 flex items-center space-x-6">
                <div className="h-px w-12 bg-primary" />
                <span className="font-mono text-sm tracking-widest uppercase">Julian Xenflow</span>
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
            <p className="font-mono text-primary text-xs tracking-[0.3em] mb-4 uppercase">[ OUR AGENTS ]</p>
            <h2 className="text-4xl md:text-5xl font-bold font-mono uppercase tracking-tighter">Selected Intelligence</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Rivera", role: "Neural Architect", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60" },
              { name: "Sarah Chen", role: "LLM Specialist", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60" },
              { name: "Marcus Thorne", role: "Core Systems", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60" },
              { name: "Elena Voss", role: "UX Perception", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60" }
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">Initialize Sequence</h2>
              <p className="text-muted-foreground">
                Ready to upgrade your infrastructure? Send us a transmission.
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
                          placeholder="Agent Name" 
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
                          placeholder="Communication Frequency (Email)" 
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
                          placeholder="Mission Parameters (Message)" 
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
                  {createContact.isPending ? "Transmitting..." : "Execute Transmission"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-muted-foreground">
          <div className="mb-4 md:mb-0 font-mono">
            XENFLOW SYSTEMS © 2024
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Engagement</a>
            <a href="#" className="hover:text-primary transition-colors">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
