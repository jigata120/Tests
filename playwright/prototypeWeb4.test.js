 
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/Templates/WEB-leb_templ/PAGE2/player-sm%20copy.html');

  // Check the title of the page
  await expect(page).toHaveTitle('Podtent');


});
