import { CopyIcon } from "lucide-react";

import { formatUserKey } from "@/lib/utils/user-key.ts";
import { copyToClipboard } from "@/lib/features/copy-to-clipboard.ts";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/shadcn/input-group.tsx";

type UserKeyDisplayProps = {
  userKey: string;
};

export function UserKeyDisplay({ userKey }: UserKeyDisplayProps) {
  const formattedKey = formatUserKey(userKey);

  return (
    <InputGroup>
      <InputGroupInput value={formattedKey} readOnly aria-label="Your code" className="font-mono" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" onClick={() => void copyToClipboard(formattedKey)} aria-label="Copy code">
          <CopyIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
