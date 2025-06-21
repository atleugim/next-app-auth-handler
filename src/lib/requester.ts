import ky, { Hooks, Options } from "ky";
import { getSession } from "~/domain/services/auth/server";
import { API_URI, INTERNAL_API_URI } from "./constants";

const requestInterceptors: Hooks["beforeRequest"] = [
  async (request: Request) => {
    try {
      const session = await getSession();

      if (session?.access_token) {
        request.headers.set("Authorization", `Bearer ${session.access_token}`);
      }

      return request;
    } catch (err) {
      console.error(err);
    }
  },
];

const responseInterceptors: Hooks["afterResponse"] = [
  async (request: Request, options: Options, response: Response) => {
    if (response.status === 401) {
      const refreshResponse = await ky
        .post("api/auth/refresh", {
          prefixUrl: INTERNAL_API_URI,
        })
        .json<{ access_token: string }>();

      request.headers.set(
        "Authorization",
        `Bearer ${refreshResponse.access_token}`
      );

      return api(request, options);
    }

    if (!response.ok) {
      try {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await response.clone().json();
          console.error("API Error Response Data:", errorData);
        } else {
          const errorText = await response.clone().text();
          console.error("API Error Response Text:", errorText);
        }
      } catch (e) {
        console.error(
          "Failed to parse error response body or it was not JSON:",
          e
        );
      }
    }

    return response;
  },
];

const api = ky.extend({
  prefixUrl: API_URI,

  hooks: {
    beforeRequest: requestInterceptors,
    afterResponse: responseInterceptors,
  },

  timeout: 10000,
  throwHttpErrors: true,
});

export default api;
