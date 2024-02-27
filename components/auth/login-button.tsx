"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    console.log("LoginButton clicked");
    router.push("/auth/login");
  };

  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};

export default LoginButton;
