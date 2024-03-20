import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="font-serif text-[42px] font-black">
          SecureAuth <span className="text-[38px]">🔑</span>
        </h1>
        <p className="text-lg">A simple authentication service</p>
        <LoginButton asChild>
          <Button size="lg" className="rounded-full">
            Sign In
          </Button>
        </LoginButton>
      </div>
    </div>
  );
}
