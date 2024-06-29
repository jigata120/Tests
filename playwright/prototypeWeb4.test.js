 
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/Templates/WEB-leb_templ/PAGE2/player-sm%20copy.html');

  // Check the title of the page
  await expect(page).toHaveTitle('Podtent');


});
// playwright.config.js
module.exports = {
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  use: {
    headless: true,
    baseURL: 'http://localhost:8090',
  },
};

// tests/basic.test.js
const { test, expect } = require('@playwright/test');

test.describe('Prototype App Tests', () => {

  // Home Page Tests
  test('Home page has header and footer', async ({ page }) => {
    await page.goto('/');
    const header = await page.$('header');
    const footer = await page.$('footer');
    expect(header).not.toBeNull();
    expect(footer).not.toBeNull();
  });

  test('Home page has navigation links', async ({ page }) => {
    await page.goto('/');
    const navLinks = await page.$$('nav a');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  // About Page Tests
  test('About page has correct heading', async ({ page }) => {
    await page.goto('/about');
    const heading = await page.textContent('h1');
    expect(heading).toBe('About');
  });

  test('About page has content', async ({ page }) => {
    await page.goto('/about');
    const content = await page.textContent('p');
    expect(content).toContain('This is the about page');
  });

  // Add Grade Page Tests
  test('Add grade page has form', async ({ page }) => {
    await page.goto('/Add-Grade');
    const form = await page.$('form');
    expect(form).not.toBeNull();
  });

  test('Add grade page form submission', async ({ page }) => {
    await page.goto('/Add-Grade');
    await page.fill('input[name="subject"]', 'Physics');
    await page.fill('input[name="value"]', '3.90');
    await page.click('button[type="submit"]');
    const response = await page.waitForResponse('**/Add-Grade');
    expect(response.ok()).toBeTruthy();
  });

  // Grades Page Tests
  test('Grades page lists grades', async ({ page }) => {
    await page.goto('/My-Grades');
    const listItems = await page.$$('ul li');
    expect(listItems.length).toBeGreaterThan(0);
  });

  test('Grades page has expected grade', async ({ page }) => {
    await page.goto('/My-Grades');
    const gradeText = await page.textContent('ul li:nth-child(1)');
    expect(gradeText).toContain('English (4.50)');
  });

  // Footer Tests
  test('Footer has correct text', async ({ page }) => {
    await page.goto('/');
    const footerText = await page.textContent('footer div');
    expect(footerText).toContain('© 2023 - Software Engineering and DevOps regular exam');
  });

  // Contact Page Tests
  test('Contact page has form', async ({ page }) => {
    await page.goto('/contact');
    const form = await page.$('form');
    expect(form).not.toBeNull();
  });

  test('Contact page form submission', async ({ page }) => {
    await page.goto('/contact');
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'Hello!');
    await page.click('button[type="submit"]');
    const response = await page.waitForResponse('**/contact');
    expect(response.ok()).toBeTruthy();
  });

  // Header Tests
  test('Header has logo', async ({ page }) => {
    await page.goto('/');
    const logo = await page.$('header img');
    expect(logo).not.toBeNull();
  });

  test('Header has navigation menu', async ({ page }) => {
    await page.goto('/');
    const navMenu = await page.$('nav');
    expect(navMenu).not.toBeNull();
  });

  // Services Page Tests
  test('Services page has service list', async ({ page }) => {
    await page.goto('/services');
    const services = await page.$$('section.service');
    expect(services.length).toBeGreaterThan(0);
  });

  test('Services page has expected service', async ({ page }) => {
    await page.goto('/services');
    const serviceText = await page.textContent('section.service:nth-child(1) h2');
    expect(serviceText).toBe('Web Development');
  });

  // Portfolio Page Tests
  test('Portfolio page has project list', async ({ page }) => {
    await page.goto('/portfolio');
    const projects = await page.$$('div.project');
    expect(projects.length).toBeGreaterThan(0);
  });

  test('Portfolio page has expected project', async ({ page }) => {
    await page.goto('/portfolio');
    const projectText = await page.textContent('div.project:nth-child(1) h3');
    expect(projectText).toBe('Project A');
  });

  // Blog Page Tests
  test('Blog page lists articles', async ({ page }) => {
    await page.goto('/blog');
    const articles = await page.$$('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  test('Blog page has expected article', async ({ page }) => {
    await page.goto('/blog');
    const articleText = await page.textContent('article:nth-child(1) h2');
    expect(articleText).toBe('Understanding JavaScript');
  });

 

});



