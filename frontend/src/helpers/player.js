import playlistIds from "../constant/playlistIds";

const getSumMatches = (player) => {
  const segments = player.segments;
  let sum = 0;

  for (let key in segments) {
    const rowRank = segments[key];

    if (rowRank.stats?.matchesPlayed?.value) {
      sum = sum + parseInt(rowRank.stats.matchesPlayed.value, 10);
    }
  }

  return sum;
};

const getAverageMMR = (player) => {
  const standardPlaylistId = 13;
  const doublesPlaylistId = 11;
  const soloPlaylistId = 10;

  const averageRating = [standardPlaylistId, doublesPlaylistId, soloPlaylistId];

  const segments = player.segments;
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
  return averageMMR;
};

const getSeasonRewardImage = (url, nextReward) => {
  if (!nextReward) {
    return getOwnRankImage(url);
  }
  url = url.replace(
    "https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/",
    ""
  );
  url = url.replace(".png", "");

  const rewardImages = {
    "s4-0": "s4-0",
    "s4-1": "s4-4",
    "s4-4": "s4-7",
    "s4-7": "s4-10",
    "s4-10": "s4-13",

    "s4-13": "s4-16",
    "s4-16": "s4-19",
    "s4-19": "s15rank22",
    "s4-22": "s15rank22",
    s15rank22: "s15rank22",
  };

  return "/images/rank/" + rewardImages[url] + ".png";
};

const getOwnRankImage = (str) => {
  str = str.replace(
    "https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/",
    ""
  );

  if (str.indexOf("s")) {
    return "/images/rank/s4-0.png";
  }

  return "/images/rank/" + str;
};

const getFavoriteMode = (player) => {
  const segments = player.segments;

  let favMode = "";
  let maxMatches = 0;

  for (let key in segments) {
    const rowRank = segments[key];

    if (rowRank.stats?.matchesPlayed?.value) {
      let matches = parseInt(rowRank.stats.matchesPlayed.value, 10);
      if (maxMatches < matches) {
        maxMatches = matches;
        favMode = rowRank.metadata.name;
      }
    }
  }

  favMode = favMode.replace("Ranked", "");
  favMode = favMode.replace("Standard", "");
  favMode = favMode.replace("Doubles", "");
  favMode = favMode.replace("Duel", "");

  return favMode;
};

const getPlayerRankObject = (player) => {
  const obj = {};

  const allPlaylistIds = [
    playlistIds.Standard,
    playlistIds.Doubles,
    playlistIds.Duel,
    playlistIds.Unranked,
    playlistIds.Rumble,
    playlistIds.Dropshot,
    playlistIds.Snowday,
    playlistIds.Hoops,
    playlistIds.Tournament,
  ];

  for (let key in allPlaylistIds) {
    obj[allPlaylistIds[key]] = {
      rating: getRankStats(player, allPlaylistIds[key]).stats.rating.value,
      icon: getRankStats(player, allPlaylistIds[key]).stats.tier.metadata
        .iconUrl,
      name: getRankStats(player, allPlaylistIds[key]).stats.tier.metadata.name,
    };
  }

  return obj;
};

const getPieStats = (data) => {
  if (!data) {
    return {};
  }

  const segments = data.segments;
  let rankRow;

  for (let key in segments) {
    const rowRank = segments[key];

    if (rowRank.stats.shots) {
      rankRow = rowRank;
      break;
    }
  }

  return rankRow;
};

const getRankStats = (data, playlistId) => {
  if (!data) {
    return {};
  }

  const segments = data.segments;
  let rankRow;

  for (let key in segments) {
    const rowRank = segments[key];

    if (rowRank.attributes.playlistId === playlistId) {
      rankRow = rowRank;
      break;
    }
  }

  return rankRow;
};

const getWorldPlace = (player) => {
  const standardPlaylistId = 13;
  const doublesPlaylistId = 11;
  const soloPlaylistId = 10;

  const averageRating = [standardPlaylistId, doublesPlaylistId, soloPlaylistId];

  const segments = player.segments;
  let sum = 0;
  let count = 0;

  for (let key in segments) {
    const rowRank = segments[key];

    if (averageRating.includes(rowRank.attributes.playlistId)) {
      sum = sum + parseInt(rowRank.stats.rating.rank, 10);
      count = count + 1;
    }
  }

  const averageWorldPlace = Math.round(sum / count);
  return averageWorldPlace;
};

export {
  getSumMatches,
  getAverageMMR,
  getFavoriteMode,
  getWorldPlace,
  getRankStats,
  getPlayerRankObject,
  getOwnRankImage,
  getPieStats,
  getSeasonRewardImage,
};
