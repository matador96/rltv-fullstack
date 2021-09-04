import React from "react";
import { Row, Col, Progress, Tooltip, Button } from "antd";
import PieSavesShotsAsissts from "../components/player/PieSavesShotsAsissts";
import RankRow from "../components/player/RankRow";
import CountUp from "react-countup";
import RatingProgressionGraphs from "../components/player/RatingProgressionGraphs";
import PieMatches from "./../components/player/PieMatches";
import { translate } from "react-switch-lang";
import { SyncOutlined, HeartOutlined } from "@ant-design/icons";
import { getPlayerData, getPlayerPreviusSeason } from "./../api/all/player";
import Loader from "../components/Loader";
import { withRouter } from "react-router";
import {
  setFavorites,
  addHistory,
  isFavorite,
  updateFavorite,
} from "./../cookie/store";
import {
  getIconComponentPlatfrom,
  getPlatformAvatar,
  getPreviusSeasonsList,
} from "../helpers/other";
import {
  getAverageMMR,
  getFavoriteMode,
  getPieStats,
  getPlayerRankObject,
  getRankStats,
  getSeasonRewardImage,
  getSumMatches,
  getWorldPlace,
} from "../helpers/player";
import playlistIds from "../constant/playlistIds";
import openNotification from "../components/Notification";
import { Select } from "antd";

const { Option } = Select;

const competetiveRanks = [
  playlistIds.Duel,
  playlistIds.Doubles,
  playlistIds.Standard,
  playlistIds.Tournament,
];

const extraRanks = [
  playlistIds.Hoops,
  playlistIds.Rumble,
  playlistIds.Dropshot,
  playlistIds.Snowday,
];
class PlayerPage extends React.Component {
  state = {
    loadings: [],
    playerData: [],
    loading: false,
    isFav: false,
    updateData: false,
    previusSeasonData: null,
  };

  async componentDidMount() {
    await this.getData();
    const { gameId } = this.props.match.params;
    const isFav = await isFavorite(gameId);
    this.setState({
      isFav,
    });
  }
  async getData(firstUpdate = true) {
    const { platform, gameId } = this.props.match.params;

    if (!platform || !gameId) {
      return;
    }

    if (firstUpdate) {
      this.setState({
        loading: true,
      });
    }

    await getPlayerData(platform, gameId).then((data) => {
      if (!data?.data?.data) {
        this.props.history.push("/");

        openNotification("error", "Error", "Cant find this player.");
        return;
      }

      this.setState({
        playerData: [data.data.data],
        rankHistory: data.rankHistory,
        loading: false,
      });

      addHistory(
        platform,
        gameId,
        this.state.playerData[0].platformInfo.platformUserHandle,
        this.state.playerData[0].platformInfo.avatarUrl,
        getAverageMMR(this.state.playerData[0])
      );
      const isFav = isFavorite(gameId);
      if (isFav) {
        this.updateFav(platform, gameId);
      }
      return;
    });
  }

  handleChange = (value) => {
    if (
      value === parseInt(this.state.playerData[0].metadata.currentSeason, 10)
    ) {
      this.setState({
        previusSeasonData: null,
      });
      return;
    }

    this.updateRanks(value);
  };

  async updateRanks(season) {
    this.setState({
      loadPreviusRanks: true,
    });
    const { platform, gameId } = this.props.match.params;

    await getPlayerPreviusSeason(platform, gameId, season).then(({ data }) => {
      this.setState({
        previusSeasonData: data.data,
        loadPreviusRanks: false,
      });
    });
  }

  updateFav(platform, gameId) {
    const ranks = getPlayerRankObject(this.state.playerData[0]);

    updateFavorite(
      platform,
      gameId,
      this.state.playerData[0].platformInfo.platformUserHandle,
      this.state.playerData[0].platformInfo.avatarUrl,
      ranks
    );
  }

  enterLoading = async () => {
    this.setState({
      updateData: true,
    });
    await this.getData(false);
    this.setState({
      updateData: false,
    });
  };

  async setPlayerToFavoriteList(platform, gameId, nickname, avatar) {
    const { playerData } = this.state;
    const ranks = getPlayerRankObject(playerData[0]);

    const result = await setFavorites(
      platform,
      gameId,
      nickname,
      avatar,
      ranks
    );

    if (!result) {
      return;
    }

    const { isFav } = this.state;
    this.setState({
      isFav: !isFav,
    });

    window.Navbar.updateFavCount();
  }

  renderPreviusSeasonList() {
    let arr = [];
    const seasons = getPreviusSeasonsList();

    for (let key in seasons) {
      let element = seasons[key];
      arr.push(
        <Option
          value={element.number.toString()}
          key={element.number.toString()}
        >
          {element.name}
        </Option>
      );
    }

    return arr;
  }

  render() {
    const { t } = this.props;
    const {
      loading,
      isFav,
      updateData,
      playerData,
      rankHistory,
      previusSeasonData,
      loadPreviusRanks,
    } = this.state;
    //  const { loading, isFav, updateData } = this.state;
    const { platform, gameId } = this.props.match.params;

    //const playerData = [player];

    if (loading) {
      return (
        <div className="loaderblock">
          <Loader />
        </div>
      );
    }

    return (
      <>
        {playerData.map((player) => (
          <>
            <div
              className="content playerpage"
              key={this.state.playerData[0].platformInfo.platformUserHandle}
            >
              <div className="playerpage-buttons">
                <Button
                  type="link"
                  icon={<SyncOutlined />}
                  loading={updateData}
                  size="small"
                  onClick={() => this.enterLoading()}
                >
                  {updateData ? "Updating" : "Update"}
                </Button>
                <Button
                  type="link"
                  icon={<HeartOutlined />}
                  size="small"
                  className={
                    isFav ? "favorite-button active" : "favorite-button"
                  }
                  onClick={() => {
                    this.setPlayerToFavoriteList(
                      platform,
                      gameId,
                      this.state.playerData[0].platformInfo.platformUserHandle,
                      this.state.playerData[0].platformInfo.avatarUrl
                    );
                  }}
                >
                  {isFav ? "UnFavorite" : "Favorite"}
                </Button>

                {/*<Button
      
      type="link"
          icon={<ShrinkOutlined />}
          loading={loadings[1]}
          size="small"
          onClick={() => this.enterLoading(1)}
        >
          Compare
        </Button>*/}
              </div>
              <Row className="first-row">
                <Col
                  style={{ height: "100px" }}
                  span={10}
                  className="first-row__left"
                >
                  <div className="first-row__left___platformicon">
                    {getIconComponentPlatfrom(platform)}
                  </div>
                  <img
                    src={
                      player.platformInfo.avatarUrl
                        ? player.platformInfo.avatarUrl
                        : getPlatformAvatar(platform)
                    }
                    alt={player.platformInfo.platformUserHandle}
                    className="first-row__left___avatar"
                  />
                  <div className="first-row__left___profile">
                    <div className="first-row__left___profile___nickname">
                      {player.platformInfo.platformUserHandle}
                    </div>
                    <div className="first-row__left___profile___reward">
                      <div className="first-row__left___profile___reward____title">
                        {
                          player.segments[0].stats.seasonRewardLevel.metadata
                            .rankName
                        }

                        <img
                          src={
                            player.segments[0].stats.seasonRewardWins.value > 0
                              ? getSeasonRewardImage(
                                  player.segments[0].stats.seasonRewardLevel
                                    .metadata.iconUrl,
                                  true
                                )
                              : getSeasonRewardImage(
                                  player.segments[0].stats.seasonRewardLevel
                                    .metadata.iconUrl,
                                  false
                                )
                          }
                          alt={
                            player.segments[0].stats.seasonRewardLevel.metadata
                              .rankName
                          }
                          className="first-row__left___profile___reward____rankimg"
                        />
                      </div>
                      <Progress
                        percent={
                          player.segments[0].stats.seasonRewardWins.value > 0
                            ? player.segments[0].stats.seasonRewardWins.value *
                              10
                            : 100
                        }
                        steps={10}
                      />

                      <div className="first-row__left___profile___reward____label">
                        <span>{t("pages.player.seasonRewardLevel")}</span>
                        <span>
                          {player.segments[0].stats.seasonRewardWins.value > 0
                            ? player.segments[0].stats.seasonRewardWins.value
                            : 10}
                          /10
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col
                  style={{ height: "100px" }}
                  span={14}
                  className="first-row__right"
                >
                  <div key="wins">
                    <span>{t("pages.player.mini.wins")}</span>
                    <div>
                      <CountUp
                        separator=","
                        start={player.segments[0].stats.wins.value - 100}
                        end={player.segments[0].stats.wins.value}
                      />
                    </div>
                    <Tooltip
                      placement="rightBottom"
                      title={t("pages.player.placeInTheWorld")}
                    >
                      <i>#{player.segments[0].stats.wins.rank}</i>
                    </Tooltip>
                  </div>
                  <div key="goals">
                    <span>{t("pages.player.mini.goals")}</span>

                    <div>
                      <CountUp
                        separator=","
                        start={player.segments[0].stats.goals.value - 100}
                        end={player.segments[0].stats.goals.value}
                      />
                    </div>

                    <Tooltip
                      placement="rightBottom"
                      title={t("pages.player.placeInTheWorld")}
                    >
                      <i>#{player.segments[0].stats.goals.rank}</i>
                    </Tooltip>
                  </div>
                  <div key="saves">
                    <span>{t("pages.player.mini.saves")}</span>

                    <div>
                      <CountUp
                        separator=","
                        start={player.segments[0].stats.saves.value - 100}
                        end={player.segments[0].stats.saves.value}
                      />
                    </div>

                    <Tooltip
                      placement="rightBottom"
                      title={t("pages.player.placeInTheWorld")}
                    >
                      <i>#{player.segments[0].stats.saves.rank}</i>
                    </Tooltip>
                  </div>
                  <div key="assists">
                    <span>{t("pages.player.mini.assists")}</span>
                    <div>
                      <CountUp
                        separator=","
                        start={player.segments[0].stats.assists.value - 100}
                        end={player.segments[0].stats.assists.value}
                      />
                    </div>
                    <Tooltip
                      placement="rightBottom"
                      title={t("pages.player.placeInTheWorld")}
                    >
                      <i>#{player.segments[0].stats.assists.rank}</i>
                    </Tooltip>
                  </div>
                  <div key="mvps">
                    <span>{t("pages.player.mini.mvps")}</span>

                    <div>
                      <CountUp
                        separator=","
                        start={player.segments[0].stats.mVPs.value - 100}
                        end={player.segments[0].stats.mVPs.value}
                      />
                    </div>

                    <Tooltip
                      placement="rightBottom"
                      title={t("pages.player.placeInTheWorld")}
                    >
                      <i>#{player.segments[0].stats.mVPs.rank}</i>
                    </Tooltip>
                  </div>
                  <div key="shots">
                    <span>{t("pages.player.mini.shots")}</span>
                    <div>
                      <CountUp
                        separator=","
                        start={player.segments[0].stats.shots.value - 100}
                        end={player.segments[0].stats.shots.value}
                      />
                    </div>
                    <Tooltip
                      placement="rightBottom"
                      title={t("pages.player.placeInTheWorld")}
                    >
                      <i>#{player.segments[0].stats.shots.rank}</i>
                    </Tooltip>
                  </div>
                </Col>
              </Row>
              <Row className="second-row">
                <Col span={4} className="second-row__block">
                  {t("pages.player.mini.seasonMatches")}
                  <span>{getSumMatches(player)}</span>
                </Col>
                <Col span={4} className="second-row__block">
                  {t("pages.player.mini.goalShot")}{" "}
                  <span>
                    {player.segments[0].stats.goalShotRatio.displayValue}%
                  </span>
                </Col>
                <Col span={4} className="second-row__block">
                  {t("pages.player.mini.favoriteMode")}{" "}
                  <span>{getFavoriteMode(player)}</span>
                </Col>
                <Col span={4} className="second-row__block">
                  {t("pages.player.mini.worldPlace")}{" "}
                  <span>~ {getWorldPlace(player)}</span>
                </Col>
                <Col span={4}></Col>
              </Row>

              <Row className="third-row">
                <Col span={10} className="third-row__left">
                  <RatingProgressionGraphs rankHistory={rankHistory} />

                  <div className="third-row__left__title">
                    {t("pages.player.moreStats")}
                  </div>

                  <div className="third-row__left__block piesavesshots">
                    <PieSavesShotsAsissts
                      data={[
                        getPieStats(player).stats.shots.value,
                        getPieStats(player).stats.saves.value,
                        getPieStats(player).stats.assists.value,
                      ]}
                    />
                    <PieMatches
                      data={[
                        getRankStats(player, playlistIds.Duel).stats
                          .matchesPlayed.value,
                        getRankStats(player, playlistIds.Doubles).stats
                          .matchesPlayed.value,
                        getRankStats(player, playlistIds.Standard).stats
                          .matchesPlayed.value,
                        getRankStats(player, playlistIds.Tournament).stats
                          .matchesPlayed.value,
                        getRankStats(player, playlistIds.Unranked).stats
                          .matchesPlayed.value,
                        getRankStats(player, playlistIds.Snowday).stats
                          .matchesPlayed.value +
                          getRankStats(player, playlistIds.Hoops).stats
                            .matchesPlayed.value +
                          getRankStats(player, playlistIds.Dropshot).stats
                            .matchesPlayed.value +
                          getRankStats(player, playlistIds.Rumble).stats
                            .matchesPlayed.value,
                      ]}
                    />
                  </div>
                </Col>
                <Col span={14} className="third-row__right">
                  <div className="third-row__right__title title-ratingprogressiongraphs">
                    {t("pages.player.competetive")}

                    <Select
                      defaultValue={player.metadata.currentSeason.toString()}
                      onChange={this.handleChange}
                      loading={loadPreviusRanks}
                    >
                      {this.renderPreviusSeasonList()}
                    </Select>
                  </div>

                  {competetiveRanks.map((rank) => (
                    <div
                      className="third-row__right__rank"
                      key={player.platformInfo.platformUserHandle + rank}
                    >
                      <RankRow
                        data={
                          previusSeasonData
                            ? getRankStats(
                                { segments: previusSeasonData },
                                rank
                              )
                            : getRankStats(player, rank)
                        }
                        previusSeason={!!previusSeasonData}
                      />
                    </div>
                  ))}

                  <div className="third-row__right__title">
                    {t("pages.player.extraMods")}
                  </div>

                  {extraRanks.map((rank) => (
                    <div
                      className="third-row__right__rank"
                      key={player.platformInfo.platformUserHandle + rank}
                    >
                      <RankRow
                        data={
                          previusSeasonData
                            ? getRankStats(
                                { segments: previusSeasonData },
                                rank
                              )
                            : getRankStats(player, rank)
                        }
                        previusSeason={!!previusSeasonData}
                      />
                    </div>
                  ))}

                  <div className="third-row__right__title">
                    {t("pages.player.playlists.Un-Ranked")}
                  </div>

                  <div
                    className="third-row__right__rank"
                    key={
                      player.platformInfo.platformUserHandle +
                      playlistIds.Unranked
                    }
                  >
                    <RankRow
                      data={
                        previusSeasonData
                          ? getRankStats(
                              { segments: previusSeasonData },
                              playlistIds.Unranked
                            )
                          : getRankStats(player, playlistIds.Unranked)
                      }
                      previusSeason={!!previusSeasonData}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </>
        ))}
      </>
    );
  }
}

export default withRouter(translate(PlayerPage));
