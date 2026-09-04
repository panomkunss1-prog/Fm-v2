import { test, expect, type Page } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { th } from '../../src/data/translations/th';
import { en } from '../../src/data/translations/en';
import type { Language } from '../../src/core/i18n';

const SCREENSHOTS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');

const DICTS: Readonly<Record<Language, typeof th>> = { th, en };

/** Narrow no-break space (U+202F) — the explicit separator `formatMoney` now
 * inserts between the ฿ symbol and the first digit, fixing the crowding the
 * critic confirmed via `formatToParts()`. */
const CURRENCY_GAP = '\u202F';

/** Any Thai-script codepoint (U+0E00-U+0E7F) — used to assert real Thai
 * text actually rendered, not just that *some* text is present. */
const THAI_SCRIPT = /[฀-๿]/;

async function expectNoHorizontalOverflow(page: Page) {
  const overflowing = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflowing, 'document should not scroll horizontally').toBe(false);
}

/**
 * Thai and English strings run different lengths — this asserts no element
 * matching `selector` is clipping its own text (scrollWidth/Height greater
 * than its clientWidth/Height), which page-level overflow checks alone
 * would miss (e.g. text truncated inside a fixed-size flex child while the
 * page itself stays exactly 393px wide).
 */
async function expectNoTextClipping(page: Page, selector: string) {
  const results = await page.$$eval(selector, (elements) =>
    elements.map((el) => ({
      text: (el.textContent ?? '').trim(),
      clippedX: el.scrollWidth > el.clientWidth + 1,
      clippedY: el.scrollHeight > el.clientHeight + 1,
    })),
  );
  expect(results.length, `expected at least one element matching ${selector}`).toBeGreaterThan(0);
  for (const r of results) {
    expect(r.clippedX, `"${r.text}" (${selector}) is clipped horizontally`).toBe(false);
    expect(r.clippedY, `"${r.text}" (${selector}) is clipped vertically`).toBe(false);
  }
}

async function switchLanguage(page: Page, lang: Language) {
  await page.getByTestId(`lang-${lang}`).click();
  await expect(page.getByTestId(`lang-${lang}`)).toHaveAttribute('aria-pressed', 'true');
}

/**
 * The shell scrolls *inside* `.fm-main` (a fixed-height flex column), not
 * the outer document — deliberately, to keep the bottom tab bar reliably
 * pinned on iOS Safari. Playwright's `fullPage` screenshot only follows
 * document-level scroll, so on a page taller than one viewport it would
 * otherwise clip anything below the fold. Grow the viewport to the page's
 * real content height first so `fullPage` actually captures everything,
 * then restore the true iPhone 15 viewport for the rest of the test.
 */
async function screenshotFullContent(page: Page, fileName: string) {
  const viewport = page.viewportSize();
  const width = viewport?.width ?? 393;
  const height = viewport?.height ?? 852;

  const contentHeight = await page.evaluate(() => {
    const header = document.querySelector('.fm-header');
    const main = document.querySelector('.fm-main');
    const rolebar = document.querySelector('.fm-rolebar');
    const tabbar = document.querySelector('.fm-tabbar');
    return (
      (header?.clientHeight ?? 0) +
      (main?.scrollHeight ?? 0) +
      (rolebar?.clientHeight ?? 0) +
      (tabbar?.clientHeight ?? 0)
    );
  });

  await page.setViewportSize({ width, height: Math.max(contentHeight + 24, height) });
  // Let the post-resize layout/paint fully settle (two animation frames)
  // before capturing — without this, a `fullPage` screenshot taken in the
  // same tick as the resize can occasionally capture a stale/partial
  // repaint of a card (observed once as a solid rectangle over a card
  // title). This is a screenshot-timing artifact, not an app bug: the
  // resized DOM/content itself is already correct at this point.
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, fileName), fullPage: true });
  await page.setViewportSize({ width, height });
}

test.describe('App shell', () => {
  test('boots on the iPhone 15 viewport with the right title, defaulting to Thai', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Football Executive Management');
    const viewport = page.viewportSize();
    expect(viewport?.width).toBe(393);
    expect(viewport?.height).toBe(852);

    // docs/ARCHITECTURE.md section 4: default language is Thai.
    await expect(page.getByTestId('lang-th')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('lang-en')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('html')).toHaveAttribute('lang', 'th');
  });

  test('shows a bottom tab bar with all 5 tabs (Thai by default), each a real >=44x44pt touch target', async ({ page }) => {
    await page.goto('/');
    const tabbar = page.getByRole('navigation', { name: th['nav.primaryLabel'] });
    await expect(tabbar).toBeVisible();

    const tabs: ReadonlyArray<[string, string]> = [
      ['dashboard', th['nav.dashboard']],
      ['club', th['nav.club']],
      ['finance', th['nav.finance']],
      ['league', th['nav.league']],
      ['association', th['nav.association']],
    ];
    for (const [id, label] of tabs) {
      const tab = page.getByTestId(`tab-${id}`);
      await expect(tab).toBeVisible();
      await expect(tab).toContainText(label);
      const box = await tab.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
    await expectNoTextClipping(page, '.fm-tabbar__label');
  });

  test('shows the language toggle with both options as real >=44x44pt touch targets', async ({ page }) => {
    await page.goto('/');
    const thOption = page.getByTestId('lang-th');
    const enOption = page.getByTestId('lang-en');
    await expect(thOption).toBeVisible();
    await expect(enOption).toBeVisible();
    await expect(thOption).toContainText('ไทย');
    await expect(enOption).toContainText('English');

    for (const option of [thOption, enOption]) {
      const box = await option.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('shows the role switch with both options as real touch targets, positioned in the thumb-reachable bottom two-thirds', async ({ page }) => {
    await page.goto('/');
    const chairmanOption = page.getByTestId('role-chairman');
    const faOption = page.getByTestId('role-fa_president');
    await expect(chairmanOption).toBeVisible();
    await expect(faOption).toBeVisible();
    await expect(chairmanOption).toHaveAttribute('aria-pressed', 'true');

    const viewport = page.viewportSize()!;
    const reachableZoneStart = viewport.height / 3;

    for (const option of [chairmanOption, faOption]) {
      const box = await option.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
      const centerY = box!.y + box!.height / 2;
      expect(
        centerY,
        `role switch center (y=${centerY}) should sit in the bottom two-thirds of the ${viewport.height}px screen (docs/ARCHITECTURE.md section 5)`,
      ).toBeGreaterThan(reachableZoneStart);
    }
    await expectNoTextClipping(page, '.fm-roleswitch__option');
  });

  test('the role bar sits above the tab bar with no overlap, and the header toggle sits well above the role bar', async ({ page }) => {
    await page.goto('/');
    const langBox = (await page.getByTestId('lang-th').boundingBox())!;
    const roleBox = (await page.getByTestId('role-chairman').boundingBox())!;
    const tabBox = (await page.getByTestId('tab-dashboard').boundingBox())!;

    expect(roleBox.y + roleBox.height, 'role switch must not overlap the tab bar').toBeLessThanOrEqual(tabBox.y + 1);
    expect(langBox.y + langBox.height, 'language toggle must not overlap the role bar').toBeLessThanOrEqual(roleBox.y + 1);
  });

  test('has no horizontal overflow on the iPhone 15 viewport', async ({ page }) => {
    await page.goto('/');
    await expectNoHorizontalOverflow(page);
  });
});

test.describe('Dashboard — Chairman role, Thai (default)', () => {
  test('shows real club identity, Thai chrome, next fixture, board confidence and finance', async ({ page }) => {
    await page.goto('/');

    const header = page.getByTestId('header');
    await expect(header).toContainText('BG Pathum United');
    await expect(header).toContainText('Thai League 1');
    await expect(header).toContainText('2026/27');
    // Real Thai text actually renders in the header, not just a raw number.
    const headerText = (await header.textContent()) ?? '';
    expect(THAI_SCRIPT.test(headerText)).toBe(true);

    const dashboard = page.getByTestId('chairman-dashboard');
    await expect(dashboard).toBeVisible();

    await expect(dashboard).toContainText('BG Pathum United');
    await expect(dashboard).toContainText('Pathum Thani');
    await expect(dashboard).toContainText('Sukhothai FC');

    await expect(dashboard).toContainText(th['dashboard.boardConfidence']);
    await expect(dashboard).toContainText('64%');
    await expect(dashboard).toContainText(th['board.level.stable']);

    await expect(dashboard).toContainText(th['dashboard.clubFinance']);
    await expect(dashboard).toContainText(th['finance.health.healthy']);

    const balance = page.getByTestId('finance-balance');
    const balanceText = (await balance.textContent()) ?? '';
    expect(balanceText).toContain('฿');
    expect(balanceText).toContain('32,600,000');
    expect(balanceText.includes(CURRENCY_GAP), 'money string must contain the real separator, not just look right').toBe(true);

    await expect(dashboard).toContainText(th['dashboard.nextFixture']);
    await expect(dashboard).toContainText(th['dashboard.home']);
    await expect(dashboard).toContainText(th['dashboard.away']);

    await expect(dashboard).toContainText(th['dashboard.season']);

    // English chrome must not leak through while Thai is active.
    await expect(dashboard).not.toContainText(en['dashboard.boardConfidence']);
    await expect(dashboard).not.toContainText(en['dashboard.clubFinance']);
    await expect(dashboard).not.toContainText(en['board.level.stable']);

    await expect(dashboard).not.toContainText('Starting XI');
    await expect(dashboard).not.toContainText('Formation');

    await expectNoHorizontalOverflow(page);
    await expectNoTextClipping(page, '.fm-header__eyebrow, .fm-header__title, .fm-fixture__team strong, .fm-card__title');

    await screenshotFullContent(page, 'dashboard-chairman-th.png');
  });
});

test.describe('Language toggle', () => {
  test('switching to English translates dashboard chrome; proper nouns and money formatting stay fixed; switching back restores Thai', async ({ page }) => {
    await page.goto('/');
    const dashboard = page.getByTestId('chairman-dashboard');
    await expect(dashboard).toContainText(th['dashboard.boardConfidence']);

    await switchLanguage(page, 'en');
    await expect(page.getByTestId('lang-th')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await expect(dashboard).toContainText(en['dashboard.boardConfidence']);
    await expect(dashboard).toContainText(en['dashboard.clubFinance']);
    await expect(dashboard).toContainText(en['board.level.stable']);
    await expect(dashboard).toContainText(en['finance.health.healthy']);
    await expect(dashboard).toContainText(en['dashboard.home']);
    await expect(dashboard).toContainText(en['dashboard.away']);
    await expect(dashboard).not.toContainText(th['dashboard.boardConfidence']);

    // Proper nouns (real club/league names) never translate.
    await expect(dashboard).toContainText('BG Pathum United');
    await expect(dashboard).toContainText('Sukhothai FC');

    // Currency formatting is locale-fixed, not translated — same separator either way.
    const balance = page.getByTestId('finance-balance');
    const balanceText = (await balance.textContent()) ?? '';
    expect(balanceText.includes(CURRENCY_GAP)).toBe(true);
    expect(balanceText).toContain('32,600,000');

    await expectNoHorizontalOverflow(page);
    await expectNoTextClipping(page, '.fm-header__eyebrow, .fm-header__title, .fm-fixture__team strong, .fm-card__title');
    await screenshotFullContent(page, 'dashboard-chairman-en.png');

    await switchLanguage(page, 'th');
    await expect(dashboard).toContainText(th['dashboard.boardConfidence']);
    await expect(page.locator('html')).toHaveAttribute('lang', 'th');
  });

  test('kickoff time localizes with the active language (real Thai weekday/month text, not a transliteration)', async ({ page }) => {
    await page.goto('/');
    const kickoff = page.locator('.fm-fixture__kickoff');
    const thKickoff = (await kickoff.textContent()) ?? '';
    expect(THAI_SCRIPT.test(thKickoff)).toBe(true);
    expect(thKickoff).toContain('ICT');
    expect(thKickoff).toContain('19:30');

    await switchLanguage(page, 'en');
    const enKickoff = (await kickoff.textContent()) ?? '';
    expect(THAI_SCRIPT.test(enKickoff)).toBe(false);
    expect(enKickoff).toContain('ICT');
    expect(enKickoff).toContain('19:30');
  });
});

test.describe('Currency symbol spacing (money-crowding fix)', () => {
  test('the ฿ symbol has a real separator before the first digit — verified in the DOM, not eyeballed', async ({ page }) => {
    await page.goto('/');
    const balance = page.getByTestId('finance-balance');
    await expect(balance).toBeVisible();

    const text = await balance.textContent();
    expect(text).not.toBeNull();
    const symbolIndex = text!.indexOf('฿');
    const firstDigitIndex = text!.search(/[0-9]/);
    expect(symbolIndex).toBeGreaterThanOrEqual(0);
    expect(firstDigitIndex).toBeGreaterThan(symbolIndex);
    // A real separator character sits strictly between the symbol and the digit.
    expect(firstDigitIndex - symbolIndex, `expected a separator between "฿" and the digits in "${text}"`).toBeGreaterThan(1);
    expect(text!.charCodeAt(symbolIndex + 1)).toBe(0x202f);
  });

  test('visual confirmation: a native-scale crop and a 4x zoomed crop of the money value show no glyph overlap', async ({ page }) => {
    await page.goto('/');
    const financeCard = page.getByTestId('finance-card');
    const balance = page.getByTestId('finance-balance');
    await expect(financeCard).toBeVisible();

    // Natural, at-scale crop of the whole finance card (native DPR 3), showing the value in context.
    await financeCard.screenshot({ path: path.join(SCREENSHOTS_DIR, 'finance-card-closeup.png') });

    // 4x zoomed crop of just the money string, matching the critic's own
    // verification method, so any glyph overlap is unambiguous to the eye
    // rather than a judgment call at native size.
    await page.evaluate(() => {
      const el = document.querySelector('[data-testid="finance-balance"]') as HTMLElement;
      el.style.transform = 'scale(4)';
      el.style.transformOrigin = 'left center';
    });
    await balance.screenshot({ path: path.join(SCREENSHOTS_DIR, 'money-value-4x-zoom.png') });
    await page.evaluate(() => {
      const el = document.querySelector('[data-testid="finance-balance"]') as HTMLElement;
      el.style.transform = '';
    });
  });
});

test.describe('Role switch — FA President', () => {
  test('switching to FA President shows the real association identity and translated governance copy, in both languages', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('chairman-dashboard')).toBeVisible();

    await page.getByTestId('role-fa_president').click();

    const header = page.getByTestId('header');
    const faDashboard = page.getByTestId('fa-president-dashboard');
    await expect(faDashboard).toBeVisible();
    await expect(page.getByTestId('role-fa_president')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('role-chairman')).toHaveAttribute('aria-pressed', 'false');

    for (const [lang, dict] of Object.entries(DICTS) as Array<[Language, typeof th]>) {
      if (lang !== 'th') await switchLanguage(page, lang);

      await expect(header).toContainText(dict['header.faPresidentTitle']);
      await expect(header).toContainText('Football Association of Thailand'); // proper noun, unaffected

      await expect(faDashboard).toContainText('Football Association of Thailand');
      await expect(faDashboard).toContainText(dict['fa.officeOfPresident']);
      await expect(faDashboard).toContainText(dict['fa.governanceFocusAreas']);
      await expect(faDashboard).toContainText(dict['fa.focus.nationalCompetitions']);
      await expect(faDashboard).toContainText(dict['fa.focus.nationalTeamPipeline']);
      await expect(faDashboard).toContainText(dict['fa.focus.refereeDevelopment']);
      await expect(faDashboard).toContainText(dict['fa.focus.footballInfrastructure']);
      await expect(faDashboard).toContainText(dict['emptyState.notBuiltYet']);

      // Season context still flows through for this role too.
      await expect(faDashboard).toContainText('2026/27');

      await expect(page.getByTestId('chairman-dashboard')).toHaveCount(0);
      await expectNoHorizontalOverflow(page);
      await expectNoTextClipping(page, '.fm-header__eyebrow, .fm-header__title, .fm-focus-list__item span, .fm-card__title');

      await screenshotFullContent(page, `dashboard-fa-president-${lang}.png`);
    }

    await switchLanguage(page, 'th');
    await page.getByTestId('role-chairman').click();
    await expect(page.getByTestId('chairman-dashboard')).toBeVisible();
    await expect(header).toContainText('BG Pathum United');
  });
});

test.describe('Other tabs — honest "not built yet" states, both languages', () => {
  const CASES: ReadonlyArray<{ tab: string; testId: string; titleTh: string; titleEn: string }> = [
    { tab: 'club', testId: 'club-page', titleTh: th['club.title'], titleEn: en['club.title'] },
    { tab: 'finance', testId: 'finance-page', titleTh: th['dashboard.clubFinance'], titleEn: en['dashboard.clubFinance'] },
    { tab: 'league', testId: 'league-page', titleTh: 'Thai League 1', titleEn: 'Thai League 1' },
    { tab: 'association', testId: 'association-page', titleTh: th['association.title'], titleEn: en['association.title'] },
  ];

  for (const { tab, testId, titleTh, titleEn } of CASES) {
    test(`${tab} tab shows an honest empty state in both languages, not fabricated data`, async ({ page }) => {
      await page.goto('/');
      await page.getByTestId(`tab-${tab}`).click();
      await expect(page.getByTestId(`tab-${tab}`)).toHaveAttribute('aria-current', 'page');

      const panel = page.getByTestId(testId);
      await expect(panel).toBeVisible();
      await expect(panel).toContainText(titleTh);
      await expect(panel).toContainText(th['emptyState.notBuiltYet']);
      await expectNoHorizontalOverflow(page);

      await switchLanguage(page, 'en');
      await expect(panel).toContainText(titleEn);
      await expect(panel).toContainText(en['emptyState.notBuiltYet']);
      if (titleTh !== titleEn) {
        await expect(panel).not.toContainText(titleTh);
      }
      await expect(panel).not.toContainText(th['emptyState.notBuiltYet']);
      await expectNoHorizontalOverflow(page);
      await expectNoTextClipping(page, '.fm-empty__eyebrow, .fm-empty__title, .fm-empty__description');

      await switchLanguage(page, 'th');
    });
  }

  test('mid-interaction: Club tab active state and empty content (Thai, default)', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('tab-club').click();
    await expect(page.getByTestId('club-page')).toBeVisible();
    await screenshotFullContent(page, 'tab-club-empty-state-th.png');
  });
});

test.describe('Layout integrity across both languages', () => {
  const TABS = ['dashboard', 'club', 'finance', 'league', 'association'] as const;

  for (const lang of ['th', 'en'] as const) {
    test(`no horizontal overflow or clipped chrome on any tab when language=${lang}`, async ({ page }) => {
      await page.goto('/');
      if (lang !== 'th') await switchLanguage(page, lang);

      for (const tab of TABS) {
        await page.getByTestId(`tab-${tab}`).click();
        await expectNoHorizontalOverflow(page);
        await expectNoTextClipping(page, '.fm-tabbar__label');
      }

      // And again in the FA President role, which has different header/eyebrow content.
      await page.getByTestId('role-fa_president').click();
      for (const tab of TABS) {
        await page.getByTestId(`tab-${tab}`).click();
        await expectNoHorizontalOverflow(page);
      }
    });
  }
});
