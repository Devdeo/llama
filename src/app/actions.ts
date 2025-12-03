'use server';

import type { Message } from './types';

export async function generateResponse(history: Message[], message: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: message }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.error || 'An unknown error occurred.' };
    }

    const data = await res.json();

    return { response: data.reply, device: 'CPU' };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while generating a response.' };
  }
}
