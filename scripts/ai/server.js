// server.js
import express from "../../lang/node_modules/express/index.js";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from 'cors'; 

// Load environment variables
dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 4000;

app.use(express.json());


app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin (React app)
  methods: 'GET,POST',            // Allowing only POST requests
  allowedHeaders: 'Content-Type,Authorization'
}));
// Endpoint to handle chat requests
app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Use correct model here
      messages: messages,
    });

    const assistantMessage = completion.choices[0].message.content;
    res.json({ message: assistantMessage });
  } catch (error) {
    console.error("Error getting response:", error);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});