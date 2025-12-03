import { LlamaModel, LlamaContext, LlamaChatSession } from "llama-node";
import * as path from "path";

let modelInstance = global.modelInstance || null;
let contextInstance = global.contextInstance || null;

const MODEL = path.join(process.cwd(), "models/llama-3.2-1b-instruct.Q4_K_M.gguf");
const TOKENIZER = path.join(process.cwd(), "models/tokenizer.model");

export async function loadLLM() {
  if (!modelInstance) {
    console.log("Loading model from:", MODEL);

    modelInstance = new LlamaModel({
      modelPath: MODEL,
      tokenizerPath: TOKENIZER,
      gpuLayers: 0,
      nCtx: 2048,
      seed: 42,
    });

    global.modelInstance = modelInstance;
  }

  if (!contextInstance) {
    contextInstance = new LlamaContext({ model: modelInstance });
    global.contextInstance = contextInstance;
  }

  return contextInstance;
}

export async function askLLM(promptText) {
  const context = await loadLLM();
  const session = new LlamaChatSession({ context });

  return session.prompt(promptText, {
    maxTokens: 250,
    temperature: 0.7,
  });
}
