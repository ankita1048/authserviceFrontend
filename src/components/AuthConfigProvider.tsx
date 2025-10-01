// context/AuthConfigContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

export type AuthConfig = {
  baseUrl: string;
  defaultTimeout?: number;
  defaultSanitizer?: (value: string) => string;
};

const AuthConfigContext = createContext<AuthConfig | null>(null);

const AuthConfigProvider = ({
  children,
  config,
}: {
  children: ReactNode;
  config: AuthConfig;
}) => {
  return (
    <AuthConfigContext.Provider value={config}>
      {children}
    </AuthConfigContext.Provider>
  );
};

// custom hook to access config
export const useAuthConfig = () => {
  const ctx = useContext(AuthConfigContext);
  console.log({ ctx });
  if (!ctx) {
    throw new Error("useAuthConfig must be used inside AuthConfigProvider");
  }
  return ctx;
};

export default AuthConfigProvider;
