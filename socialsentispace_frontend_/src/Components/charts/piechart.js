import React from "react";
import ReactApexChart from "react-apexcharts";
// Resolves charts dependancy
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        labels: ["Neutral", "Positive", "Negative"],
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
      <div style={{ paddingTop: "70px", paddingBottom: "80px" }}>
        <ReactApexChart
          options={this.state.option}
          series={this.props.ser}
          type="donut"
          height="340px"
        />
      </div>
    );
  }
}
export default PieChart;
