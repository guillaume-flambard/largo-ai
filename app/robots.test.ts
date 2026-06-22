import { describe, it, expect } from "vitest";
import robots from "./robots";
import { SITE_URL } from "@/lib/site";

describe("robots", () => {
  it("autorise l'exploration de tout le site", () => {
    expect(robots().rules).toMatchObject({ userAgent: "*", allow: "/" });
  });

  it("référence le sitemap et l'hôte canonique", () => {
    const r = robots();
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(r.host).toBe(SITE_URL);
  });
});
