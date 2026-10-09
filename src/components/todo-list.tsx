import { useQuery } from "convex/react";
import { ListTodoIcon } from "lucide-react";

import { api } from "@convex/_generated/api.ts";

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/shadcn/empty.tsx";
import { ItemGroup } from "@/components/shadcn/item.tsx";
import { Skeleton } from "@/components/shadcn/skeleton.tsx";
import { TodoItem } from "@/components/todo-item.tsx";

export function TodoList() {
  const todos = useQuery(api.todos.list);

  if (todos === undefined) {
    return (
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((index) => (
          <Skeleton key={index} className="h-11" />
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ListTodoIcon />
          </EmptyMedia>
          <EmptyTitle>No todos yet</EmptyTitle>
          <EmptyDescription>Add your first todo above.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <ItemGroup>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </ItemGroup>
  );
}
