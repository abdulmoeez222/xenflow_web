import React from 'react';

export default function About() {
  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl border border-neutral-200 p-10 md:p-16 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-accent mb-6 text-center font-poppins">About XenFlowTech</h1>
        <p className="text-lg text-neutral-700 mb-6 text-center max-w-2xl">
          <span className="font-bold text-accent">XenFlowTech</span> is an AI automation agency dedicated to helping businesses unlock their full potential with cutting-edge artificial intelligence solutions. Our mission is to empower companies of all sizes to automate, innovate, and grow—faster and smarter than ever before.
        </p>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-2">How We Work</h2>
          <ul className="list-disc list-inside text-neutral-700 text-left space-y-1">
            <li><span className="font-semibold">Discovery:</span> We start by understanding your business, goals, and challenges.</li>
            <li><span className="font-semibold">Strategy:</span> Our experts design a custom AI automation plan tailored to your needs.</li>
            <li><span className="font-semibold">Implementation:</span> We build, integrate, and deploy AI solutions with minimal disruption to your workflow.</li>
            <li><span className="font-semibold">Support:</span> We provide ongoing support, optimization, and training to ensure your success.</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-2">Why Choose XenFlowTech?</h2>
          <ul className="list-disc list-inside text-neutral-700 text-left space-y-1">
            <li>We make AI automation simple, accessible, and effective for every business—no technical expertise required.</li>
            <li>Our solutions are secure, scalable, and designed for real business impact.</li>
            <li>We handle the complexity, so you can focus on what matters most: growing your business.</li>
            <li>Transparent communication and a partnership approach from start to finish.</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-2">Our Vision</h2>
          <p className="text-neutral-700">To be the leading force in AI-driven business transformation, making advanced automation accessible, secure, and impactful for every organization.</p>
        </div>
        <div className="mt-8 text-center">
          <span className="inline-block bg-accent text-white font-bold px-6 py-3 rounded-full shadow-lg text-lg">Ready to automate your business? <a href="/contact" className="underline ml-2">Contact us today!</a></span>
        </div>
      </div>
    </section>
  );
} 