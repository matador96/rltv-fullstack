import React from "react";
import { MailOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        2021 © Rocket League is a registered trademark of Psyonix. This is an
        unofficial site. I'm not affiliated with Psyonix. Psyonix owns
        everything Rocket League related. <br />
        <b>Psyonix contact me if u can give me access for API.</b>
        <div>
          Developed by Matador for Rocket League Comunity 🧡
          <div>
            <a
              href="mailto:atubrah@mail.ru"
              title="Mail Matador"
              target="_blank"
            >
              <MailOutlined /> Contact me
            </a>

            <Link to="/aboutme">
              <InfoCircleOutlined /> About me
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
