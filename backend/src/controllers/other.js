const {
  timeLeftendOfSeason,
  lastHourOnline,
  siteStatus,
  alertOnTop,
  season,
} = require("../constant/anyConfig");

module.exports.getSiteConfigs = async (req, res) => {
  try {
    const data = {
      timeLeftendOfSeason,
      lastHourOnline,
      siteStatus,
      alertOnTop,
      season,
    };

    return res.status(200).json({ status: 200, data });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};
