import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const todoFields = {
  text: v.string(),
  completed: v.boolean(),
};

export default defineSchema({
  todos: defineTable(todoFields),
});
