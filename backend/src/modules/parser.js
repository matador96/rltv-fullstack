const cheerio = require("cheerio");

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    const request = require("request");
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

module.exports.parseOnlinePlayers = async () => {
  try {
    const url = "https://rocketleague.tracker.network/";

    let body = await doRequest(url);

    const $ = cheerio.load(body);

    let text = $("div.counters > .counter:nth-child(2) .value").text();
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
