import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  title: string;
}

export const UserInfo = ({ user, title }: UserInfoProps) => {
  return (
    <Card className="w-full max-w-[600px] shadow-md">
      <CardHeader>
        <h2 className="h2-semibold text-center">{title}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <h4 className="sm-semibold">ID</h4>
          <p className="max-w-[180px] truncate rounded-md bg-slate-100 px-2 py-1 font-mono text-sm">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <h4 className="sm-semibold">Name</h4>
          <p className="rounded-md bg-slate-100 px-2 py-1 font-mono text-sm">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <h4 className="sm-semibold">Email</h4>
          <p className="rounded-md bg-slate-100 px-2 py-1 font-mono text-sm">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <h4 className="sm-semibold">Role</h4>
          <p className="rounded-md bg-slate-100 px-2 py-1 font-mono text-sm">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <h4 className="sm-semibold">Two Factor Authentication</h4>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
