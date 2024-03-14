import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerTitle="Sign In"
      headerLabel="SecureAuth"
      switchButtonLabel="Sign up"
      switchButtonHref="/auth/register"
      switchButtonDescription="Don't have an account?"
      showSocial
      authType="login"
    >
      <FormError message="An error has occurred!"/>
    </CardWrapper>
  );
};
