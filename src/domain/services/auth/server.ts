"use server";

import { cookies } from "next/headers";
import { AuthResponse } from "~/domain/models/auth";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "~/lib/constants";

export const getSession = async (): Promise<AuthResponse | undefined> => {
  const cookieStore = await cookies();

  try {
    const access_token = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    const refresh_token = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

    if (!access_token || !refresh_token) {
      throw new Error("No access token or refresh token found");
    }

    return {
      access_token,
      refresh_token,
    };
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
