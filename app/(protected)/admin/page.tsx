"use client";

import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
import { admin } from "@/lib/actions/admin";

const Page = () => {
  const handleAPIRouteClick = async () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Authorized access to admin route.");
      } else {
        toast.error("Forbidden access to admin route.");
      }
    });
  };

  const handleServerActionClick = async () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  return (
    <Card className="w-full max-w-[600px] shadow-md">
      <CardHeader>
        <h2 className="h2-semibold text-center">Admin</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are authorized to view this page." />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <h4 className="sm-semibold">Admin-only API Route</h4>
          <Button onClick={handleAPIRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <h4 className="sm-semibold">Admin-only Server Action</h4>
          <Button onClick={handleServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
