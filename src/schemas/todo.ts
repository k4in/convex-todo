import * as z from "zod";

export const createTodoSchema = z.object({
  text: z.string().trim().min(1, "Please enter a todo.").max(200, "A todo can have at most 200 characters."),
});
