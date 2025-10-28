import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Await cookies() to get the cookie store
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value) {
    return NextResponse.json({ loggedIn: true });
  }

  return NextResponse.json({ loggedIn: false });
}
