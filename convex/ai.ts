import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generate = action({
  args: {
    prompt: v.string(),
    context: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Context: ${args.context || "No context provided."}\n\nTask: ${args.prompt}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  },
});
