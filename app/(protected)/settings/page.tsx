"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="flex flex-col">
      {/* {JSON.stringify(user)} */}

      <Button type="submit" onClick={handleSignOut} className="w-fit">
        Sign out
      </Button>
    </div>
  );
};

export default SettingsPage;
