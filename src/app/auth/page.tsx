import SignIn from "~/components/auth/sign-in";

export default function AuthPage() {
  return (
    <div className="grid place-items-center gap-8 w-full max-w-sm">
      <h1 className="text-2xl font-semibold">Please sign in</h1>
      <SignIn />
    </div>
  );
}
