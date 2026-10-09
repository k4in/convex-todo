import * as z from "zod";

import { isValidUserKey, normalizeUserKey } from "@/lib/utils/user-key.ts";

export const loginSchema = z.object({
  key: z.string().refine((value) => isValidUserKey(normalizeUserKey(value)), "Please enter a valid 20-character code."),
});
