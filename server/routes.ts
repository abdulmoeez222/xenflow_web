import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { supabase } from "./supabase";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Contact Form Endpoint
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);

      // 1. Try Supabase if available
      if (supabase) {
        const { error } = await supabase
          .from('contacts')
          .insert([{
            name: input.name,
            email: input.email,
            company: (input as any).company || null,
            message: input.message,
            timestamp: new Date().toISOString()
          }]);

        if (error) {
          console.error('Supabase error:', error);
        } else {
          console.log('✅ Contact saved to Supabase');
        }
      }

      // 2. Try to save to local storage (Drizzle) if configured
      try {
        if (storage.isConfigured()) {
          await storage.createContactMessage(input);
          console.log('✅ Contact saved to local database');
        } else {
          console.warn('⚠️ Local database not configured, skipping local save');
          // If we have Supabase but no local DB, we still succeed
          if (!supabase) {
            throw new Error("No storage providers (Supabase or Local DB) are configured");
          }
        }
      } catch (dbErr) {
        console.error('Local storage error:', dbErr);
        // Only fail if we didn't succeed with Supabase
        if (!supabase) {
          throw dbErr;
        }
      }

      res.json({ success: true, message: "Thank you for your message! We will get back to you soon." });
    } catch (err) {
      console.error('Contact Form Error:', err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: err instanceof Error ? err.message : "Internal server error" });
    }
  });

  // Booking Form Endpoint (from xenflow_web)
  app.post('/api/booking', async (req, res) => {
    try {
      const { name, email, company, date, time, message } = req.body;

      if (supabase) {
        const { error } = await supabase.from('bookings').insert([{
          name, email, company, date, time, purpose: message, status: 'pending',
          timestamp: new Date().toISOString()
        }]);

        if (error) console.error('Supabase Booking Error:', error);
      }

      // Email notification (optional)
      if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
        });

        await transporter.sendMail({
          from: `"Xenflow Systems" <${process.env.GMAIL_USER}>`,
          to: process.env.BOOKING_NOTIFY_EMAIL || 'xenflowtech@gmail.com',
          subject: `📅 New Booking: ${name}`,
          text: `New booking request from ${name} (${email}) for ${date} at ${time}. Message: ${message}`
        });
      }

      res.status(201).json({ success: true, message: "Booking confirmed" });
    } catch (error) {
      console.error('Booking Error:', error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Chatbot Proxy (Simplistic version)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      res.json({
        success: true,
        message: "I'm the Xenflow Assistant. I've been successfully connected to the new frontend! How can I help you today?",
        sessionId: "session-" + Date.now()
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Chat error" });
    }
  });

  return httpServer;
}
