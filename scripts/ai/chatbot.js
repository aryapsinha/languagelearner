import OpenAI from "openai";
import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables
dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Create an interface for user input in the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Conversation history
let conversationHistory = [
    { role: "system", content: "You are a conversationalist who must engage in conversation with me the user who is learning chinese." },
    { role: "user", content: "Start a conversation with me using cat, bowl, and fish as the main vocabulary words that I want to practice." }
];

// Function to get assistant response
async function getChatResponse() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: conversationHistory
        });

        const assistantMessage = completion.choices[0].message.content;
        console.log("\nAssistant:", assistantMessage); // Display response
        
        conversationHistory.push({ role: "assistant", content: assistantMessage });

        return assistantMessage;
    } catch (error) {
        console.error("Error getting response:", error);
    }
}

// Function to handle user input and continue conversation
function startConversation() {
    getChatResponse().then(() => {
        rl.prompt();
        rl.on("line", async (input) => {
            if (input.toLowerCase() === "bye") {
                console.log("Goodbye!");
                rl.close();
                return;
            }

            conversationHistory.push({ role: "user", content: input });

            await getChatResponse();

            rl.prompt();
        });
    });
}

// Start the conversation
startConversation();