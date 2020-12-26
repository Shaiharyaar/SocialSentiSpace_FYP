import React from "react";
import ReactWordcloud from "react-wordcloud";

export default function WordsChart(props) {
  const words = props.data;
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [15, 70],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactWordcloud words={words} options={options} />
    </div>
  );
}
