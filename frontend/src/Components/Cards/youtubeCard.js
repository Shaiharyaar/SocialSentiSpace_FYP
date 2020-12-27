import React from "react";
import {
  Linechartcard,
  GaugeChartcard,
  Piechartcard,
  WordsCloudChart,
} from "./chartcard";
import { Informationcard } from "./information";
import { Counters } from "./sentimentCounter";
import { Video } from "./videocard";

export const Youtubecard = (props) => {
  return (
    <div className={"row  masterbox"}>
      <div className={"row  masterbox"}>
        <div className="col-xl-6 masterbox">
          <Informationcard info={props.info} />
        </div>
        <div className="col-xl-6  masterbox">
          <div className={"minibox gaugechart"}>
            <h2>POSITIVITY RATE</h2>
            <GaugeChartcard countervalues={props.countervalues} />
          </div>
        </div>
        <div className="col-xl-6  masterbox" style={{ marginTop: 10 }}>
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

        <div className="col-xl-6  masterbox" style={{ marginTop: 10 }}>
          <div className={"minibox"}>
            <h2>SENTIMENT ANALYSIS</h2>

            <Piechartcard list={props.countervalues} />
          </div>
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
          <h2>WORD CLOUD</h2>
          <WordsCloudChart data={props.data} />
        </div>
      </div>
    </div>
  );
};
