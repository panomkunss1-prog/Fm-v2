# Quality Bar — Football Chairman Pro (research reference)

This document is the objective comparison baseline for blind side-by-side
critic review. It exists because `ARCHITECTURE.md` states our design intent
(no tactics, no Starting XI, executive-only decisions) but does not tell a
critic what a **real, shipped, award-winning game in this exact genre**
actually looks and feels like on a phone. Every claim below is tagged with
its confidence level. Critics should cite the tag when using a claim, and
should not treat `[R]`/`[I]` items as pixel-accurate truth.

## 0. Methodology and source-reliability note (read this first)

**Hard constraint on this research:** this sandbox's network egress proxy
blocks `WebFetch`/direct HTTP access to essentially every external domain,
confirmed by testing `apps.apple.com`, `play.google.com`-adjacent mirrors,
`football-chairman.com`, `football-chairman.net`, `medium.com`,
`tripletaptech.org`, `gmgames.org`, `mwm.ai`, and even `en.wikipedia.org` —
all returned `EGRESS_BLOCKED` / proxy `403`. **No screenshot, no App Store
page, and no article was directly loaded and read in full for this
document.** Everything below comes from `WebSearch` result snippets and the
short synthesized summaries that tool returns, cross-checked across many
differently-worded queries until the same facts converged from independent
sources. That is a real limitation: I could not visually inspect a single
screenshot, so **no color hex value, exact typeface, icon design, or
pixel-level layout claim appears in this document** — where the genre
convention is used instead, it is explicitly labeled `[I]` (inferred /
typical-of-genre, not FCP-specific evidence).

Confidence tags used throughout:
- **`[C]` Confirmed** — official source text (App/Play Store listing
  language, the developer's own blog) reproduced consistently across
  multiple independent search queries, or a specific fact (company
  registration, package name) from an authoritative registry.
- **`[R]` Reported** — a specific claim from a single named
  review/community source (a critic's opinion, one aggregator's number). Real
  and attributable, but not independently re-verified by a second source.
- **`[I]` Inferred / genre convention** — not sourced to Football Chairman
  Pro specifically; documented as the common pattern in comparable
  chairman/tycoon-style mobile management games, for context only.
- **`[U]` Unknown** — actively could not verify. Listed so critics don't
  assume it was checked.

---

## 1. What it is

**`[C]`** Football Chairman Pro is a mobile football-club-management
simulation published by **Underground Creative Ltd**, a small UK studio
(incorporated 16 March 2015, registered in Congleton, Cheshire — Companies
House #07087368/#09491899). Co-founders **James Black** (creator) and
**Sean Wilson** (director) are named on LinkedIn as the team behind it. The
studio is small enough that it also ships **Superstar Band Manager**, a
music-industry game using the same "you're the executive, not the talent"
format — this is a studio pattern, not a one-off.
[gmgames.org publisher profile](https://gmgames.org/publisher/underground-creative/),
[Companies House](https://find-and-update.company-information.service.gov.uk/company/07087368),
[undergroundcreative.com](https://www.undergroundcreative.com/)

**`[C]`** The franchise has three live SKUs with distinct package IDs, all
by the same publisher: **Football Chairman** (free/freemium base game,
`id994930936`), **Football Chairman Pro** (paid, ~£2.99/$2.99–3.99 at review
time, `id992140496`, first launched **18 June 2015**), and **Football
Chairman Pro 2** (the 2024 sequel, `id6499549945`). A "Football Chairman
Lite" trial also exists on Amazon Appstore. This document is about **Pro**
(the `id992140496` SKU) primarily, since that's the mature, most-reviewed
version, and notes Pro 2 deltas separately in §5.
[App Store — Pro](https://apps.apple.com/us/app/football-chairman-pro/id992140496),
[App Store — Pro 2](https://apps.apple.com/us/app/football-chairman-pro-2/id6499549945),
[Google Play — Pro](https://play.google.com/store/apps/details?id=com.undergroundcreative.footballchairmanpro),
[game-solver.com](https://game-solver.com/football-chairman-pro/)

**`[C]`** Core premise, near-verbatim App Store/Google Play copy (converged
identically across many independent search queries, so treated as
high-confidence reproduction of the actual listing text):

> "Build your own football empire! Create a football club from scratch,
> starting as a tiny non-league team, and see if you can make it through
> seven divisions to the very top... Hire and fire managers, develop your
> stadium, negotiate transfers, contracts and sponsorship deals while
> keeping the fans and the bank manager happy."

Pro 2's opening line: **"Football Chairman is back and it's bigger than
ever!"**
[Google Play listing](https://play.google.com/store/apps/details?id=com.undergroundcreative.footballchairmanpro),
[App Store — Pro 2](https://apps.apple.com/us/app/football-chairman-pro-2/id6499549945)

**`[C]`** This is explicitly **not** a tactics game, by the developer's own
mechanical design, not just marketing copy. The official dev blog post *"How
your manager picks the team"* confirms the **player never selects a Starting
XI** — an NPC manager auto-selects the team using a composite score of Skill
(1–99) plus Form/Fitness/Happiness (each −3 to +3), and the blog exists
specifically to explain to players why the manager sometimes benches a
higher-skill player in favor of one with better form/fitness/happiness. This
is the single strongest piece of evidence in this whole research effort that
FCP occupies exactly the genre our `ARCHITECTURE.md` targets: chairman-level
resourcing decisions produce a team the player never touches directly.
[football-chairman.net blog](https://football-chairman.net/blog/posts/how-your-manager-picks-the-team)

**`[C]`** Positioning versus deeper sims, per review consensus (Gaming
Matters, TapTap, Backloggd, independently converging): "similar to any
football management game but switching the position from manager to
chairman," aimed at players who want "a fun football game without getting
too in-depth with tactics and scouting." One reviewer (Backloggd) frames it
explicitly as **"an antithesis to Football Manager"** — same subject matter,
deliberately inverted control level.
[Gaming Matters review](https://siboyle.wixsite.com/sismatters/single-post/2016/09/25/gaming-matters-football-chairman-pro-review),
[Backloggd review](https://backloggd.com/u/internettrey/review/164316)

**`[R]`** Scale/track record: "over three million users have downloaded the
Football Chairman games since launch" (franchise-wide figure, not Pro-only,
and the figure's citation age is uncertain). Awards claimed in marketing
copy: Apple Editor's "Best of 2013," "Best of 2014," "Best of 2016," "Best of
2017"; Google Play "Best of 2015." **Caveat:** "Football Chairman Pro"
specifically launched June 2015 per one source, which predates the 2013/2014
awards — those almost certainly belong to the original free "Football
Chairman" app or the franchise collectively, and the Pro listing appears to
inherit the whole franchise's award history in its own marketing copy rather
than these being Pro-specific wins. Presented as a marketing claim, not
independently disaggregated.
[game-solver.com](https://game-solver.com/football-chairman-pro/)

**`[R]`** App Store rating "~4.5 out of 5 from tens of thousands of
reviews" for Pro; Pro 2 reported at "4.8/5, 75k+ downloads" by one
third-party aggregator (MWM). **`[U]`** Exact current rating counts —
could not verify directly (apps.apple.com blocked).

**`[C]`** Official framing on cost/monetization: "No time limits or
adverts, and all in-app purchases are 100% optional." **`[R]`** This is
contradicted by some user reviews (see §8) claiming "totally pay to win" and
reporting ad-related crashes — so treat the "100% optional" framing as the
publisher's stated design intent, not a universally-agreed lived experience.

**`[U]`** Publisher category tag ("Sports" vs "Simulation") and precise age
rating — sourced only from a low-authority aggregator
(familygamingdatabase.com), not independently corroborated; not stated with
confidence here. iOS requirement ~12.0+, app size ~51MB, universal
iPhone/iPad/iPod build — also single-source, moderate confidence only.

**Disambiguation note:** a separate, unrelated app called **"Club
Chairman - Football Game"** (`id6736948079`) exists in the same
micro-genre from a different developer. Not covered here — flagged only so
it isn't confused with Football Chairman Pro in later research.

---

## 2. Screen inventory

**`[C]` = named directly in official copy or the dev blog and corroborated
by at least one independent review/accessibility source. `[R]` = reported by
a single source. `[U]` = could not establish a definitive tab/nav
structure.**

| Screen / area | Status | What it does |
|---|---|---|
| **Squad** | `[C]` | Full list of players with per-player stats; grouped by GK/DEF/MID/ATT; tap a player for a detail view with actions: negotiate contract, loan out, transfer-list/sell, release. Overall squad rating shown at a glance. Confirmed independently by [AppleVis](https://www.applevis.com/apps/ios/games/football-chairman-pro) and [TripleTapTech](https://tripletaptech.org/football-chairman-pro/) accessibility walkthroughs, which describe the same list→detail pattern. |
| **Finances** | `[C]` | Club financial overview; explicitly called out as **redesigned** in the Pro 2 update notes "to give players more information about their club's finances and help them plan better" — implying the pre-redesign version was leaner/more summary-only. [Blog](https://football-chairman.net/blog/posts/whats-new-in-football-chairman-pro-2) |
| **Stadium** | `[C]` | Ticket prices, turf/pitch condition repair, seating capacity expansion, food/merchandise stand counts, "3D stadium graphics." [TripleTapTech](https://tripletaptech.org/football-chairman-pro/) |
| **Confidence** (board + fans) | `[C]` | The reputation/standing screen. Explicitly structured as **one overall Summary plus 4 named sub-sections**: Competitions (on-field performance), Finances (control over club money), match-by-match feedback, and Transfers/player-performance assessment. This is the closest thing to a "board" screen and is the best-documented single screen in this research. [AppleVis](https://www.applevis.com/apps/ios/games/football-chairman-pro) |
| **Transfers** | `[C]` | Sign/negotiate/loan/release players; contracts capped at a max 4-year length (per a user complaint, so this is a real, felt constraint). Pro 2 adds a **Transfer shortlist** feature for tracking targets. |
| **Manager** | `[C]` | Hire/fire the manager (NPC). Pro 2 gives managers "more detailed profiles, including age, personality and preferences" and lets the chairman **negotiate manager contracts and renewals** — i.e., the manager is treated as a full staff-contract subject, same conceptual bucket as a player. |
| **Youth / academy** | `[C]` | Full youth squad with player development; a dedicated official blog post ("How does the youth system work?") and a second one on "making improvements to your youth academy and training facilities" confirm this is a distinct, non-trivial system, not a footnote. [Blog index](https://football-chairman.net/blog/) |
| **Backroom staff** | `[R]` | Named in official copy ("manage merchandise sales, pitch condition and backroom staff") as a distinct management area. `[U]` Granular roles (scout/coach/physio breakdown) are **not** confirmed specific to this game — that breakdown only surfaced in generic Football Manager results during research, so it is not attributed to FCP here. |
| **Sponsorship** | `[C]` | Negotiate sponsorship deals — named directly in official copy across every source. |
| **Competitions / Cups** | `[C]` | Domestic + European cup competitions (FA Trophy/JPT/League Cup/FA Cup/Community Shield/Champions League/European Super Cup per one detailed review); an **animated "cup draw" news story** was added as a specific Pro 2 feature. Pro 2 adds a **World Team Cup**. |
| **Club records / Achievements** | `[C]` | 50 achievements (one update added "15 brand new"), plus club records to beat. Pro 2 adds a **Hall of Fame** for the club's greatest-ever players. |
| **Kit designer** | `[C]` (Pro 2 only) | Design home/away/goalkeeper shirts each season — new in Pro 2, not confirmed in original Pro. |
| **Rivals** | `[C]` | Pick the club's local "derby" rival — a one-time/occasional setup choice, named directly in official copy. |
| **Challenges** | `[C]` | "New challenge scenarios to test your skills" (base Pro); Pro 2 adds a specific **Financial Fair Play challenge**. |
| **Data / Datapacks** | `[C]` | Load community datapacks of real-world team names, or use a **separate companion web tool** (a free online data editor at football-chairman.com/data-editor) to author custom data — notable because this offloads data-authoring complexity to a companion website rather than cluttering the phone UI. |
| **Home / Dashboard** | `[R]` | Shows trophies won (current club, or career-wide toggle); entry point into the next match with a **"Skip To End"** option that resolves a match in seconds. |
| **News / story delivery** | `[R]` | Confirmed to exist as *events* (the animated cup-draw story is the one concretely documented example) and the Confidence screen's supporters/board "keep you updated regularly." `[U]` Whether this is a **dedicated Inbox/News tab** versus news folded into toasts/the Confidence screen specifically could not be established — flagged as a real gap, don't assume a literal inbox tab exists. |
| **Settings** | `[U]` | Existence assumed (datapack loading implies some settings surface) but not documented by any source found. |

**`[U]` Overall nav chrome:** bottom tab bar vs. hub grid vs. drawer —
**could not verify.** No source described the literal navigation chrome. Do
not assume FCP uses a bottom tab bar just because that's the mobile norm —
this is a genuine gap, and it is safe to say only that the screens above are
each reachable from *some* consistent menu structure, redesigned at least
once ("Redesigned interface" is itself a listed Pro 2 feature).

---

## 3. Information hierarchy

**`[C]` List-first, drill-down-second pattern for squad data.** Two
independent accessibility reviews (AppleVis, TripleTapTech) — both written
by blind players using VoiceOver, which forces a source to describe actual
reading order rather than visual impression — describe the same structure:
a scrollable list where each player is one row/item announced with "all the
relevant titles" (i.e., a consistent set of labeled fields per row, not a
freeform block of text), and a second, deeper screen reached by double-tap
for full detail and actions. **This is a strong, cross-verified signal that
FCP does not put a dense multi-column spreadsheet on the primary screen** —
the primary screen is a scannable list of summarized rows; the "spreadsheet"
depth (contract terms, loan/sell/release actions) is pushed one level down
into a per-item detail view.

**`[C]` Summary-then-categories pattern for club standing.** The Confidence
screen's documented structure (one overall Summary rating, then named
sub-categories: Competitions / Finances / Matches / Transfers) is a second,
independent confirmation of the same information-architecture habit: **show
one aggregate number/state first, then let the player descend into the
category that's driving it**, rather than presenting one large undifferentiated
wall of stats.

**`[R]` Finances iterated toward more density, not less.** The fact that
Pro 2's patch notes specifically call out redesigning the Finances screen to
show *more* information "to help you plan better" suggests the original
Finances screen was judged too sparse over time — i.e., the studio's own
history shows them moving the dial toward more visible financial detail as
the game matured, not away from it. Worth noting as a real design-evolution
data point, not just a snapshot.

**`[R]` Color is used functionally for money.** One synthesized aggregator
response (moderate confidence, not independently re-confirmed by a second
source) states the finance display uses "different colors to distinguish
money spent and received." Plausible and consistent with genre convention,
but flagged at `[R]` rather than `[C]` since it traces to a single
lower-authority source and no screenshot could be inspected to confirm hue,
placement, or whether it's a border/text/background treatment.

**`[R]` General density characterization.** Aggregator-sourced adjectives
describe the interface as "sleek, modern, intuitive," with players able to
"access key features and information with just a few taps," and independent
review language (Gaming Matters, TripleTapTech) separately converges on
"simple," "clean," graphics that "serve the game's purpose" rather than
being a showcase. Multiple independently-worded sources landing on the same
"simple/clean, not busy" characterization is worth more than any single one
of them, even though none is a primary/official statement — treat this as
directionally reliable `[R]`, not `[C]`.

**`[I]` Genre convention (not FCP-specific) worth naming as a baseline**,
since it wasn't independently falsified by anything found: chairman/tycoon
mobile games in this bracket typically use card-based summary tiles on a
home/dashboard screen (balance, next fixture, most urgent alert) with full
tables reserved for genuinely list-shaped data (squad, fixtures, transfer
targets) — consistent with, but not proven by, what was found above for FCP
specifically.

---

## 4. Decision & feedback loop

**`[C]` Delayed, telegraphed consequences are an explicit design lesson,
not just an emergent property.** The developer's own strategy blog post
("Five Tips for Success") tells players directly: invest in youth and it
"might take a few years to bear fruit... stick to your plan, be patient";
and warns against building a stadium/facilities ahead of your current
division because "there's no point having a huge expensive stadium if you
don't have enough fans to fill it." This is the developer explaining, in
their own voice, that the feedback loop is **intentionally multi-season and
non-instant** for the biggest investment decisions — a documented design
philosophy, not a guess.

**`[C]` Some events get produced "story" treatment, not just numbers.** The
Pro 2 patch notes specifically add "a new animated 'cup draw' news story...
to add interest to the draws" — confirming that at least some events in the
feedback stream are staged as a small production moment (animated, framed as
a story) rather than a flat text log line. This implies a **spectrum of
feedback weight**: routine results are presumably lower-key, while
higher-stakes moments (a cup draw) get a dedicated animated beat.

**`[C]` Reputation feedback is categorized and continuous, not a single
pass/fail gate.** As established in §2/§3, the Confidence screen breaks
board+fan sentiment into named categories (competitions, finances, matches,
transfers) under one summary — so the feedback loop routes "this decision
mattered" through a specific labeled category rather than one generic
happiness bar.

**`[C]` The chairman's only lever into match outcomes is indirect.** Since
the manager auto-picks the XI from Skill+Form+Fitness+Happiness (§1), the
player's causal chain to a result runs entirely through squad depth, player
morale/fitness management, wages/bonuses, and manager quality — never a
direct in-match choice. Official copy: "Offer win bonuses, promotion
bonuses, and fine players for indiscipline" — these are the concrete levers,
and they're framed as **incentive/discipline tools**, not tactical ones.

**`[R]` A real, well-documented weakness: perceived unfairness in
credit/blame attribution.** This is the single most substantive piece of
outside criticism found (Matthew Keeling, Medium, April 2024, titled
*"Football Chairman: Pro – a Total Farce"*): the game gives, in his words,
"not one bit of credit to the devoted chairman" for a promotion, but a
relegation is presented as entirely the chairman's fault. He calls the game
"fundamentally flawed and aimed directly against you, the player" and warns
readers "you'll be full of pent up rage and anger." This is a specific,
citable critique of the feedback loop's perceived fairness/legibility, not a
generic complaint — worth taking seriously as a concrete failure mode to
avoid.
[Medium](https://medium.com/@mattkeeling92/football-chairman-pro-a-total-farce-76f24b22fb9f)

**`[R]` A second, independent critique of causal legibility**
(Backloggd/internettrey): "probably too much RNG and no real way to enact
the detailed approaches of Football Manager" — though the same review
concedes "a Skinner box level of satisfaction when your team earns
promotion at the last day of the season," i.e., the emotional payoff lands
even when the mechanical transparency doesn't.
[Backloggd](https://backloggd.com/u/internettrey/review/164316)

**`[R]` App Store review sentiment (aggregated, multiple reviews
synthesized by search, not individually re-verified):** complaints that "95%
of decisions make absolutely zero impact on the game," "you will get
promoted every few years regardless of what you do," and "match results are
pretty much random." This directly conflicts with the developer's own
stated design intent (§ above, patience/planning pays off) — **that gap
between stated design intent and lived player perception is itself the
single most important thing to avoid replicating.**

---

## 5. Progression structure

**`[C]` Division ladder:** 7 divisions, from tiny non-league at the bottom
to "the very top" (a Premier-League-equivalent top flight), confirmed
identically across the official description and every review found.

**`[R]` Session/career pacing (Family Gaming Database + corroborating
review language):** a full season is completable in **roughly 15–20
minutes**, helped by a per-match **"Skip To End"** option; climbing the full
7-division ladder can "easily absorb 40–50 hours." Marketing/review
language leans into short-burst mobile framing: "seasons fly past in a tea
break," playable with no wifi, described as light on battery drain —
consistent, independently-worded framing across sources that the intended
play pattern is short, frequent, offline-capable sessions rather than long
sit-down sessions.

**`[C]` Bounded-then-unbounded career arc:** a chairman career at a single
club runs **30 seasons** before mandatory retirement; a separate
**"Immortal"** mode removes that cap and lets the player take over other
clubs indefinitely once they choose to move on — i.e., the game offers both
a finite, completable arc *and* an open-ended sandbox continuation, not just
one or the other.

**`[C]` Secondary progression tracks run alongside the main promotion
chase:** 50 achievements ("15 brand new" as of one update) and club records
to beat are both named directly in official copy; Pro 2 adds a **Hall of
Fame** to commemorate a club's greatest-ever retired players — a
progression artifact that persists meaning even after a player has moved
on from that club/squad generation.

**`[C]` Structured side-goals distinct from the open-ended career:**
"challenge scenarios" (base Pro) and, specifically, a **Financial Fair
Play challenge** (Pro 2) — named, bounded goals distinct from the
open-ended "climb the divisions" main loop.

**`[C]` Content freshness as a retention mechanic:** the game is "updated
every season free of charge with the very latest data" and Pro 2 adds
seasonal **kit redesign** ("design your club's home, away and goalkeeper
shirts each season") — i.e., part of what keeps players returning is
treated as a live-service seasonal refresh, not a one-time purchase with
static content.

**`[C]` Explicit "don't rush" pacing philosophy, in the developer's own
words** (already quoted in §4): "try to develop your club slowly and
steadily, in line with each division, rather than jumping ahead with
expensive developments" — progression is designed to be **paced to the
division you're actually in**, discouraging front-loading big investments.

---

## 6. Mobile ergonomics

**Honesty flag up front: this is the weakest-evidenced section in this
document.** No screenshot could be loaded (see §0), so navigation chrome,
touch-target sizing, one-handed reach, and portrait-lock behavior are
**not** independently confirmed. Do not cite this section for pixel-level
claims.

**`[C]` What is confirmed:** the app is a **universal build across
iPhone, iPad, and iPod touch** (per store metadata), meaning the UI must
scale across very different screen sizes, and it's built from real,
discretely-labeled interactive controls — **full VoiceOver accessibility**
is independently confirmed by two separate accessibility-community sources
(AppleVis, TripleTapTech/Aaron Spelker), both stating every button is
clearly labeled and the whole game is navigable and playable start-to-finish
by a blind player using only VoiceOver. That's a meaningful, verifiable
signal: **the UI is composed of real native/system-accessible controls**,
not custom canvas-painted graphics that skip the accessibility tree — a
worthwhile bar to hold ourselves to regardless of genre.

**`[R]` Designed for short, interruptible, offline sessions:** "doesn't
require wifi," described as light on battery, playable "on commutes,"
seasons resolving "in a tea break." This is an ergonomics signal about
*session shape* (short, poolable, offline-tolerant) even though it says
nothing about *layout*.

**`[U]` Explicitly not verified:** bottom tab bar vs. any other nav
pattern; specific touch target sizes; whether the game is portrait-locked;
one-handed thumb-reach optimization; safe-area/notch handling (irrelevant
for a 2015-era iOS 12 baseline app in any case — the notch-era design
questions our own build faces are not something FCP's original design
would have had to solve at launch). **Do not assume FCP nails modern
iPhone-safe-area ergonomics just because it's an iOS app** — its baseline
predates the iPhone X notch era, so if anything, our build should be judged
against modern safe-area/Dynamic-Island conventions FCP was never designed
for, not assumed to already meet them.

**`[I]` Genre baseline, not FCP-confirmed:** comparable chairman/tycoon
mobile games in this bracket conventionally use a persistent bottom tab bar
(4–6 items) as primary navigation, reserve modals/sheets for drill-down
detail and confirmation, and keep primary actions within one-handed thumb
reach in the lower two-thirds of the screen. Documented here as
industry-typical context only, explicitly not evidenced for FCP itself.

---

## 7. Visual/tonal identity

**`[C]` Confirmed feature, not just impression:** "Improved 3D stadium
graphics" is named directly in official copy as a specific feature — meaning
at least the stadium screen has a rendered 3D visual moment, not pure
text/tables. This is the one concretely-sourced visual-fidelity claim in
this research.

**`[R]` Converging-but-unverified characterization:** independently-worded
sources (a personal review, an aggregator, an accessibility review)
separately land on "simple," "clean," "sleek, modern, intuitive," and
graphics that "serve the game's purpose" rather than acting as a showcase.
Three differently-sourced characterizations agreeing is worth something,
but **none of them is a primary screenshot inspection**, so treat this as
"probably true, unverified precisely."

**`[U]` Explicitly unknown — do not invent:** exact color palette/hex
values, typography choice, icon style, app-icon design. No source
described these in enough detail to responsibly report, and no image could
be loaded. Any claim about FCP's specific colors or fonts beyond "functional
color-coding exists in finance, probably green/red-style" (§3, `[R]`) would
be fabrication.

**`[C]` Tone is light, aspirational, and knowingly self-aware about
football-chairman clichés** — this is well-evidenced through recurring
official copywriting choices, not inferred: "boost your club's worldwide
reputation," "keeping the fans **and the bank manager** happy" (personifying
the bank as a character to please), and most tellingly, official copy
describing stadium/youth spending as buying "temporary favour with the
fans" — including the phrase **"adding comically big stands to the
stadium"** as one named example of that favour-buying. That word choice
("comically") is the clearest direct evidence that the tone is meant to be
a bit tongue-in-cheek/knowing about the fantasy of being a chairman, not a
dry, serious spreadsheet simulation.

---

## 8. Known weaknesses / complaints

All of the below are `[R]` (attributable to a specific named source) unless
marked otherwise. This section matters most: our build should be able to
show it does not repeat these specific, named failure modes.

1. **Perceived decision-impact gap** (App Store review synthesis): "95% of
   decisions make absolutely zero impact on the game"; "you will get
   promoted every few years regardless of what you do." This directly
   contradicts the developer's own "patience pays off" design messaging
   (§4/§5) — the gap between stated intent and felt experience is the
   single biggest thing to avoid reproducing.
2. **Match results feel arbitrary**: "mindlessly clicking to see the next
   random score," "match results are pretty much random," "always running
   out of budget and your best players always get a red card or get
   injured." Since there's no visual match engine (score-only resolution),
   a bad or unlucky result has no visible mechanism the player can inspect
   to understand *why* — the causal chain from squad-quality to outcome is
   invisible even when it is, mechanically, present (per §1's Skill+Form
   composite).
3. **Asymmetric credit/blame** (Matthew Keeling, Medium, 2024): promotions
   earn "not one bit of credit"; relegations are "all your fault." Framed
   by the critic as making the game feel "fundamentally flawed and aimed
   directly against you, the player," leaving him "furious" and warning
   readers off it entirely.
   [Source](https://medium.com/@mattkeeling92/football-chairman-pro-a-total-farce-76f24b22fb9f)
4. **RNG-dominant, low tactical legibility** (Backloggd): "too much RNG and
   no real way to enact the detailed approaches of Football Manager" —
   though the same reviewer still found "Skinner box" satisfaction in
   last-day promotions, i.e., variance can still feel good in the moment
   even when it reads as arbitrary in aggregate.
5. **"Pay to win" perception**: at least one review states the game is
   "totally pay to win," directly contradicting the official "100%
   optional IAP" framing; other reviewers explicitly rebut this ("people
   who say it's pay to win haven't put in enough time/effort"). Presented
   as a live, unresolved disagreement among players, not a settled fact
   either way.
6. **AI/system consistency complaints** (AppGrooves-aggregated): managers
   and the youth academy keep producing/buying players of the "wrong"
   playing style even when the chairman has specifically hired
   same-style managers — a believability bug where player choices don't
   propagate consistently through connected systems.
7. **Hard ceilings regardless of resources**: "impossible to achieve
   back-to-back promotion... even if you pump in unlimited funds" — a
   specific, named fairness complaint that spending doesn't remove an
   apparent scripted pacing wall.
8. **Contract length ceiling**: a hard 4-year max on player contracts,
   called out as a specific frustration for long-term squad planning.
9. **Unresponsive-feeling systems despite investment**: fans still
   complain about food/drink queues "even with maximum outlets open" —
   an example of a stat/complaint system that doesn't visibly resolve
   even after the player fully invests in the fix.
10. **Repetition fatigue**: the game "became boring over time because of
    its limited control and repetitive events" — a long-session-fatigue
    complaint distinct from the short-session strength noted in §6.
11. **Technical bugs** (lower relevance to *design* quality bar, but
    real): freezing when offering a contract to a player who has already
    left the club; crashes when watching reward ads.
12. **Pro 2-specific complaints** (2024/2025 sequel, so likely reflects the
    current live build more than legacy Pro complaints do): "frustrating
    difficulty spikes and scripted-feeling losing streaks," "an
    overpowered home advantage," "frequent injuries," ongoing financial
    pressure described as unrelenting.
13. **Recurring feature requests** across multiple reviews: custom player
    creation, a deeper transfer-market search/filter (by real player
    names), visual match highlights/simulation (currently absent —
    matches resolve to a score with no visual playback), and manual
    scouting control (currently the chairman can't direct scouting
    activity themselves per these requests).

---

## 9. The bar — checklist

Concrete, checkable statements. Each is backed by a specific citation above
(see the tag); a critic can tick these against our build directly. Items
are phrased as "the real game does X" so a critic checks whether **our**
screen matches or improves on it.

1. **No Starting XI/formation UI exists anywhere** — team selection is
   fully delegated to an NPC manager driven by a stated Skill+Form+Fitness+
   Happiness formula, and the chairman's only influence is indirect (squad
   depth, morale, wages, manager quality). *[§1, `[C]`]*
2. **A full match resolves in seconds via an explicit "skip to end"
   affordance** — no visual match engine or highlight reel is required for
   the loop to feel complete. *[§5, `[R]`]*
3. **A full season is playable in ~15–20 minutes**, supporting short,
   interruptible, offline-capable sessions as a stated design goal, not an
   afterthought. *[§5, `[R]`]*
4. **Squad data is a scannable list of labeled per-player rows on the
   primary screen; deep fields (contract terms, loan/sell/release actions)
   live one tap down in a per-player detail view** — not a dense
   multi-column spreadsheet on the main screen. *[§3, `[C]`, cross-verified
   by two independent accessibility sources]*
5. **Club standing is shown as one overall summary rating first, broken
   into named sub-categories** (competitions / finances / match feedback /
   transfers) reachable from that summary — not a single undifferentiated
   meter and not a flat list of every stat at once. *[§2/§3, `[C]`]*
6. **Big, slow-payoff investments (youth, stadium) are explicitly
   telegraphed as multi-season bets in the game's own guidance** ("might
   take a few years to bear fruit"), and the game explicitly punishes
   front-loading investment ahead of your current division. *[§4/§5, `[C]`]*
7. **Progression is a clear division ladder (bottom tier to the top
   flight) with both a finite career arc (a set number of seasons before
   retirement) and an optional unbounded continuation mode** — players get
   a completable arc, not only an infinite grind. *[§5, `[C]`]*
8. **Secondary progression (numbered achievements, beatable club records, a
   hall of fame for retired greats) runs alongside the main promotion
   chase**, giving the game meaning-retention beyond "did we go up this
   season." *[§5, `[C]`]*
9. **Some events get elevated "story" presentation (e.g., an animated cup
   draw) while routine events presumably stay lower-key** — feedback
   weight is not flat across all events. *[§4, `[C]`]*
10. **The full game is playable start-to-finish with VoiceOver, every
    control discretely labeled** — built from real accessible UI controls,
    not custom-painted, accessibility-opaque graphics. *[§6, `[C]`,
    cross-verified by two independent accessibility-community sources]*
11. **Tone is light and self-aware about the "chairman" fantasy** (e.g.
    "comically big stands," personifying "the bank manager" as someone to
    keep happy) rather than a dry, serious spreadsheet-sim tone. *[§7, `[C]`]*
12. **Money is visually distinguished as in vs. out, not just numeric.**
    *[§3, `[R]`, single-source — verify independently before leaning hard
    on this one]*
13. **The causal chain from a chairman decision to its in-match/financial
    consequence should be more legible than FCP's** — FCP's most
    consistently repeated, independently-sourced criticism (three separate
    critics/aggregators, §8 items 1–4) is that decisions feel arbitrary and
    credit/blame attribution feels unfair. Beating the bar specifically
    means a player can trace "I did X" → "this is why Y happened" more
    clearly than FCP achieves — this is FCP's biggest, best-documented
    weak point and the clearest opportunity to visibly exceed it.
14. **Content stays seasonally fresh** (real-world-style seasonal data
    updates, seasonal kit redesign in the sequel) as a stated retention
    mechanic, not a one-time static build. *[§5, `[C]`]*
15. **A companion/out-of-band surface handles advanced data authoring**
    (FCP's web-based data editor) instead of cramming that complexity into
    the phone UI — advanced/power-user configuration doesn't have to live
    on the primary mobile screens to exist at all. *[§2, `[C]`]*

---

## Sources

Official / primary:
- [App Store — Football Chairman Pro](https://apps.apple.com/us/app/football-chairman-pro/id992140496)
- [App Store — Football Chairman Pro 2](https://apps.apple.com/us/app/football-chairman-pro-2/id6499549945)
- [App Store — Football Chairman (free)](https://apps.apple.com/us/app/football-chairman-soccer/id994930936)
- [Google Play — Football Chairman Pro](https://play.google.com/store/apps/details?id=com.undergroundcreative.footballchairmanpro)
- [Google Play — Football Chairman Pro 2](https://play.google.com/store/apps/details?id=com.undergroundcreative.footballchairmanpro2)
- [football-chairman.com](https://www.football-chairman.com/) (marketing site) and [data editor](https://www.football-chairman.com/data-editor/)
- [football-chairman.net/blog](https://football-chairman.net/blog/) — official dev blog, including:
  [What's New in Pro 2](https://football-chairman.net/blog/posts/whats-new-in-football-chairman-pro-2),
  [Five Tips for Success](https://football-chairman.net/blog/posts/five-tips-for-success-in-football-chairman),
  [How your manager picks the team](https://football-chairman.net/blog/posts/how-your-manager-picks-the-team),
  [Explaining Player Personalities](https://football-chairman.net/blog/posts/explaining-player-personalities),
  [How does the youth system work?](https://football-chairman.net/blog/posts/how-does-the-youth-system-work),
  [Youth academy and training facilities](https://football-chairman.net/blog/posts/making-improvements-to-your-youth-academy-and-training-facilities)
- [Underground Creative Ltd — Companies House](https://find-and-update.company-information.service.gov.uk/company/07087368)
- [undergroundcreative.com](https://www.undergroundcreative.com/)

Reviews / criticism:
- [Matthew Keeling, "Football Chairman: Pro – a Total Farce" (Medium, 2024)](https://medium.com/@mattkeeling92/football-chairman-pro-a-total-farce-76f24b22fb9f)
- [internettrey review (Backloggd)](https://backloggd.com/u/internettrey/review/164316)
- [Gaming Matters review](https://siboyle.wixsite.com/sismatters/single-post/2016/09/25/gaming-matters-football-chairman-pro-review)
- [TripleTapTech review (Aaron Spelker, accessibility focus)](https://tripletaptech.org/football-chairman-pro/)
- [AppleVis app page (accessibility community)](https://www.applevis.com/apps/ios/games/football-chairman-pro)
- [AppGrooves — negative highlights](https://appgrooves.com/app/football-chairman-pro-build-a-soccer-empire-by-underground-creative-ltd/negative)
- [AppGrooves — positive highlights](https://appgrooves.com/app/football-chairman-pro-build-a-soccer-empire-by-underground-creative-ltd/positive)
- [Metacritic — Football Chairman Pro 2](https://www.metacritic.com/game/football-chairman-pro-2/)
- [TapTap reviews — Pro](https://www.taptap.io/app/293647/review) / [Pro 2](https://www.taptap.io/app/33739168/review)

Aggregators (lower authority, used only for corroboration, each flagged
`[R]`/`[U]` inline where relied upon):
- [game-solver.com](https://game-solver.com/football-chairman-pro/)
- [mwm.ai — Pro](https://mwm.ai/apps/football-chairman-pro/992140496) / [Pro 2](https://mwm.ai/apps/football-chairman-pro-2/6499549945)
- [gmgames.org](https://gmgames.org/football-chairman-fc-pro/) / [publisher profile](https://gmgames.org/publisher/underground-creative/)
- [Family Gaming Database — game page](https://www.familygamingdatabase.com/en-us/game/Football+Chairman+Pro) / [accessibility report](https://www.familygamingdatabase.com/en-us/accessibility/Football+Chairman+Pro)
- [Kotaku screenshot gallery listing](https://kotaku.com/games/football-chairman-pro/gallery) (gallery located but images not viewable in this environment)

**Explicitly not consulted / inaccessible:** direct App Store screenshots,
any App Store review text beyond search-engine synthesis, Reddit (searched;
no meaningful FCP-specific discussion surfaced — real absence, not a
skipped search), YouTube video content itself (only titles/existence
confirmed, e.g. "Football Chairman Pro Walkthrough," not watched).
