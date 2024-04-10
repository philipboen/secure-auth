"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ExitIcon,
  GearIcon,
  PersonIcon,
  LaptopIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getInitials } from "@/lib/utils";
import { LogoutButton } from "@/components/auth/logout-button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();
  const initials = getInitials(user?.name ?? "");
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <span className="tracking-wider">{initials}</span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 space-y-1.5" align="end">
        <DropdownMenuItem
          asChild
          className={`flex items-center ${pathname === "/server" && "bg-primary/95 text-white focus:bg-primary focus:text-white"}`}
        >
          <Link href="/server">
            <LaptopIcon className="mr-2 size-4" />
            Server
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className={`flex items-center ${pathname === "/client" && "bg-primary/95 text-white focus:bg-primary focus:text-white"}`}
        >
          <Link href="/client">
            <PersonIcon className="mr-2 size-4" />
            Client
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className={`flex items-center ${pathname === "/admin" && "bg-primary/95 text-white focus:bg-primary focus:text-white"}`}
        >
          <Link href="/admin">
            <LockClosedIcon className="mr-2 size-4" />
            Admin
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className={`flex items-center ${pathname === "/settings" && "bg-primary/95 text-white focus:bg-primary focus:text-white"}`}
        >
          <Link href="/settings">
            <GearIcon className="mr-2 size-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem className="focus:bg-destructive/90 focus:text-white">
            <ExitIcon className="mr-2 size-4" />
            Log out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
