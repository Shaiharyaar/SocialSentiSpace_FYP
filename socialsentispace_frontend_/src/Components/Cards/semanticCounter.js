import React from "react";
import CircularStatic from "./circularprogress";
export const Counters = (props) => {
  return (
    <div className={"minibox"}>
      <h2>Semantic Analysis</h2>
      <div className="container">
        <div className="row counterboxes">
          <div className="col-lg-3 box">
            <CircularStatic value={props.list[0]} color="primary" />
            <h3>Neutral</h3>
          </div>
          <div className="col-lg-3 box">
            <CircularStatic value={props.list[1]} />
            <h3>Happy</h3>
          </div>
          <div className="col-lg-3 box">
            <CircularStatic value={props.list[2]} />
            <h3>Sad</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
