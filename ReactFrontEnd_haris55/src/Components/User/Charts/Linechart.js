import React from "react";
import ReactApexChart from "react-apexcharts";
class TwitterLineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "2020",
          data: [128, 229, 33, 436, 99, 132, 233],
        },
      ],
    };
  }
  render() {
    return (
      <ReactApexChart
        options={this.props.option}
        series={this.state.series}
        type="line"
        height="390px"
      />
    );
  }
}

export default TwitterLineChart;
