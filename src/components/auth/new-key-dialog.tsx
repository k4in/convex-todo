import { useUserKey } from "@/hooks/useUserKey.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcn/alert-dialog.tsx";
import { UserKeyDisplay } from "@/components/auth/user-key-display.tsx";

type NewKeyDialogProps = {
  userKey: string;
};

/** Erscheint nur nach dem Erzeugen eines Codes, bis der Nutzer bestätigt, dass er ihn gesichert hat. */
export function NewKeyDialog({ userKey }: NewKeyDialogProps) {
  const { showNewKeyNotice, dismissNewKeyNotice } = useUserKey();

  return (
    <AlertDialog open={showNewKeyNotice}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Here is your code</AlertDialogTitle>
          <AlertDialogDescription>
            Please save it somewhere safe. You need it to log in on other devices – without it, your todos cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <UserKeyDisplay userKey={userKey} />
        <AlertDialogFooter>
          <AlertDialogAction onClick={dismissNewKeyNotice}>I have saved my code</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
