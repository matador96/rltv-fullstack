import React from "react";
import ReactApexChart from "react-apexcharts";

class PieSavesShotsAsissts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: props.data,
      options: {
        chart: {
          width: 240,
          height: 244,
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
        colors: ["#ca5e5e", "#5eacca", "#93d653", "#c890e9", "#5e68ca"],
        labels: ["Shots", "Saves", "Assists"],
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
        height={244}
      />
    );
  }
}

export default PieSavesShotsAsissts;
