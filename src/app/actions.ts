'use server';

import { localLlamaChatFlow } from '@/ai/flows/chat';
import type { Message } from './types';

export async function generateResponse(history: Message[], message: string) {
  try {
    const { response, device } = await localLlamaChatFlow({
      history: history.map(({ role, content }) => ({ role, content })),
      message,
    });
    return { response, device };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while generating a response.' };
  }
}
