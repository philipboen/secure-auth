import React from "react";
import { Navbar } from "@/app/(protected)/_components/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-10 px-4">
      <Navbar />
      {children}
    </div>
  );
}
