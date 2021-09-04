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
// https://api.tracker.gg/api/v1/rocket-league/player-history/mmr/256433
module.exports.getRankDistribution = async () => {
  try {
    const url = "https://api.tracker.gg/api/v1/rocket-league/tracked-players";
    let body = await doRequest(url);

    const json = JSON.parse(body);
    const fs = require("fs");

    if (!json) {
      return;
    }

    const path = require("path");
    const finalPath = path.join("../backend/src/json", "rankDistribution.json");

    fs.writeFile(finalPath, JSON.stringify(json), function writeJSON(err) {
      if (err) return console.log(err);
    });

    return;
  } catch (e) {
    throw Error(e.message);
  }
};
