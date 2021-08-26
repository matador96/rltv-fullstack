const { validationResult, body, check } = require("express-validator");
const MESSAGE = require("../constant/responseMessages");
const ANY_CONFIG = require("../constant/anyConfig");
const { parsePlayerRank } = require("../modules/getPlayerRank");
const {
  getPlayerSteamNameByUrl,
} = require("../modules/getPlayerSteamNameByUrl");

module.exports.getPlayerSteamName = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ status: 422, message: MESSAGE.VALIDATOR.ERROR });
    }

    let { text } = req.body;

    if (text.search(/steamcommunity.com/) !== -1) {
      text = await getPlayerSteamNameByUrl(text);
      return res.status(200).json({ status: 200, data: text });
    }

    return res.status(200).json({ status: 200 });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

module.exports.getPlayerData = async (req, res) => {
  try {
    const errors = validationResult(req);

    let { platform, gameId } = req.body;

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ status: 422, message: MESSAGE.VALIDATOR.ERROR });
    }

    const data = await parsePlayerRank(platform, gameId);

    // if not found

    return res.status(200).json({ status: 200, data: data });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

module.exports.validate = (method) => {
  switch (method) {
    case "getPlayerData": {
      return [
        body("platform").exists().isIn(ANY_CONFIG.PLATFORMS),
        body("gameId").exists().isString(),
      ];
    }
    case "getPlayerSteamName": {
      return [body("text").exists().isString()];
    }
    default:
      break;
  }
};
