import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  setTranslations,
  setDefaultLanguage,
  setLanguage,
  translate,
} from "react-switch-lang";
import en from "./en.json";
import ru from "./ru.json";
import tr from "./tr.json";
import it from "./it.json";

// Examples
// {t("home.title")}
// {t("home.title", null, "ru")}
// {t("hello", { name: "World" })}
// {t("fallback")}

const languages = ["en", "ru", "tr", "it"];

setTranslations({ en, ru, tr, it });
setDefaultLanguage("en");

class SomeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLang: "en",
    };
  }

  handleSetLanguage = (key) => () => {
    setLanguage(key);
    localStorage.setItem("lang", key);
    this.setState({
      currentLang: key,
    });
  };

  async componentDidMount() {
    const localLanguage = await localStorage.getItem("lang");

    if (!localLanguage) {
      return;
    }

    if (languages.includes(localLanguage)) {
      setLanguage(localLanguage);
      this.setState({
        currentLang: localLanguage,
      });
    }
  }

  render() {
    const langmenu = (
      <Menu>
        <Menu.Item
          key="eng"
          className={this.state.currentLang === "en" && "dropdown-lang-active"}
          onClick={this.handleSetLanguage("en")}
        >
          EN
        </Menu.Item>
        <Menu.Item
          key="ru"
          onClick={this.handleSetLanguage("ru")}
          className={this.state.currentLang === "ru" && "dropdown-lang-active"}
        >
          RU
        </Menu.Item>
        <Menu.Item
          key="tr"
          onClick={this.handleSetLanguage("tr")}
          className={this.state.currentLang === "tr" && "dropdown-lang-active"}
        >
          TR
        </Menu.Item>
        <Menu.Item
          key="it"
          onClick={this.handleSetLanguage("it")}
          className={this.state.currentLang === "it" && "dropdown-lang-active"}
        >
          IT
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown
        overlay={langmenu}
        className="dropdown-lang"
        trigger={["click"]}
      >
        <span>
          {this.state.currentLang} <DownOutlined />
        </span>
      </Dropdown>
    );
  }
}

SomeComponent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate(SomeComponent);
