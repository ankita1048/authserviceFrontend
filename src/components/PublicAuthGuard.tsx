import { Navigate } from "react-router-dom";

export const PublicAuthGuard = ({
  allowedFrom,
  children,
}: {
  allowedFrom: string[];
  children: React.ReactNode;
}) => {
  const referrer = sessionStorage.getItem("lastRoute");

  if (!allowedFrom.includes(referrer ?? "")) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
