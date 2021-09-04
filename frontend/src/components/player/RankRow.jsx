import React from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { translate } from "react-switch-lang";
import { getOwnRankImage } from "../../helpers/player";

const getTitle = (text) => {
  text = text.replace("Matches", "");
  return text.replace("Ranked ", "");
};

const getDivision = (text) => {
  return text.replace("Division", "");
};

const getWinStreakText = (text) => {
  if (text === "loss") {
    return "LoseStreak";
  }

  if (text === "win") {
    return "WinStreak";
  }

  return "";
};

class RankRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, t, previusSeason } = this.props;

    if (!data?.stats) {
      return <></>;
    }

    return (
      <div className="rankrow">
        <img
          src={getOwnRankImage(data.stats.tier.metadata.iconUrl)}
          alt={t(
            "pages.player.playlists." + getTitle(data.stats.tier.metadata.name)
          )}
          className="rankrow_rankimg"
        />
        <div className="rankrow_name">
          <span>
            {t("pages.player.playlists." + getTitle(data.metadata.name))}
          </span>
          <span>{data.stats.tier.metadata.name}</span>
        </div>
        <div className="rankrow_rating">
          <span>
            {data.stats.rating.value} <i>mmr</i>
          </span>
          {data.stats.rating.rank && (
            <span>
              {t("pages.player.inTheworld")} <i>#{data.stats.rating.rank}</i>
            </span>
          )}
        </div>
        <div className="rankrow_divchange">
          {!previusSeason && (
            <span>
              {data.stats.division.metadata.deltaDown && (
                <>
                  <UpOutlined
                    style={{
                      fontWeight: 700,
                      fontSize: "8px",
                      color: "green",
                      marginRight: 5,
                    }}
                  />{" "}
                  {data.stats.division.metadata.deltaDown}
                </>
              )}{" "}
              {data.stats.division.metadata.deltaUp && (
                <>
                  | {data.stats.division.metadata.deltaUp}
                  <DownOutlined
                    style={{
                      fontWeight: 700,
                      fontSize: "8px",
                      color: "red",
                      marginLeft: 5,
                    }}
                  />
                </>
              )}
            </span>
          )}
          <span>
            {t("pages.player.division")}{" "}
            {getDivision(data.stats.division.metadata.name)}
          </span>
        </div>
        <div className="rankrow_matches">
          <span>{data.stats.matchesPlayed.value}</span>
          {!previusSeason && (
            <>
              <span
                className={getWinStreakText(data.stats.winStreak.metadata.type)}
              >
                {data.stats.winStreak.value !== 0 &&
                  getWinStreakText(data.stats.winStreak.metadata.type) + ": "}
                <b>{data.stats.winStreak.value}</b>
              </span>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default translate(RankRow);
