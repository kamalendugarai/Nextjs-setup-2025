import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display main components', async ({ page }) => {
    // Check accordion exists
    await expect(page.getByRole('button', { name: 'Is it accessible?' })).toBeVisible();
    
    // Check Next.js logo
    await expect(page.getByAltText('Next.js logo')).toBeVisible();
    
    // Verify ordered list content
    await expect(page.getByText('Get started by editing')).toBeVisible();
    await expect(page.getByText('Save and see your changes instantly')).toBeVisible();
  });

  test('should have working accordion functionality', async ({ page }) => {
    const accordionTriggers = await page.getByRole('button', { name: 'Is it accessible?' }).all();
    
    // Test first accordion item
    await accordionTriggers[0].click();
    await expect(page.getByText('Yes. It adheres to the WAI-ARIA design pattern.')).toBeVisible();
    
    // Click again to collapse
    await accordionTriggers[0].click();
    await expect(page.getByText('Yes. It adheres to the WAI-ARIA design pattern.')).not.toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Check deploy button
    const deployButton = page.getByRole('link', { name: /Deploy now/i });
    await expect(deployButton).toHaveAttribute('href', 'https://vercel.com/new');
    
    // Check docs link
    const docsLink = page.getByRole('link', { name: 'Read our docs' });
    await expect(docsLink).toHaveAttribute('href', 'https://nextjs.org/docs');
  });

  test('should have footer links', async ({ page }) => {
    // Check footer links
    await expect(page.getByRole('link', { name: /Learn/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Examples/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Go to nextjs.org/i })).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('main')).toHaveClass(/flex-col/);
    
    // Test desktop view
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page.locator('.sm\\:flex-row')).toBeVisible();
  });
});
