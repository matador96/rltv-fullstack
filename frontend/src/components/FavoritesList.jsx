import React from "react";
import Fade from "react-reveal/Fade";
import { translate } from "react-switch-lang";
import { cleanFavorites, getFavorites, updateFavorite } from "../cookie/store";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined, UserDeleteOutlined } from "@ant-design/icons";
import FavoritesTables from "./FavoritesTable";
import { getPlayerRankObject } from "../helpers/player";

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesList: null,
      deleteOn: false,
      updatingList: false,
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

  async cleanList() {
    await cleanFavorites();
    this.setState({
      favoritesList: null,
    });
    window.Navbar.updateFavCount();
  }

  updateFav(platform, gameId, nickname, avatar, playerData) {
    const ranks = getPlayerRankObject(playerData);
    updateFavorite(platform, gameId, nickname, avatar, ranks);
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

    const { t } = this.props;
    const text = "Are you sure to clean list?";

    return (
      <Fade>
        <div className="favorites-list">
          <div className="playerpage-buttons">
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
              {t("other.words.deletePlayer")}
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
                {t("other.words.cleanList")}
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
