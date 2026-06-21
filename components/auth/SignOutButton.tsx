import { signOut } from "@/auth";

/** Server Component — holds the sign-out form action so it can run on the
 *  server even though SiteHeader is a Client Component. */
export function SignOutButton({ label }: { label: string }) {
  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <form action={doSignOut}>
      <button
        type="submit"
        role="menuitem"
        className="link-underline"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--navy)",
          fontWeight: "var(--fw-medium)",
          fontSize: "var(--fs-body)",
          padding: 0,
        }}
      >
        {label}
      </button>
    </form>
  );
}
