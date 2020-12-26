import React from "react";
import LineChart from "../charts/linechart";
import PieChart from "../charts/piechart";
import GaugeChart from "react-gauge-chart";
import WordsChart from "../charts/wordcloudchart";

export const Linechartcard = (props) => {
  return (
    <div>
      <LineChart data={props.chartdata} />
    </div>
  );
};
export const Piechartcard = (props) => {
  return (
    <div>
      <PieChart ser={props.list} />
    </div>
  );
};
export const GaugeChartcard = (props) => {
  return (
    <div style={{ marginTop: 100 }}>
      <GaugeChart
        id="gauge-chart2"
        nrOfLevels={15}
        percent={props.countervalues[1] / 100}
        colors={["#EA4228", "#F5CD19", "#5BE12C"]}
        needleBaseColor={
          props.countervalues[1] < 30
            ? "#B00303"
            : props.countervalues[1] < 60
            ? "#D9E700"
            : "#7AE700"
        }
        animDelay={1000}
        textColor={
          props.countervalues[1] < 30
            ? "#B00303"
            : props.countervalues[1] < 60
            ? "#D9E700"
            : "#7AE700"
        }
      />
    </div>
  );
};
export const WordsCloudChart = (props) => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <WordsChart data={props.data} />
    </div>
  );
};
