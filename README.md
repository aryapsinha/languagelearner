# <bold> Found in Translation </bold>

## What it does

Found in Translation (a play on lost in translation) is a streamlined language learning tool that helps users reinforce vocabulary from everyday web browsing through conversational practice. The Chrome extension detects the language of highlighted text and translates it into English. Users can then save terms they want to practice in conversation. These saved terms, along with an interactive AI chatbot, are accessible via a companion web app.

## Inspiration

We identified three key challenges that inspired us to create this language learning tool:

1. Personalized Vocabulary – Many language learners want to focus on words and phrases relevant to their daily lives, rather than generic vocabulary lists.
2. Inefficient Study Methods – Apps like Quizlet require users to manually create flashcards, which can be repetitive and time-consuming.
3. Lack of Contextual Practice – Traditional language learning apps often fail to provide interactive, real-world conversation practice, making it harder to apply new vocabulary effectively.

Found in Translation addresses these issues by integrating an AI chatbot that dynamically engages users with their saved words. This approach bridges the gap between passive learning and active usage, fostering deeper language retention.

## How we built it

Figma -- interactive UI mockup
- Decided on themes
- Decided on effective flow
- Formatted interface of each page
- See design here: [https://www.figma.com/files/team/1470133136368142001/project/336378762/Team-project?fuid=1289369928410265773]

Programmed using React to do web development. - Code can be seen in this Github Repo
- Broke our program into smaller, reusable components.
- Built a clean UI with a table of vocabulary terms and interactive chatbot.

Connected to OpenAI API to integrate a conversational assistant into Found in Translation web app.
[Write stuff about chrome extensions & localstorage]

## Challenges we ran into

One of our biggest challenges was integrating multiple components—Chrome extension, stored data, web app, and chatbot—into a seamless and cohesive product. To tackle this, we embraced iterative development, merged frequently, and collaborated effectively. This approach taught us how to divide and conquer while leveraging the strengths of our teammates.

Through continuous communication, adaptability, and creative problem-solving, we overcame these challenges and built a robust language-learning tool.

## Accomplishments that we're proud of

We were able to use OpenAI's API to personalize a chatbot to converse with users.

We made a Chrome extension that allows users to personalize their learning with real-life vocabulary terms.

We streamlined the process of having the chatbot incorporate terms into the conversation by adding a feature where the user can star certain terms they want to practice.


## What we learned
We learned how to create a web application using Node.js and React, and enhance our web development (HTML/CSS) skills with tools such as Bootstrap. In this process, we learned how to use OpenAI's API to implement a language learning specific chatbot to converse with users while integrating select vocabulary words into the conversation.

Moreover, we learned how to manage packages and environments with GitHub.

## What's next for Found 
- Audio/voice chatbot
- Vocabulary defintions
- Starred terms

# <bold>Environment Set Up</bold>
install openai
node.js
React
install bootstrap
install express
React
dotenv
web-vitals
axios
concurrently
install openai
