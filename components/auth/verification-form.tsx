"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { verification } from "@/lib/actions/verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmit = useCallback(() => {
    if (!token) {
      setError("Token is missing!");
      return;
    }

    verification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <Card className="w-full max-w-[500px] px-4 shadow-md max-sm:rounded-none max-sm:border-none max-sm:shadow-none">
      <CardContent className="mt-6">
        <p className="h2-bold text-center">Confirming your verification</p>
        <div className="my-4 flex w-full items-center justify-center">
          {!success && !error && <BeatLoader />}
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button variant="link" className="px-2" asChild>
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
