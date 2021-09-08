import React from "react";
import "./view/style.scss";
import "./view/responsive.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieRule from "./components/CookieRule";
import { getSiteConfigs } from "./api/all/other";
import Closed from "./components/Closed";
import AlertOnHeader from "./components/AlertOnHeader";

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
      <div className="main">
        <div className={"app " + currentTheme}>
          <Navbar />
          <div className="content">
            <AlertOnHeader />
            {this.props.children}
          </div>
          <Footer />
          <CookieRule />
        </div>
      </div>
    );
  }
}

export default App;
