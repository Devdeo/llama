
import { askLLM } from "../../../llama/llm";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const reply = await askLLM(prompt);
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("LLM Error:", err);
    res.status(500).json({ error: "LLM failed to generate a response." });
  }
}
