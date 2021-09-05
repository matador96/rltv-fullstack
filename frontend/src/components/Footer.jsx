import React from "react";
import {
  MailOutlined,
  InfoCircleOutlined,
  BugOutlined,
  DollarCircleOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { translate } from "react-switch-lang";
import { Menu } from "antd";
import { withRouter } from "react-router";

const componentRoutes = [
  "/bugreport",
  "/aboutme",
  "/donate",
  "/aboutme",
  "/roadmap",
];
class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  componentDidMount() {
    const url = window.location.pathname;

    if (componentRoutes.includes(url)) {
      this.setState({
        current: url.replace("/", ""),
      });
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

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  render() {
    const { t } = this.props;
    const { current } = this.state;
    return (
      <div className="footer">
        <div className="footer-text">
          {t("footer.text1")}
          <b style={{ marginLeft: "5px" }}>
            {t("footer.text2")} l use api of rocketleague.tracker.network (TRN).
          </b>
          <div className="copyright">
            {t("footer.developed")}.
            <a
              href="mailto:atubrah@mail.ru"
              title="Mail Matador"
              target="_blank"
              rel="noreferrer"
            >
              <MailOutlined /> {t("other.words.contactMe")}
            </a>
            <a
              href="https://discord.gg/2cQTcA2eVy"
              title="Discord Channel"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#fff" }}
            >
              Discord Channel RLTV
            </a>
          </div>
        </div>
        <div className="footer-menu">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item key="bugreport">
              <Link to="/bugreport">
                <BugOutlined />
                Bug report
              </Link>
            </Menu.Item>
            <Menu.Item key="roadmap">
              <Link to="/roadmap">
                <CompassOutlined />
                Roadmap
              </Link>
            </Menu.Item>
            <Menu.Item key="donate">
              <Link to="/donate">
                <DollarCircleOutlined />
                Donate
              </Link>
            </Menu.Item>

            <Menu.Item key="aboutme">
              <Link to="/aboutme">
                <InfoCircleOutlined /> {t("other.words.aboutMe")}
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default withRouter(translate(Footer));
