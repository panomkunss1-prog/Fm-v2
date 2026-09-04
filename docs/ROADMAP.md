# Roadmap — smallest independently buildable, judgeable pieces

Each piece below must be independently runnable and independently judgeable
(a critic can look at it and say win/lose vs. Football Chairman Pro) before
the next piece builds on it. Waves are grouped for sequencing; pieces inside
a wave can be built in parallel once their dependencies (left column) exist.

Status legend: `todo` / `building` / `in review` / `won` (critic-approved) /
`blocked`.

## Wave 0 — Foundation (orchestrator, not a builder/critic piece)
- [x] Repo scaffold: Vite + React + TypeScript, Core/Data/Systems/App/UI
      folders, Vitest, Playwright (iPhone 15 project), PWA manifest.
- [x] `docs/ARCHITECTURE.md` — binding layering, Chairman/Manager boundary,
      data policy, mobile bar, verification bar.
- [x] `docs/QUALITY_BAR.md` — researched reference on Football Chairman Pro's
      actual UX, to ground every blind side-by-side critic review.
- [x] Live progress page (Artifact) — updated at every task boundary.
- [x] `docs/ARCHITECTURE.md` §4 — **bilingual i18n (Thai default / English
      toggle) is now a binding, cross-cutting rule**, per user decision
      2026-09-04. Applies to every piece from here on, including a retrofit
      of Piece 1+2 before it can be marked won.

## Wave 1 — Shell (everything else is judged inside this frame)
- [ ] **Piece 1: Mobile App Shell** — bottom tab bar, safe-area handling,
      Chairman ⇄ FA President role switch, header, design tokens/theme,
      **Thai/English language toggle**. Depends on: Wave 0.
- [ ] **Piece 2: Dashboard (Chairman home)** — real club identity, season/
      matchday state, next fixture, board-confidence snapshot, finance
      snapshot, sourced from real Core/Data/Systems (stub systems acceptable
      here, but the data must actually flow through App state, not be
      hardcoded in the component), **all copy in Thai and English via the
      i18n system, not hardcoded strings**. Depends on: Piece 1.
      Built once already (commit `2d39d7e`, English-only) — in critic
      review; will need a follow-up round to add i18n regardless of that
      review's other findings.

## Wave 2 — Authoritative systems (become protected once won)
- [ ] **Piece 3: League & Fixtures System** — round-robin fixture
      generation, standings computation. Depends on: Wave 0.
- [ ] **Piece 4: Match Resolution System** — simulates a result (no tactics
      control), updates standings/form. Depends on: Piece 3.
- [ ] **Piece 5: Finance System** — budget, income/expense ledger, balance.
      Depends on: Wave 0.
- [ ] **Piece 6: Board & Reputation System** — confidence meter driven by
      results/finance/decisions. Depends on: Piece 4, Piece 5.

## Wave 3 — Executive decision domains (UI + wiring into Wave 2 systems)
- [ ] **Piece 7: Manager (NPC) management** — hire/renew/fire, performance
      review decisions.
- [ ] **Piece 8: Transfers & budget approval** — set budget ceiling,
      approve/reject targets.
- [ ] **Piece 9: Sponsorship & commercial**
- [ ] **Piece 10: Stadium & facilities**
- [ ] **Piece 11: Youth development**

## Wave 4 — Association layer (future-ready FA President)
- [ ] **Piece 12: FA President dashboard** — national competitions, referee
      development, national youth pipeline, infrastructure.
- [ ] **Piece 13: World Football / data-gating screen** — the
      Research → Verification → Approval → Import pipeline UI.

## Wave 5 — Progression & polish
- [ ] **Piece 14: Season progression & save/load** — multi-season
      continuity, history.
- [ ] **Piece 15: Consequence feedback** — news feed / board letters / event
      log making decisions feel consequential.
- [ ] **Piece 16: Mobile polish pass** — micro-interactions, empty/loading
      states, accessibility, performance audit.

**Between-wave gate:** a fresh agent plays the whole game end-to-end and
smooths the pieces into one coherent product before the next wave starts.

## Process for every piece

1. Builder sub-agent implements against `docs/ARCHITECTURE.md`.
2. Builder actually runs typecheck/build/unit tests/Playwright e2e and
   captures real iPhone-15-viewport screenshots — no exceptions.
3. Fresh-context critic sub-agent inspects the **running** result (not the
   builder's summary): blind side-by-side vs. Football Chairman Pro
   (`docs/QUALITY_BAR.md`) on usability, information hierarchy, decision
   quality, feedback, progression, mobile ergonomics, polish, and whether it
   feels like executive football management.
4. If ours loses: critic names the single biggest gap, sends it back to the
   builder. Repeat — no fixed round limit.
5. Only when the critic says it wins does the piece move to `won` here.
