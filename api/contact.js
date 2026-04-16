import { getSheetsClient, SPREADSHEET_ID, SHEET_NAME } from "./lib/sheets.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string"
      ? JSON.parse(req.body || "{}")
      : req.body || {};

    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const sheets = getSheetsClient();
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:E`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[timestamp, name, email, phone || "", message]],
      },
    });

    return res.status(200).json({
      success: true,
      message: "Thank you! We will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}