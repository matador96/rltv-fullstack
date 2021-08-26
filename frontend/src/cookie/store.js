import openNotification from "../components/Notification";

export const getHistory = async () => {
  try {
    const history = await localStorage.history;
    return history !== null ? JSON.parse(history) : {};
  } catch (e) {
    return null;
  }
};

export const addHistory = async (platform, gameId, nickname, avatar) => {
  try {
    let history = await getHistory();

    history = history || {};

    if (history[gameId]) {
      delete history[gameId];
    }

    const ids = Object.keys(history);

    if (ids.length > 4) {
      delete history[ids[0]];
    }

    history[gameId] = { avatar, platform, nickname };

    return localStorage.setItem("history", JSON.stringify(history));
  } catch (e) {
    return null;
  }
};

export const cleanHistory = () => {
  localStorage.removeItem("history");
};

export const getFavorites = async () => {
  try {
    const favorites = await localStorage.favorites;
    return favorites !== null ? JSON.parse(favorites) : {};
  } catch (e) {
    return null;
  }
};

export const setFavorites = async (platform, gameId, nickname, avatar) => {
  try {
    let favorites = await getFavorites();

    favorites = favorites || {};

    if (favorites[gameId]) {
      delete favorites[gameId];
      localStorage.setItem("favorites", JSON.stringify(favorites));
      return true;
    }

    const obj = Object.keys(favorites);

    if (obj.length > 9) {
      openNotification(
        "error",
        "Error",
        "Cant add to list. Maximum 10 players"
      );
      return false;
    }

    favorites[gameId] = { avatar, platform, nickname };
    localStorage.setItem("favorites", JSON.stringify(favorites));
    return true;
  } catch (e) {
    return null;
  }
};

export const isFavorite = async (gameId) => {
  try {
    let favorites = await getFavorites();

    if (!favorites) {
      return false;
    }

    if (favorites[gameId]) {
      return true;
    }

    return false;
  } catch (e) {
    return null;
  }
};

export const cleanFavorites = async () => {
  await localStorage.removeItem("favorites");
};

export const deleteFavorites = async (data) => {
  try {
    // return localStorage.removeItem("favorites");
  } catch (e) {
    return null;
  }
};
