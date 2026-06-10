import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
const page = await ctx.newPage();

const navs = [];
page.on('framenavigated', f => { if (f === page.mainFrame()) navs.push(f.url()); });

await page.goto('http://localhost:3000');
await page.waitForLoadState('networkidle');

const input = page.locator('input[placeholder*="0x"]');
await input.fill('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
await page.locator('button:has-text("Search")').click();
await page.waitForSelector('text=ETH Balance', { timeout: 15000 }).catch(() => null);
await page.waitForTimeout(2000);

await page.screenshot({ path: '/tmp/before-click.png' });

// List all buttons
const allBtns = page.locator('button');
const n = await allBtns.count();
console.log('Total buttons:', n);
for (let i = 0; i < n; i++) {
  const t = await allBtns.nth(i).innerText();
  const type = await allBtns.nth(i).getAttribute('type');
  console.log(`  btn[${i}] type=${type}: "${t}"`);
}

// Click the copy button (type=button with address text)
const copyBtn = page.locator('button[type="button"]').filter({ hasText: /0x/ });
const count = await copyBtn.count();
console.log('Matching copy buttons:', count);
if (count > 0) {
  await copyBtn.first().click();
  await page.waitForTimeout(600);
  console.log('After click:', await copyBtn.first().innerText().catch(() => 'gone'));
  await page.screenshot({ path: '/tmp/after-click.png' });
}
console.log('Navigations:', navs);
await browser.close();
