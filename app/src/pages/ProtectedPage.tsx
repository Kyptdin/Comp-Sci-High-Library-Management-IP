import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "./LoadingPage";

interface Props {
  children: ReactNode;
}

export const ProtectedPage = ({ children }: Props) => {
  const navigate = useNavigate();
  const { data: userData, isLoading } = useGetLoggedInUser();

  useEffect(() => {
    if (!userData && !isLoading) {
      navigate("/notAuthorized");
      return;
    }
  }, [userData, navigate, isLoading]);

  if (isLoading) return <LoadingPage />;

  return <>{children}</>;
};
