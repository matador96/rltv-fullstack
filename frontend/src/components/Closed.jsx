/* eslint-disable quotes */
import React from "react";
import { Result } from "antd";

const Closed = (props) => (
  <div className="closedpage">
    <Result status="500" title={props.title} subTitle={props.subTitle} />
    <div className="closedpage_socials"></div>
  </div>
);

export default Closed;
