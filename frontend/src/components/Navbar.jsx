import React from "react";
import PropTypes from "prop-types";
import { Menu, Badge } from "antd";
import { translate } from "react-switch-lang";
import {
  SearchOutlined,
  HeartOutlined,
  MenuOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SetLanguage from "./language/SetLanguage";
import { withRouter } from "react-router";
import { getFavorites } from "../cookie/store";
import SetTheme from "./SetTheme";

const componentRoutes = ["/", "/leaderboards", "/favorites", "/distribution"];

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "home",
      favCount: null,
    };

    window.Navbar = this;
  }

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  handleClickMenu = (e) => {
    this.props.history.push(e);
  };

  async updateFavCount() {
    const favList = await getFavorites();

    this.setState({
      favCount: favList ? Object.keys(favList).length : 0,
    });
  }

  async componentDidMount() {
    const url = window.location.pathname;

    const favList = await getFavorites();
    if (favList && Object.keys(favList).length > 0) {
      this.setState({
        favCount: Object.keys(favList).length,
      });
    }

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
    const { current, favCount } = this.state;
    const { t } = this.props;
    return (
      <div className="navbar">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          overflowedIndicator={<MenuOutlined />}
          className="navbar-menu"
        >
          <Menu.Item
            key="main"
            icon={<SearchOutlined />}
            onClick={() => this.handleClickMenu("/")}
          >
            <Link to="/">{t("menu.search")}</Link>
          </Menu.Item>

          <Menu.Item
            key="favorites"
            icon={<HeartOutlined />}
            onClick={() => this.handleClickMenu("/favorites")}
          >
            {favCount ? (
              <Badge count={favCount}>
                <Link to="/favorites">{t("menu.favorites")}</Link>
              </Badge>
            ) : (
              <Link to="/favorites">{t("menu.favorites")}</Link>
            )}
          </Menu.Item>
          <Menu.Item
            key="distribution"
            icon={<BarChartOutlined />}
            onClick={() => this.handleClickMenu("/distribution")}
          >
            <Link to="/distribution">{t("menu.distribution")}</Link>
          </Menu.Item>
        </Menu>

        <Link className="navbar_logo" to="/">
          RANK
          <span>Rocketeers</span>
        </Link>

        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          className="right-menu"
        ></Menu>

        <div className="navbar_theme">
          <SetTheme />
        </div>

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

/* <Menu.Item
            key="leaderboards"
            icon={<ProjectOutlined />}
            onClick={() => this.handleClickMenu("/leaderboards")}
          >
            <Link to="/leaderboards">{t("menu.leaderboards")}</Link>
          </Menu.Item>
                    {/*
          <Menu.Item key="overlay" icon={<FundProjectionScreenOutlined />}>
            <Link to="/obs">{t("menu.obs")}</Link>
          </Menu.Item>
         <Menu.Item
            key="help"
            icon={<QuestionCircleOutlined />}
            onClick={() => this.handleClickMenu("/help")}
          >
            <Link to="/help">{t("menu.help")}</Link>
          </Menu.Item>
*/
