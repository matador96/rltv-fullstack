const PlayerController = require("../controllers/player");

module.exports = (router) => {
  router.post(
    "/api/player/rank",
    PlayerController.validate("getPlayerData"),
    PlayerController.getPlayerData
  );
  router.post(
    "/api/player/steamid",
    PlayerController.validate("getPlayerSteamName"),
    PlayerController.getPlayerSteamName
  );
  router.post(
    "/api/player/season",
    PlayerController.validate("getPlayerPreviusSeason"),
    PlayerController.getPlayerPreviusSeason
  );
};
