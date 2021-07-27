import React from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const getTitle = (text) => {
  text = text.replace("Matches", "");
  return text.replace("Ranked ", "");
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
    const { data } = this.props;
    return (
      <div className="rankrow">
        <img
          src={data.stats.tier.metadata.iconUrl}
          alt={data.stats.tier.metadata.name}
          className="rankrow_rankimg"
        />
        <div className="rankrow_name">
          <span>{getTitle(data.metadata.name)}</span>
          <span>{data.stats.tier.metadata.name}</span>
        </div>
        <div className="rankrow_rating">
          <span>
            {data.stats.rating.value} <i>mmr</i>
          </span>
          <span>
            World <i>#{data.stats.rating.rank}</i>
          </span>
        </div>
        <div className="rankrow_divchange">
          <span>
            <UpOutlined
              style={{
                fontWeight: 700,
                fontSize: "8px",
                color: "green",
                marginRight: 5,
              }}
            />
            {data.stats.division.metadata.deltaDown} |{" "}
            {data.stats.division.metadata.deltaUp}
            <DownOutlined
              style={{
                fontWeight: 700,
                fontSize: "8px",
                color: "red",
                marginLeft: 5,
              }}
            />
          </span>
          <span>{data.stats.division.metadata.name}</span>
        </div>
        <div className="rankrow_matches">
          <span>{data.stats.matchesPlayed.value}</span>
          <span
            className={getWinStreakText(data.stats.winStreak.metadata.type)}
          >
            {data.stats.winStreak.value !== 0 &&
              getWinStreakText(data.stats.winStreak.metadata.type) + ": "}
            <b>{data.stats.winStreak.value}</b>
          </span>
        </div>
      </div>
    );
  }
}

export default RankRow;
