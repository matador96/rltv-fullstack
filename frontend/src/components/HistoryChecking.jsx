import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import {
  getIconComponentPlatfrom,
  getPlatformAvatar,
} from "./../helpers/other";
import { translate } from "react-switch-lang";
import { getHistory } from "../cookie/store";

class HistoryChecking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: null,
    };
  }

  async componentDidMount() {
    const items = await getHistory();

    if (items !== null && Object.keys(items).length > 0) {
      this.setState({
        historyList: items,
      });
    }
  }

  renderHistoryList() {
    const { historyList } = this.state;
    const { t } = this.props;

    const renderList = [];
    //player.averageMmr.toLocaleString()
    for (let key in historyList) {
      let gameId = key;
      let player = historyList[gameId];

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
    const { historyList } = this.state;
    if (!historyList) {
      return <></>;
    }

    const { t } = this.props;

    return (
      <Fade delay={300}>
        <div className="titlehistory">{t("pages.main.searchingHistory")}</div>
        <div className="historycheck">{this.renderHistoryList()}</div>
      </Fade>
    );
  }
}

export default translate(HistoryChecking);
