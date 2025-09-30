// RouteTracker.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("lastRoute", location.pathname);
  }, [location.pathname]);

  return null; // no UI
};
