import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    documentId: v.id("documents"),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    // Verify ownership of document
    const document = await ctx.db.get(args.documentId);
    if (!document || document.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    const knowledgeId = await ctx.db.insert("knowledge", {
      documentId: args.documentId,
      title: args.title,
      content: args.content,
      createdAt: Date.now(),
    });
    return knowledgeId;
  },
});

export const getByDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const knowledge = await ctx.db
      .query("knowledge")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();
    return knowledge;
  },
});

export const remove = mutation({
  args: { knowledgeId: v.id("knowledge") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const knowledge = await ctx.db.get(args.knowledgeId);
    if (!knowledge) return;

    const document = await ctx.db.get(knowledge.documentId);
    if (!document || document.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.knowledgeId);
  },
});
