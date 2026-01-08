import React from 'react';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

const caseStudies = [
  {
    sector: 'E-commerce & Retail',
    client: 'Global Beauty Brand',
    title: 'From Manual DMs to 24/7 Revenue Engine',
    problem:
      'The brand was losing sales because support agents couldn’t keep up with thousands of Instagram and WhatsApp messages. Customers waited hours for basic answers about products, orders, and returns, leading to abandoned carts and frustrated buyers.',
    solution: [
      'Deployed a multilingual AI assistant across Instagram, WhatsApp, and the website to answer product, order, and policy questions 24/7.',
      'Integrated the bot with their e‑commerce platform and CRM to pull live inventory, recommend products, and track orders in real time.',
      'Set up intelligent follow-up flows to recover abandoned carts and nurture cold leads automatically.',
    ],
    impact: [
      'Cut average response time from 2+ hours to under 10 seconds, even during campaign spikes.',
      'Increased completed checkouts by 150% within 60 days through personalized reminders and offers.',
      'Reduced manual support workload by 50%, allowing the team to focus on high-value VIP customers.',
    ],
  },
  {
    sector: 'B2B SaaS',
    client: 'Workflow Automation Platform',
    title: 'Tripling Qualified Demos Without Hiring More SDRs',
    problem:
      'The sales team was overwhelmed with low-quality demo requests and cold leads. Reps were spending hours triaging prospects, which slowed follow-ups and caused high-intent buyers to slip through the cracks.',
    solution: [
      'Implemented an AI SDR that pre‑qualifies every inbound lead on the website and via email, asking smart questions about company size, tech stack, and use cases.',
      'Connected the agent to HubSpot to automatically score leads, enrich profiles, and route qualified opportunities to the right account executive.',
      'Built automated follow-up cadences that send tailored messages based on user behavior and stage in the funnel.',
    ],
    impact: [
      '3× increase in weekly qualified demos booked with the same size sales team.',
      '40% reduction in average sales cycle by engaging decision-makers faster and with better context.',
      'A clearer, data-driven view of pipeline quality, helping leadership forecast revenue more accurately.',
    ],
  },
  {
    sector: 'Financial Services',
    client: 'Digital Lending Provider',
    title: 'Real-Time Loan Approvals With AI Underwriting',
    problem:
      'Loan applications were reviewed manually, taking 24–48 hours for a decision. This slowed growth, frustrated applicants, and increased the risk of inconsistent underwriting decisions and missed fraud signals.',
    solution: [
      'Built an AI-powered document pipeline that reads bank statements, IDs, and payslips in seconds using OCR and NLP.',
      'Designed a risk-scoring engine that combines credit bureau data, transaction patterns, and custom business rules.',
      'Automated decision workflows so low‑risk applications are approved instantly while edge cases are routed to human underwriters with a full audit trail.',
    ],
    impact: [
      'Reduced time-to-decision from 48 hours to under 15 minutes for 70% of applications.',
      'Cut manual review effort by 60%, allowing underwriters to focus on complex, high-value cases.',
      'Lowered fraud-related losses by 30% while maintaining strict compliance and transparency.',
    ],
  },
];

export default function Portfolio() {
  const [sectionRef, sectionRevealed] = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-neutral-950 via-primary to-neutral-900 relative overflow-hidden reveal${sectionRevealed ? ' revealed' : ''}`}
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, rgba(177,0,30,0.25) 0%, transparent 55%), radial-gradient(circle at 85% 80%, rgba(215,38,61,0.25) 0%, transparent 55%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="text-accent font-semibold tracking-[0.25em] uppercase mb-3 sm:mb-4 text-sm sm:text-base">Case Studies</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-4 leading-tight font-poppins px-4">
            Real Businesses. <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Real Results.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-light/80 max-w-3xl mx-auto px-4">
            See how XenFlowTech partners with companies to turn complex challenges into measurable wins using AI automation and full‑stack development.
          </p>
        </div>

        {/* Case Study Sections */}
        <div className="space-y-10 sm:space-y-12 md:space-y-16">
          {caseStudies.map((cs, index) => (
            <article
              key={cs.title}
              className="relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-white/10 shadow-2xl"
              style={{
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* Accent stripe */}
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-accent2" />

              <div className="relative z-10 space-y-4 sm:space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">{cs.sector}</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug mt-1">{cs.title}</h2>
                    <p className="text-light/70 text-xs sm:text-sm md:text-base mt-1 uppercase tracking-[0.12em]">
                      Client: {cs.client}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-flex items-center rounded-full bg-black/40 border border-accent/40 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                      Case Study {index + 1}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4">
                  {/* Problem */}
                  <div className="md:col-span-1 bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10">
                    <h3 className="text-xs sm:text-sm font-semibold text-light/60 tracking-[0.18em] uppercase mb-2">The Problem</h3>
                    <p className="text-light/80 text-xs sm:text-sm md:text-base leading-relaxed">{cs.problem}</p>
                  </div>

                  {/* Our Solution */}
                  <div className="md:col-span-1 bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10">
                    <h3 className="text-xs sm:text-sm font-semibold text-light/60 tracking-[0.18em] uppercase mb-2">Our Solution</h3>
                    <ul className="list-none space-y-2 text-xs sm:text-sm md:text-base text-light/80">
                      {cs.solution.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div className="md:col-span-1 bg-black/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10">
                    <h3 className="text-xs sm:text-sm font-semibold text-light/60 tracking-[0.18em] uppercase mb-2">Impact</h3>
                    <ul className="list-none space-y-2 text-xs sm:text-sm md:text-base text-light/80">
                      {cs.impact.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 bg-gradient-to-r from-accent/20 to-accent2/20 border border-accent/30 rounded-2xl sm:rounded-3xl px-6 sm:px-8 md:px-12 py-6 sm:py-6 md:py-8 backdrop-blur-2xl">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                Ready to create your own success<br className="hidden sm:block" />
                story?
              </h3>
              <p className="text-light/80 text-xs sm:text-sm md:text-base mt-3">
                Share your goals with us and we'll design a tailored AI automation and full‑stack strategy to help you
                achieve measurable results.
              </p>
            </div>
            <a href="/contact" className="animated-border inline-block flex-shrink-0 w-full md:w-auto">
              <span className="animated-border-content text-white font-bold px-6 sm:px-8 py-3 text-sm md:text-base block">
                Book a Case Study Call
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}