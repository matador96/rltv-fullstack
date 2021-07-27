import React from "react";
import { Row, Col, Progress, Tooltip } from "antd";
import player from "./../data/player";
import PieSavesShotsAsissts from "../components/player/PieSavesShotsAsissts";
import RankRow from "../components/player/RankRow";
import CountUp from "react-countup";
import RatingProgressionGraphs from "../components/player/RatingProgressionGraphs";
import PieMatches from './../components/player/PieMatches'

class PlayerPage extends React.Component {
  render() {
    return (
      <div className="content playerpage">
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
                  <span>Season Reward level</span>
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
              <span>Wins</span>
              <div>
                <CountUp
                  separator=","
                  end={player.data.segments[0].stats.wins.value}
                />
              </div>
              <Tooltip placement="rightBottom" title={"Place in the world"}>
                <i>#{player.data.segments[0].stats.wins.rank}</i>
              </Tooltip>
            </div>
            <div>
              <span>Saves</span>

              <div>
                <CountUp
                  separator=","
                  end={player.data.segments[0].stats.saves.value}
                />
              </div>

              <Tooltip placement="rightBottom" title={"Place in the world"}>
                <i>#{player.data.segments[0].stats.saves.rank}</i>
              </Tooltip>
            </div>
            <div>
              <span>Assists</span>
              <div>
                <CountUp
                  separator=","
                  end={player.data.segments[0].stats.assists.value}
                />
              </div>
              <Tooltip placement="rightBottom" title={"Place in the world"}>
                <i>#{player.data.segments[0].stats.assists.rank}</i>
              </Tooltip>
            </div>
            <div>
              <span>MVPs</span>

              <div>
                <CountUp
                  separator=","
                  end={player.data.segments[0].stats.mVPs.value}
                />
              </div>

              <Tooltip placement="rightBottom" title={"Place in the world"}>
                <i>#{player.data.segments[0].stats.mVPs.rank}</i>
              </Tooltip>
            </div>
            <div>
              <span>Shots</span>

              <div>
                <CountUp
                  separator=","
                  end={player.data.segments[0].stats.shots.value}
                />
              </div>
              <Tooltip placement="rightBottom" title={"Place in the world"}>
                <i>#{player.data.segments[0].stats.shots.rank}</i>
              </Tooltip>
            </div>
          </Col>
        </Row>
        <Row className="second-row">
          <Col span={4} className="second-row__block">
            Season matches <span>2000</span>
          </Col>
          <Col span={4} className="second-row__block">
            Goal/Shot <span>68%</span>
          </Col>
          <Col span={4} className="second-row__block">
            Favorite Mode <span>2v2</span>
          </Col>
          <Col span={4} className="second-row__block">
            World Place <span>39040</span>
          </Col>
          <Col span={4} className="second-row__block">
            Hours <span>6.9k</span>
          </Col>
        </Row>

        <Row className="third-row">
          <Col span={10} className="third-row__left">
            <div className="third-row__left__title">Rating Progression</div>

            <div className="third-row__left__block ratingprogressiongraphs">
              <RatingProgressionGraphs />
            </div>
            <div className="third-row__left__title">Stats</div>

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

            <div className="third-row__left__title">Ingame Titles</div>

            <div className="third-row__left__block"></div>
          </Col>
          <Col span={14} className="third-row__right">
            <div className="third-row__right__title">Competetive</div>

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

            <div className="third-row__right__title">Extra Mods</div>
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

            <div className="third-row__right__title">Unranked</div>

            <div className="third-row__right__rank">
              <RankRow data={player.data.segments[1]} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PlayerPage;
