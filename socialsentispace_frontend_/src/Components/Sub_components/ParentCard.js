import React from "react";
import { Linechartcard, Piechartcard } from "../Cards/chartcard";
import { Informationcard } from "../Cards/information";
import { Counters } from "../Cards/sentimentCounter";

export const Maincard = (props) => {
  return (
    <div className={"row  masterbox"}>
      <div className={"row  masterbox"}>
        <div className="col-xl-6 masterbox">
          <Informationcard info={props.info} />
        </div>
        <div className="col-xl-6  masterbox">
          <Counters list={props.countervalues} />
        </div>
        <div className="col-xl-8  masterbox" style={{ marginTop: 10 }}>
          <div className={"minibox"}>
            {" "}
            <Linechartcard data={props.data} y_title={props.y_title} />
          </div>
        </div>

        <div className="col-xl-4  masterbox" style={{ marginTop: 10 }}>
          <div className={"minibox"}>
            <Piechartcard list={props.countervalues} />
          </div>
        </div>
      </div>
    </div>
  );
};
