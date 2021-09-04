import React from "react";
import { Steps } from "antd";
import { getRoadmap } from "../api/all/articles";

const { Step } = Steps;

class RoadMap extends React.Component {
  state = {
    roadmapList: [],
    roadmapText: "",
    currentStage: 0,
  };

  async componentDidMount() {
    const result = await getRoadmap().then(({ data }) => {
      return data;
    });
    this.setState({
      roadmapList: result.roadmapList,
      roadmapText: result.roadmapText,
    });

    for (let index = 0; index < result.roadmapList.length; index++) {
      const element = result.roadmapList[index];
      if (element.current) {
        this.setState({
          currentStage: index,
        });
        break;
      }
    }
  }

  render() {
    const { roadmapList, roadmapText, currentStage } = this.state;
    return (
      <div className="roadmap">
        {roadmapText}
        <Steps progressDot current={currentStage} direction="vertical">
          {roadmapList.map((item) => (
            <Step key={item.title} title={item.title} description={item.text} />
          ))}
        </Steps>
      </div>
    );
  }
}

export default RoadMap;
