import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import { Col } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
// Resolves charts dependancy
class TwitterPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        labels: ["Neutral", "Happy", "Sad"],
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: "100%",
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
        options={this.state.option}
        series={this.props.ser}
        type="donut"
        height="90%"
      />
    );
  }
}
export default TwitterPieChart;
