import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-16">
      <div className="bg-dark/90 rounded-2xl shadow-2xl p-10 md:p-16 flex flex-col items-center border border-accent/20">
        <h1 className="text-6xl font-extrabold text-accent mb-4 font-poppins">404</h1>
        <h2 className="text-2xl font-bold text-light mb-4">Page Not Found</h2>
        <p className="text-neutral-300 mb-8 text-center max-w-md">Sorry, the page you’re looking for doesn’t exist or has been moved. Let’s get you back on track!</p>
        <Link to="/" className="bg-accent hover:bg-accent2 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg">Go Home</Link>
      </div>
    </section>
  );
} 