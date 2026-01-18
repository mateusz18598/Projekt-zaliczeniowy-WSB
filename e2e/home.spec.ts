
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle('LinkedIn Clone');
    });

    test('displays navigation bar', async ({ page }) => {
        const navbar = page.locator('nav');
        await expect(navbar).toBeVisible();
    });

    test('displays feed', async ({ page }) => {
        // Check for "Start a post" button text
        await expect(page.getByText('Podziel się odkryciem...')).toBeVisible();

        // Check for at least one post with "polubień" text
        // We use .first() because there might be multiple posts
        await expect(page.getByText('polubień').first()).toBeVisible();
    });
});
