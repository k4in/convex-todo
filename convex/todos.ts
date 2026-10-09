import { ConvexError, v } from "convex/values";

import { requireUserByKey } from "./lib/userKey.ts";
import { todoFields } from "./schema.ts";
import { mutation, query, type MutationCtx } from "./_generated/server.ts";
import { type Id } from "./_generated/dataModel.ts";

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

async function requireOwnTodo(ctx: MutationCtx, key: string, id: Id<"todos">) {
  const user = await requireUserByKey(ctx, key);
  const todo = await ctx.db.get(id);

  if (!todo || todo.userId !== user._id) {
    throw new ConvexError("Todo not found.");
  }

  return todo;
}

export const list = query({
  args: { key: v.string() },
  returns: v.array(todoValidator),
  handler: async (ctx, { key }) => {
    const user = await requireUserByKey(ctx, key);
    return await ctx.db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: { key: v.string(), text: v.string() },
  returns: v.id("todos"),
  handler: async (ctx, { key, text }) => {
    const user = await requireUserByKey(ctx, key);
    return await ctx.db.insert("todos", { userId: user._id, text: normalizeTodoText(text), completed: false });
  },
});

export const setCompleted = mutation({
  args: { key: v.string(), id: v.id("todos"), completed: v.boolean() },
  returns: v.null(),
  handler: async (ctx, { key, id, completed }) => {
    await requireOwnTodo(ctx, key, id);
    await ctx.db.patch(id, { completed });
    return null;
  },
});

export const remove = mutation({
  args: { key: v.string(), id: v.id("todos") },
  returns: v.null(),
  handler: async (ctx, { key, id }) => {
    await requireOwnTodo(ctx, key, id);
    await ctx.db.delete(id);
    return null;
  },
});
