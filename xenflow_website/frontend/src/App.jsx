import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import BookMeeting from './pages/BookMeeting';
import Blog from './pages/Blog';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ChatbotWidget from './components/ChatbotWidget';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-primary text-light font-roboto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-meeting" element={<BookMeeting />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatbotWidget />
    </Router>
  );
}

export default App; 