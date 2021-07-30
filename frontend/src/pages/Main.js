import React, { useState } from "react";
import { Row, Col, Form, Select, Input, Radio, Tooltip } from "antd";
import { FieldTimeOutlined, TeamOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import EpicIcon from "../components/icons/EpicIcon";
import NintendoIcon from "../components/icons/NintendoIcon";
import PlaystationIcon from "../components/icons/PlaystationIcon";
import SteamIcon from "../components/icons/SteamIcon";
import XboxIcon from "../components/icons/XboxIcon";
import Fade from 'react-reveal/Fade';
import HistoryChecking from "../components/HistoryChecking";
import { translate } from "react-switch-lang";
const { Option } = Select;

//addonBefore={prefixSelector}
/*const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 200 }}>
      <Option value="epic">Epic Games</Option>
      <Option value="steam">Steam</Option>
      <Option value="xbox">Xbox Live</Option>
      <Option value="psn">Playstation Network</Option>
      <Option value="nintendo">Nintendo Switch</Option>
    </Select>
  </Form.Item>
);*/

const Main = (props) => {
  const [platform, setPlatform] = useState("steam");
  const [placeholder, setPlaceholder] = useState("Enter name, id or url");

  function isChecked(platformCheck) {
    if (platformCheck === platform) {
      return true;
    }
    return false;
  }
  const { t } = props;

  return (
    <div className="content mainpage">
      <Row style={{ justifyContent: "center" }}>
        <Col span={12}>
          <div className="mainpage_left">
            <div className="mainpage_left__text">
            {t("pages.main.title")}
              <span>
              {t("pages.main.subtitle")}</span>
            </div>

            <div className="chooser">
              <div className="choose-platform">
                <div
                  className={isChecked("steam") && "active"}
                  onClick={() => { setPlatform("steam"); setPlaceholder('Enter Steam name, ID or url'); }}
                ><SteamIcon /></div>
                <div
                  className={isChecked("epic") && "active"}
                  onClick={() => { setPlatform("epic"); setPlaceholder('Enter Epic Games Username'); }}
                >
                  <EpicIcon />
                </div>
                <div
                  className={isChecked("psn") && "active"}
                  onClick={() => { setPlatform("psn"); setPlaceholder('Enter Playstation Network Username'); }}
                >
                  <PlaystationIcon />
                </div>
                <div
                  className={isChecked("xbox") && "active"}
                  onClick={() => { setPlatform("xbox"); setPlaceholder('Enter Xbox Live Username'); }}
                >
                  <XboxIcon />
                </div>
                <div
                  className={isChecked("nintendo") && "active"}
                  onClick={() => { setPlatform("nintendo"); setPlaceholder('Enter Nintendo Switch Username'); }}
                >
                  <NintendoIcon />
                </div>
              </div>

              <Input size="large" placeholder={placeholder} />
            </div>


            <div className="mainpage_left__stats">
            <Fade delay="100">
              <div className="mainpage_left__stats___seasonend">
                <FieldTimeOutlined />
                <div>
                {t("other.words.season")}{" "}3
                  <span>
                  {t("other.words.endsIn")}:{" "}
                    <span>
                    {t("other.words.leftDays", { days: 14 })} 
                    </span>
                  </span>
                </div>      
              </div>
              </Fade>
              <Fade delay="100">
                <div className="mainpage_left__stats___playeronline">
                  <TeamOutlined />
                  <div>
                  {t("other.words.lastHour")} 
                    <span>
                    {t("other.words.playersOnline")}{" "}
                      <CountUp separator="," end={213989} />
                    </span>
                  </div>
                </div>
              </Fade>
            </div>

          <HistoryChecking/>

          </div>
        </Col>
      </Row>
    </div>
  );
};

export default translate(Main);
