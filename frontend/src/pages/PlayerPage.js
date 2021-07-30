import React from "react";
import { Row, Col, Progress, Tooltip, Button } from "antd";
import player from "./../data/player";
import PieSavesShotsAsissts from "../components/player/PieSavesShotsAsissts";
import RankRow from "../components/player/RankRow";
import CountUp from "react-countup";
import RatingProgressionGraphs from "../components/player/RatingProgressionGraphs";
import PieMatches from './../components/player/PieMatches'
import { translate } from "react-switch-lang";
import {
  SyncOutlined,
  HeartOutlined,
  ShrinkOutlined
} from '@ant-design/icons';

class PlayerPage extends React.Component {

  state = {
    loadings: [],
  };

  enterLoading = index => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };

  render() {
    const { t } = this.props;
    const { loadings } = this.state;
    return (
      <div className="content playerpage">
        <div className="playerpage-buttons">

        <Button
          type="link"
          icon={<SyncOutlined />}
          loading={loadings[1]}
          size="small"
          onClick={() => this.enterLoading(1)}
        >
          {loadings[1] ? 'Updating': 'Update'}
        </Button>
        <Button

type="link"
          icon={<HeartOutlined />}
          loading={loadings[1]}
          size="small"
          onClick={() => this.enterLoading(1)}
        >
          {'Favorite'}
        </Button>

        <Button
      
      type="link"
          icon={<ShrinkOutlined />}
          loading={loadings[1]}
          size="small"
          onClick={() => this.enterLoading(1)}
        >
          Compare
        </Button>

        </div>
        <Row className="first-row">
          <Col
            style={{ height: "100px" }}
            span={10}
            className="first-row__left"
          >
            <img
              src={player.data.platformInfo.avatarUrl}
              alt={player.data.platformInfo.platformUserHandle}
              className="first-row__left___avatar"
            />
            <div className="first-row__left___profile">
              <div className="first-row__left___profile___nickname">
                {player.data.platformInfo.platformUserHandle}
              </div>
              <div className="first-row__left___profile___reward">
                <div className="first-row__left___profile___reward____title">
                  {
                    player.data.segments[0].stats.seasonRewardLevel.metadata
                      .rankName
                  }

                  <img
                    src={
                      player.data.segments[0].stats.seasonRewardLevel.metadata
                        .iconUrl
                    }
                    alt={
                      player.data.segments[0].stats.seasonRewardLevel.metadata
                        .rankName
                    }
                    className="first-row__left___profile___reward____rankimg"
                  />
                </div>
                <Progress percent={60} steps={10} />

                <div className="first-row__left___profile___reward____label">
                  <span>{t('pages.player.seasonRewardLevel')}</span>
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
              <span>{t('pages.player.mini.wins')}</span>
              <div>
                <CountUp
                  separator=","
                  end={player.data.segments[0].stats.wins.value}
                />
              </div>
              <Tooltip placement="rightBottom" title={t('pages.player.placeInTheWorld')}>
                <i>#{player.data.segments[0].stats.wins.rank}</i>
              </Tooltip>
            </div>
            <div>
            <span>{t('pages.player.mini.saves')}</span>

              <div>
                <CountUp
                  separator=","
                  end={player.data.segments[0].stats.saves.value}
                />
              </div>

              <Tooltip placement="rightBottom" title={t('pages.player.placeInTheWorld')}>
                <i>#{player.data.segments[0].stats.saves.rank}</i>
              </Tooltip>
            </div>
            <div>
            <span>{t('pages.player.mini.assists')}</span>
              <div>
                <CountUp
                  separator=","
                  end={player.data.segments[0].stats.assists.value}
                />
              </div>
              <Tooltip placement="rightBottom" title={t('pages.player.placeInTheWorld')}>
                <i>#{player.data.segments[0].stats.assists.rank}</i>
              </Tooltip>
            </div>
            <div>
            <span>{t('pages.player.mini.mvps')}</span>

              <div>
                <CountUp
                  separator=","
                  end={player.data.segments[0].stats.mVPs.value}
                />
              </div>

              <Tooltip placement="rightBottom" title={t('pages.player.placeInTheWorld')}>
                <i>#{player.data.segments[0].stats.mVPs.rank}</i>
              </Tooltip>
            </div>
            <div>
            <span>{t('pages.player.mini.shots')}</span>
              <div>
                <CountUp
                  separator=","
                  end={player.data.segments[0].stats.shots.value}
                />
              </div>
              <Tooltip placement="rightBottom" title={t('pages.player.placeInTheWorld')}>
                <i>#{player.data.segments[0].stats.shots.rank}</i>
              </Tooltip>
            </div>
          </Col>
        </Row>
        <Row className="second-row">
          <Col span={4} className="second-row__block">            
         {t('pages.player.mini.seasonMatches')}<span>2000</span>
          </Col>
          <Col span={4} className="second-row__block">
         {t('pages.player.mini.goalShot')} <span>68%</span>
          </Col>
          <Col span={4} className="second-row__block">
          {t('pages.player.mini.favoriteMode')} <span>2v2</span>
          </Col>
          <Col span={4} className="second-row__block">
          {t('pages.player.mini.worldPlace')} <span>~ 39040</span>
          </Col>
          <Col span={4} className="second-row__block">
          {t('pages.player.mini.hoursPlayed')}<span>6.9k</span>
          </Col>
        </Row>

        <Row className="third-row">
          <Col span={10} className="third-row__left">
            <div className="third-row__left__title">{t('pages.player.ratingProgression')}</div>

            <div className="third-row__left__block ratingprogressiongraphs">
              <RatingProgressionGraphs />
            </div>
            <div className="third-row__left__title">{t('pages.player.moreStats')}</div>

            <div className="third-row__left__block piesavesshots">
              <PieSavesShotsAsissts
                data={[
                  player.data.segments[0].stats.shots.value,
                  player.data.segments[0].stats.saves.value,
                  player.data.segments[0].stats.assists.value,
                ]}
              />
              <PieMatches
                data={[
                  player.data.segments[0].stats.shots.value,
                  player.data.segments[0].stats.saves.value,
                  player.data.segments[0].stats.assists.value,
                  player.data.segments[0].stats.saves.value,
                  player.data.segments[0].stats.assists.value,
                ]}
              />
            </div>

            <div className="third-row__left__title">{t('pages.player.inGameTitles')}</div>

            <div className="third-row__left__block"></div>
          </Col>
          <Col span={14} className="third-row__right">
            <div className="third-row__right__title">{t('pages.player.competetive')}</div>

            <div className="third-row__right__rank">
              <RankRow data={player.data.segments[2]} />
            </div>
            <div className="third-row__right__rank">
              <RankRow data={player.data.segments[3]} />
            </div>
            <div className="third-row__right__rank">
              <RankRow data={player.data.segments[4]} />
            </div>
            <div className="third-row__right__rank">
              <RankRow data={player.data.segments[9]} />
            </div>

            <div className="third-row__right__title">{t('pages.player.extraMods')}</div>
            <div className="third-row__right__rank">
              <RankRow data={player.data.segments[5]} />
            </div>
            <div className="third-row__right__rank">
              <RankRow data={player.data.segments[6]} />
            </div>
            <div className="third-row__right__rank">
              <RankRow data={player.data.segments[7]} />
            </div>
            <div className="third-row__right__rank">
              <RankRow data={player.data.segments[8]} />
            </div>

            <div className="third-row__right__title">{t('pages.player.playlists.Un-Ranked')}</div>

            <div className="third-row__right__rank">
              <RankRow data={player.data.segments[1]} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default translate(PlayerPage);
