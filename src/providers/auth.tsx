"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { SignInRequest } from "~/domain/models/auth";
import { signIn, signOut } from "~/domain/services/auth/client";

interface AuthContextType {
  isLoading: boolean;
  signIn: (payload: SignInRequest) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
  redirect?: {
    path: string;
    autoRedirect?: boolean;
  };
}

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  signIn: async () => undefined,
  signOut: async () => undefined,
});

const AuthProvider = ({ children, redirect }: AuthProviderProps) => {
  const { path = "/", autoRedirect = true } = redirect || {};

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async (payload: SignInRequest): Promise<void> => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      await signIn(payload);
      if (autoRedirect) {
        router.push(path);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      await signOut();
      router.push("/auth");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext
      value={{
        isLoading,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }

  return context;
};
