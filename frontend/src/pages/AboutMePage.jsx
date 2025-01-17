import React from "react";
import { getAboutMe } from "./../api/all/articles";

const renderSocialList = (list) => {
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
class AboutMePage extends React.Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const result = await getAboutMe().then(({ data }) => {
      return data;
    });
    this.setState({
      data: result,
    });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="content">
        <h1>About Me </h1>
        <div className="aboutmepage">
          <div className="aboutmepage-nickname">Matador</div>
          <div className="aboutmepage-text">{data.aboutMe}</div>
          <div className="aboutmepage-socials">
            {renderSocialList(data.socialList)}
          </div>
        </div>
      </div>
    );
  }
}

export default AboutMePage;
