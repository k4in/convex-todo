import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card.tsx";
import { TodoForm } from "@/components/todo-form.tsx";
import { TodoList } from "@/components/todo-list.tsx";

export function App() {
  return (
    <main className="flex min-h-svh justify-center p-4 sm:p-8">
      <Card className="w-full max-w-md self-start">
        <CardHeader>
          <CardTitle>Todos</CardTitle>
          <CardDescription>A minimal todo app powered by Convex.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TodoForm />
          <TodoList />
        </CardContent>
      </Card>
    </main>
  );
}
