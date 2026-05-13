import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  fullImage?: boolean;
  imageFit?: "cover" | "contain" | "fill";
  imageScale?: string;
  imageHoverScale?: string;
}

interface Category {
  id: string;
  name: string;
  projects?: Project[];
  listItems?: string[];
}

const projectData: Category[] = [
  {
    id: "software",
    name: "Website & Software Dev",
    projects: [
      {
        id: 1,
        title: "Rental Management System",
        description: "A comprehensive property ecosystem that handles units, tenants, and automated lease assignations. Features a robust payment engine with automated notifications for upcoming and overdue payments. The clean administrative dashboard provides real-time visibility into expenses, collection metrics, and occupancy status of buildings and units.",
        image: "/rentalmanagement.png",
        fullImage: true,
        imageFit: "fill",
        imageScale: "scale-x-[1.30] scale-y-[1.10]",
        imageHoverScale: "hover:scale-x-[1.35] hover:scale-y-[1.15]"
      },
      {
        id: 2,
        title: "Cloud Pharmacy Management",
        description: "A secure, cloud-based platform featuring role-based access control and advanced inventory management. Streamlines pharmaceutical operations with a dynamic dashboard that monitors stock levels, tracks payments, and manages online order collections with real-time notifications.",
        image: "/CloudPharmacyManagement.png",
        fullImage: true,
        imageFit: "fill",
        imageScale: "scale-y-[1.20] scale-x-[1.80]",
        imageHoverScale: "hover:scale-y-[1.25] hover:scale-x-[1.85]"
      }
    ]
  },
  {
    id: "ai",
    name: "AI SYSTEMS",
    projects: [
      {
        id: 1,
        title: "Human-Like Voice Agent",
        description: "A sophisticated AI voice agent designed to handle customer support and meeting bookings with natural, human-like speech. Features a centralized dashboard for tracking leads, Calendly integrations, booked meetings, and full call transcripts.",
        image: "/dashboard-voice-agent.png",
        fullImage: true,
        imageFit: "fill",
        imageScale: "scale-x-[1.10] scale-y-[1.10]",
        imageHoverScale: "hover:scale-x-[1.15] hover:scale-y-[1.15]"
      },
      {
        id: 2,
        title: "Instant Chatbot Generator",
        description: "An automated system that builds a custom AI chatbot in seconds. Simply provide a website URL; the tool scrapes all relevant data and generates a fully-trained, context-aware chatbot ready for deployment.",
        image: "/ChatbotGenerationTool.png",
        fullImage: true,
        imageFit: "fill",
        imageScale: "scale-x-[1.60] scale-y-[1.25]",
        imageHoverScale: "hover:scale-x-[1.65] hover:scale-y-[1.30]"
      },
      {
        id: 3,
        title: "AI Content Strategy Board",
        description: "A comprehensive content planner and management system. Features a visual board for scheduling posts while the underlying AI analyzes competitors and real-time trends to suggest high-converting content ideas.",
        image: "/AI Content Strategy Board.png",
        fullImage: true,
        imageFit: "fill",
        imageScale: "scale-x-[1.10] scale-y-[1.10]",
        imageHoverScale: "hover:scale-x-[1.15] hover:scale-y-[1.15]"
      },
      {
        id: 4,
        title: "Hyper-Scale Email Automation",
        description: "Powerful email orchestration tool capable of sending 10,000 highly personalized emails per day without spamming. Includes automated multi-step follow-ups and advanced reply tracking for maximum engagement.",
        image: "/emailautomationtool.png",
        fullImage: true,
        imageFit: "fill",
        imageScale: "scale-x-[1.30] scale-y-[1.10]",
        imageHoverScale: "hover:scale-x-[1.35] hover:scale-y-[1.15]"
      },
      {
        id: 5,
        title: "AI SEO Engine",
        description: "An automated SEO powerhouse that performs complete search engine optimization of your website from just a single link. It analyzes your content, identifies keywords, and implements on-page improvements instantly."
      }
    ]
  },

];

export function ProjectSection() {
  const [activeCategory, setActiveCategory] = useState(projectData[0].id);

  const currentCategory = projectData.find(cat => cat.id === activeCategory);

  return (
    <section id="projects" className="py-32 relative border-t border-black/5 bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-sans font-medium text-primary text-xs tracking-[0.3em] mb-4 uppercase">[ OUR WORK ]</p>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight uppercase text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine">Projects</h2>
        </motion.div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {projectData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full border border-black/10 font-sans font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-black hover:text-white ${
                activeCategory === category.id ? "bg-black text-white" : "bg-transparent text-gray-500"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Project Content */}
        <div className="space-y-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-32">
                {currentCategory?.projects?.map((project, index) => (
                  <div 
                    key={project.id}
                    className={`flex flex-col ${project.image ? (index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse') : 'w-full text-center'} gap-12 lg:gap-20 items-center justify-center`}
                  >
                    {/* Text Column */}
                    <div className={`${project.image ? 'flex-1' : 'max-w-3xl'} space-y-6`}>
                      <div className="space-y-2">
                        <span className="text-primary font-sans font-medium text-xs tracking-widest uppercase">[ PROJECT 0{project.id} ]</span>
                        <h3 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-[linear-gradient(110deg,#000,35%,#444,50%,#000)] bg-[length:200%_100%] animate-shine">{project.title}</h3>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed font-sans">
                        {project.description}
                      </p>
                    </div>

                    {/* Image Column */}
                    {project.image && (
                      <div className="flex-[1.2] w-full">
                        <div className={`relative aspect-video rounded-3xl overflow-hidden glass-card ${project.fullImage ? 'p-0' : 'p-4 lg:p-12'} bg-white/5`}>
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <img 
                            src={project.image} 
                            alt={project.title}
                            loading="lazy"
                            decoding="async"
                            className={`w-full h-full object-${project.imageFit || (project.fullImage ? 'cover' : 'contain')} transition-all duration-700 ${project.imageScale || ''} ${project.imageHoverScale || 'hover:scale-[1.05]'} drop-shadow-2xl`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}


              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
