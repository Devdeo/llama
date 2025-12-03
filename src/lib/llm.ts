import { LLama } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";
import * as path from "path";

let llama: LLama | null = null;

async function getLlama() {
    if (llama) {
        return llama;
    }
    const model = path.join(process.cwd(), "models/llama-3.2-1b-instruct.Q4_K_M.gguf");
    const llamaCpp = new LLamaCpp();
    
    llama = new LLama(llamaCpp);

    await llama.load({ modelPath: model });

    return llama;
}

export async function askLLM(prompt: string): Promise<string> {
    const llama = await getLlama();
    const template = `A chat between a user and an assistant.
    USER: ${prompt}
    ASSISTANT:`;
    const response = await llama.createCompletion({
        prompt: template,
        numPredict: 128,
        temperature: 0.7,
        topP: 0.1,
        topK: 40,
        repeatPenalty: 1,
        stopSequence: ["USER:", "\n"],
    });

    return response.token;
}
