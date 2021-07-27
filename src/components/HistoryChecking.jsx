import React from "react";
import { MailOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { getIconComponentPlatfrom } from "./../helpers/other";

const history = [
  {
    id: "matadorishe",
    avatar:
      "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/bc/bc87eee443bbb499709f15bcac40eaadc27473c5_full.jpg",
    platform: "steam",
    nickname: "matador",
    averageMmr: 1800,
  },
  {
    id: "kekweit",
    avatar:
      "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/bc/bc87eee443bbb499709f15bcac40eaadc27473c5_full.jpg",
    platform: "psn",
    nickname: "kekweit",
    averageMmr: 1700,
  },
  {
    id: "alo?",
    avatar:
      "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/bc/bc87eee443bbb499709f15bcac40eaadc27473c5_full.jpg",
    platform: "xbox",
    nickname: "alo?",
    averageMmr: 1200,
  },
  {
    id: "s asfhj hfgdgdf",
    avatar:
      "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/bc/bc87eee443bbb499709f15bcac40eaadc27473c5_full.jpg",
    platform: "steam",
    nickname: "s asfhj hfgdgdf",
    averageMmr: 1800,
  },
  {
    id: "s asfhj 4444 hfgdgdf",
    avatar:
      "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/bc/bc87eee443bbb499709f15bcac40eaadc27473c5_full.jpg",
    platform: "steam",
    nickname: "s asfhj hfgdgdf",
    averageMmr: 1800,
  },
  {
    id: "111111",
    avatar:
      "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/bc/bc87eee443bbb499709f15bcac40eaadc27473c5_full.jpg",
    platform: "steam",
    nickname: "s asfhj hfgdgdf",
    averageMmr: 1800,
  },
];

class HistoryChecking extends React.Component {
  render() {
    if (!history.length) {
      return;
    }

    return (
      <Fade delay={500}>
        <div className="titlehistory">Searching History</div>
        <div className="historycheck">
          {history.map((player, index) => (
            <>
              {index < 5 && (
                <Link to="/" className="historycheck_block">
                  <div className="historycheck_block-left">
                    <img alt={player.nickname} src={player.avatar} />
                    <div className="nickname">
                      {player.nickname}
                      <span>View Stats</span>
                    </div>
                  </div>

                  <div className="historycheck_block-platform">
                    {getIconComponentPlatfrom(player.platform)}
                  </div>
                  <div className="historycheck_block-mmr">
                    Rating
                    <span>{player.averageMmr.toLocaleString()}</span>
                  </div>
                </Link>
              )}
            </>
          ))}
        </div>{" "}
      </Fade>
    );
  }
}

export default HistoryChecking;
