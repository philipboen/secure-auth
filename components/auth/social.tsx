"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      <Button
        size="lg"
        className="flex w-full items-center gap-2"
        variant="outline"
        onClick={() => {}}
      >
        <FcGoogle className="size-5" />
        <span>Continue with Google</span>
      </Button>
      <Button
        size="lg"
        className="flex w-full items-center gap-2"
        variant="outline"
        onClick={() => {}}
      >
        <FaGithub className="size-5" />
        <span>Continue with Github</span>
      </Button>
    </div>
  );
};
