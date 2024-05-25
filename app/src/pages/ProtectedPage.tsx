import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "./LoadingPage";

interface Props {
  children: ReactNode;
  onlyForAdmin?: boolean;
}

export const ProtectedPage = ({ children, onlyForAdmin }: Props) => {
  const navigate = useNavigate();
  const { data: userData, isLoading } = useGetLoggedInUser();

  useEffect(() => {
    const userAdminStatus = userData?.userMetaData[0].admin_status;
    if (!userData && !isLoading) {
      navigate("/notAuthorized");
      return;
    }

    if (onlyForAdmin && userAdminStatus !== "admin" && !isLoading) {
      navigate("/notAuthorized");
      return;
    }
  }, [userData, navigate, isLoading, onlyForAdmin]);

  if (isLoading) return <LoadingPage />;

  return <>{children}</>;
};
