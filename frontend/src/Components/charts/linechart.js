import React from "react";
import Chart from "react-apexcharts";
class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "2020",
          data: props.data.counts,
        },
      ],
      options: {
        chart: {
          id: "basic-bar",
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },

        colors: ["#45B39D"],

        grid: {
          borderColor: "#fff",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: props.data.words,
          title: {
            text: "Counts",
          },
        },
        yaxis: {
          title: {
            text: "Most Repetitive Words",
          },
          min: 0,
          max: props.data.counts[0],
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    };
  }
  render() {
    return (
      <div style={{ paddingTop: "10px" }}>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={"400"}
        />
      </div>
    );
  }
}

export default LineChart;
