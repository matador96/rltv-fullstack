import React from "react";

const getList = () => {
  const arr = [];
  for (let index = 1; index < 101; index++) {
    arr.push(
      <div className="leaderboard-block_list-items_player">
        <div>
          <span>{index}</span>
          <span>
            <img
              alt="matador"
              src="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/bc/bc87eee443bbb499709f15bcac40eaadc27473c5_full.jpg"
            />
          </span>
          <span>matador</span>
        </div>
        <span>1293</span>
      </div>
    );
  }

  return arr;
};
const LeaderboardsPage = (props) => (
  <div className="content leaderboardspage">
    <div className="leaderboard-block">
      <div className="leaderboard-block_mods">
        <div className="leaderboard-block_mods-item">1v1</div>
        <div className="leaderboard-block_mods-item">2v2</div>
        <div className="leaderboard-block_mods-item">3v3</div>
        <div className="leaderboard-block_mods-item">Tournament</div>
        <div className="leaderboard-block_mods-item">Unranked</div>
        <div className="leaderboard-block_mods-item">Snowday</div>
        <div className="leaderboard-block_mods-item">Rumble</div>
        <div className="leaderboard-block_mods-item">Dropshot</div>
        <div className="leaderboard-block_mods-item">Hoops</div>
      </div>
      <div className="leaderboard-block_platform">
        <div className="leaderboard-block_platform-item">All</div>
        <div className="leaderboard-block_platform-item">Steam</div>
        <div className="leaderboard-block_platform-item">Steam</div>
        <div className="leaderboard-block_platform-item">Psn</div>
        <div className="leaderboard-block_platform-item">Xbox</div>
        <div className="leaderboard-block_platform-item">Nintendo</div>
      </div>
      <div className="leaderboard-block_list">
        <div className="leaderboard-block_list-label_names">
          <span>Rank</span>
          <span>Player</span>
          <span>Rating</span>
        </div>
        <div className="leaderboard-block_list-items">{getList()}</div>
      </div>
    </div>
    {/* <RoadMap/> */}
  </div>
);

export default LeaderboardsPage;
