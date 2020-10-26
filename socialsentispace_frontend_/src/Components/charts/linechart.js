import React from "react";
import ReactApexChart from "react-apexcharts";
class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "2020",
          data: this.props.data,
        },
      ],
      options: {
        chart: {
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#555",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: true,
          },
        },

        colors: ["#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },

        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 1,
          },
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: ["7", "6", "5", "4", "3", "2", "1"],
          title: {
            text: "Hours",
          },
        },
        yaxis: {
          title: {
            text: "Tweets",
          },
          min: 5,
          max: 500,
        },
        title: {
          text: "Tweets per hr",
          align: "left",
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
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        height="480px"
        type="line"
      />
    );
  }
}

export default LineChart;
