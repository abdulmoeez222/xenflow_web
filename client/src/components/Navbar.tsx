import { Link } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Our Tech", href: "#tech" },
    { name: "Case Studies", href: "#work" },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 glass-card rounded-full border border-white/10 shadow-2xl">
        {/* Left: Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer group"
        >
          <span className="font-mono text-2xl font-bold tracking-tighter text-white">
            XEN<span className="text-primary group-hover:neon-glow transition-all duration-300">FLOW</span>
          </span>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-muted-foreground hover:text-white transition-all duration-200 uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="hidden md:block">
          <a href="#contact">
            <Button
              className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-full text-xs font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,0,0,0.3)]"
            >
              Get Started
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-primary transition-colors p-2"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border border-white/10 rounded-3xl mt-4"
      >
        <div className="px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-white transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="block pt-4">
            <Button className="w-full bg-primary hover:bg-red-700 text-white rounded-full">
              Get Started
            </Button>
          </a>
        </div>
      </motion.div>
    </header>
  );
}
