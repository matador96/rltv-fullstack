import React from "react";
import DistributionRanks from "../components/DistributionRanks";
import Fade from "react-reveal/Fade";

const DistributionPage = (props) => (
  <div className="content distributionpage">
    <h1 style={{ paddingBottom: 0 }}>Rating Distribution</h1>
    <Fade>
      <DistributionRanks />
    </Fade>
  </div>
);

export default DistributionPage;
