import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"


// This function can be marked `async` if using `await` inside
export async function middleware(request) {
//   console.log("🚀 ~ middleware ~ request:", request);

//   const token = await getToken(request);

//   console.log("🚀 ~ middleware ~ token:", token)

//   console.log("กำลังไปที่ api...");
//   if (request.nextUrl.pathname.startsWith("/api")) {
//     return NextResponse.next();
//   }

  // ข้าม ไปหน้าที่ต้องการ
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
