"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  switchButtonLabel,
  switchButtonHref,
  switchButtonDescription,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-[500px] px-4 shadow-md max-2xl:mx-auto max-sm:rounded-none max-sm:border-none max-sm:shadow-none">
      <CardHeader>
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <SwitchButton
          label={switchButtonLabel}
          description={switchButtonDescription}
          href={switchButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
