import React from "react";
import Fade from "react-reveal/Fade";
import { Steps } from "antd";

const { Step } = Steps;

class RoadMap extends React.Component {
  render() {
    return (
      <Fade>
        <div className="roadmap">
          <div className="title-a border">
            Road-map of project (no specific order)
          </div>
          <Steps progressDot current={0} direction="vertical">
            <Step
              title="Developed"
              description="Project is runing. Waiting bugs"
            />
            <Step
              title="Fix bugs"
              description="And should be add news, more stats and obs overlay for streams."
            />
            <Step
              title="Update"
              description="Should be add some new functionality, like player compares, live tracker, themes."
            />
            <Step
              title="Update"
              description="Adding player reputations, integrations with twitch, youtube."
            />
            <Step
              title="Fix bugs, waiting some comunity ideas"
              description="If you give good idea, l can try make :)"
            />
            <Step
              title="Update"
              description="Create team pages, and ranking system like hltv."
            />
            <Step title="Mobile app" description="IOS and Android" />
          </Steps>
        </div>
      </Fade>
    );
  }
}

export default RoadMap;
