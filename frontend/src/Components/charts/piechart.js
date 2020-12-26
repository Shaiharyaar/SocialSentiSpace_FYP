import React from "react";
import Chart from "react-apexcharts";
// Resolves charts dependancy
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        labels: ["Neutral", "Positive", "Negative"],
        chart: {
          type: "donut",
          toolbar: {
            show: true,
          },
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
      <div style={{ padding: "30px 50px" }}>
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={this.state.option}
                series={this.props.ser}
                type="donut"
                width="450px"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PieChart;
