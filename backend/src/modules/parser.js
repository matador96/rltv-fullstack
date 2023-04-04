const cheerio = require("cheerio");
const { doRequestWithPupeteer } = require("./pupeteerRequest");

module.exports.parseOnlinePlayers = async () => {
  try {
    const url = "https://rocketleague.tracker.network/";

    const body = await doRequestWithPupeteer(url);

    const $ = cheerio.load(body);

    let text = $("div.counter .subject .value").text();
    text = text.replace(",", "");

    let playersCount = parseInt(text, 10);

    const fs = require("fs");
    const fileName = "../json/anyData.json";
    const file = require(fileName);

    if (!playersCount) {
      return;
    }

    file.lastHourOnline = playersCount;

    const path = require("path");
    const finalPath = path.join("../backend/src/json", "anyData.json");

    fs.writeFile(finalPath, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
    });

    return;
  } catch (e) {
    throw Error(e.message);
  }
};
