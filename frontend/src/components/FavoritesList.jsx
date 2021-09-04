import React from "react";
// import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
// import {
//   getIconComponentPlatfrom,
//   getPlatformAvatar,
// } from "./../helpers/other";
import { translate } from "react-switch-lang";
import { cleanFavorites, getFavorites } from "../cookie/store";
import { Button, Popconfirm } from "antd";
import {
  SyncOutlined,
  DeleteOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import FavoritesTables from "./FavoritesTable";

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesList: null,
      deleteOn: false,
    };
  }

  async componentDidMount() {
    const items = await getFavorites();

    if (items !== null && Object.keys(items).length > 0) {
      this.setState({
        favoritesList: items,
      });
    }
  }

  // renderFavoritesList() {
  //   const { favoritesList } = this.state;
  //   const { t } = this.props;

  //   const renderList = [];
  //   //player.averageMmr.toLocaleString()
  //   for (let key in favoritesList) {
  //     let gameId = key;
  //     let player = favoritesList[gameId];

  //     if (!player.avatar) {
  //       player.avatar = getPlatformAvatar(player.platform);
  //     }

  //     renderList.push(
  //       <Link
  //         to={"/player/" + player.platform + "/" + gameId}
  //         className="historycheck_block"
  //       >
  //         <div className="historycheck_block-left">
  //           <img alt={player.nickname} src={player.avatar} />
  //           <div className="nickname">
  //             {player.nickname}
  //             <span>{t("other.words.viewStats")}</span>
  //           </div>
  //         </div>

  //         <div className="historycheck_block-platform">
  //           {getIconComponentPlatfrom(player.platform)}
  //         </div>
  //         <div className="historycheck_block-mmr">
  //           {t("other.words.rating")}
  //           <span>4800</span>
  //         </div>
  //       </Link>
  //     );
  //   }

  //   return renderList.reverse();
  // }
  async cleanList() {
    await cleanFavorites();
    this.setState({
      favoritesList: null,
    });
    window.Navbar.updateFavCount();
  }
  render() {
    const { favoritesList, deleteOn } = this.state;
    if (!favoritesList) {
      return (
        <div className="can-add-favoritelist">
          You can add players to favorite list.
        </div>
      );
    }

    // const { t } = this.props;
    const text = "Are you sure to clean list?";

    return (
      <Fade>
        <div className="favorites-list">
          <div className="playerpage-buttons">
            <Button type="link" icon={<SyncOutlined />} size="small">
              UPDATE RANKS
            </Button>

            <Button
              type="link"
              icon={<UserDeleteOutlined />}
              size="small"
              className={deleteOn ? "active" : ""}
              onClick={() =>
                this.setState({
                  deleteOn: !deleteOn,
                })
              }
            >
              Delete player
            </Button>

            <Popconfirm
              placement="bottomRight"
              title={text}
              onConfirm={() => this.cleanList()}
              okText="Yes"
              cancelText="No"
              className="rltv-pop"
            >
              <Button type="link" icon={<DeleteOutlined />} size="small">
                CLEAN LIST
              </Button>
            </Popconfirm>
          </div>

          <FavoritesTables deleteMode={deleteOn} />
        </div>
      </Fade>
    );
  }
}

export default translate(FavoritesList);
