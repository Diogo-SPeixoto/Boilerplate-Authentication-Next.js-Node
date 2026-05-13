import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { refreshToken } = body

    const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await res.json();
    const cookieStore = await cookies()
    cookieStore.set("accessToken", data.accessToken);

    return Response.json({
      success: true,
      newAccessToken: data.accessToken
    });
  } catch (error) {
    console.log(error)
  }

}