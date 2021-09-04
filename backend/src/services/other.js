module.exports.addLastSearchers = async (data) => {
  try {
    const fs = require("fs");
    const fileName = "../json/last-searcheds.json";
    const file = require(fileName);

    if (file[data.gameId]) {
      delete file[data.gameId];
    }

    file[data.gameId] = data;

    const length = Object.keys(file).length;

    if (length > 5) {
      delete file[Object.keys(file)[0]];
    }

    const path = require("path");
    const finalPath = path.join("../backend/src/json", "last-searcheds.json");

    fs.writeFile(finalPath, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
    });

    return data;
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports.addTrackedCounters = () => {
  try {
    const fs = require("fs");
    const fileName = "../json/anyData.json";
    const file = require(fileName);

    file.trackedPlayers = file.trackedPlayers + 1;

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
