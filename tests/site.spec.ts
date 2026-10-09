import { expect, test } from '@playwright/test';
import { content } from '../src/content';

test('renders the new starting price and pricing navigation without errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Pricing' }).click();
  await expect(page).toHaveURL(/#pricing$/);
  await expect(page.locator('#pricing')).toContainText('$3');
  await expect(page.locator('body')).not.toContainText('$2.50');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('preserves the original map, tutorial, and contact destinations', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.ok()).toBe(true);
  await expect(page.getByTitle('Rincon Car Wash location')).toHaveAttribute('src', content.mapEmbedUrl!);
  await expect(page.getByTitle('Understanding All Those Self-Serve Car Wash Functions')).toHaveAttribute('src', content.tutorialEmbedUrl);
  await expect(page.getByRole('link', { name: content.phone!.label, exact: true })).toHaveAttribute('href', content.phone!.href);
  for (const link of content.links) await expect(page.getByRole('link', { name: link.label, exact: true })).toHaveAttribute('href', link.href);
  await expect(page.getByRole('main')).toContainText('Open 24 hours');
  await expect(page.getByRole('main')).toContainText('Wash tokens, quarters, and credit cards accepted');
});

test('loads the original photographs and product images', async ({ page }) => {
  await page.goto('/');
  expect(await page.getByRole('main').locator('img').count()).toBe(content.photos.length + content.essentials.length + 2);
  for (const image of await page.locator('img').all()) {
    await expect(image).toHaveAttribute('src', /^\/(photos\/|favicon\.svg$)/);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('complete', true);
    await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});
