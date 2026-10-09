import { useQuery } from "convex/react";
import { KeyRoundIcon } from "lucide-react";

import { api } from "@convex/_generated/api.ts";

import { useUserKey } from "@/hooks/useUserKey.tsx";
import { Button } from "@/components/shadcn/button.tsx";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/shadcn/empty.tsx";
import { Skeleton } from "@/components/shadcn/skeleton.tsx";
import { NewKeyDialog } from "@/components/auth/new-key-dialog.tsx";
import { UserMenu } from "@/components/auth/user-menu.tsx";
import { TodoForm } from "@/components/todo-form.tsx";
import { TodoList } from "@/components/todo-list.tsx";

type TodoCardProps = {
  userKey: string;
};

export function TodoCard({ userKey }: TodoCardProps) {
  const { clearUserKey } = useUserKey();
  const user = useQuery(api.users.me, { key: userKey });

  return (
    <Card className="w-full max-w-md self-start">
      <CardHeader>
        <CardTitle>Todos</CardTitle>
        <CardDescription>A minimal todo app powered by Convex.</CardDescription>
        {user && (
          <CardAction>
            <UserMenu userKey={userKey} name={user.name} />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {user === undefined && <Skeleton className="h-24" />}
        {user === null && (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <KeyRoundIcon />
              </EmptyMedia>
              <EmptyTitle>Unknown code</EmptyTitle>
              <EmptyDescription>The code stored in this browser does not exist (anymore).</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" onClick={clearUserKey}>
                Back to start
              </Button>
            </EmptyContent>
          </Empty>
        )}
        {user && (
          <>
            <TodoForm userKey={userKey} />
            <TodoList userKey={userKey} />
            <NewKeyDialog userKey={userKey} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
