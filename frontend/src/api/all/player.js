import { post } from "../fetch.js";

export const getPlayerData = (platform, gameId) =>
  post(
    "/player/rank",
    {
      platform,
      gameId,
    },
    true
  );

export const getPlayerSteamName = (text) =>
  post(
    "/player/steamid",
    {
      text,
    },
    true
  );
