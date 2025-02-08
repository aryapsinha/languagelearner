process.noDeprecation = true;
import OpenAI from "openai";
import dotenv from "dotenv";
import readline from "readline";

// Load environment variables
dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Create an interface for user input in the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to ask user questions
function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

// Function to get assistant response
async function getChatResponse() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: conversationHistory,
        });

        const assistantMessage = completion.choices[0].message.content;
        console.log("\nAssistant:", assistantMessage); // Display response

        conversationHistory.push({ role: "assistant", content: assistantMessage });

        return assistantMessage;
    } catch (error) {
        console.error("Error getting response:", error);
    }
}

// Function to start the dynamic conversation setup
async function setupConversation() {
    const language = await askQuestion("What language are you learning? ");
    const words = await askQuestion("Enter 3 vocabulary words you want to practice (comma-separated): ");

    // Convert words into a proper sentence
    const formattedWords = words.split(",").map((word) => word.trim()).join(", ");

    // Set up conversation history dynamically
    conversationHistory.push(
        { role: "system", content: `You are a conversationalist who must engage in conversation with me, the user, who is learning ${language}.` },
        { role: "user", content: `Start a conversation with me using ${formattedWords} as the main vocabulary words that I want to practice.` }
    );

    console.log(`\nStarting conversation in ${language} using the words: ${formattedWords}...\n`);
    
    startConversation();
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

// Conversation history
let conversationHistory = [];

// Start setup
setupConversation();