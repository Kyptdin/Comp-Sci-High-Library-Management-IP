import { useGetLoggedInUser } from "@/hooks/user/useGetLoggedInUser";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "./LoadingPage";

interface Props {
  children: ReactNode;
  onlyForAdmin?: boolean;
}

/**
 * This component provides a way to protect certain pages/routes, ensuring that only logged-in users can access them.
 * It also allows for further restriction by checking if the user is an admin.
 *
 * @param children The content to be rendered if the user is authorized.
 * @param onlyForAdmin If true, only users with admin status can access the protected page.
 * @returns JSX element representing the protected page or a redirect to the not authorized page.
 */
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
