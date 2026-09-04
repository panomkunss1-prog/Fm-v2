import { test, expect, type Page } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCREENSHOTS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots');

const TAB_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  club: 'Club',
  finance: 'Finance',
  league: 'League',
  association: 'Association',
};

async function expectNoHorizontalOverflow(page: Page) {
  const overflowing = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflowing).toBe(false);
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
    const tabbar = document.querySelector('.fm-tabbar');
    return (
      (header?.clientHeight ?? 0) + (main?.scrollHeight ?? 0) + (tabbar?.clientHeight ?? 0)
    );
  });

  await page.setViewportSize({ width, height: Math.max(contentHeight + 24, height) });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, fileName), fullPage: true });
  await page.setViewportSize({ width, height });
}

test.describe('App shell', () => {
  test('boots on the iPhone 15 viewport with the right title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Football Executive Management');
    const viewport = page.viewportSize();
    expect(viewport?.width).toBe(393);
    expect(viewport?.height).toBe(852);
  });

  test('shows a bottom tab bar with all 5 tabs, each a real >=44x44pt touch target', async ({ page }) => {
    await page.goto('/');
    const tabbar = page.getByRole('navigation', { name: 'Primary' });
    await expect(tabbar).toBeVisible();

    for (const [id, label] of Object.entries(TAB_LABELS)) {
      const tab = page.getByTestId(`tab-${id}`);
      await expect(tab).toBeVisible();
      await expect(tab).toContainText(label);
      const box = await tab.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('shows the role switch with both options as real touch targets', async ({ page }) => {
    await page.goto('/');
    const chairmanOption = page.getByTestId('role-chairman');
    const faOption = page.getByTestId('role-fa_president');
    await expect(chairmanOption).toBeVisible();
    await expect(faOption).toBeVisible();
    await expect(chairmanOption).toHaveAttribute('aria-pressed', 'true');

    for (const option of [chairmanOption, faOption]) {
      const box = await option.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('has no horizontal overflow on the iPhone 15 viewport', async ({ page }) => {
    await page.goto('/');
    await expectNoHorizontalOverflow(page);
  });
});

test.describe('Dashboard — Chairman role (default)', () => {
  test('shows real club identity, season, next fixture, board confidence and finance', async ({ page }) => {
    await page.goto('/');

    // Header: role framing + season/matchday context.
    const header = page.getByTestId('header');
    await expect(header).toContainText('BG Pathum United');
    await expect(header).toContainText('Thai League 1');
    await expect(header).toContainText('Season 2026/27');
    await expect(header).toContainText('Matchday 1 of 30');

    const dashboard = page.getByTestId('chairman-dashboard');
    await expect(dashboard).toBeVisible();

    // Club identity card.
    await expect(dashboard).toContainText('BG Pathum United');
    await expect(dashboard).toContainText('Pathum Thani');

    // Next fixture: BG Pathum United (home) vs Sukhothai FC (away).
    await expect(dashboard).toContainText('Sukhothai FC');
    await expect(dashboard).toContainText('Matchday 1');

    // Board confidence snapshot — flowed from core -> data -> systems -> app -> ui.
    await expect(dashboard).toContainText('Board Confidence');
    await expect(dashboard).toContainText('64%');
    await expect(dashboard).toContainText('Stable');

    // Finance snapshot.
    await expect(dashboard).toContainText('Club Finance');
    await expect(dashboard).toContainText('฿32,600,000');
    await expect(dashboard).toContainText('Healthy');

    // No tactics/match-control surface anywhere on the Chairman dashboard.
    await expect(dashboard).not.toContainText('Starting XI');
    await expect(dashboard).not.toContainText('Formation');

    await expectNoHorizontalOverflow(page);

    await screenshotFullContent(page, 'dashboard-chairman.png');
  });
});

test.describe('Role switch', () => {
  test('switching to FA President changes header framing and dashboard content', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('chairman-dashboard')).toBeVisible();

    await page.getByTestId('role-fa_president').click();

    const header = page.getByTestId('header');
    await expect(header).toContainText('Football Association President');
    await expect(header).toContainText('Football Association of Thailand');
    await expect(page.getByTestId('role-fa_president')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('role-chairman')).toHaveAttribute('aria-pressed', 'false');

    // Dashboard tab still shows real (non-fabricated) content for this role,
    // but it is honestly a different, not-yet-built command center.
    const faDashboard = page.getByTestId('fa-president-dashboard');
    await expect(faDashboard).toBeVisible();
    await expect(faDashboard).toContainText('Football Association of Thailand');
    await expect(faDashboard).toContainText('Governance Focus Areas');
    await expect(faDashboard).toContainText('National Competitions');
    await expect(faDashboard).toContainText('Not built yet');

    // Season context still flows through for this role too.
    await expect(faDashboard).toContainText('Matchday 1 of 30');

    // The Chairman-only club dashboard is gone, not just re-labeled.
    await expect(page.getByTestId('chairman-dashboard')).toHaveCount(0);

    await expectNoHorizontalOverflow(page);

    await screenshotFullContent(page, 'dashboard-fa-president.png');

    // And switching back restores the Chairman dashboard.
    await page.getByTestId('role-chairman').click();
    await expect(page.getByTestId('chairman-dashboard')).toBeVisible();
    await expect(header).toContainText('BG Pathum United');
  });
});

test.describe('Other tabs — honest "not built yet" states', () => {
  const CASES: ReadonlyArray<{ tab: string; testId: string; title: string }> = [
    { tab: 'club', testId: 'club-page', title: 'Club Management' },
    { tab: 'finance', testId: 'finance-page', title: 'Club Finance' },
    { tab: 'league', testId: 'league-page', title: 'Thai League 1' },
    { tab: 'association', testId: 'association-page', title: 'Football Association' },
  ];

  for (const { tab, testId, title } of CASES) {
    test(`${tab} tab shows an honest empty state, not fabricated data`, async ({ page }) => {
      await page.goto('/');
      await page.getByTestId(`tab-${tab}`).click();

      await expect(page.getByTestId(`tab-${tab}`)).toHaveAttribute('aria-current', 'page');

      const panel = page.getByTestId(testId);
      await expect(panel).toBeVisible();
      await expect(panel).toContainText(title);
      await expect(panel).toContainText('Not built yet');

      await expectNoHorizontalOverflow(page);
    });
  }

  test('mid-interaction: Club tab active state and empty content', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('tab-club').click();
    await expect(page.getByTestId('club-page')).toBeVisible();
    await screenshotFullContent(page, 'tab-club-empty-state.png');
  });
});
