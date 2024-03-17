"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SwitchButtonProps {
  label: string;
  href: string;
  description?: string;
}

export const SwitchButton = ({
  label,
  href,
  description,
}: SwitchButtonProps) => {
  return (
    <div className="flex items-baseline px-6">
      <p className="text-sm">{description}</p>
      <Button variant="link" className="px-2" asChild>
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};
