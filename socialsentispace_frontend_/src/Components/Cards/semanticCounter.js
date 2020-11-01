import React, { useEffect, useState } from "react";
import CircularStatic from "./circularprogress";
export const Counters = (props) => {
  useEffect(() => {
    setList(props.list);
  }, [props.list]);
  const [list, setList] = useState(props.list);
  return (
    <div className={"minibox"}>
      <h2>Semantic Analysis</h2>
      <div className="container">
        <div className="row counterboxes">
          <div className="col-lg-3 box">
            <CircularStatic value={list[0]} color="primary" />
            <h3>Neutral</h3>
          </div>
          <div className="col-lg-3 box">
            <CircularStatic value={list[1]} />
            <h3>Positive</h3>
          </div>
          <div className="col-lg-3 box">
            <CircularStatic value={list[2]} />
            <h3>Negative</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
