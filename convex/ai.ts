import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

export const generate = action({
  args: {
    prompt: v.string(),
    context: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful AI writing assistant. Use the provided context to answer the user's request." },
        { role: "user", content: `Context: ${args.context || "No context provided."}\n\nTask: ${args.prompt}` },
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content ?? "";
  },
});

