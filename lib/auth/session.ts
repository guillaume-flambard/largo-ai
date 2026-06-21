import { cache } from "react";
import { auth } from "@/auth";

export const getSessionUser = cache(async () => {
  const session = await auth();
  return session?.user ?? null;
});
