import { useState } from "react";
import { CopyIcon, LogOutIcon } from "lucide-react";

import { formatUserKey } from "@/lib/utils/user-key.ts";
import { copyToClipboard } from "@/lib/features/copy-to-clipboard.ts";
import { Avatar, AvatarFallback } from "@/components/shadcn/avatar.tsx";
import { Button } from "@/components/shadcn/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu.tsx";
import { LogoutDialog } from "@/components/auth/logout-dialog.tsx";

type UserMenuProps = {
  userKey: string;
  name: string;
};

function getInitials(name: string) {
  return name.trim().slice(0, 2).toUpperCase();
}

export function UserMenu({ userKey, name }: UserMenuProps) {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const formattedKey = formatUserKey(userKey);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-lg" aria-label="Account menu" />}>
          <Avatar size="sm">
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Signed in as {name}</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => void copyToClipboard(formattedKey)}>
              <CopyIcon />
              <span className="font-mono">{formattedKey}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" onClick={() => setIsLogoutOpen(true)}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog userKey={userKey} open={isLogoutOpen} onOpenChange={setIsLogoutOpen} />
    </>
  );
}
