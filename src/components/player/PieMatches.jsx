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
          show: false,
        },
        colors: ["#1b95f1", "#ffa600", "#06c786", "#03c986", "#02c186"],
        labels: ["1v1", "2v2", "3v3", "Tournament", "Unranked"],
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
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="pie"
        width={240}
        height={262}
      />
    );
  }
}

export default PieMatches;
