import SteamIcon from "./../components/icons/SteamIcon";
import EpicIcon from "./../components/icons/EpicIcon";
import NintendoIcon from "./../components/icons/NintendoIcon";
import PlaystationIcon from "./../components/icons/PlaystationIcon";
import XboxIcon from "./../components/icons/XboxIcon";

const getPlatformAvatar = (platform) => {
  const avatars = {
    psn: "/images/psn_avatar.jpg",
    steam: "/images/steam_avatar.jpg",
    epic: "/images/epic_avatar.jpg",
    xbl: "/images/xbox_avatar.jpg",
    switch: "/images/nintendo_avatar.jpg",
  };

  return avatars[platform];
};

const getIconComponentPlatfrom = (platform) => {
  const iconComponents = {
    steam: <SteamIcon />,
    epic: <EpicIcon />,
    nintendo: <NintendoIcon />,
    psn: <PlaystationIcon />,
    xbox: <XboxIcon />,
  };

  return iconComponents[platform];
};

const timeLeftUnixToDays = (unix) => {
  const date = new Date();
  const now = Math.round(date.getTime() / 1000);
  let time = unix - now;
  let days = Math.abs(Math.round(time / 86400));
  return days;
};

const getLastHourOnline = () => {
  const configs = window.App.state.configs;
  if (!configs) {
    return 0;
  }
  if (configs.lastHourOnline) {
    return configs.lastHourOnline;
  }
};

const getSeason = () => {
  const configs = window.App.state.configs;
  if (!configs) {
    return;
  }

  if (configs.season) {
    return configs.season;
  }
};
const getLeftDaysEndSeason = () => {
  const configs = window.App.state.configs;
  if (!configs) {
    return;
  }
  if (configs.timeLeftendOfSeason) {
    return timeLeftUnixToDays(configs.timeLeftendOfSeason);
  }
};

export {
  getIconComponentPlatfrom,
  getPlatformAvatar,
  timeLeftUnixToDays,
  getLeftDaysEndSeason,
  getSeason,
  getLastHourOnline,
};
