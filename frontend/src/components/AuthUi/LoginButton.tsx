import { BsGoogle } from "react-icons/bs";

import { Button } from "@/components/ui/button";

import { loginWithGoogle } from "../../services/auth";

export const LoginButton = () => {
  return (
    <Button
      variant="secondary"
      className="rounded-full"
      onClick={() => loginWithGoogle()}
    >
      <BsGoogle size={20} className="mr-3" />
      LOGIN WITH GOOGLE
    </Button>
  );
};
