import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";

export const ErrorCard = () => {
  return (
    <Card className="w-full max-w-[500px] px-4 shadow-md max-sm:rounded-none max-sm:border-none max-sm:shadow-none">
      <CardHeader className="px-4">
        <div className="w-full">
          <h1 className="h1-bold">Authentication Error</h1>
          <p className="text-base text-muted-foreground">
            Your request has encountered an error.
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <FormError message="An error has occurred!" />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button variant="link" className="px-2" asChild>
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
