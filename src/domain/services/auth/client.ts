import { AuthResponse, SignInRequest } from "~/domain/models/auth";
import { INTERNAL_API_URI } from "~/lib/constants";
import api from "~/lib/requester";

export const signIn = (req: SignInRequest) => {
  return api
    .post("api/auth/sign-in", {
      prefixUrl: INTERNAL_API_URI,
      json: req.data,
    })
    .json<AuthResponse>();
};

export const signOut = () => {
  return api.post("api/auth/sign-out", {
    prefixUrl: INTERNAL_API_URI,
  });
};
