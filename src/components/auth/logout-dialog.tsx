import { useState } from "react";

import { useUserKey } from "@/hooks/useUserKey.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcn/alert-dialog.tsx";
import { Checkbox } from "@/components/shadcn/checkbox.tsx";
import { Field, FieldLabel } from "@/components/shadcn/field.tsx";
import { UserKeyDisplay } from "@/components/auth/user-key-display.tsx";

type LogoutDialogProps = {
  userKey: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LogoutDialog({ userKey, open, onOpenChange }: LogoutDialogProps) {
  const { clearUserKey } = useUserKey();
  const [hasSavedKey, setHasSavedKey] = useState(false);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        setHasSavedKey(false);
        onOpenChange(nextOpen);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            After logging out, your code can only be entered manually – it cannot be restored automatically. Make sure you have backed up
            your code, otherwise your data is lost irrevocably!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <UserKeyDisplay userKey={userKey} />
        <Field orientation="horizontal">
          <Checkbox id="has-saved-key" checked={hasSavedKey} onCheckedChange={setHasSavedKey} />
          <FieldLabel htmlFor="has-saved-key">I have saved my code</FieldLabel>
        </Field>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" disabled={!hasSavedKey} onClick={clearUserKey}>
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
