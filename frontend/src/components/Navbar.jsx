import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Badge } from "antd";
import { translate } from "react-switch-lang";
import {
  FundProjectionScreenOutlined,
  HomeOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SetLanguage from "./language/SetLanguage";
import { withRouter } from "react-router";

const componentRoutes = ["/", "/leaderboards", "/favorites", "/help"];

class Navbar extends React.Component {
  state = {
    current: "home",
  };

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  handleClickMenu = (e) => {
    console.log(e.key);
    this.props.history.push(e);
  };

  componentDidMount() {
    const url = window.location.pathname;
    console.log(url);
    if (componentRoutes.includes(url)) {
      this.setState({
        current: url === "/" ? "main" : url.replace("/", ""),
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    const url = this.props.location?.pathname;
    if (url) {
      if (!componentRoutes.includes(url)) {
        this.setState({
          current: "",
        });
      }
    }
  }

  render() {
    const { current } = this.state;
    const { t } = this.props;
    return (
      <div className="navbar">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item
            key="main"
            icon={<HomeOutlined />}
            onClick={() => this.handleClickMenu("/")}
          >
            <Link to="/">{t("menu.main")}</Link>
          </Menu.Item>
          <Menu.Item
            key="leaderboards"
            icon={<ProjectOutlined />}
            onClick={() => this.handleClickMenu("/leaderboards")}
          >
            <Link to="/leaderboards">{t("menu.leaderboards")}</Link>
          </Menu.Item>
          <Menu.Item
            key="favorites"
            icon={<HeartOutlined />}
            onClick={() => this.handleClickMenu("/favorites")}
          >
            <Badge count={10}>
              <Link to="/favorites">{t("menu.favorites")}</Link>
            </Badge>
          </Menu.Item>
        </Menu>

        <div className="navbar_logo">
          RLTV
          <span>.TOP</span>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          className="right-menu"
        >
          {/*<Menu.Item key="distribution" icon={<UnorderedListOutlined />}>
            Distribution
          </Menu.Item>
          <Menu.Item key="overlay" icon={<FundProjectionScreenOutlined />}>
            <Link to="/obs">{t("menu.obs")}</Link>
          </Menu.Item>*/}
          <Menu.Item
            key="help"
            icon={<QuestionCircleOutlined />}
            onClick={() => this.handleClickMenu("/help")}
          >
            <Link to="/help">{t("menu.help")}</Link>
          </Menu.Item>
        </Menu>

        <div className="navbar_lang">
          <SetLanguage />
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withRouter(translate(Navbar));
