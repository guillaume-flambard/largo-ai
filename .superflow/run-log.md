# Run log — largo-ai

## Security sweep fix (2026-08-08)

| check | result |
|---|---|
| task | Fix P1 security findings: next-auth@beta.31 (2 critical Auth.js) + next@16.2.9 (5 high) |
| versions | next-auth `5.0.0-beta.31` → `5.0.0-beta.32` (bundle @auth/core 0.41.2 → 0.41.3) · next `16.2.9` → `16.3.0` · eslint-config-next `16.2.9` → `16.3.0` |
| audit (full) | 12 vulns → **4 moderate / 0 high / 0 critical** (remaining = dev-only esbuild via drizzle-kit, fix = breaking `drizzle-kit@0.18.1`, out of scope) |
| audit (--omit=dev) | **0** (js-yaml + nanoid also bumped via `npm audit fix`) |
| gates | tsc:ok · build:ok (82/82 static) · tests:**99/99** (14 files) |
| auth | NextAuth v5 API unchanged in `auth.ts` — beta.32 is a patch, no breaking surface, typechecks clean |
| verdict | green |

## T2 report (2026-08-08, pre-fix)

| check | result |
|---|---|
| stack | node (Next.js 16.2.9 App Router + Turbopack, TS, next-auth 5 beta, drizzle+neon, MDX, GSAP) |
| gates | tsc:ok · tests:99/99 (14 files) · audit:7 vulns (2 critical, 5 high — prod chain) |
| web | boot:ok (port 3101; / → /fr locale) · routes:/ /fr/programme 200 · console errors:0 · a11y:~20-22 serious color-contrast (all viewports) |
| verdict | red |
| findings P1/P2/P3 | P1-1 `next-auth@5.0.0-beta.31` (prod) → 2 critical Auth.js advisories: email normalizer homoglyph bypass (GHSA-7rqj-j65f-68wh), OAuth state/nonce/PKCE cookie not provider-bound (GHSA-x445-f3h2-j279); fix beta.32. P1-2 `next@16.2.9` → 5 high (middleware/proxy bypass w/ Turbopack, DoS server actions, SSRF, cache confusion, sharp libvips, postcss via next); fix next@16.3.0 (out of declared range). P2-3 `js-yaml` high via gray-matter (CVE-2026-59870). P3-4 color-contrast serious on section 9 + header spans (mobile/tablet 22, desktop 20 nodes). P3-5 /fr/sign-in 404 (auth entry missing or moved). |
