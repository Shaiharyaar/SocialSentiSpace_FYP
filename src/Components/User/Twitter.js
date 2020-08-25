import React, { useState } from "react";
import TwitterLineChart from "./Charts/Linechart";
import TwitterPieChart from "./Charts/PieChart";
import { Col, Row } from "react-bootstrap";
import CountUp from "react-countup";
import { FaTwitter } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";

var options = {
  chart: {
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#555",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: true,
    },
  },

  colors: ["#545454"],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "smooth",
  },

  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 1,
    },
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: ["7", "6", "5", "4", "3", "2", "1"],
    title: {
      text: "Hours",
    },
  },
  yaxis: {
    title: {
      text: "Tweets",
    },
    min: 5,
    max: 500,
  },
  title: {
    text: "Tweets per hr",
    align: "left",
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
};

export default function Twitter(props) {
  const [happy, sethappy] = useState(15);
  const [sad, setSad] = useState(65);
  const [neutral, setNeutral] = useState(20);
  const [tweeter, setTweeter] = useState("Obama ");
  const [tweetContent, setTweet] = useState(
    "Here lies the latest tweet content...."
  );
  const [tweetDT, setTweetDT] = useState("time and date");
  return (
    <div>
      <Row>
        <h3>Twitter Analysis </h3>
        <FaTwitter color="blue" size="2.2em" style={{ marginLeft: 10 }} />
      </Row>
      <Row class="Row">
        <Col
          className="col"
          sm
          className="Col"
          style={{ backgroundColor: "#fff" }}
        >
          <h3
            style={{
              textAlign: "center",
              padding: 7,
              backgroundColor: "#ffe",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            Top Trending Data
          </h3>
          <p>
            <br />
            <h4>Latest Topic: </h4>
            <br />
            The Latest Trending topic right now is <strong>Donald Trump</strong>
            <br />
            <br />
          </p>
          <h4>Latest Tweet: </h4>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              This was tweeted at ( {tweetDT} )
            </label>
            <br />
            <strong>{tweeter} Tweeted:</strong>
            <textarea
              disabled={true}
              value={tweetContent}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
            />
          </div>

          <br />
        </Col>

        <Col className="Col" sm style={{ backgroundColor: "#fff" }}>
          <TwitterLineChart option={options} />
        </Col>
      </Row>
      <Row class="Row" style={{ marginBottom: 30 }}>
        <Col sm className="Col" style={{ backgroundColor: "#fff" }}>
          <h3
            style={{
              textAlign: "center",
              padding: 7,
              backgroundColor: "#ffe",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            People Emotional State
          </h3>
          <h4>
            {" "}
            Happy (<CountUp end={happy} duration={7} />
            %){" "}
          </h4>
          <ProgressBar
            animated
            variant="success"
            now={happy}
            label={`(${happy}%)`}
          />
          <br />
          <h3>
            {" "}
            Neutral (<CountUp end={neutral} duration={7} />
            %){" "}
          </h3>
          <ProgressBar
            animated
            variant="info"
            now={neutral}
            label={`(${neutral}%)`}
          />
          <br />
          <h3>
            {" "}
            Sad (<CountUp end={sad} duration={7} />
            %){" "}
          </h3>
          <ProgressBar
            animated
            variant="warning"
            now={sad}
            label={`(${sad}%)`}
          />
          <br />
        </Col>

        <Col className="Col" sm style={{ backgroundColor: "#fff" }}>
          <TwitterPieChart ser={[sad, neutral, happy]} />
        </Col>
      </Row>
    </div>
  );
}
