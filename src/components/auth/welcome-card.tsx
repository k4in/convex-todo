import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card.tsx";
import { FieldSeparator } from "@/components/shadcn/field.tsx";
import { CreateUserForm } from "@/components/auth/create-user-form.tsx";
import { LoginForm } from "@/components/auth/login-form.tsx";

export function WelcomeCard() {
  return (
    <Card className="w-full max-w-md self-start">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Enter a name and generate a personal code, or log in with your existing code.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CreateUserForm />
        <FieldSeparator>or</FieldSeparator>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
