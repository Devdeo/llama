import { askLLM } from "../../../llama/llm";

export default async function handler(req, res) {
  try {
    const { msg } = req.body;

    if (!msg) {
      return res.status(400).json({ error: "Message required" });
    }

    const reply = await askLLM(msg);
    res.status(200).json({ reply });
    
  } catch (error) {
    console.error("LLM ERROR:", error);
    res.status(500).json({ error: "LLM failed to generate a response" });
  }
}
