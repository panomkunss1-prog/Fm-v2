# Critic Review — Piece 1 (Mobile App Shell) + Piece 2 (Chairman Dashboard)

**Reviewer:** independent critic sub-agent, fresh context, no prior exposure to the build.
**Branch reviewed:** `claude/football-executive-game-iphone-o0xs4y` (as checked out; not switched, not modified, not pushed).
**Date:** 2026-09-04.
**Method:** read `ARCHITECTURE.md` and `QUALITY_BAR.md` in full first; then read every file in `src/` (not a sample — the whole tree, 34 files); then actually ran the app (build + preview) and drove it myself with a standalone Playwright script using the project's own `iPhone 15` device parameters (393×852 CSS px, DPR 3, Chromium mobile emulation), independently of `tests/e2e/smoke.spec.ts`; then ran the project's real test suite myself.

## Verdict: **LOSES**

This is a genuinely well-architected, honest, disciplined first slice — better than most "Piece 1" submissions I'd expect. But it loses on execution polish that a shipped app (Football Chairman Pro, or any App Store title) simply would not ship with, and the single biggest gap is that **the PWA app-icon pipeline is completely non-functional** — every icon path the running app references (`icon-192.png`, `icon-512.png`, `favicon.svg`, and the `apple-touch-icon` link) resolves to nothing, and this is silently masked in normal manual testing because `vite preview`'s SPA fallback returns HTTP 200 with the `index.html` document body for every one of those requests instead of a real 404. See §4 for full reproduction and the fix.

Two further things worth knowing up front, because you specifically asked me to be exact about them rather than hedge:
- **The ฿ currency-symbol crowding you noticed is real. Confirmed, not denied.** See §5.
- No Starting XI / formation / tactics / lineup content exists anywhere in `src/`, and no individual real person is named anywhere. Both confirmed by grep across the whole tree, not assumed. See §6–§7.

---

## 1. What I actually ran (verification bar, in the order `ARCHITECTURE.md` §6 requires)

`node_modules` was already present, so no `npm install` was needed (confirmed working, not assumed — every command below executed against the real `node_modules`).

```
$ npm run typecheck
> tsc -b --noEmit
EXIT_CODE=0
```

```
$ npm run build
> tsc -b && vite build
✓ 68 modules transformed.
dist/registerSW.js                0.14 kB
dist/manifest.webmanifest         0.42 kB
dist/index.html                   0.99 kB │ gzip:  0.50 kB
dist/assets/index-Ck4J3qpx.css   10.57 kB │ gzip:  2.72 kB
dist/assets/index--jK8G3PG.js   156.28 kB │ gzip: 49.77 kB
✓ built in 859ms
EXIT_CODE=0
```
Bundle size is genuinely good for the mobile performance bar in `ARCHITECTURE.md` §4 (156 KB JS / 49.8 KB gzipped, no bloat).

```
$ npm run test
 ✓ tests/unit/systems/boardSystem.test.ts (12 tests)
 ✓ tests/unit/systems/fixtureSystem.test.ts (8 tests)
 ✓ tests/unit/systems/financeSystem.test.ts (8 tests)
 ✓ tests/unit/systems/seasonSystem.test.ts (3 tests)
 ✓ tests/unit/app/reducer.test.ts (5 tests)
 ✓ tests/unit/core/format.test.ts (4 tests)
 ✓ tests/unit/smoke.test.ts (1 test)
 Test Files  7 passed (7) · Tests  41 passed (41)
EXIT_CODE=0
```
I read every one of these test files, not just the pass count. They assert real behavior (threshold boundaries for board-confidence classification at 0/39/40/59/60/79/80/100, finance-health boundaries at 4,999,999/5,000,000/19,999,999/20,000,000, fixture sort-by-kickoff and home/away matching, non-mutation of inputs) — this is not a rubber-stamped or trivial suite.

```
$ npm run test:e2e
Running 11 tests using 2 workers
  ✓ 11 passed (12.2s)
EXIT_CODE=0
```
This ran for real against the actual built app on `http://127.0.0.1:4173` (Playwright's own `webServer` config builds and previews it). I did not take this on faith — I read `tests/e2e/smoke.spec.ts` in full first and confirmed it asserts real DOM content (club name, matchday text, exact `฿32,600,000` string, touch-target bounding boxes ≥44×44, absence of "Starting XI"/"Formation" text, no horizontal overflow) rather than trivially-true checks.

```
$ npm run lint   (bonus — not in the mandated bar, ran anyway)
> eslint . --max-warnings 0
EXIT_CODE=0
```

All four verification-bar gates pass for real, with real output, not descriptions of output.

---

## 2. My own independent drive (not reusing `tests/e2e/screenshots/`)

I started `npm run preview` myself and wrote a standalone Playwright script (not the test runner) that imports the exact same iPhone 15 device parameters `playwright.config.ts` defines (393×852, DPR 3, `isMobile`/`hasTouch`, the same Chromium binary at `/opt/pw-browsers/chromium-1194/`), then manually clicked through: both dashboard viewport states, full-page captures of both roles, all four non-dashboard tabs, a role-switch round-trip, and a tab-under-FA-President check. All screenshots are freshly captured this session under:

`/home/user/fm-v2/docs/reviews/critic-screenshots/`

| File | What it shows |
|---|---|
| `01-dashboard-chairman-viewport.png` | Chairman dashboard, first-fold, real iPhone 15 viewport |
| `02-dashboard-chairman-full.png` | Chairman dashboard, full scrollable content |
| `03-finance-card-closeup.png` | Club Finance card, cropped tight (currency check) |
| `04-money-value-tight.png` | Just the `฿32,600,000` string, cropped to the glyphs |
| `05-tab-club.png` / `05-tab-finance.png` / `05-tab-league.png` / `05-tab-association.png` | Each non-dashboard tab's empty state |
| `06-dashboard-fa-president-viewport.png` / `07-dashboard-fa-president-full.png` | FA President role, dashboard |
| `08-fa-president-club-tab.png` | Club tab while in FA President role (shows tab content is not role-filtered) |
| `09-money-symbol-6x-zoom.png` | Same font/weight/tracking as the real card, rendered at 120px (6.3×) to make the currency-symbol kerning question unambiguous to the eye |

I also pulled `boundingBox()` for every interactive element, confirmed `document.documentElement.scrollWidth === clientWidth` (no horizontal overflow, 393 = 393), and read back computed styles / `--safe-*` custom-property values directly from the live DOM rather than reading the CSS source and assuming it applies.

---

## 3. Architecture / layering review (`ARCHITECTURE.md` §1)

I read all 34 files in `src/` — every file in `core/`, `data/`, `systems/`, `app/`, `ui/`, not a sample. **I did not find a single layering violation.** Specifically:

- `src/ui/pages/ChairmanDashboard.tsx` calls `selectChairmanDashboard(state)` and only formats the result (`formatMoney`, `formatPercent`) — it never computes a balance, board score, or classification itself. Same pattern in every other page component.
- `src/app/selectors.ts` is the only file that assembles view models, and it does so by calling into `systems/boardSystem`, `systems/financeSystem`, `systems/fixtureSystem`, `systems/seasonSystem` — it does not reimplement any classification/threshold logic itself.
- `src/systems/*.ts` are pure functions of state → snapshot (`classifyBoardConfidence`, `classifyFinanceHealth`, `getNextFixture`, `getSeasonSummary`), with zero React/DOM references, confirmed by reading each file — genuinely the single source of truth the anti-duplication rule requires.
- `src/core/*.ts` are exactly what the doc specifies: types, a `Money` value object, pure `format.ts` helpers with explicit doc-comments explaining why formatting (not classification) is safe to live there. No RNG/simulation logic, no knowledge of "the list of Thai clubs."
- `src/data/*.ts` is seed data only, imported exactly once, in `src/app/state.ts` — the doc-comment there explicitly says "everything downstream reads from `AppState`, never from `src/data` directly," and grepping confirms `@data/*` imports appear only in `app/state.ts`, nowhere in `ui/`.
- Dependency direction: I did not find any `src/systems/**` or `src/core/**` file importing from `app` or `ui`. One-way flow holds.

This layer is a real strength of the piece, not a superficial one — the separation is actually load-bearing (e.g., `getBoardConfidenceSnapshot`/`classifyFinanceHealth` are exercised directly by unit tests, independent of any component).

---

## 4. THE SINGLE BIGGEST GAP — the PWA icon/manifest pipeline is completely broken

**Claim:** `docs/ROADMAP.md` Wave 0 lists `PWA manifest` as done (`[x]`). It is not functionally done — it is wired to files that do not exist anywhere in the repository or the build output. This is exactly the "a claim of 'done' that doesn't hold up when you actually look" failure pattern I was asked to hunt for, and it ships today inside the Shell that Piece 1 is being reviewed on.

**Reproduction, step by step:**

1. `index.html` (root of the reviewed app) declares:
   ```html
   <link rel="apple-touch-icon" href="/icon-192.png" />
   ```
2. `vite.config.ts` configures `vite-plugin-pwa` with:
   ```js
   includeAssets: ['favicon.svg'],
   manifest: { icons: [
     { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
     { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
   ]}
   ```
3. `public/` — the directory Vite copies verbatim into every build — is **completely empty**. I confirmed this directly: `ls -la public/` returns zero files.
4. After a real `npm run build`, I confirmed `dist/` contains **zero** files matching `*icon*` or `favicon*` anywhere (`find dist -iname "*icon*" -o -iname "favicon*"` → empty).
5. Against the running preview server, I requested every one of these paths and inspected the actual response body/content-type (not just the status code, because the status code lies here):

   | Path | HTTP status | Actual `Content-Type` | Actual body |
   |---|---|---|---|
   | `/icon-192.png` | 200 | `text/html` | the SPA's `index.html` (989 bytes of HTML) |
   | `/icon-512.png` | 200 | `text/html` | same `index.html` fallback |
   | `/favicon.svg` | 200 | `text/html` | same `index.html` fallback |
   | `/favicon.ico` | **404** | — | genuinely not found |
   | a made-up path (`/nonexistent-random-xyz.png`) | 200 | `text/html` | same `index.html` fallback |

   The last row is the smoking gun: `vite preview`'s SPA fallback returns 200 + the app shell for **any** unmatched path, which is why a naive `curl -o /dev/null -w '%{http_code}'` check (200 everywhere) would wrongly read as "fine." It isn't — a browser or iOS asking for a PNG and getting an HTML document back cannot render it. `/favicon.ico` isn't even covered by that fallback and 404s outright — and this exact 404 showed up as a real `console.error` in my Playwright session's browser console during ordinary navigation, with no interaction beyond loading the page.

**Why this is the single biggest gap, not a minor one:**
- It is not a matter of taste or a rendering nuance — it is **100% non-functional**, not merely unpolished. Every icon surface the app declares is dead.
- This is a mobile-specific, PWA-specific app (that's the entire premise of `vite-plugin-pwa` being a dependency, and of `ARCHITECTURE.md` §4's mobile bar). "Add to Home Screen" is the single most natural first action a player takes with a mobile chairman-management game they intend to return to across many short sessions (exactly the session shape `QUALITY_BAR.md` §5/§6 documents for this genre). On a real iPhone 15 today, that action produces a broken or blank icon, not a football-club-chairman-game icon.
- It's precisely the kind of thing "the running app looks organized" masks and only actually driving the app (not reading the file tree) reveals — which is the whole point of this review's mandate.
- It directly contradicts a "done" claim already recorded in `docs/ROADMAP.md`. Any team relying on that checkbox has been told something false.
- Against the comparison bar: `QUALITY_BAR.md` §7 is honest that FCP's specific icon design is `[U]` unknown, so I am **not** claiming ours looks worse than a documented FCP icon — I can't compare pixels I've never seen either. The comparison that actually holds is structural: FCP is a real, shipped App Store/Play Store title, and no app reaches either store without a functioning icon — that's a store submission requirement, not a design opinion. "Zero working icon files" loses to that bar unconditionally, and loses to "basic mobile-app craft" on its own terms independent of FCP entirely.

**Fix, specific enough to act on without guessing:** generate real `icon-192.png`, `icon-512.png`, and `favicon.svg`/`favicon.ico` files (any real raster/vector image, even a simple placeholder crest — the current teal "BG" monogram treatment from the identity card would be an on-brand starting point) and place them in `public/` so Vite actually copies them into `dist/`. Then rebuild and re-curl the four paths above and confirm real `image/png` / `image/svg+xml`/`image/x-icon` content-types come back, not `text/html`.

---

## 5. Your specific question: does the ฿ symbol crowd the balance? — **Confirmed, yes**

I did not assume either way. Three independent checks, increasing in rigor:

**Check 1 — the formatted string itself.** `src/core/format.ts`'s `formatMoney` uses:
```js
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'THB', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 })
```
I ran this directly in Node (same engine Vite/the browser use for `Intl`) against the seed balance:
```
formatMoney(money(32_600_000)) === "฿32,600,000"
formatToParts → [{currency:"฿"},{integer:"32"},{group:","},{integer:"600"},...]
```
There is **zero separator** — not even a normal space — between the currency token and the first digit. This is font-independent: the string itself provides no breathing room, so any tight-set font is one bad kerning pair away from visible crowding.

**Check 2 — actual rendered glyph geometry**, measured via Canvas 2D text metrics against the real computed font/weight/size used on the Club Finance card (`800 19px` of the project's font stack, as actually resolved by this Chromium build):
```
symbolAdvanceWidth: 11.60px
symbolActualRight (ink extent): 12.00px
inkExceedsAdvance: 0.40px
```
The ฿ glyph's rendered ink extends **past its own character-advance box**, meaning it visually intrudes into the space reserved for the next character (the "3") before that character even starts — the textbook definition of crowding, measured, not eyeballed.

**Check 3 — direct visual confirmation.** `docs/reviews/critic-screenshots/09-money-symbol-6x-zoom.png` renders the identical string at the identical font-family/weight/letter-spacing, scaled to 120px (6.3× the real 19px) specifically so kerning is unambiguous to the eye rather than a JPEG-artifact judgment call at native size. At that scale, the top stroke of ฿ visibly touches/merges with the top-left curve of the "3." At native 19px size (`03-finance-card-closeup.png`, `04-money-value-tight.png`) it reads as tight/crowded rather than an obvious overlap, but the crowding is real, not imagined — this is exactly the kind of thing that reads fine in a spec doc and bad on an actual screen.

**One honest caveat:** this sandbox cannot render Apple's San Francisco font (no macOS fonts are installed on this Linux box), so I tested against this project's own declared fallback stack resolving to Liberation Sans/Arial-equivalent — the actual final entry in the `font-family` list (`Arial`), not a font I substituted myself. SF Pro's Baht glyph side-bearing could differ slightly. But the root cause — zero separator character in the formatted string — is font-independent and will not self-correct on a different device; it is currently relying entirely on a specific font's side-bearing to not look crowded, which is fragile.

**Fix:** insert a thin space (or a fixed CSS margin/gap after the currency glyph) in `formatMoney`, e.g. wrap the currency part and the numeric part with a small explicit gap rather than trusting `Intl`'s zero-gap `narrowSymbol` output verbatim.

---

## 6. Chairman-vs-Manager-Mode boundary (`ARCHITECTURE.md` §2) — clean, verified by grep, not trusted

```
grep -riE "(starting.?xi|formation|tactic|lineup|line-up|line up|substitut|
            set.?piece|player.*position|training.*drill)" src/
→ No matches found
```
I ran this across the entire `src/` tree, not a sample. Genuinely absent, not merely "not mentioned in the summary I was handed."

---

## 7. Real-data policy (`ARCHITECTURE.md` §3) — clean, verified by grep, not trusted

Grepping for `manager|player|staff|coach` across `src/` returns only: doc-comments explaining the Chairman/Manager-NPC split (`core/role.ts`), the phrase "the player's club" (i.e. the human user, not a footballer), the FA-role empty-state copy ("Manager oversight... coming in later pieces"), and `PLAYER_CLUB`/`homeIsPlayerClub` identifiers (again, "player" = the person playing the game). **No individual person — manager, player, staff, or otherwise — is named anywhere in the source.** The only proper nouns anywhere in `src/data/` are `BG Pathum United`, `Sukhothai FC`, and `Thai League 1` — real public facts (club/league/city names), which `ARCHITECTURE.md` §3 explicitly pre-approves and which `ARCHITECTURE.md` itself cites as the established convention. No fabricated stat is presented as real; no individual identity appears at all.

---

## 8. Secondary issues (real, but not the primary gap)

**a. `.fm-grid-2` is dead CSS.** `ChairmanDashboard.tsx` wraps the Board Confidence and Club Finance cards in `<div className="fm-grid-2">`, evidently intending a 2-column KPI row. I grepped every `.css` file in the project (`dashboard.css`, `components.css`, `shell.css`, `global.css`, `tokens.css`) — `.fm-grid-2` is defined **nowhere**. The two cards currently just stack as ordinary block elements (confirmed in `01-dashboard-chairman-viewport.png` — they render fine, one under the other, no visual breakage). This is harmless today by accident, not by design: the class name and the component structure both signal an intended layout that was never wired up. Worth fixing precisely because it's the same "wrote it, never checked it," pattern as §4 and §5 — three independent instances of that pattern is a real signal, not a coincidence.

**b. The current matchday is restated three times on one screen** with no new information two of the three times: the header ("Season 2026/27 · Matchday 1 of 30"), the Next Fixture card's pill ("Matchday 1"), and the Season card ("Matchday 1 of 30" + a progress bar). Only the Season card's progress bar adds anything the header didn't already say. `QUALITY_BAR.md` §3's best-evidenced pattern for this genre is "one summary, then descend into categories that add new information" — this isn't a wall of stats, but it is duplication a tighter edit would trim (e.g., the Season card could lead with the progress bar and drop the redundant matchday-label repeat).

**c. The role switch — arguably the single most important control for this game's whole premise (Chairman ⇄ FA President) — sits at the very top of the screen**, above the fold content, in the hardest-to-reach zone for one-handed thumb use on a 6.1" iPhone (measured center ≈ y=291 of 852, i.e., in the top third). The bottom tab bar correctly follows `ARCHITECTURE.md` §4's "thumb-reachable" mandate; the role switch, despite being just as central to the product's premise, doesn't get the same treatment. This is a defensible design choice (header-based mode switchers are a common pattern) rather than a clear defect, so I'm not counting it as the primary gap — but on a device this tall it's worth a second look.

**d. Tab content is not role-aware.** The `Club`/`Finance`/`League`/`Association` tabs render byte-identical empty-state copy regardless of whether you're in Chairman or FA President mode (confirmed: `05-tab-club.png` and `08-fa-president-club-tab.png` are the same "Club Management" copy under different header framing). Given these are explicitly out-of-scope placeholder screens for this piece, I'm not penalizing this — flagging it only so it isn't mistaken for role-aware content later.

---

## 9. What this piece actually gets right (for balance — a harsh review still owes you the accurate picture)

- **Zero layering violations** found after reading the entire `src/` tree — not a spot check, all of it (§3).
- **Zero forbidden tactics/formation content**, verified by grep, not assumed (§6).
- **Zero fabricated individuals**, verified by grep, not assumed (§7).
- **Honest empty states everywhere they're needed** — Club/Finance/League/Association tabs all say "Not built yet" with a specific "Planned for Wave N" pointer, and none of them show a fabricated number. This is exactly the behavior `ARCHITECTURE.md` §3 demands and `EmptyState.tsx`'s own doc-comment calls out explicitly ("Never pair this with fabricated numbers").
- **Real, meaningful automated tests** at both the unit and e2e level, all passing for real, not merely present (§1).
- **Touch targets genuinely meet the ≥44pt bar** — I measured them myself, not trusted the CSS token comment: role-switch buttons are exactly 44px tall, tab-bar items are 78.6×56px. No horizontal overflow (`scrollWidth === clientWidth === 393`, measured, not assumed).
- **Small, real football-specific texture, not generic-app-template filler**: the next-fixture card highlights the player's own club in teal against the opponent in neutral grey (a genre-appropriate "which one is mine" convention), kickoff time is genuinely localized to Indochina Time with an explicit `ICT` label (a specific, correct detail, not a lazy `toLocaleString()`), and the Chairman/FA President color identity (teal vs. gold) is threaded consistently through header, role switch, tab-bar active state, and even fixture-team highlighting via one `data-role` attribute on the shell root, not duplicated per component.
- **Bundle size is disciplined** (156 KB JS / 10.6 KB CSS pre-gzip) — consistent with `ARCHITECTURE.md` §4's real-mobile-CPU performance mandate.

None of this is enough to overturn the verdict — a shipped app doesn't get credit for "the architecture is clean" if the icon that represents it on the home screen is broken and a number on its primary screen is confirmed crowded — but it is real, and it means the fixes here are narrow and specific, not a rebuild.

---

## 10. Bottom line

**Verdict: LOSES.**

**Single biggest gap:** the PWA icon/manifest pipeline (`index.html`'s `apple-touch-icon` link, `vite-plugin-pwa`'s manifest `icons` array, and the missing `public/` assets they all point to) is completely non-functional — confirmed by inspecting real HTTP response bodies/content-types after a real production build, not by reading source and assuming it works. Every icon surface is dead, this is marked "done" in `docs/ROADMAP.md` Wave 0, and it directly undercuts "does this feel like the credible start of a real, shippable football-executive game" the moment a player does the single most natural thing a mobile PWA invites them to do: add it to their home screen. Fix: put real `icon-192.png`/`icon-512.png`/`favicon.svg`/`favicon.ico` files in `public/`, rebuild, and re-verify the response content-type (not just status code) for each.

**Confirmed on request:** the ฿ currency symbol in the Club Finance card does crowd the first digit of the balance — verified three ways (zero-gap in the formatted string itself, glyph ink measured past its own advance box, and unambiguous at 6.3× visual zoom). Fix: add an explicit thin space/gap in `formatMoney` rather than relying on `Intl`'s zero-gap `narrowSymbol` output.

**Also real, not the primary gap:** an orphaned `.fm-grid-2` CSS class (intended 2-column KPI row never implemented, currently harmless), redundant matchday restatement three times on one screen, and a role switch placed in the hardest-to-reach zone for one-handed use despite being a primary control.
