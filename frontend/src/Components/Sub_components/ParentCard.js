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
          <div className={"minibox gaugechart"}>
            <h2>POSITIVITY RATE</h2>
            <GaugeChartcard countervalues={props.countervalues} />
          </div>
        </div>
        <div className="col-xl-6  masterbox" style={{ marginTop: 10 }}>
          <div className={"minibox"}>
            <h2>Most used words</h2>
            <Linechartcard chartdata={props.chartdata} />
          </div>
        </div>

        <div className="col-xl-6  masterbox" style={{ marginTop: 10 }}>
          <div className={"minibox"}>
            <h2>SENTIMENT ANALYSIS</h2>
            <Piechartcard list={props.countervalues} />
          </div>
        </div>
        <div className="col  masterbox" style={{ marginTop: 10 }}>
          <div className={"miniboxMax"}>
            <h2>WORD CLOUD</h2>
            <WordsCloudChart data={props.data} />
          </div>
        </div>
      </div>
    </div>
  );
};
