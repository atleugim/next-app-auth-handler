import SignOut from "~/components/auth/sign-out";

export default function DashboardPage() {
  return (
    <div className="grid place-items-center gap-8 w-full max-w-sm">
      <h1 className="text-2xl font-semibold">I'm authenticated</h1>
      <SignOut />
    </div>
  );
}
