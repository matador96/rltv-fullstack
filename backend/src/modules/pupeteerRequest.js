const cleaner = require("clean-html");
const puppeteer = require("puppeteer");

require("dotenv").config();

const settings =
  process.env.NODE_ENV === "production"
    ? {
        executablePath: "/usr/bin/chromium-browser", // sudo apt-get install chromium-browser
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        env: {
          DISPLAY: ":10.0",
        },
        defaultViewport: null,
      }
    : {};

async function doRequestWithPupeteer(url) {
  return new Promise(async function (resolve, reject) {
    const browser = await puppeteer.launch({
      headless: true,
      ...settings,
    });

    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
    );

    await page.goto(url);

    const htmlBody = await page.content();

    var options = {
      "add-remove-tags": ["head", "html", "body", "pre", "style", "meta"],
    };

    if (url.includes("player-history")) {
      resolve(htmlBody.replace(/(<([^>]+)>)/gi, ""));
      return;
    }

    cleaner.clean(htmlBody, options, (html) => {
      resolve(html);
      browser.close();
    });
  });
}

module.exports = {
  doRequestWithPupeteer,
};
