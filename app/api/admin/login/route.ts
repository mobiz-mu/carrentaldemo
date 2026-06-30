import { NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  ADMIN_COOKIE,
  ADMIN_SESSION_VALUE,
} from "@/lib/auth";

// Uses Node's crypto for a constant-time comparison.
export const runtime = "nodejs";

export async function POST(request: Request) {
  let email = "";
  let password = "";
  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, error: "Email and password are required." },
      { status: 400 }
    );
  }

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect email or password." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
