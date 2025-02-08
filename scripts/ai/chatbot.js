import OpenAI from "openai";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Use the API key from the environment variable
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Use the API key from the .env file
  });

let conversationHistory = [
    // Start the conversation with the system and user messages
    { role: "system", content: "You are a conversationalist who must engage in conversation with a person learning Spanish." },
    { role: "user", content: "Start a conversation using gato, pescado, and silla as the main vocabulary words that I want to practice." }
];
  
async function getChatResponse() {
    // Make the API call with the current conversation history
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // Or whichever model you're using
      messages: conversationHistory,
      store: true,
    });
  
    // Get the assistant's response
    const assistantMessage = completion.choices[0].message.content;
  
    // Add the assistant's response to the conversation history
    conversationHistory.push({ role: "assistant", content: assistantMessage });
  
    // Log the assistant's response only once here
    return assistantMessage;
}
  
// Step 1: Initial request to get the first question
const firstResponse = await getChatResponse();
console.log("Assistant's first question:", firstResponse);
  
// Step 2: Let's assume the user responds now
const userResponse = "Can you repeat the question?";
conversationHistory.push({ role: "user", content: userResponse });

// Step 3: Now, the assistant asks a follow-up question based on the user's response
const secondResponse = await getChatResponse();
console.log("Assistant's second question:", secondResponse);