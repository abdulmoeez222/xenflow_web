import { Link } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Our Team", href: "#team" },
    { name: "Projects", href: "#projects" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header className="fixed top-2 left-0 right-0 z-50 px-6">
      <nav className="max-w-6xl mx-auto flex items-center justify-between pl-1 md:pl-2 pr-4 md:pr-8 py-1.5 glass-card rounded-full border border-black/5 shadow-2xl relative overflow-hidden">
        {/* End Gradients - Shrunk left to prevent masking logo */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-0" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-0" />
        {/* Left: Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer group"
        >
          <div className="relative h-[38px] md:h-[48px] w-52 md:w-72 overflow-hidden flex items-center justify-center -ml-6 md:-ml-12">
            <img 
              src="/Logo.png" 
              alt="XENFLOW" 
              className="h-full w-full object-contain scale-[2.2] md:scale-[2.8] transform-gpu translate-x-0 md:translate-x-0 transition-transform duration-300 hover:scale-[3.0] relative z-10 will-change-transform"
            />
          </div>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith("#")) {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-xs font-bold text-black hover:text-primary transition-all duration-200 uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="hidden md:block">
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}>
            <Button
              className="px-6 py-2 rounded-full text-xs font-bold tracking-wide transform hover:scale-105 active:scale-95 btn-shiny-black"
            >
              Book Demo
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground hover:text-primary transition-colors p-2"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-white/90 backdrop-blur-xl border border-black/5 rounded-3xl mt-4"
      >
        <div className="px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                setIsOpen(false);
                if (link.href.startsWith("#")) {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="block text-sm font-bold text-black hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }} className="block pt-4">
            <Button className="w-full rounded-full font-bold btn-shiny-black">
              Book Demo
            </Button>
          </a>
        </div>
      </motion.div>
    </header>
  );
}
