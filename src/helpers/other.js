import SteamIcon from "./../components/icons/SteamIcon";
import EpicIcon from "./../components/icons/EpicIcon";
import NintendoIcon from "./../components/icons/NintendoIcon";
import PlaystationIcon from "./../components/icons/PlaystationIcon";
import XboxIcon from "./../components/icons/XboxIcon";


const getIconComponentPlatfrom = (platform) =>{
    const iconComponents = {
        steam: <SteamIcon />,
        epic: <EpicIcon />,
        nintendo: <NintendoIcon />,
        psn: <PlaystationIcon />,
        xbox: <XboxIcon />,
      };


      return iconComponents[platform]
}

export { getIconComponentPlatfrom };