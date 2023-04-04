const { doRequestWithPupeteer } = require("./pupeteerRequest");

module.exports.getRankDistribution = async () => {
  try {
    const url = process.env.API_PLAYER_RANK_DISTRIBUTION;
    const json = await doRequestWithPupeteer(url).then((res) =>
      JSON.parse(res)
    );
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
