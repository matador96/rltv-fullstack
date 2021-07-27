import React, { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const CookieRule = () => {
  const [show, setShow] = useState(true);

  const toggle = () => {
    setShow(!show);
    localStorage.setItem("cookierulebro", 1);
  };
  const cookiesogl = localStorage.getItem("cookierulebro");
  return (
    <>
      {cookiesogl == null && show && (
        <div className="site-cookie">
          <div className="site-cookie-block">
            <div>
              We use cookies on our website to save searched players history,
              and for page Favorites. By clicking “Accept”, you consent to the
              use of ALL the cookies.
            </div>
            <Button type="primary" onClick={toggle}>
              Accept
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieRule;
