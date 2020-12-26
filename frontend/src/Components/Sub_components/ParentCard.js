import React from "react";
import {
  GaugeChartcard,
  Linechartcard,
  Piechartcard,
  WordsCloudChart,
} from "../Cards/chartcard";
import { Informationcard } from "../Cards/information";

export const Maincard = (props) => {
  return (
    <div className={"row  masterbox"}>
      <div className={"row  masterbox"}>
        <div className="col-xl-6 masterbox">
          <Informationcard info={props.info} />
        </div>
        <div className="col-xl-6  masterbox">
          {/* <Counters list={props.countervalues} /> */}
          <div className={"minibox"}>
            <h2>Sentiment Tone</h2>
            <GaugeChartcard countervalues={props.countervalues} />
          </div>
        </div>
        <div className="col-xl-6  masterbox" style={{ marginTop: 10 }}>
          <div className={"minibox"}>
            {" "}
            <Linechartcard chartdata={props.chartdata} />
          </div>
        </div>

        <div className="col-xl-6  masterbox" style={{ marginTop: 10 }}>
          <div className={"minibox"}>
            <Piechartcard list={props.countervalues} />
          </div>
        </div>
        <div className="col  masterbox" style={{ marginTop: 10 }}>
          <div className={"miniboxMax"}>
            <WordsCloudChart data={props.data} />
          </div>
        </div>
      </div>
    </div>
  );
};
