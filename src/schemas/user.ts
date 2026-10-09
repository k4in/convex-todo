import * as z from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(3, "Your name needs at least 3 characters.").max(40, "Your name can have at most 40 characters."),
});
