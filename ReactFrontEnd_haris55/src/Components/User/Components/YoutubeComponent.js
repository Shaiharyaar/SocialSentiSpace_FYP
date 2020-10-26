import React, { useState } from "react";
import { Row, Image, Col, Container } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TwitterPieChart from "../Charts/PieChart";
import CountUp from "react-countup";
import VideoComp from "../YoutubeVideo/VideoComponent";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";

function YoutubeComponent() {
  const [happy, sethappy] = useState(15);
  const [sad, setSad] = useState(65);
  const [neutral, setNeutral] = useState(20);
  const [tweeter, setTweeter] = useState("Obama ");
  const [check, setCheck] = useState(false);
  const [url, setUrl] = useState("");
  const [tweetContent, setTweet] = useState(
    "Here lies the latest tweet content...."
  );
  const [tweetDT, setTweetDT] = useState("time and date");
  const [youtubeDescription, setYoutubeDescription] = useState(
    "Youtube Video Description Lies here..."
  );
  const [series, setSeries] = useState([sad, neutral, happy]);
  const videos = [];

  const checkurl = (url) => {
    if (url == "") {
      setCheck(false);
      document.getElementById("free-solo-demo").style.borderColor = "gray";
    } else if (url.includes("https://www.youtube.com/watch?v=")) {
      setCheck(true);
      setUrl(url);
      document.getElementById("free-solo-demo").style.borderColor = "lawngreen";
      fetch(url).then(function (res) {
        console.log(res);
      });
    } else {
      setCheck(false);

      document.getElementById("free-solo-demo").style.borderColor = "red";
    }
  };

  return (
    <Container>
      <Row>-</Row>
      <Col>
        <Row>
          <h3 style={{ marginBottom: 10 }}> Youtube Analysis </h3>
          <FaYoutube color="red" size="2.2em" style={{ marginLeft: 10 }} />
        </Row>

        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={videos.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter a Youtube Video URL"
              margin="normal"
              variant="outlined"
              onChange={(e) => {
                checkurl(e.target.value);
              }}
            />
          )}
        />
      </Col>
      <LoadComponent check={check} url={url} />
      <Row>
        <h3 style={{ marginBottom: 10 }}> Youtube News Channels </h3>
        <FaYoutube color="red" size="2.2em" style={{ marginLeft: 10 }} />
      </Row>
      <Row class="Row">
        <Col sm className="Col" style={{ backgroundColor: "#eee" }}>
          <h3
            style={{
              textAlign: "center",
              padding: 7,
              backgroundColor: "#ffe",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            Video Details
          </h3>
          <p>
            <br />
            <h3>Latest News: </h3>
            <br />
            The Latest News on flaan channel right now is{" "}
            <strong>Pewds being scammed</strong>
            <br />
            <br />
            <h3>Video Title: </h3>
            The Video title is{" "}
            <strong> Pewdiepie has Quit Youtube AGAIN?!?!?!?!??!</strong>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1"></label>
              <br />
              <strong>Video Description: </strong>
              <textarea
                disabled={true}
                value={youtubeDescription}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
              />
            </div>
          </p>
          <br />
        </Col>

        <Col className="Col" style={{ backgroundColor: "#eee" }}>
          <VideoComp url="https://www.youtube.com/watch?v=RoFSqtrivFs" />
          <br />
          <h4>
            {" "}
            <strong style={{ marginLeft: 10 }}> Youtuber : </strong>PewDiePie
          </h4>
        </Col>
      </Row>
      <Row class="Row">
        <Col sm className="Col" style={{ backgroundColor: "#eee" }}>
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
            Nuetral (<CountUp end={neutral} duration={7} />
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

        <Col className="Col" sm style={{ backgroundColor: "#eee" }}>
          <TwitterPieChart ser={series} />
        </Col>
      </Row>
    </Container>
  );
}

function LoadComponent(props) {
  if (props.check) {
    return <YoutubeAnalysis url={props.url} />;
  } else {
    return (
      <Container>
        <Col>
          <Row>
            <div className="emptyComp">
              <h3>Your Search Result Will appear here</h3>
            </div>{" "}
          </Row>
        </Col>
      </Container>
    );
  }
}

function YoutubeAnalysis(props) {
  const [happy, sethappy] = useState(15);
  const [sad, setSad] = useState(65);
  const [neutral, setNeutral] = useState(20);
  const [tweeter, setTweeter] = useState("Obama ");
  const [tweetContent, setTweet] = useState(
    "Here lies the latest tweet content...."
  );
  const [tweetDT, setTweetDT] = useState("time and date");
  const [youtubeDescription, setYoutubeDescription] = useState(
    "Youtube Video Description Lies here..."
  );
  const [series, setSeries] = useState([20, 15, 65]);

  return (
    <Container style={{ marginTop: 20, marginBottom: 30 }}>
      <Row class="Row">
        <Col sm className="Col" style={{ backgroundColor: "#eee" }}>
          <h3
            style={{
              textAlign: "center",
              padding: 7,
              backgroundColor: "#ffe",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            Video Details
          </h3>
          <p>
            <br />
            <h3>Latest News: </h3>
            <br />
            The Latest News on flaan channel right now is{" "}
            <strong>Pewds being scammed</strong>
            <br />
            <br />
            <h3>Video Title: </h3>
            The Video title is{" "}
            <strong> Pewdiepie has Quit Youtube AGAIN?!?!?!?!??!</strong>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1"></label>
              <br />
              <strong>Video Description: </strong>
              <textarea
                disabled={true}
                value={youtubeDescription}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
              />
            </div>
          </p>
          <br />
        </Col>

        <Col className="Col" style={{ backgroundColor: "#eee" }}>
          <VideoComp url={props.url} />
          <br />
          <h4>
            {" "}
            <strong style={{ marginLeft: 10 }}> Youtuber : </strong>PewDiePie
          </h4>
        </Col>
      </Row>
      <Row class="Row">
        <Col sm className="Col" style={{ backgroundColor: "#eee" }}>
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
            Nuetral (<CountUp end={neutral} duration={7} />
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

        <Col className="Col" sm style={{ backgroundColor: "#eee" }}>
          <TwitterPieChart ser={series} />
        </Col>
      </Row>
    </Container>
  );
}
export default YoutubeComponent;
