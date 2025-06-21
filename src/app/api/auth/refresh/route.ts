import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { AuthResponse } from "~/domain/models/auth";
import {
  ACCESS_TOKEN_NAME,
  API_URI,
  REFRESH_TOKEN_NAME,
} from "~/lib/constants";
import api from "~/lib/requester";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

    if (!refresh_token) {
      throw new Error("Refresh token not found");
    }

    const res = await api
      .post("refresh", {
        prefixUrl: API_URI,
        json: {
          refresh_token,
        },
      })
      .json<Omit<AuthResponse, "user">>();

    return new Response(
      JSON.stringify({
        access_token: res.access_token,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": [
            `${ACCESS_TOKEN_NAME}=${res.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
            `${REFRESH_TOKEN_NAME}=${res.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
          ].join(", "),
        },
      }
    );
  } catch (err) {
    console.error(err);
    const currentUrl = request.nextUrl.href;
    redirect(`/auth?redirect=${encodeURIComponent(currentUrl)}`);
  }
}
