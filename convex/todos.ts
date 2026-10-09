import { ConvexError, v } from "convex/values";

import { todoFields } from "./schema.ts";
import { mutation, query } from "./_generated/server.ts";

const TODO_TEXT_MAX_LENGTH = 200;

const todoValidator = v.object({
  _id: v.id("todos"),
  _creationTime: v.number(),
  ...todoFields,
});

function normalizeTodoText(text: string) {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    throw new ConvexError("Todo text must not be empty.");
  }

  if (trimmed.length > TODO_TEXT_MAX_LENGTH) {
    throw new ConvexError(`Todo text must be at most ${TODO_TEXT_MAX_LENGTH} characters.`);
  }

  return trimmed;
}

export const list = query({
  args: {},
  returns: v.array(todoValidator),
  handler: async (ctx) => {
    return await ctx.db.query("todos").order("desc").collect();
  },
});

export const create = mutation({
  args: { text: v.string() },
  returns: v.id("todos"),
  handler: async (ctx, { text }) => {
    return await ctx.db.insert("todos", { text: normalizeTodoText(text), completed: false });
  },
});

export const setCompleted = mutation({
  args: { id: v.id("todos"), completed: v.boolean() },
  returns: v.null(),
  handler: async (ctx, { id, completed }) => {
    await ctx.db.patch(id, { completed });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("todos") },
  returns: v.null(),
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return null;
  },
});
