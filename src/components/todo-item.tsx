import { useMutation } from "convex/react";
import { Trash2Icon } from "lucide-react";

import { api } from "@convex/_generated/api.ts";
import { type Doc } from "@convex/_generated/dataModel.ts";

import { cn } from "@/lib/utils/cn.ts";
import { showErrorToast } from "@/lib/features/show-error-toast.ts";
import { Button } from "@/components/shadcn/button.tsx";
import { Checkbox } from "@/components/shadcn/checkbox.tsx";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "@/components/shadcn/item.tsx";

type TodoItemProps = {
  userKey: string;
  todo: Doc<"todos">;
};

export function TodoItem({ userKey, todo }: TodoItemProps) {
  const setCompleted = useMutation(api.todos.setCompleted);
  const removeTodo = useMutation(api.todos.remove);

  function handleCompletedChange(completed: boolean) {
    setCompleted({ key: userKey, id: todo._id, completed }).catch(showErrorToast);
  }

  function handleRemove() {
    removeTodo({ key: userKey, id: todo._id }).catch(showErrorToast);
  }

  return (
    <Item variant="outline" size="sm" role="listitem">
      <ItemMedia>
        <Checkbox checked={todo.completed} onCheckedChange={handleCompletedChange} aria-label={`Mark "${todo.text}" as done`} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className={cn(todo.completed && "text-muted-foreground line-through")}>{todo.text}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm" onClick={handleRemove} aria-label={`Delete "${todo.text}"`}>
          <Trash2Icon />
        </Button>
      </ItemActions>
    </Item>
  );
}
