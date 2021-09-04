import React from "react";
import ReactApexChart from "react-apexcharts";
import { getRankDistribution } from "../api/all/other";
import playlistIds from "../constant/playlistIds";
import { translate } from "react-switch-lang";

class DistributionRanks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracked: {},
      currentPlaylistId: playlistIds.Duel,
      series: [
        {
          name: "Percentage",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      options: {
        responsive: [
          {
            breakpoint: 480,
            options: {
              dataLabels: {
                show: false,
                style: {
                  fontSize: "10px",
                },
              },
              xaxis: {
                labels: {
                  style: {
                    fontSize: "7px",
                  },
                },
              },
            },
          },
        ],
        chart: {
          animations: {
            enabled: false,
          },
          height: 400,
          type: "bar",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: true,
            tools: {
              download: false,
            },
          },
        },
        grid: {
          yaxis: {
            lines: {
              show: false,
            },
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },

        xaxis: {
          labels: {
            show: true,
            style: {
              colors: "#9697b0",
              fontSize: "12px",
            },
          },
          axisTicks: {
            show: false,
            borderType: "solid",
            color: "#9697b0",
            height: 6,
            offsetX: 0,
            offsetY: 0,
          },
          categories: [
            playlistIds.tiers[1],
            playlistIds.tiers[2],
            playlistIds.tiers[3],
            playlistIds.tiers[4],
            playlistIds.tiers[5],
            playlistIds.tiers[6],
            playlistIds.tiers[7],
            playlistIds.tiers[8],
            playlistIds.tiers[9],
            playlistIds.tiers[10],
            playlistIds.tiers[11],
            playlistIds.tiers[12],
            playlistIds.tiers[13],
            playlistIds.tiers[14],
            playlistIds.tiers[15],
            playlistIds.tiers[16],
            playlistIds.tiers[17],
            playlistIds.tiers[18],
            playlistIds.tiers[19],
            playlistIds.tiers[20],
            playlistIds.tiers[21],
            playlistIds.tiers[22],
          ],
          position: "bottom",
          axisBorder: {
            show: true,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisTicks: {
            show: false,
            borderType: "solid",
            color: "#9697b0",
            height: 6,
            offsetX: 0,
            offsetY: 0,
          },
          axisBorder: {
            show: true,
          },
          labels: {
            show: true,
            style: {
              colors: "#9697b0",
            },
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    };
  }

  async componentDidMount() {
    let { data } = await getRankDistribution();
    data = data.data;

    if (data !== null && Object.keys(data).length > 0) {
      this.setState({
        tracked: data,
      });
    }

    let sortedData = this.getPlaylistCounters(playlistIds.Duel);
    this.setState({
      series: [
        {
          name: "Percentage",
          data: sortedData,
        },
      ],
    });
  }

  updatePlaylistIds(playlistId) {
    this.setState({
      currentPlaylistId: playlistId,
    });
    const data = this.getPlaylistCounters(playlistId);
    this.setState({
      series: [
        {
          name: "Percentage",
          data: data,
        },
      ],
    });
  }

  getPlaylistCounters(playlistId) {
    const arr = [];
    const { tracked } = this.state;

    for (let key in tracked.tierStats) {
      let element = tracked.tierStats[key];
      if (element.playlist === playlistId) {
        arr.push(element);
      }
    }

    arr.sort(function (a, b) {
      return a.tier - b.tier;
    });

    let result = [];
    let sum = 0;

    for (let key in arr) {
      let element = arr[key];
      sum = sum + element.count;
    }

    for (let key in arr) {
      let element = arr[key];
      if (element.tier === 0) {
        continue;
      }
      let percentage = (element.count / sum) * 100;
      result.push(percentage.toFixed(2));
    }

    return result;
  }

  renderPlaylists() {
    let arr = [];
    const { currentPlaylistId } = this.state;
    const { t } = this.props;

    for (let key in playlistIds) {
      if (key === "Unranked" || key === "tiers") {
        continue;
      }
      arr.push(
        <div
          key={playlistIds[key] + "distribution"}
          className={
            currentPlaylistId === playlistIds[key]
              ? "leaderboard-block_mods-item active"
              : "leaderboard-block_mods-item"
          }
          onClick={() => {
            this.updatePlaylistIds(playlistIds[key]);
          }}
        >
          {t("playlistsV1." + key)}
        </div>
      );
    }
    return arr;
  }

  render() {
    return (
      <>
        <div className="leaderboard-block_mods">{this.renderPlaylists()}</div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={400}
          />
        </div>
      </>
    );
  }
}

export default translate(DistributionRanks);
