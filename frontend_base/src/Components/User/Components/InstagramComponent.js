import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TwitterLineChart from "../Charts/Linechart";
import TwitterPieChart from "../Charts/PieChart";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import CountUp from "react-countup";
import { FaInstagram, FaHashtag } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
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
      text: "Comments",
    },
    min: 5,
    max: 500,
  },
  title: {
    text: "Comments per hr",
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
function InstagramComponent() {
  const [happy, sethappy] = useState(15);
  const [sad, setSad] = useState(65);
  const [neutral, setNeutral] = useState(20);
  const [tweeter, setTweeter] = useState("Obama ");
  const [tweetContent, setTweet] = useState(
    "Here lies the latest tweet content...."
  );
  const [instaDT, setinstaDT] = useState("time and date");
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [trend, setTrend] = React.useState("");
  const classes = useStyles();
  const videos = [];
  const checkhash = (val) => {
    if (val == "")
      document.getElementById("free-solo-demo").style.borderColor = "#888";
    else
      document.getElementById("free-solo-demo").style.borderColor = "#c13584";
  };
  return (
    <Container>
      <Row style={{ marginTop: 30 }}>
        <h3>Instagram Analysis </h3>
        <FaInstagram color="#e1306c" size="2.2em" style={{ marginLeft: 10 }} />
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col lg="8">
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={videos.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter an Instagram #hashtag of your choosing"
                margin="normal"
                variant="outlined"
                onChange={(e) => {
                  checkhash(e.target.value);
                }}
              />
            )}
          />
        </Col>
        <Col style={{ paddingTop: 10, borderRadius: 50 }}>
          <FormControl style={{ width: 250 }} className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">
              Latest Instagram Trends
            </InputLabel>
            <Select defaultValue="" id="grouped-select">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"#love"}>#love</MenuItem>
              <MenuItem value={"#instagood"}>#instagood</MenuItem>
              <MenuItem value={"#photooftheday"}>#photooftheday</MenuItem>
              <MenuItem value={"#fashion"}>#fashion</MenuItem>
            </Select>
          </FormControl>
        </Col>
      </Row>
      <LoadComponent />
      <Row>
        <h3>Latest Hashtag Analysis </h3>
        <FaHashtag color="#833ab4" size="2.2em" style={{ marginLeft: 10 }} />
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
            <h4>Latest Post </h4>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                This was tweeted at ( {instaDT} )
              </label>
              <br />
              <strong>{tweeter} Tweeted:</strong>
              <textarea
                disabled={true}
                value={tweetContent}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
              />
            </div>
          </p>
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
    </Container>
  );
}
function LoadComponent(props) {
  // if (props.check) {
  //   return <YoutubeAnalysis url={props.url} />;
  // } else {
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
  // }
}
export default InstagramComponent;
