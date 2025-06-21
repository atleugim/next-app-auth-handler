"use client";

import { useAuth } from "~/providers/auth";
import Button from "../ui/button";

export default function SignOut() {
  const { signOut, isLoading } = useAuth();

  const handleSubmit = async () => {
    await signOut();
  };

  return (
    <Button disabled={isLoading} onClick={handleSubmit}>
      Sign out
    </Button>
  );
}
