import * as jose from "jose";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "~/lib/constants";

const createToken = async ({ sub, exp }: { sub: string; exp: string }) => {
  const secret = jose.base64url.decode(
    "zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI"
  );

  return new jose.EncryptJWT({ "urn:example:claim": true })
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setSubject(sub)
    .setExpirationTime(exp)
    .encrypt(secret);
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log(data);

    // Simulate login to api, but here we will use static data
    // const res = await api
    //   .post("login", {
    //     prefixUrl: API_URI,
    //     json: {
    //       username: data.email,
    //       password: data.password,
    //     },
    //   })
    //   .json<AuthResponse>();

    const access_token = await createToken({
      sub: data.email,
      exp: "2h",
    });
    const refresh_token = await createToken({
      sub: data.email,
      exp: "7d",
    });

    return new Response(
      JSON.stringify({
        access_token,
        refresh_token,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": [
            `${ACCESS_TOKEN_NAME}=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
            `${REFRESH_TOKEN_NAME}=${refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax`,
          ].join(", "),
        },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        message: "Error signing in",
        error: err,
        success: false,
      }),
      {
        status: 500,
      }
    );
  }
}
