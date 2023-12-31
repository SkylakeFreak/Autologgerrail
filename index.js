const express = require('express');
const dotenv = require('dotenv');
const { chromium } = require('playwright');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use the environment variable or default to 5000
app.use(cors());

app.get('/', async (req, res) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Replace with your actual login URL
    await page.goto('here replace it');

    // Replace 'username' and 'password' with the actual input field names
    await page.type('[name="username"]', 'your username');
    await page.type('[name="password"]', 'your password');

    // Replace 'login_button_selector' with the actual selector for the login button
    await page.waitForSelector('#loginbutton');
    await page.click('#loginbutton');

    // Wait for a bit to allow the login to complete (adjust as needed)
    await page.waitForTimeout(5000);

    res.send('Login automation initiated successfully!');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await browser.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
