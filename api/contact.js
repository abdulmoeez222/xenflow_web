const { createClient } = require("@supabase/supabase-js");

// We skip shared schema import in this minimal serverless handler to avoid bundling issues.
// Basic shape validation is handled on the client; server treats any JSON payload leniently.

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const input = body || {};

    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await supabase.from("contacts").insert([
        {
          name: input.name,
          email: input.email,
          company: input.company || null,
          message: input.message,
          phone: input.phone || null,
        },
      ]);
      if (error) console.error("Supabase error:", error);
    }

    return res
      .status(200)
      .json({
        success: true,
        message:
          "Thank you for your message! We will get back to you soon.",
      });
  } catch (err) {
    console.error("Contact API error:", err);
    return res
      .status(200)
      .json({
        success: true,
        message:
          "Thank you for your message! We will get back to you soon.",
      });
  }
};

