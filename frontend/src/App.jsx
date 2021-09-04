import React from "react";
import "./view/style.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import CookieRule from "./components/CookieRule";
import { getSiteConfigs } from "./api/all/other";
import Closed from "./components/Closed";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: "brown",
      configs: null,
    };

    window.App = this;
  }

  async componentDidMount() {
    const configs = await getSiteConfigs().then(({ data }) => {
      return data;
    });
    this.setState({
      configs,
    });
  }

  changeTheme(theme) {
    this.setState({
      currentTheme: theme,
    });
  }

  isSiteClosed() {
    const { configs } = this.state;
    if (!configs) {
      return false;
    }
    if (configs.siteStatus?.closed) {
      return true;
    }
  }

  render() {
    const { currentTheme, configs } = this.state;

    if (configs === null) {
      return <></>;
    }

    if (this.isSiteClosed()) {
      return (
        <Closed
          title={configs.siteStatus.title}
          subTitle={configs.siteStatus.text}
        />
      );
    }

    return (
      <div className={"app " + currentTheme}>
        <Navbar />
        <div className="content">{this.props.children}</div>
        <AboutUs />
        <Footer />
        <CookieRule />
      </div>
    );
  }
}

export default App;
