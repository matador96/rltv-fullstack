const {
  aboutMe,
  socialList,
  donateText,
  donateList,
  roadmapText,
  roadmapList,
  bugReportText,
  bugReportList,
} = require("../constant/articles");

module.exports.getAboutMe = async (req, res) => {
  try {
    const data = {
      aboutMe,
      socialList,
    };

    return res.status(200).json({ status: 200, data });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

module.exports.getDonateList = async (req, res) => {
  try {
    const data = {
      donateText,
      donateList,
    };

    return res.status(200).json({ status: 200, data });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

module.exports.getRoadmap = async (req, res) => {
  try {
    const data = {
      roadmapText,
      roadmapList,
    };

    return res.status(200).json({ status: 200, data });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

module.exports.getBugReport = async (req, res) => {
  try {
    const data = {
      bugReportText,
      bugReportList,
    };

    return res.status(200).json({ status: 200, data });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};
