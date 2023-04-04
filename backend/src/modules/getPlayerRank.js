const { doRequestWithPupeteer } = require("./pupeteerRequest");

module.exports.parsePlayerRank = async (platform, gameid) => {
  try {
    const url = process.env.API_PLAYER_RANK + platform + "/" + gameid;

    const json = await doRequestWithPupeteer(url).then((res) =>
      JSON.parse(res)
    );

    return json;
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports.parsePlayerRankHistory = async (trnId) => {
  try {
    // 256433
    const url = process.env.API_PLAYER_RANK_HISTORY + trnId;

    const json = await doRequestWithPupeteer(url).then((res) =>
      JSON.parse(res)
    );

    return json;
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports.parsePlayerRankPreviusSeason = async (
  platform,
  gameid,
  season
) => {
  try {
    const url =
      process.env.API_PLAYER_RANK_PREVIUS_SEASON +
      platform +
      "/" +
      gameid +
      "/segments/playlist?season=" +
      season;

    const json = await doRequestWithPupeteer(url).then((res) =>
      JSON.parse(res)
    );

    return json;
  } catch (e) {
    throw Error(e.message);
  }
};
