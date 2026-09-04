import { test, expect } from '@playwright/test';

test('scaffold boots on iPhone 15 viewport', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Football Executive Management');
  const viewport = page.viewportSize();
  expect(viewport?.width).toBe(393);
  expect(viewport?.height).toBe(852);
});
