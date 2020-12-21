import React from "react";
import LineChart from "../charts/linechart";
import PieChart from "../charts/piechart";

export const Linechartcard = (props) => {
  return (
    <div>
      <h2>Line chart</h2>
      <LineChart data={props.data} y_title={props.y_title} />
    </div>
  );
};
export const Piechartcard = (props) => {
  return (
    <div>
      <h2>Pie chart</h2>
      <PieChart ser={props.list} />
    </div>
  );
};
