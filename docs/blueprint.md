# **App Name**: Local Llama Chat

## Core Features:

- Message Sending: Allows users to send text messages to the LLM backend.
- LLM Response Generation: Generates a response to the user's message using the Llama 3 model.
- Chat History Display: Displays the conversation history, including both user messages and LLM responses.
- Backend LLM API: API endpoint for handling user messages and generating LLM responses.
- CPU fallback and selection: If running in an environment that makes multiple device options available for inference (e.g. CPU, GPU), the system will use a tool to intelligently pick which inference system to delegate to.

## Style Guidelines:

- Primary color: Soft blue (#A0C4FF) to create a calm and reliable atmosphere.
- Background color: Light gray (#F0F0F0) to ensure readability and focus on content.
- Accent color: Muted teal (#8FBD80) for interactive elements, providing a subtle contrast.
- Body and headline font: 'Inter', a sans-serif font, provides a modern, neutral feel, good for both headlines and body.
- Simple, single-column layout for easy readability, centered chat window with message bubbles.
- Minimal set of icons for actions like sending messages, and potentially clearing the chat.