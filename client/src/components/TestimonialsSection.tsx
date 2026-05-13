import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Khan",
    role: "Founder, Nexa Dental",
    content: "Xenflow gave us structure, speed, and systems. We stopped firefighting and started scaling our dental network.",
    avatar: "SK"
  },

  {
    name: "Meera Nair",
    role: "COO, SaaSGrid",
    content: "The custom automation build alone paid for itself in weeks. Our onboarding time dropped from days to minutes.",
    avatar: "MN"
  },
  {
    name: "Hassan Tariq",
    role: "CEO, Atlas Commerce",
    content: "They move fast without cutting corners. The Cloud Pharmacy platform they built is secure, scalable, and intuitive.",
    avatar: "HT"
  },
  {
    name: "Lina Bashir",
    role: "Managing Partner, LegalFlow",
    content: "The AI voice agent they deployed handles our initial consultations perfectly. It sounds incredibly human and never misses a lead.",
    avatar: "LB"
  },

  {
    name: "Sofia Chen",
    role: "Founder, RentEase",
    content: "Our Rental Management System is now a complete ecosystem. Automated lease assignations and payments have saved us countless hours.",
    avatar: "SC"
  },

  {
    name: "Elena Rodriguez",
    role: "Operations, BioTech Solutions",
    content: "We needed a custom head detection model for our research facility. Xenflow delivered a high-accuracy CNN model that surpassed all benchmarks.",
    avatar: "ER"
  },
  {
    name: "David Park",
    role: "CEO, SwiftLogistics",
    content: "The hyper-scale email automation Xenflow implemented handles 10k personalized reach-outs daily. Engagement rates have never been higher.",
    avatar: "DP"
  },
  {
    name: "Ayesha Malik",
    role: "Founder, PetCare Plus",
    content: "From our Pet Clinic web platform to automated lead capture, Xenflow built the entire digital infrastructure for our growth.",
    avatar: "AM"
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 relative bg-background overflow-hidden">
      {/* Graph Paper Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="relative z-10 w-full">
        {/* Heading in Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <p className="font-sans font-medium text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine text-xs tracking-[0.3em] mb-4 uppercase">[ TESTIMONIALS ]</p>
          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight mb-4 text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine uppercase leading-tight">
            Don't take our word for it*<br />
            *TAKE THEIRS
          </h2>
          <p className="max-w-2xl mx-auto text-base text-gray-500 font-sans">
            From first-time founders to established businesses — here's what working with us feels like.
          </p>
        </div>

        {/* Full-width Scrolling Marquee Container */}
        <div className="relative w-full py-10">
          {/* Fade Masks for In/Out effect */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="flex gap-6 whitespace-nowrap will-change-transform"
          >
            {/* Duplicate for seamless loop */}
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="w-[340px] flex-shrink-0 bg-gradient-to-br from-white via-white to-gray-100 p-8 rounded-[2rem] border-[1.5px] border-black shadow-[0_10px_30px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.8)] relative group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,1)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Shining reflection effect */}
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[100%]" />

                <div className="flex flex-col h-full space-y-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-base font-sans italic text-gray-800 leading-relaxed whitespace-normal">
                    "{t.content}"
                  </p>

                  <div className="flex items-center gap-3 pt-4">
                    <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center font-heading font-black text-black text-xs">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="font-heading font-black text-black text-xs uppercase tracking-wider">{t.name}</h4>
                      <p className="text-[10px] text-gray-500 font-sans">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
