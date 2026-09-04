import { defineConfig, devices } from '@playwright/test';

// iPhone 15: 393x852 CSS px, DPR 3 — this is the primary and only
// hard-required device target for this project.
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      // WebKit isn't available in this sandbox — Chromium is pre-installed,
      // so we emulate iPhone 15's viewport/touch/DPR on Chromium instead of
      // using the (WebKit-only) devices['iPhone 15'] preset.
      name: 'iPhone 15',
      use: {
        ...devices['Desktop Chrome'],
        channel: undefined,
        launchOptions: { executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' },
        viewport: { width: 393, height: 852 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
      },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
