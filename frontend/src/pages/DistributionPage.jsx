import React from "react";
import DistributionRanks from "../components/DistributionRanks";
import Fade from "react-reveal/Fade";
import { translate } from "react-switch-lang";

const DistributionPage = ({ t }) => (
  <div className="distributionpage">
    <h1 style={{ paddingBottom: 0 }}>{t("pages.distribution.title")}</h1>
    <Fade>
      <DistributionRanks />
    </Fade>
  </div>
);

export default translate(DistributionPage);
