import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { getIconComponentPlatfrom } from "./../helpers/other";
import { translate } from "react-switch-lang";

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

    const { t } = this.props;
    return (
      <Fade delay={300}>
        <div className="titlehistory">{t("pages.main.searchingHistory")}</div>
        <div className="historycheck">
          {history.map((player, index) => (
            <>
              {index < 5 && (
                <Link to="/player" className="historycheck_block">
                  <div className="historycheck_block-left">
                    <img alt={player.nickname} src={player.avatar} />
                    <div className="nickname">
                      {player.nickname}
                      <span>{t("other.words.viewStats")}</span>
                    </div>
                  </div>

                  <div className="historycheck_block-platform">
                    {getIconComponentPlatfrom(player.platform)}
                  </div>
                  <div className="historycheck_block-mmr">
                    {t("other.words.rating")}
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

export default translate(HistoryChecking);
