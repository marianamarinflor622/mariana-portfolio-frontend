import { test, expect } from '@playwright/test';

test.describe('Navigation E2E Tests', () => {
  test('should navigate between pages correctly', async ({ page }) => {
    // Start at home page
    await page.goto('/');
    
    // Wait for page to load completely
    await page.waitForLoadState('domcontentloaded');
    
    // Verify we're on the home page
    await expect(page).toHaveURL('/');
    
    // Check if main content is visible (with timeout)
    await expect(page.getByRole('heading', { name: 'Repositorios' })).toBeVisible({ timeout: 10000 });
    
    // Navigate to About page
    await page.getByRole('link', { name: 'Sobre mí' }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: 'Sobre mí' })).toBeVisible({ timeout: 10000 });
    
    // Navigate to Contact page
    await page.getByRole('link', { name: 'Contacto' }).click();
    await expect(page).toHaveURL('/contact');
    await expect(page.getByRole('heading', { name: 'Contacto' })).toBeVisible({ timeout: 10000 });
    
    // Navigate back to home
    await page.getByRole('link', { name: 'Inicio' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Repositorios' })).toBeVisible({ timeout: 10000 });
  });
});
