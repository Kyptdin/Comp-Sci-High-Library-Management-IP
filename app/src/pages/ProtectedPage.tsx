import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const ProtectedPage = ({ children }: Props) => {
  const { data: userData } = useGetLoggedInUser();

  if (!userData) {
    return <Link to={"notAuthorized"} />;
  }

  return <>{children}</>;
};
