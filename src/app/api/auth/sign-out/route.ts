import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "~/lib/constants";

export async function POST() {
  try {
    const cookiesStore = await cookies();

    cookiesStore.delete(ACCESS_TOKEN_NAME);
    cookiesStore.delete(REFRESH_TOKEN_NAME);

    return new Response(
      JSON.stringify({
        message: "User signed out successfully",
        success: true,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Error signing out",
        error: err,
        success: false,
      }),
      {
        status: 500,
      }
    );
  }
}
