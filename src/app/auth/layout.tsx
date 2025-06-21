import { redirect } from "next/navigation";
import { getSession } from "~/domain/services/auth/server";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col justify-center items-center h-svh">
      {children}
    </div>
  );
};

export default AuthLayout;
