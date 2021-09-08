import React, { useState } from "react";
import { Row, Col, Input } from "antd";
import {
  FieldTimeOutlined,
  TeamOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import CountUp from "react-countup";
import EpicIcon from "../components/icons/EpicIcon";
import NintendoIcon from "../components/icons/NintendoIcon";
import PlaystationIcon from "../components/icons/PlaystationIcon";
import SteamIcon from "../components/icons/SteamIcon";
import XboxIcon from "../components/icons/XboxIcon";
import Fade from "react-reveal/Fade";
import HistoryChecking from "../components/HistoryChecking";
import { translate } from "react-switch-lang";
import { withRouter } from "react-router";
import { getPlayerSteamName } from "../api/all/player";
import openNotification from "../components/Notification";
import {
  getLastHourOnline,
  getSeason,
  getLeftDaysEndSeason,
} from "../helpers/other";
import LastSearcheds from "../components/LastSearcheds";

const Main = (props) => {
  const [platform, setPlatform] = useState("steam");
  const [text, setText] = useState("");
  const [exit, setExit] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Enter steamId, custom id or url"
  );

  function isChecked(platformCheck) {
    if (platformCheck === platform) {
      return true;
    }
    return false;
  }

  async function handleClick() {
    if (text.length === 0) {
      openNotification("error", "Error", "Pls enter gamid");
      return;
    }

    setExit(true);

    let steamName;

    if (text.search(/steamcommunity.com/) !== -1) {
      steamName = await getPlayerSteamName(text).then(({ data }) => {
        if (!data) {
          steamName = null;
        }

        return data;
      });
    }

    if (steamName === null) {
      openNotification("error", "SteamId Error", "Такого аккаунта нет");
      return;
    }

    let url;

    if (steamName) {
      url = "/player/" + platform + "/" + steamName;
    } else {
      url = "/player/" + platform + "/" + text;
    }

    setTimeout(() => {
      props.history.push(url);
    }, 600);
  }

  const { t } = props;

  const days = getLeftDaysEndSeason();

  return (
    <div className={exit ? "content mainpage exit" : "content mainpage"}>
      <Row style={{ justifyContent: "center" }}>
        <Col span={15}>
          <div className="mainpage_left">
            <div className="mainpage_left__text">
              {t("pages.main.title")}
              <span>{t("pages.main.subtitle")}</span>
            </div>

            <div className="chooser">
              <div className="choose-platform">
                <div
                  className={isChecked("steam") ? "active" : ""}
                  onClick={() => {
                    setPlatform("steam");
                    setPlaceholder("Enter Steam name, ID or url");
                  }}
                >
                  <SteamIcon />
                </div>
                <div
                  className={isChecked("epic") ? "active" : ""}
                  onClick={() => {
                    setPlatform("epic");
                    setPlaceholder("Enter Epic Games Username");
                  }}
                >
                  <EpicIcon />
                </div>
                <div
                  className={isChecked("psn") ? "active" : ""}
                  onClick={() => {
                    setPlatform("psn");
                    setPlaceholder("Enter Playstation Network Username");
                  }}
                >
                  <PlaystationIcon />
                </div>
                <div
                  className={isChecked("xbl") ? "active" : ""}
                  onClick={() => {
                    setPlatform("xbl");
                    setPlaceholder("Enter Xbox Live Username");
                  }}
                >
                  <XboxIcon />
                </div>
                <div
                  className={isChecked("switch") ? "active" : ""}
                  onClick={() => {
                    setPlatform("switch");
                    setPlaceholder("Enter Nintendo Switch Username");
                  }}
                >
                  <NintendoIcon />
                </div>
              </div>

              <Input
                size="large"
                placeholder={placeholder}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onPressEnter={() => handleClick()}
              />

              <div className="enter-search" onClick={() => handleClick()}>
                <EnterOutlined />
              </div>
            </div>

            <div className="mainpage_left__stats">
              <Fade delay={100}>
                <div className="mainpage_left__stats___seasonend">
                  <FieldTimeOutlined />
                  <div>
                    {t("other.words.season")} {getSeason()}
                    <span>
                      {t("other.words.endsIn")}:{" "}
                      <span>
                        {t("other.words.leftDays", {
                          days,
                        })}
                      </span>
                    </span>
                  </div>
                </div>
              </Fade>
              <Fade delay={100}>
                <div className="mainpage_left__stats___playeronline">
                  <TeamOutlined />
                  <div>
                    {t("other.words.lastHour")}
                    <span>
                      {t("other.words.playersOnline")}:{" "}
                      <CountUp separator="," end={getLastHourOnline()} />
                    </span>
                  </div>
                </div>
              </Fade>
              {/*} <Fade delay="100">
                <div className="mainpage_left__stats___playeronline">
                <ReconciliationOutlined />
                  <div>
                    All time
                    <span>
                      Checked rank:
                      <span> {getTrackedPlayers()}</span>
                    </span>
                  </div>
                </div>
                      </Fade>*/}
            </div>
            <div className="history-list">
              <div>
                <HistoryChecking />
              </div>
              <div>
                <LastSearcheds />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(translate(Main));
