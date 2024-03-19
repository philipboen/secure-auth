import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/services/auth";

const Page = async () => {
  const user = await currentUser();

  return <UserInfo user={user} title="Server component" />;
};

export default Page;
