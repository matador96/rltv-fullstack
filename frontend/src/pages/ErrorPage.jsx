import React from "react";
import { Button } from "antd";

const getMainPage = (props) => {
  const { history } = props;
  if (history) {
    history.push("/");
  }
};

const ErrorPage = (props) => (
  <div className="content errorpage">
    404 error
    <div>This page doesn't exist.</div>
    <Button type="primary" onClick={() => getMainPage(props)}>
      To main
    </Button>
  </div>
);

export default ErrorPage;
