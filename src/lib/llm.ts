import { LlamaModel, LlamaContext, LlamaChatSession } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";
import * as path from "path";

let model: LlamaModel;
let context: LlamaContext;

async function getLlama() {
    if (!model) {
        const modelPath = path.join(process.cwd(), "models/llama-3.2-1b-instruct.Q4_K_M.gguf");
        model = new LlamaModel({
            modelPath: modelPath,
        });
    }
    if (!context) {
        context = new LlamaContext({ model });
    }
    return { model, context };
}

export async function askLLM(prompt: string): Promise<string> {
    const { context } = await getLlama();
    const session = new LlamaChatSession({ context });

    const response = await session.prompt(prompt, {
        maxTokens: 300,
        temperature: 0.7,
    });

    return response;
}
