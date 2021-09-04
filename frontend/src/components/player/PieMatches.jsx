import React from "react";
import ReactApexChart from "react-apexcharts";

class PieMatches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.data,
      options: {
        chart: {
          width: 240,
          height: 262,
          type: "pie",
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: ["#000"],
          width: 1,
          dashArray: 0,
        },
        fill: {
          opacity: 0.7,
          type: "solid",
        },
        colors: [
          "#93d653",
          "#c890e9",
          "#5e68ca",
          "#ca5e5e",
          "#5eacca",
          "#ffeb00",
        ],
        labels: ["1v1", "2v2", "3v3", "Tournament", "Unranked", "Extra Mods"],
        legend: {
          position: "bottom",
          fontSize: "11px",
          labels: {
            colors: ["#ffffff"],
          },
          markers: {
            width: 9,
            height: 9,
            radius: 3,
          },
        },

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    const { options, series } = this.state;
    return (
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={240}
        height={262}
      />
    );
  }
}

export default PieMatches;
