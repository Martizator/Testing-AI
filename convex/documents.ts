import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      content: undefined,
    });
    return documentId;
  },
});

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return documents;
  },
});

export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    return document;
  },
});

export const update = mutation({
  args: {
    documentId: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;
    const { documentId, ...rest } = args;

    const existingDocument = await ctx.db.get(documentId);
    if (!existingDocument) {
      throw new Error("Document not found");
    }
    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(documentId, {
      ...rest,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(documentId);
  },
});
