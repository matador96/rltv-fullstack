import React from "react";
import { Row, Col, Progress, Tooltip, Button } from "antd";
import PieSavesShotsAsissts from "../components/player/PieSavesShotsAsissts";
import RankRow from "../components/player/RankRow";
import CountUp from "react-countup";
import RatingProgressionGraphs from "../components/player/RatingProgressionGraphs";
import PieMatches from "./../components/player/PieMatches";
import { translate } from "react-switch-lang";
import { SyncOutlined, HeartOutlined } from "@ant-design/icons";
import { getPlayerData } from "./../api/all/player";
import Loader from "../components/Loader";
import { setFavorites, addHistory, isFavorite } from "./../cookie/store";
import { getPlatformAvatar } from "../helpers/other";
import player from "./../data/player";
class PlayerPage extends React.Component {
  state = {
    loadings: [],
    playerData: [],
    loading: false,
    isFav: false,
    updateData: false,
  };

  async componentDidMount() {
    // await this.getData();
    // const { gameId } = this.props.match.params;
    // const isFav = await isFavorite(gameId);
    // this.setState({
    //   isFav,
    // });
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

    // await getPlayerData(platform, gameId).then(({ data }) => {
    //   this.setState({
    //     playerData: [data.data],
    //     loading: false,
    //   });

    //   addHistory(
    //     platform,
    //     gameId,
    //     this.state.playerData[0].platformInfo.platformUserHandle,
    //     this.state.playerData[0].platformInfo.avatarUrl
    //   );
    // });
  }

  enterLoading = (index) => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });

    Promise.all([this.getData(false)]);

    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = false;

      return {
        loadings: newLoadings,
      };
    });
  };

  async addPlayerToFavoriteList(platform, gameId, nickname, avatar) {
    const result = await setFavorites(platform, gameId, nickname, avatar);

    if (!result) {
      return;
    }

    const { isFav } = this.state;
    this.setState({
      isFav: !isFav,
    });

    window.Navbar.updateFavCount();
  }

  render() {
    const { t } = this.props;
    const { loading, isFav, updateData } = this.state;
    const { platform, gameId } = this.props.match.params;

    const playerData = [player];

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
            <div className="content playerpage">
              <div className="playerpage-buttons">
                <Button
                  type="link"
                  icon={<SyncOutlined />}
                  loading={updateData}
                  size="small"
                  onClick={() => this.enterLoading(1)}
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
                    this.addPlayerToFavoriteList(
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
                            player.segments[0].stats.seasonRewardLevel.metadata
                              .iconUrl
                          }
                          alt={
                            player.segments[0].stats.seasonRewardLevel.metadata
                              .rankName
                          }
                          className="first-row__left___profile___reward____rankimg"
                        />
                      </div>
                      <Progress percent={60} steps={10} />

                      <div className="first-row__left___profile___reward____label">
                        <span>{t("pages.player.seasonRewardLevel")}</span>
                        <span>6/10</span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col
                  style={{ height: "100px" }}
                  span={14}
                  className="first-row__right"
                >
                  <div>
                    <span>{t("pages.player.mini.wins")}</span>
                    <div>
                      <CountUp
                        separator=","
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
                  <div>
                    <span>{t("pages.player.mini.saves")}</span>

                    <div>
                      <CountUp
                        separator=","
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
                  <div>
                    <span>{t("pages.player.mini.assists")}</span>
                    <div>
                      <CountUp
                        separator=","
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
                  <div>
                    <span>{t("pages.player.mini.mvps")}</span>

                    <div>
                      <CountUp
                        separator=","
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
                  <div>
                    <span>{t("pages.player.mini.shots")}</span>
                    <div>
                      <CountUp
                        separator=","
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
                  <span>2000</span>
                </Col>
                <Col span={4} className="second-row__block">
                  {t("pages.player.mini.goalShot")} <span>68%</span>
                </Col>
                <Col span={4} className="second-row__block">
                  {t("pages.player.mini.favoriteMode")} <span>2v2</span>
                </Col>
                <Col span={4} className="second-row__block">
                  {t("pages.player.mini.worldPlace")} <span>~ 39040</span>
                </Col>
                <Col span={4} className="second-row__block">
                  {t("pages.player.mini.hoursPlayed")}
                  <span>6.9k</span>
                </Col>
              </Row>

              <Row className="third-row">
                <Col span={10} className="third-row__left">
                  <div className="third-row__left__title">
                    {t("pages.player.ratingProgression")}
                  </div>

                  <div className="third-row__left__block ratingprogressiongraphs">
                    <RatingProgressionGraphs />
                  </div>
                  <div className="third-row__left__title">
                    {t("pages.player.moreStats")}
                  </div>

                  <div className="third-row__left__block piesavesshots">
                    <PieSavesShotsAsissts
                      data={[
                        player.segments[0].stats.shots.value,
                        player.segments[0].stats.saves.value,
                        player.segments[0].stats.assists.value,
                      ]}
                    />
                    <PieMatches
                      data={[
                        player.segments[0].stats.shots.value,
                        player.segments[0].stats.saves.value,
                        player.segments[0].stats.assists.value,
                        player.segments[0].stats.saves.value,
                        player.segments[0].stats.assists.value,
                      ]}
                    />
                  </div>

                  <div className="third-row__left__title">
                    {t("pages.player.inGameTitles")}
                  </div>

                  <div className="third-row__left__block"></div>
                </Col>
                <Col span={14} className="third-row__right">
                  <div className="third-row__right__title">
                    {t("pages.player.competetive")}
                  </div>

                  <div className="third-row__right__rank">
                    <RankRow data={player.segments[2]} />
                  </div>
                  <div className="third-row__right__rank">
                    <RankRow data={player.segments[3]} />
                  </div>
                  <div className="third-row__right__rank">
                    <RankRow data={player.segments[4]} />
                  </div>
                  <div className="third-row__right__rank">
                    <RankRow data={player.segments[9]} />
                  </div>

                  <div className="third-row__right__title">
                    {t("pages.player.extraMods")}
                  </div>
                  <div className="third-row__right__rank">
                    <RankRow data={player.segments[5]} />
                  </div>
                  <div className="third-row__right__rank">
                    <RankRow data={player.segments[6]} />
                  </div>
                  <div className="third-row__right__rank">
                    <RankRow data={player.segments[7]} />
                  </div>
                  <div className="third-row__right__rank">
                    <RankRow data={player.segments[8]} />
                  </div>

                  <div className="third-row__right__title">
                    {t("pages.player.playlists.Un-Ranked")}
                  </div>

                  <div className="third-row__right__rank">
                    <RankRow data={player.segments[1]} />
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

export default translate(PlayerPage);
