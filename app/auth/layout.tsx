import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="center-2xl max-2xl:py-10">{children}</div>
  );
}
