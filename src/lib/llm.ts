import { LlamaModel, LlamaContext, LlamaChatSession } from "llama-node";
import * as path from "path";

let session: LlamaChatSession | null = null;

async function getSession() {
    if (session) {
        return session;
    }
    const model = new LlamaModel({
        modelPath: path.join(process.cwd(), "models/llama-3.2-1b-instruct.Q4_K_M.gguf"),
    });
    const context = new LlamaContext({ model });
    session = new LlamaChatSession({ context });
    return session;
}


export async function askLLM(prompt: string): Promise<string> {
    const session = await getSession();
    const reply = await session.prompt(prompt, {
        maxTokens: 300,
        temperature: 0.7,
    });
    return reply;
}
