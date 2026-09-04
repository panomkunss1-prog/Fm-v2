# Architecture Constitution — Football Executive Management

This document is binding for every builder and critic working on this project.
If a change conflicts with this file, the change is wrong until this file is
updated deliberately (and that update itself must be justified in a commit).

## 0. What this game is

The player is a **Club Chairman**, with a future-ready **Football Association
President** role. The **Manager is an NPC/Staff member**, never a role the
player plays. The core fantasy is *managing football organizations, not match
tactics*. There is no Starting XI screen, no formation editor, no
in-match substitutions-as-tactics, no set-piece designer, and no press-a-button
match engine the player "plays" like a sports game. Matches are simulated by
an authoritative system and presented as results/reports the executive reacts
to — the way a real chairman experiences a match: from the boardroom, not the
touchline.

Explicitly in scope: finance, manager hiring/firing/contracts, transfer
budgets and approvals, sponsors, stadium & facilities, youth development,
board relationships, reputation, competitions, and long-term multi-season
strategy — all at the executive decision level.

Explicitly out of scope forever, regardless of how it might improve
"engagement": tactics boards, formations, player instructions, in-match
manual control, set pieces, training-ground drills for individual players.
If a future piece drifts toward any of these, it is a bug, not a feature —
reject it in review.

## 1. Layering — Core → Data → Systems → App → UI

Dependencies point one direction only. A layer may import from itself and
everything to its left. It may **never** import from anything to its right.

```
Core  →  Data  →  Systems  →  App  →  UI
```

- **`src/core/`** — Domain types, value objects, enums, IDs, pure math/RNG
  utilities. No knowledge of where data comes from, no simulation logic, no
  React, no localStorage. A `Club` type, a `Money` value object, a seeded RNG
  — but not "the list of Thai League clubs" (that's Data) and not "how a
  match resolves" (that's Systems).
- **`src/data/`** — Seed/reference data (club lists, competition definitions,
  name-generation pools) and persistence (save/load, schema versioning). Data
  depends on Core's types but contains no simulation *behavior* — it's facts
  and storage, not rules.
- **`src/systems/`** — The authoritative simulation engines: match
  resolution, league standings, finance, transfers, board confidence,
  reputation, youth development, sponsorship, stadium/facilities, season
  progression. **This is the single source of truth for every domain
  concept.** If two screens need "club reputation," they both read it from
  `systems/reputationSystem`, computed once, never recomputed ad hoc in a
  component. Systems are pure/testable: given a game state and an action,
  produce the next state (or a result), independent of React or the DOM.
- **`src/app/`** — Orchestration: the game state store, action dispatch,
  wiring systems together into a coherent turn/season loop, save-game
  service, navigation state. This is where "the player clicked Approve
  Transfer" becomes "call transferSystem, then financeSystem, then
  boardSystem, then persist." No business rules live here — App composes
  Systems, it doesn't reimplement them.
- **`src/ui/`** — **Presentation only.** React components render state handed
  to them and call `dispatch(action)`. A UI component must never compute a
  financial balance, a league position, or a reputation delta itself — it
  reads the already-computed value from App/Systems. If you catch a
  component doing arithmetic on domain data beyond formatting (currency
  strings, percentages, date labels), that's a layering violation.

**Anti-duplication rule:** before adding a new field or calculation, grep for
whether it already exists in `core`/`systems`. Two independent
implementations of "board confidence" or "club balance" is a bug, not a
feature, even if they happen to agree today.

## 2. Chairman vs Manager Mode — the line that must never move

Allowed (Chairman/executive decisions):
- Approve/renew/fire the Manager (NPC); set the manager's budget and
  transfer mandate; react to the manager's results and philosophy.
- Set a transfer budget ceiling and approve/reject specific targets the
  manager (or scouting/staff systems) brings to you.
- Sponsorship, ticket pricing tiers, stadium capacity/facility investment.
- Youth academy investment level, board communication, reputation-affecting
  public decisions, competition entry/strategy at the association level.

Never allowed, anywhere in the UI, ever:
- Selecting a Starting XI, formation, or tactical shape.
- In-match substitutions, set pieces, or any real-time match control.
- Individual player training drills or man-management mini-games.

If a piece's design requires any of the "never" list to be "fun," the
correct fix is a better executive-level decision, not a tactics feature.

## 3. Real football data policy (the approval gate)

- **Public facts** (real league names, real club names, competition
  structure, cities, stadium names) are safe to use for atmosphere — this is
  how the original prototype already works (BG Pathum United, Sukhothai FC,
  Thai League 1) and that convention is preserved.
- **Individual real people** (actual living players/managers/staff — their
  name, likeness, career stats) are **gated**. Default to procedurally
  generated personnel (plausible fictional names + generated attributes)
  everywhere a roster is needed. A real-data import pipeline may exist as a
  designed, visible *pipeline* (`Research → Verification → Approval →
  Import`, per the existing World Football screen) but nothing may claim
  real player data is loaded unless that pipeline actually ran and a human
  approved it. Never fabricate a stat and label it as real.
- Any report claiming this gate was satisfied without it actually running is
  the same class of bug as claiming a test passed without running it.

## 4. Internationalization — Thai + English, every piece, from here on

Decided 2026-09-04: the game is **bilingual, Thai default / English toggle**,
matching the language switch the original prototype already sketched
(`<button class="on">ไทย</button> <button>English</button>`, `<html
lang="th">`). This is binding for every piece built from now on, including
retrofitting Piece 1+2 — it is not optional polish for later.

- **No hardcoded UI strings, anywhere in `src/ui/`.** Every user-facing
  string is looked up by key through a translation function
  (`t('dashboard.boardConfidence')`, not a literal `"Board Confidence"` in
  JSX). A component that concatenates or hardcodes display text in Thai *or*
  English is a layering violation, same class of bug as a component computing
  its own balance.
- **Where translations live, per the existing layering:**
  - `src/core/i18n.ts` — the `Language` type (`'th' | 'en'`) and the
    `TranslationKey` shape/type only. No strings here.
  - `src/data/translations/th.ts` and `src/data/translations/en.ts` — the
    actual dictionaries. This is reference data, same category as club/seed
    lists — **both files must define the exact same set of keys**; a key
    present in one language and missing in the other is a bug (fail the
    build/tests on drift if practical, e.g. a unit test that diffs the two
    key sets).
  - Current language selection is **App-layer state**, alongside the
    Chairman/FA-President role — persisted the same way, not a one-off
    `useState` local to a component.
  - `src/ui/` components call a `t()` hook/function and render its result;
    they never hold their own copy of any string.
- **Default language is Thai.** English is one tap away via a visible
  toggle — placement is the builder's judgment call (the original prototype
  put it in the header; a settings surface is also reasonable), but it must
  not crowd the primary bottom-tab-bar navigation or the role switch, and it
  must meet the same ≥44×44pt touch-target bar as everything else.
- **Domain proper nouns stay as real facts regardless of language** — a club
  named "BG Pathum United" doesn't get invented a Thai translation; only UI
  chrome/labels/copy are translated, not real names already covered by §3's
  data policy.
- This is a **standing architecture rule**, not a single piece — every
  future builder must wire new UI text through this system from the start.
  Retrofitting Piece 1+2 for this is the next builder round for that piece,
  regardless of what the critic's independent review finds on other axes.

## 5. Mobile bar (iPhone 15) — non-negotiable

- Reference device: **iPhone 15, 393×852 CSS px, DPR 3, portrait.** This is
  the only viewport that matters for "does this work" — desktop is a bonus,
  not the target.
- Touch targets ≥ 44×44pt (Apple HIG). No hover-only affordances, no
  tooltips-on-hover as the only way to see information, no interaction that
  assumes a mouse or keyboard precision pointer.
- Respect safe areas (`env(safe-area-inset-*)`) for notch/home-indicator.
- Primary navigation is a bottom tab bar (thumb-reachable), not a sidebar.
- Real performance on a real mobile CPU/GPU budget: avoid layout thrash,
  avoid shipping large unused JS, keep animations at 60fps-achievable
  complexity.

## 6. Protected systems

As of this document's creation, **nothing in this codebase is a pre-existing
protected system** — the repository's only prior content was a static,
zero-logic HTML mockup (preserved in git history at the "Add files via
upload" commit; superseded by this rebuild). There is no Unity runtime or
other authoritative backend reachable from this environment.

Once a system lands in `src/systems/` and passes its critic review, it
**becomes protected** for every later piece: later work must call into it,
not fork a parallel implementation. Record newly protected systems in
`docs/ROADMAP.md` as each wave completes.

## 7. Verification bar

No piece may be reported as done without, in this order:
1. `npm run typecheck` and `npm run build` actually succeeding.
2. `npm run test` (Vitest, unit tests on Systems logic) actually passing.
3. `npm run test:e2e` (Playwright, iPhone 15 project) actually running
   against the built app and producing real screenshots — **in both `th`
   and `en`**, once §4's i18n system exists. Thai text runs measurably
   longer/shorter than its English equivalent; a screenshot in only one
   language does not verify the other actually fits.
4. A critic sub-agent inspecting the **running app** (screenshots/DOM from
   Playwright), not the builder's description of it.

"PASS" without all four is a false claim.
