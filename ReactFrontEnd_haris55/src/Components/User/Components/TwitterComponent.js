import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TwitterLineChart from "../Charts/Linechart";
import TwitterPieChart from "../Charts/PieChart";

import CountUp from "react-countup";
import { FaTwitter } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
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

function TwitterComponent() {
  const [happy, sethappy] = useState(15);
  const [sad, setSad] = useState(65);
  const [neutral, setNeutral] = useState(20);
  const [tweeter, setTweeter] = useState("Obama ");
  const [tweetContent, setTweet] = useState(
    "Here lies the latest tweet content...."
  );
  const [tweetDT, setTweetDT] = useState("time and date");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [trend, setTrend] = React.useState("");

  const handleLocation = (event) => {
    setLocation(event.target.value || "");
    if (event.target.value != "")
      document.getElementById("trendfield").style.visibility = "visible";
    else document.getElementById("trendfield").style.visibility = "hidden";
  };
  const handleTrend = (event) => {
    setTrend(event.target.value || "");

    console.log(document.getElementById("okbtn"));
    if (event.target.value != "") {
      document.getElementById("okbtn").style.visibility = "visible";
      document.getElementById("span").style.visibility = "hidden";
    } else {
      document.getElementById("okbtn").style.visibility = "hidden";
      document.getElementById("span").style.visibility = "visible";
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <div className="selectloc">
        <Button className="trendbtn" onClick={handleClickOpen}>
          Select a Twitter Trend
        </Button>
        <Dialog 
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Fill the fields</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">
                  Select a Location
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={location}
                  onChange={handleLocation}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Rawalpindi"}>Rawalpindi</MenuItem>
                  <MenuItem value={"Islamabad"}>Islamabad</MenuItem>
                  <MenuItem value={"Lahore"}>Lahore</MenuItem>
                </Select>
              </FormControl>
              <FormControl id="trendfield" className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">
                  Select a Trend
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={trend}
                  onChange={handleTrend}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>{"#DonaldTrump"}Donaldtrump</MenuItem>
                  <MenuItem value={"#ObamaCare"}>#ObamaCare</MenuItem>
                  <MenuItem value={"#Pewdiepie"}>#Pewdiepie</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              id="okbtn"
              onClick={handleClose}
              style={{ visibility: "hidden" }}
              color="primary"
            >
              Ok
            </Button>
            <span
              id="span"
              style={{
                position: "absolute",
                fontFamily: "Calibri",
                right: 32,
                bottom: 15,
                color: "#999",
              }}
            >
              Ok
            </span>
          </DialogActions>
        </Dialog>
      </div>
      <LoadComponent />
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
export default TwitterComponent;
