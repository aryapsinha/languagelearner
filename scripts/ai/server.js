// server.js
import express from "../../lang/node_modules/express/index.js";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from 'cors'; 

// Load environment variables
dotenv.config();


console.log("API Key:", process.env.OPENAI_API_KEY);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = process.env.PORT ||4000;

app.use(express.json());


app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin (React app)
  methods: 'GET,POST',            // Allowing only POST requests
  allowedHeaders: 'Content-Type,Authorization'
}));


let conversationHistory = [];


// Endpoint to handle chat requests
app.post("/chat", async (req, res) => {
  const { messages } = req.body;
  console.log("Received messages:", messages);

  conversationHistory.push({ role: "user", content: messages[messages.length - 1].content });


  try {
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use correct model here
      messages: conversationHistory,
    });

    

    const assistantMessage = completion.choices[0].message.content;
    conversationHistory.push({ role: "assistant", content: assistantMessage });
    res.json({ message: assistantMessage });
  } catch (error) {
    console.log("complete")
    console.error("Error getting response:", error);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
});

// Endpoint to initialize a conversation with specific setup
app.post("/start-conversation", async (req, res) => {
  const { language, words } = req.body;  // Language and vocabulary words from the frontend

  // Set the conversation history with the system message and user instruction
  const formattedWords = words.split(",").map((word) => word.trim()).join(", ");
  conversationHistory = [
    { role: "system", content: `You are a conversationalist who must engage in conversation with me, the user, who is learning ${language}.` },
    { role: "user", content: `Start a conversation with me using ${formattedWords} as the main vocabulary words that I want to practice.` },
  ];

  // Respond with the first message from the assistant (based on the user's setup)
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversationHistory,
    });

    const assistantMessage = completion.choices[0].message.content;

    // Append the assistant's response to the conversation history
    conversationHistory.push({ role: "assistant", content: assistantMessage });

    res.json({ message: assistantMessage });  // Return assistant’s first message to frontend
  } catch (error) {
    console.error("Error initializing conversation:", error);
    res.status(500).json({ error: "Failed to initialize conversation" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});