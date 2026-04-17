import express from "express";
import contactHandler from "./api/contact.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Mock Vercel handler for local express
const vercelToExpress = (handler) => async (req, res) => {
    const vercelRes = {
        status: (code) => {
            res.status(code);
            return vercelRes;
        },
        json: (data) => {
            res.json(data);
            return vercelRes;
        },
        send: (data) => {
            res.send(data);
            return vercelRes;
        }
    };
    await handler(req, vercelRes);
};

app.post("/api/contact", vercelToExpress(contactHandler));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
