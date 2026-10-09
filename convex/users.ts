import { ConvexError, v } from "convex/values";

import { findUserByKey, hashUserKey } from "./lib/userKey.ts";
import { mutation, query } from "./_generated/server.ts";

const USER_NAME_MIN_LENGTH = 3;
const USER_NAME_MAX_LENGTH = 40;

function normalizeUserName(name: string) {
  const trimmed = name.trim();

  if (trimmed.length < USER_NAME_MIN_LENGTH || trimmed.length > USER_NAME_MAX_LENGTH) {
    throw new ConvexError(`Name must be between ${USER_NAME_MIN_LENGTH} and ${USER_NAME_MAX_LENGTH} characters.`);
  }

  return trimmed;
}

/** Der Nutzer zum Code, oder `null`, wenn der Code unbekannt ist. */
export const me = query({
  args: { key: v.string() },
  returns: v.union(v.object({ name: v.string() }), v.null()),
  handler: async (ctx, { key }) => {
    const user = await findUserByKey(ctx, key);
    return user ? { name: user.name } : null;
  },
});

export const create = mutation({
  args: { key: v.string(), name: v.string() },
  returns: v.null(),
  handler: async (ctx, { key, name }) => {
    if (await findUserByKey(ctx, key)) {
      throw new ConvexError("This code is already taken. Please generate a new one.");
    }

    await ctx.db.insert("users", { keyHash: await hashUserKey(key), name: normalizeUserName(name) });
    return null;
  },
});
