import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import {
  getIconComponentPlatfrom,
  getPlatformAvatar,
} from "./../helpers/other";
import { translate } from "react-switch-lang";
import { getLastSearchers } from "../api/all/other";

class LastSearcheds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentList: null,
    };
  }

  async componentDidMount() {
    const { data } = await getLastSearchers();

    if (data !== null && Object.keys(data).length > 0) {
      this.setState({
        recentList: data,
      });
    }
  }

  renderRecentList() {
    const { recentList } = this.state;
    const { t } = this.props;

    const renderList = [];
    //player.averageMmr.toLocaleString()
    for (let key in recentList) {
      let gameId = key;
      let player = recentList[gameId];

      if (!player.avatar) {
        player.avatar = getPlatformAvatar(player.platform);
      }

      renderList.push(
        <Link
          to={"/player/" + player.platform + "/" + gameId}
          className="historycheck_block"
          key={player.platform + gameId}
        >
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
            <span>{player.rating}</span>
          </div>
        </Link>
      );
    }

    return renderList.reverse();
  }

  render() {
    const { recentList } = this.state;
    if (!recentList) {
      return <></>;
    }

    const { t } = this.props;

    return (
      <Fade delay={300}>
        <div className="titlehistory">{t("pages.main.lastSearched")}</div>
        <div className="historycheck">{this.renderRecentList()}</div>
      </Fade>
    );
  }
}

export default translate(LastSearcheds);
