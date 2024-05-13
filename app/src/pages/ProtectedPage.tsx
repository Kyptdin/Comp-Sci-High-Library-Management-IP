import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ProtectedPage = ({ children }: Props) => {
  useGetLoggedInUser();
};
