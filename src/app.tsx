import { useUserKey } from "@/hooks/useUserKey.tsx";
import { WelcomeCard } from "@/components/auth/welcome-card.tsx";
import { TodoCard } from "@/components/todo-card.tsx";

export function App() {
  const { userKey } = useUserKey();

  return <main className="flex min-h-svh justify-center p-4 sm:p-8">{userKey ? <TodoCard userKey={userKey} /> : <WelcomeCard />}</main>;
}
