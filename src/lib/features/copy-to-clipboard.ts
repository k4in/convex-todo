import { toast } from "@/components/shadcn/toast.tsx";

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.add({ title: "Copied to clipboard", type: "success" });
  } catch {
    toast.add({ title: "Could not copy", description: "Please copy the code manually.", type: "error" });
  }
}
