import { cookies } from "next/headers";

export function requireAdminCookie() {
  const c = cookies().get("skol_admin");
  return c?.value === "ok";
}

export function assertAdminOrThrow() {
  if (!requireAdminCookie()) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
}
