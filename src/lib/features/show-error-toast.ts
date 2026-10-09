import { getErrorMessage } from "@/lib/utils/get-error-message.ts";
import { toast } from "@/components/shadcn/toast.tsx";

export function showErrorToast(error: unknown) {
  toast.add({
    title: "Action failed",
    description: getErrorMessage(error),
    type: "error",
  });
}
