import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: 'randomapi',
  });

let conversationHistory = [
    // Start the conversation with the system and user messages
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello! I would like to learn more about programming." }
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
const userResponse = "I want to learn about loops in programming.";
conversationHistory.push({ role: "user", content: userResponse });

// Step 3: Now, the assistant asks a follow-up question based on the user's response
const secondResponse = await getChatResponse();
console.log("Assistant's second question:", secondResponse);

// Not back-and-forth working code

// const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//         { role: "system", content: "You are a friendly conversationalist. Feel free to engage in casual, back-and-forth conversations." },
//         {
//             role: "user",
//             content: "Have a conversation in Spanish using the following words: cat, adventure, New York City",
//         },
//     ],
//     store: true,
// });

// console.log(completion.choices[0].message);