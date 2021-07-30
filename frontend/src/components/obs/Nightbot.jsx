import React, { useState } from "react";

import { Layout, Checkbox, Select, Row, Col, Input, Button } from "antd";

const { Option } = Select;
const checkboxes = [
  {
    name: "1s",
    key: 1,
    label: "Solo 1v1",
  },
  {
    name: "2s",
    key: 2,
    label: "Doubles 2v2",
  },
  {
    name: "tournament",
    key: 3,
    label: "Tournament",
  },
  {
    name: "3s",
    key: 4,
    label: "Standard 3v3",
  },
  {
    name: "hp",
    key: 5,
    label: "Hoops",
  },
  {
    name: "sy",
    key: 6,
    label: "Snowday",
  },
  {
    name: "rb",
    key: 7,
    label: "Rumble",
  },
  {
    name: "dp",
    key: 8,
    label: "Dropshot",
  },
  {
    name: "un",
    key: 9,
    label: "Unranked",
  },
];
function Nightbot() {
  const [data, setData] = useState({
    status: 0,
    message: "",
  });

  const [checkedItems, setCheckedItems] = useState({ "1s": false });
  const [id, setId] = useState("");
  const [platform, setPlatform] = useState("s");
  const [url, setUrl] = useState("s");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setData({
      status: 0,
      message: "",
    });

    const array_playstyles = [];
    for (const [key, value] of Object.entries(checkedItems)) {
      if (value) {
        array_playstyles.push(`${key}`);
      }
    }

    const playstyles =
      array_playstyles.length !== 0 ? array_playstyles.toString() : "all";

    const geturl =
      "http://localhost:3002/loadrank/" +
      platform +
      "/" +
      id +
      "/" +
      playstyles;

    // axios
    //   .get(geturl + "/1")
    //   .then(function (response) {
    //     setData(response.data);
    //     setUrl(geturl);
    //     setLoading(false);
    //   })
    //   .catch(function (error) {
    //     if (error) {
    //       setData({
    //         status: 0,
    //         message: "An error occurred and the api is not responding." + error,
    //       });
    //     }
    //   });
  };

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeSelect = (value) => {
    setPlatform(value);
  };

  return (
    <>
      <Row className="nightbot">
        <Col xs={12}>
          <div className="title-a" style={{ textAlign: "center" }}>
            Generate Chat Command
          </div>
          <Row className="first-row">
            <Col xs={8}>
              <Select
                defaultValue="steam"
                style={{ width: 160 }}
                value={platform}
                onChange={handleChangeSelect}
                size="large"
              >
                <Option value="s">Steam</Option>
                <Option value="p">Playstation</Option>
                <Option value="x">Xbox</Option>
                <Option value="e">Epic Games</Option>
                <Option value="n">Nintendo</Option>
              </Select>
            </Col>
            <Col xs={16}>
              <Input
                placeholder={platform === "s" ? "STEAM ID" : "ID"}
                value={id}
                onChange={(e) => setId(e.target.value)}
                size="large"
              />
            </Col>
          </Row>

          <Row>
            <Col xs={16}>
              <div className="title-c">Playlists</div>
            </Col>
          </Row>
          <Row className="playlist-checkbox">
            <Col span={24}>
              {checkboxes.map((item) => (
                <Checkbox
                  name={item.name}
                  key={item.key}
                  checked={checkedItems[item.name]}
                  onChange={handleChange}
                >
                  {item.label}
                </Checkbox>
              ))}
            </Col>
          </Row>

          {data.status === 0 && (
            <div className="command-list">
              <Row>
                <Col xs={24}>
                  <div className="title-c">Nightbot command</div>
                  <Input
                    placeholder="Nightbot command"
                    value={"!addcom !rank $(urlfetch " + url + "/0)"}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={24}>
                  <div className="title-c">StreamElements command</div>
                  <Input
                    placeholder="StreamElements command"
                    value={"!command add !rank $(urlfetch " + url + "/0)"}
                  />
                </Col>{" "}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Nightbot;
