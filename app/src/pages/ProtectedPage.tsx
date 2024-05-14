import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const ProtectedPage = ({ children }: Props) => {
  const navigate = useNavigate();
  const { data: userData } = useGetLoggedInUser();

  useEffect(() => {
    if (!userData) {
      navigate("notAuthorized");
      return;
    }
  }, [userData, navigate]);

  return <>{children}</>;
};
