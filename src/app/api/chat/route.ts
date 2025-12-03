import { askLLM } from "@/lib/llm";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { msg } = await req.json();

    if (!msg) {
        return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const reply = await askLLM(msg);
    return NextResponse.json({ reply });

  } catch (err: any) {
    console.error("LLM Error:", err);
    return NextResponse.json({ error: "LLM failed" }, { status: 500 });
  }
}
