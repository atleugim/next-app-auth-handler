"use client";

import { useState } from "react";
import { useAuth } from "~/providers/auth";
import Button from "../ui/button";
import Input from "../ui/input";

interface FormState {
  email: string;
  password: string;
}

export default function SignIn() {
  const { signIn, isLoading } = useAuth();

  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn({
      data: formState,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 w-full">
      <Input
        type="email"
        label="Email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      <Input
        type="password"
        label="Password"
        value={formState.password}
        onChange={(e) =>
          setFormState({ ...formState, password: e.target.value })
        }
      />
      <Button disabled={isLoading} type="submit">
        Sign In
      </Button>
    </form>
  );
}
