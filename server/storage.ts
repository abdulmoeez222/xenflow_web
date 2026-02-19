import { db } from "./db";
import {
  contactMessages,
  type InsertContactMessage,
  type ContactMessage,
} from "@shared/schema";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  isConfigured(): boolean;
}

export class DatabaseStorage implements IStorage {
  isConfigured(): boolean {
    return !!db;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    if (!db) {
      throw new Error("Database not configured. Please set DATABASE_URL environment variable.");
    }
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
