import { redirect } from "next/navigation";
import { getSession } from "~/domain/services/auth/server";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="flex flex-col justify-center items-center h-svh">
      {children}
    </div>
  );
};

export default DashboardLayout;
