'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
});

const ChatOutputSchema = z.object({
  response: z.string(),
  device: z.string(),
});

export const localLlamaChatFlow = ai.defineFlow(
  {
    name: 'localLlamaChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ history, message }) => {

    const systemPrompt = "You are Local Llama, a helpful AI assistant running on the user's local machine. Be friendly, concise, and helpful.";

    const llmResponse = await ai.generate({
      prompt: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: message },
      ],
      model: 'meta-llama/Llama-3.2-1B-Instruct',
      config: {
        temperature: 0.7,
      },
    });

    return {
      response: llmResponse.text,
      device: 'CPU',
    };
  }
);
