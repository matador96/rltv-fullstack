import React from "react";
import { getDonateList } from "./../api/all/articles";

const renderDonateList = (list) => {
  let arr = [];

  for (let key in list) {
    let element = list[key];

    let isUrl = false;

    if (element.url) {
      isUrl = true;
    }

    arr.push(
      <div key={element.url}>
        <span>{element.name}</span>
        {isUrl ? (
          <a href={element.url} alt={element.name}>
            {element.text}
          </a>
        ) : (
          <span>{element.text}</span>
        )}
      </div>
    );
  }

  return arr;
};
class DonatePage extends React.Component {
  state = {
    donateText: "",
    donateList: [],
  };

  async componentDidMount() {
    const result = await getDonateList().then(({ data }) => {
      return data;
    });
    this.setState({
      donateText: result.donateText,
      donateList: result.donateList,
    });
  }

  render() {
    const { donateText, donateList } = this.state;

    return (
      <div className="content">
        <h1>Donate</h1>
        <div className="aboutmepage donatepage">
          <div className="aboutmepage-text">{donateText}</div>
          <div className="aboutmepage-socials">
            {renderDonateList(donateList)}
          </div>
        </div>
      </div>
    );
  }
}

export default DonatePage;
