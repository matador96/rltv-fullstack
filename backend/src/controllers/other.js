const {
  timeLeftendOfSeason,
  siteStatus,
  season,
  seasons,
  alertOnHeader,
} = require("../constant/anyConfig");

module.exports.getSiteConfigs = async (req, res) => {
  try {
    const data = {
      timeLeftendOfSeason,
      siteStatus,
      season,
      seasons,
      alertOnHeader,
    };

    const fileName = "./../json/anyData.json";
    const file = require(fileName);

    data.lastHourOnline = file.lastHourOnline;
    data.trackedPlayers = file.trackedPlayers;

    return res.status(200).json({ status: 200, data });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

module.exports.getLastSearchers = async (req, res) => {
  try {
    const fileName = "./../json/last-searcheds.json";
    const file = require(fileName);

    return res.status(200).json({ status: 200, data: file });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

module.exports.getRankDistribution = async (req, res) => {
  try {
    const fileName = "./../json/rankDistribution.json";
    const file = require(fileName);

    return res.status(200).json({ status: 200, data: file });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};
