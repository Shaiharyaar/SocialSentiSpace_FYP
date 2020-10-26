import React from "react";
import { Linechartcard, Piechartcard } from "./chartcard";
import { Informationcard } from "./information";
import { Counters } from "./semanticCounter";
import { Video } from "./videocard";

export const Youtubecard = (props) => {
  return (
    <div className={"row  masterbox"}>
      <div className={"row  masterbox"}>
        <div className="col-xl-6 masterbox">
          <Informationcard info={props.info} />
        </div>
        <div className="col-xl-6  masterbox">
          <Counters list={props.countervalues} />
        </div>
        <div className="col-xl-7  masterbox" style={{ marginTop: 10 }}>
          <div className={"minibox"} style={{ height: 600 }}>
            <Video url={props.info.url} />
            <br />
            <h4>
              {" "}
              <strong style={{ marginLeft: 10 }}> Youtuber : </strong>
              {props.info.youtuber}
            </h4>
          </div>
        </div>

        <div className="col-xl-5  masterbox" style={{ marginTop: 10 }}>
          <div className={"minibox"}>
            <Piechartcard list={props.countervalues} />
          </div>
        </div>
      </div>
    </div>
  );
};
