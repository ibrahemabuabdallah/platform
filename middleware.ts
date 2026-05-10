import { NextRequest, NextResponse } from "next/server";

const LANDING_COOKIE = "sawtak_landing_variant";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== "/") {
    return NextResponse.next();
  }

  const variant = request.cookies.get(LANDING_COOKIE)?.value;
  if (variant !== "experience") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/experience";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/"],
};
