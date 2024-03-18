"use client";

import { logout } from "@/lib/actions/logout";
import React from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="cursor-pointer" onClick={handleSignOut}>
      {children}
    </div>
  );
};
