import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.optional(v.any()), // JSON content
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  knowledge: defineTable({
    documentId: v.id("documents"),
    title: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_document", ["documentId"]),
});
