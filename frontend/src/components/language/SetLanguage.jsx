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

// {t("home.title")}
// {t("home.title", null, "ru")}
// {t("hello", { name: "World" })}
// {t("fallback")}

const languages = ["en", "ru"];

setTranslations({ en, ru });
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
