"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { SwitchButton } from "@/components/auth/switch-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  switchButtonLabel: string;
  switchButtonHref: string;
  switchButtonDescription: string;
}

export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  switchButtonLabel,
  switchButtonHref,
  switchButtonDescription,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-[500px] px-4 shadow-md max-2xl:mx-auto max-sm:rounded-none max-sm:border-none max-sm:shadow-none">
      <CardHeader>
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>

      <div className="flex items-center p-6 pt-0">
        <Social />
      </div>
      <SwitchButton
        label={switchButtonLabel}
        description={switchButtonDescription}
        href={switchButtonHref}
      />

      <div className="flex gap-2 px-6 py-2">
        <div className="h-[1px] w-full self-center bg-slate-400" />
        <p className="text-slate-400">or</p>
        <div className="h-[1px] w-full self-center bg-slate-400" />
      </div>

      <CardContent>{children}</CardContent>
    </Card>
  );
};
