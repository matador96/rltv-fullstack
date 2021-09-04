import React from "react";
import ReactApexChart from "react-apexcharts";
import playlistIds from "../../constant/playlistIds";
import { translate } from "react-switch-lang";
import { Select } from "antd";

const { Option } = Select;

const series = [
  {
    name: "Unranked",
    data: [],
  },
];

// const getMinMaxYAxis = () => {
//   let min = 0,
//     max = 0;

//   if (!series) {
//     return;
//   }

//   let arr = [];

//   for (let key in Object.keys(series)) {
//     let element = series[key];
//     arr = [...arr, ...element.data];
//   }

//   min = Math.min.apply(null, arr);
//   max = Math.max.apply(null, arr);

//   return { min: min - 20, max: max + 10 };
// };

class RatingProgressionGraphs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMod: "comp",
      show: false,
      series: series,
      options: {
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                width: 400,
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 240,
              },
              xaxis: {
                labels: {
                  style: {
                    fontSize: "12px",
                  },
                },
              },
            },
          },
        ],
        chart: {
          offsetX: 0,
          offsetY: 0,
          height: 245,
          width: 480,
          type: "line",
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
        legend: {
          position: "bottom",
          fontSize: "13px",
          labels: {
            colors: ["#9697b0"],
          },
          itemMargin: {
            horizontal: 8,
            vertical: 5,
          },
          markers: {
            width: 14,
            height: 14,
            radius: 3,
            offsetX: -2,
            offsetY: -1,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        grid: {
          row: {
            opacity: 1,
          },
          column: {
            opacity: 1,
          },
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
        tooltip: {
          enabled: true,
        },
        yaxis: {
          // min: getMinMaxYAxis().min,
          // max: getMinMaxYAxis().max,
          labels: {
            show: false,
            style: {
              colors: "#9697b0",
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
          axisBorder: {
            show: false,
            color: "#9697b0",
            width: 1,
            height: "100%",
            offsetX: 0,
            offsetY: 0,
          },
        },
        xaxis: {
          tickPlacement: "on",
          labels: {
            style: {
              fontSize: "10px",
              colors: "#9697b0",
            },
          },
          axisBorder: {
            show: true,
            color: "#9697b0",
            height: 1,
            width: "100%",
            offsetX: 0,
            offsetY: 0,
          },
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    };
  }

  componentDidMount() {
    const { rankHistory } = this.props;

    if (rankHistory?.dates && rankHistory?.history) {
      const { options } = this.state;
      options.xaxis.categories = rankHistory.dates;
      const seriesCompetetive = [
        {
          name: "Duel",
          data: rankHistory.history[playlistIds.Duel],
        },
        {
          name: "Doubles",
          data: rankHistory.history[playlistIds.Doubles],
        },
        {
          name: "Standard",
          data: rankHistory.history[playlistIds.Standard],
        },
        {
          name: "Tournament",
          data: rankHistory.history[playlistIds.Tournament],
        },
      ];

      this.setState({
        show: true,
        options: options,
        series: seriesCompetetive,
      });
    }
  }

  handleChange = (value) => {
    this.setState(
      {
        selectedMod: value,
      },
      () => this.updateSeries()
    );
  };

  updateSeries() {
    const { rankHistory } = this.props;
    const { selectedMod } = this.state;
    this.setState({
      show: false,
      series: [],
    });

    if (rankHistory?.dates && rankHistory?.history) {
      // const { options } = this.state;
      // options.xaxis.categories = rankHistory.dates;
      let series;

      if (selectedMod === "comp") {
        series = [
          {
            name: "Duel",
            data: rankHistory.history[playlistIds.Duel],
          },
          {
            name: "Doubles",
            data: rankHistory.history[playlistIds.Doubles],
          },
          {
            name: "Standard",
            data: rankHistory.history[playlistIds.Standard],
          },
          {
            name: "Tournament",
            data: rankHistory.history[playlistIds.Tournament],
          },
        ];
      } else if (selectedMod === "unranked") {
        series = [
          {
            name: "Unranked",
            data: rankHistory.history[playlistIds.Unranked],
          },
        ];
      } else if (selectedMod === "extra") {
        series = [
          {
            name: "Hoops",
            data: rankHistory.history[playlistIds.Hoops],
          },
          {
            name: "Snowday",
            data: rankHistory.history[playlistIds.Snowday],
          },
          {
            name: "Dropshot",
            data: rankHistory.history[playlistIds.Dropshot],
          },
          {
            name: "Rumble",
            data: rankHistory.history[playlistIds.Rumble],
          },
        ];
      }

      this.setState({
        show: true,
        series: series,
      });
    }
  }

  render() {
    const { options, series, show, selectedMod } = this.state;
    if (!show) {
      return <></>;
    }

    const { t } = this.props;

    return (
      <>
        <div className="third-row__left__title title-ratingprogressiongraphs">
          {t("pages.player.ratingProgression")}
          <Select
            defaultValue="comp"
            onChange={this.handleChange}
            value={selectedMod}
          >
            <Option value="comp">Competetive</Option>
            <Option value="extra">Extra Mods</Option>
            <Option value="unranked">Unranked</Option>
          </Select>
        </div>

        <div className="third-row__left__block ratingprogressiongraphs">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={245}
            width={480}
          />
        </div>
      </>
    );
  }
}

export default translate(RatingProgressionGraphs);
