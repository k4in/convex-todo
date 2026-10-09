import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const todoFields = {
  userId: v.id("users"),
  text: v.string(),
  completed: v.boolean(),
};

export default defineSchema({
  users: defineTable({
    keyHash: v.string(),
    name: v.string(),
  }).index("by_key_hash", ["keyHash"]),
  todos: defineTable(todoFields).index("by_user", ["userId"]),
});
