import { test, expect } from '@playwright/test';

test('valid user', async ({page})=>{
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Labs/);

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.getByText('Login').click();

  await expect(page).toHaveURL(/inventory/);
});


test('invalid user', async ({page})=>{
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Labs/);

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'incorrect_pass');
  await page.getByText('Login').click();

  await expect(page).not.toHaveURL(/inventory/);
});

test('Standard User', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page).toHaveTitle(/Swag/);
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');

  await page.getByText('Login').click();
  await expect(page).toHaveURL(/inventory/);

  await page.locator('.select_container').click();

  await page.selectOption('[data-test="product-sort-container"]', 'lohi');
  await page.getByTestId('add-to-cart-sauce-labs-onesie').click();

  await page.getByText('Sauce Labs Onesie').click();

  await expect(page).toHaveURL(/inventory-item/);
  await page.getByTestId('remove').click();

  await page.locator('#back-to-products').click();

  await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();
  await page.locator('.shopping_cart_link').click();

  // await expect(page).toHaveText();

  // await expect(page).toHaveText(/Products/);
});



