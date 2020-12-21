import React, { useState } from "react";

export const Informationcard = (props) => {
  return (
    <div className={"minibox"}>
      <h2>{props.info.title1}</h2>

      <div className="col">
        <p>
          <br />
          <h4>{props.info.title2}</h4>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              {props.info.line1 + " " + props.info.dt}
            </label>
            <hr />
            <strong>{props.info.name + " " + props.info.title3}</strong>
            <p></p>
            <textarea
              disabled={true}
              value={props.info.post}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
            />
          </div>
        </p>
        <br />
      </div>
    </div>
  );
};
