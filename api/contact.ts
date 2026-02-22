import { createClient } from "@supabase/supabase-js";
import { insertContactMessageSchema } from "../shared/schema";

export default async function handler(req: { method?: string; body?: unknown }, res: { setHeader: (k: string, v: string) => void; status: (n: number) => { json: (o: object) => void }; json: (o: object) => void }) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
    const input = insertContactMessageSchema.parse(body);

    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await supabase.from("contacts").insert([
        {
          name: input.name,
          email: input.email,
          company: input.company ?? null,
          message: input.message,
          phone: input.phone ?? null,
        },
      ]);
      if (error) console.error("Supabase error:", error);
    }

    return res.status(200).json({
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    if (err && typeof err === "object" && "issues" in err) {
      return res.status(400).json({
        message: (err as { issues: { message: string }[] }).issues[0]?.message ?? "Validation failed",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    });
  }
}
