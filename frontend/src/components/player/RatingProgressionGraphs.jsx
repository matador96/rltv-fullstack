import React from "react";
import ReactApexChart from "react-apexcharts";

const series = [
  {
    name: "Duel",
    data: [
      15, 11, 22, 13, 49, 11, 69, 91, 16, 15, 41, 33, 33, 49, 11, 69, 91, 56,
    ],
  },
  {
    name: "Doubles",
    data: [
      15, 41, 22, 33, 12, 11, 69, 91, 56, 15, 41, 22, 44, 49, 11, 69, 91, 56,
    ],
  },
  {
    name: "Standard",
    data: [15, 41, 22, 3, 49, 11, 1, 91, 56, 15, 3, 22, 33, 49, 11, 69, 91, 56],
  },
  {
    name: "Tournament",
    data: [15, 41, 22, 33, 4, 11, 69, 91, 56, 15, 41, 22, 33, 5, 6, 12, 91, 56],
  },
  {
    name: "Unranked",
    data: [15, 41, 22, 33, 4, 11, 69, 91, 56, 15, 41, 22, 33, 5, 6, 12, 91, 56],
  },
];

const getMinMaxYAxis = () => {
  let min = 0,
    max = 0;

  if (!series) {
    return;
  }

  let arr = [];

  for (let key in Object.keys(series)) {
    let element = series[key];
    arr = [...arr, ...element.data];
  }

  console.log(arr);

  min = Math.min.apply(null, arr);
  max = Math.max.apply(null, arr);

  console.log({ min: min - 20, max: max + 10 });
  return { min: min - 20, max: max + 10 };
};

class RatingProgressionGraphs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: series,
      options: {
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
          min: getMinMaxYAxis().min,
          max: getMinMaxYAxis().max,
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

  render() {
    const { options, series } = this.state;
    return (
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={245}
        width={480}
      />
    );
  }
}

export default RatingProgressionGraphs;
