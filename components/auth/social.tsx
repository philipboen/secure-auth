"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleClick =(provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      <Button
        size="lg"
        className="flex w-full items-center gap-2"
        variant="outline"
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="size-5" />
        <span>Continue with Google</span>
      </Button>
      <Button
        size="lg"
        className="flex w-full items-center gap-2"
        variant="outline"
        onClick={() => handleClick("github")}
      >
        <FaGithub className="size-5" />
        <span>Continue with Github</span>
      </Button>
    </div>
  );
};
