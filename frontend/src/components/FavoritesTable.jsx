import { Table, Space, Tooltip } from "antd";
import React from "react";
import { deleteFavorites, getFavorites } from "../cookie/store";
import playlistIds from "./../constant/playlistIds";
import { Link } from "react-router-dom";
import { getIconComponentPlatfrom, getPlatformAvatar } from "../helpers/other";
import { getOwnRankImage } from "../helpers/player";
import { CloseCircleOutlined } from "@ant-design/icons";
import { SyncOutlined } from "@ant-design/icons";
import { isFavorite, updateFavorite } from "../cookie/store";
import { getPlayerData } from "./../api/all/player";
import { getPlayerRankObject, getSteamUrl } from "../helpers/player";
import openNotification from "./Notification";
class FavoritesTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedInfo: null,
      favoritesList: null,
      loaders: {},
    };

    window.FavoritesTables = this;
  }

  async componentDidMount() {
    await this.updateFavorites();
  }

  async updateFav(platform, gameId, nickname, avatar, playerData) {
    const ranks = getPlayerRankObject(playerData);
    await updateFavorite(platform, gameId, nickname, avatar, ranks);
    this.updateFavorites();
  }

  async updatePlayer(platform, gameId, nickname) {
    const { loaders } = this.state;

    this.setState(
      {
        loaders: { ...loaders, [gameId]: true },
      },
      () => {
        this.updateFavorites();
      }
    );

    await getPlayerData(platform, gameId).then(async (data) => {
      this.setState({
        loaders: { ...loaders, [gameId]: false },
      });

      if (!data?.data?.data) {
        await deleteFavorites(gameId);
        await this.updateFavorites();
        openNotification("error", "Error", "Cant find player " + nickname);
        return;
      }

      const playerData = data.data.data;

      nickname = playerData.platformInfo.platformUserHandle;
      const avatar = playerData.platformInfo.avatarUrl;

      const isFav = await isFavorite(gameId);
      if (isFav) {
        await this.updateFav(platform, gameId, nickname, avatar, playerData);
      }
      return;
    });
  }

  async updateFavorites() {
    const { loaders } = this.state;
    const items = await getFavorites();
    const data = [];

    if (items !== null && Object.keys(items).length > 0) {
      for (let key in items) {
        let element = items[key];

        let player = {
          key,
          avatar: (
            <div className="favoritespage-avatarblock">
              <Link to={"/player/" + element.platform + "/" + key}>
                <img
                  src={
                    element.avatar
                      ? element.avatar
                      : getPlatformAvatar(element.platform)
                  }
                  alt={element.nickname}
                />
              </Link>
              {element.platform === "steam" ? (
                <a
                  href={getSteamUrl(key)}
                  title={element.nickanem}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getIconComponentPlatfrom(element.platform)}
                </a>
              ) : (
                getIconComponentPlatfrom(element.platform)
              )}
            </div>
          ),

          update: (
            <Tooltip placement="bottom" title={"Update rank player"}>
              <SyncOutlined
                spin={loaders[key] ? loaders[key] : false}
                style={{ fontSize: "16px", color: "#fff" }}
                key={"update" + key}
                onClick={() =>
                  this.updatePlayer(element.platform, key, element.nickname)
                }
              />
            </Tooltip>
          ),

          nickname: (
            <Link to={"/player/" + element.platform + "/" + key}>
              {element.nickname}
            </Link>
          ),
          platform: element.platform,

          "1v1Icon": (
            <img
              src={getOwnRankImage(element.ranks[playlistIds.Duel].icon)}
              alt={element.ranks[playlistIds.Duel].name}
            />
          ),
          "1v1": element.ranks[playlistIds.Duel].rating,
          "2v2Icon": (
            <img
              src={getOwnRankImage(element.ranks[playlistIds.Doubles].icon)}
              alt={element.ranks[playlistIds.Doubles].name}
            />
          ),
          "2v2": element.ranks[playlistIds.Doubles].rating,
          "3v3Icon": (
            <img
              src={getOwnRankImage(element.ranks[playlistIds.Standard].icon)}
              alt={element.ranks[playlistIds.Standard].name}
            />
          ),
          "3v3": element.ranks[playlistIds.Standard].rating,
          dropshotIcon: (
            <img
              src={getOwnRankImage(element.ranks[playlistIds.Dropshot].icon)}
              alt={element.ranks[playlistIds.Dropshot].name}
            />
          ),
          dropshot: element.ranks[playlistIds.Dropshot].rating,
          snowdayIcon: (
            <img
              src={getOwnRankImage(element.ranks[playlistIds.Snowday].icon)}
              alt={element.ranks[playlistIds.Snowday].name}
            />
          ),
          snowday: element.ranks[playlistIds.Snowday].rating,
          hoopsIcon: (
            <img
              src={getOwnRankImage(element.ranks[playlistIds.Hoops].icon)}
              alt={element.ranks[playlistIds.Hoops].name}
            />
          ),
          hoops: element.ranks[playlistIds.Hoops].rating,
          rumbleIcon: (
            <img
              src={getOwnRankImage(element.ranks[playlistIds.Rumble].icon)}
              alt={element.ranks[playlistIds.Rumble].name}
            />
          ),
          rumble: element.ranks[playlistIds.Rumble].rating,
          delete: (
            <div
              className="delete-row"
              onClick={() => this.deleteFavoriteList(key)}
            >
              <CloseCircleOutlined />
            </div>
          ),
        };

        data.push(player);
      }

      this.setState({
        favoritesList: data,
      });
    }
  }

  async deleteFavoriteList(gameId) {
    await deleteFavorites(gameId);
    await this.updateFavorites();
    window.Navbar.updateFavCount();
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  render() {
    if (!this.state.favoritesList) {
      return <></>;
    }

    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: "#",
        dataIndex: "#",
        key: "#",
      },
      {
        title: "",
        dataIndex: "avatar",
        key: "avatar",
      },

      {
        title: "",
        dataIndex: "update",
        key: "update",
      },

      {
        title: "Nickname",
        dataIndex: "nickname",
        key: "nickname",
      },
      {
        title: "",
        dataIndex: "1v1Icon",
        key: "1v1Icon",
      },
      {
        title: "1v1",
        dataIndex: "1v1",
        key: "1v1",
        sorter: (a, b) => b["1v1"] - a["1v1"],
        sortOrder: sortedInfo.columnKey === "1v1" && sortedInfo.order,
      },

      {
        title: "",
        dataIndex: "2v2Icon",
        key: "2v2Icon",
      },
      {
        title: "2v2",
        dataIndex: "2v2",
        key: "2v2",
        sorter: (a, b) => b["2v2"] - a["2v2"],
        sortOrder: sortedInfo.columnKey === "2v2" && sortedInfo.order,
        multiple: 1,
      },

      {
        title: "",
        dataIndex: "3v3Icon",
        key: "3v3Icon",
      },
      {
        title: "3v3",
        dataIndex: "3v3",
        key: "3v3",
        sorter: (a, b) => b["3v3"] - a["3v3"],
        sortOrder: sortedInfo.columnKey === "3v3" && sortedInfo.order,
      },

      {
        title: "",
        dataIndex: "rumbleIcon",
        key: "rumbleIcon",
      },

      {
        title: "Rumble",
        dataIndex: "rumble",
        key: "rumble",
        sorter: (a, b) => b["rumble"] - a["rumble"],
        sortOrder: sortedInfo.columnKey === "rumble" && sortedInfo.order,
      },

      {
        title: "",
        dataIndex: "snowdayIcon",
        key: "snowdayIcon",
      },
      {
        title: "Snow.",
        dataIndex: "snowday",
        key: "snowday",
        sorter: (a, b) => b["snowday"] - a["snowday"],
        sortOrder: sortedInfo.columnKey === "snowday" && sortedInfo.order,
      },

      {
        title: "",
        dataIndex: "dropshotIcon",
        key: "dropshotIcon",
      },

      {
        title: "Drop.",
        dataIndex: "dropshot",
        key: "dropshot",
        sorter: (a, b) => b["dropshot"] - a["dropshot"],
        sortOrder: sortedInfo.columnKey === "dropshot" && sortedInfo.order,
      },

      {
        title: "",
        dataIndex: "hoopsIcon",
        key: "hoopsIcon",
      },

      {
        title: "Hoops",
        dataIndex: "hoops",
        key: "hoops",
        sorter: (a, b) => b["hoops"] - a["hoops"],
        sortOrder: sortedInfo.columnKey === "hoops" && sortedInfo.order,
      },
      {
        title: "",
        dataIndex: "delete",
        key: "delete",
      },
    ];

    const { deleteMode } = this.props;

    return (
      <>
        <Space style={{ marginBottom: 45 }}>
          <div></div>
        </Space>
        <Table
          className={
            deleteMode ? "table-favorites deletemode" : "table-favorites"
          }
          columns={columns}
          dataSource={this.state.favoritesList}
          onChange={this.handleChange}
          showSorterTooltip={false}
          pagination={{ position: ["none", "none"], pageSize: 100 }}
        />
      </>
    );
  }
}

export default FavoritesTables;
