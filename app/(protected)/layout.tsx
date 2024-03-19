import React from "react";
import { Navbar } from "@/app/(protected)/_components/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center gap-y-10 px-4 py-6">
      <Navbar />
      {children}
    </div>
  );
}
