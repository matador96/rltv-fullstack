const { validationResult, body, check } = require("express-validator");
const MESSAGE = require("../constant/responseMessages");
const ANY_CONFIG = require("../constant/anyConfig");
const {
  parsePlayerRank,
  parsePlayerRankHistory,
  parsePlayerRankPreviusSeason,
} = require("../modules/getPlayerRank");
const {
  getPlayerSteamNameByUrl,
} = require("../modules/getPlayerSteamNameByUrl");
const { addLastSearchers, addTrackedCounters } = require("../services/other");

const getNormalDate = (time) => {
  const date = new Date(time);
  const monthOk = date.getUTCMonth();
  const day = date.getUTCDate();

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const n = month[monthOk];
  const newdate = day + " " + n;
  return newdate;
};

module.exports.getPlayerPreviusSeason = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ status: 422, message: MESSAGE.VALIDATOR.ERROR });
    }

    let { platform, gameId, season } = req.body;

    const data = await parsePlayerRankPreviusSeason(platform, gameId, season);
    return res.status(200).json({ status: 200, data });
  } catch (e) {
    return res.status(200).json({ status: 200, message: e.message });
  }
};

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

    const standardPlaylistId = 13;
    const doublesPlaylistId = 11;
    const soloPlaylistId = 10;

    const averageRating = [
      standardPlaylistId,
      doublesPlaylistId,
      soloPlaylistId,
    ];

    const segments = data.data.segments;
    let sum = 0;
    let count = 0;

    for (let key in segments) {
      const rowRank = segments[key];

      if (averageRating.includes(rowRank.attributes.playlistId)) {
        sum = sum + parseInt(rowRank.stats.rating.value, 10);
        count = count + 1;
      }
    }

    const averageMMR = Math.round(sum / count);

    const playerData = {
      nickname: data.data.platformInfo.platformUserHandle,
      avatar: data.data.platformInfo.avatarUrl,
      rating: averageMMR,
      platform: platform,
      gameId: gameId,
    };

    const trnId = data.data.metadata.playerId;
    const rankHistory = await parsePlayerRankHistory(trnId);

    let newRankHistory = {};

    for (let key in rankHistory.data) {
      let rankHistoryRow = rankHistory.data[key];
      const playlistId = key;
      let arr = Object.keys(rankHistoryRow);

      arr.reverse();

      let newSortedHistory = [];

      let count = 0;
      for (let key in arr) {
        if (count > 30) {
          break;
        }

        let index = arr[key];
        newSortedHistory.push(rankHistoryRow[index]);
        count++;
      }

      newRankHistory[playlistId] = newSortedHistory;
    }

    const newCollectData = [];

    for (let key in newRankHistory[0]) {
      let rankHistoryRow = newRankHistory[0][key];
      let date = rankHistoryRow.collectDate;

      newCollectData.push(getNormalDate(date));
    }

    for (let i in newRankHistory) {
      let element = newRankHistory[i];
      let sortedNormal = [];

      for (let key in element) {
        sortedNormal.push(element[key].rating);
      }
      newRankHistory[i] = sortedNormal.reverse();
    }

    await addLastSearchers(playerData);
    addTrackedCounters();

    return res.status(200).json({
      status: 200,
      data,
      rankHistory: { dates: newCollectData.reverse(), history: newRankHistory },
    });
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
    case "getPlayerPreviusSeason": {
      return [
        body("platform").exists().isIn(ANY_CONFIG.PLATFORMS),
        body("gameId").exists().isString(),
        body("season").exists(),
      ];
    }
    case "getPlayerSteamName": {
      return [body("text").exists().isString()];
    }
    default:
      break;
  }
};
