import { Menu, Dropdown } from "antd";
import React from "react";
import {
  FundProjectionScreenOutlined,
  HomeOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const langmenu = (
  <Menu>
    <Menu.Item key="1">EN</Menu.Item>
    <Menu.Item key="2">RU</Menu.Item>
  </Menu>
);

class Navbar extends React.Component {
  state = {
    current: "home",
  };

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <div className="navbar">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="leader" icon={<ProjectOutlined />}>
            <Link to="/leaderboards">Leaderboards</Link>
          </Menu.Item>
          <Menu.Item key="favorites" icon={<HeartOutlined />}>
            <Link to="/favorites">Favorites</Link>
          </Menu.Item>
        </Menu>

        <div className="navbar_logo">
          <span>RL</span>
          <span>TV</span>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          {/*<Menu.Item key="distribution" icon={<UnorderedListOutlined />}>
            Distribution
          </Menu.Item>*/}
          <Menu.Item key="overlay" icon={<FundProjectionScreenOutlined />}>
            <Link to="/obs">OBS overlay</Link>
          </Menu.Item>
          <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
            <Link to="/help">Help</Link>
          </Menu.Item>
        </Menu>

        {/*<div className="navbar_lang">
          <Dropdown overlay={langmenu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              key="ok"
            >
              EN <DownOutlined />
            </a>
          </Dropdown>
    </div>*/}
      </div>
    );
  }
}

export default Navbar;
