import { z } from "zod";

export const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
