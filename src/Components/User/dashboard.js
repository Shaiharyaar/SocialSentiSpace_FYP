import React, { useState } from "react";
import ChipsArray from "./chips";
import { Container, Col, Row } from "react-bootstrap";
import Twitter from "./Twitter";
import Youtube from "./Youtube.js";
import Facebook from "./Facebook";
import Instagram from "./Instagram";

function Dashboard() {
  const [comp, setcomp] = useState("Twitter");
  const LoadComponent = (c) => {
    setcomp(c);
  };
  return (
    <Container>
      <h2 style={{ fontSize: 60, marginBottom: 30 }}>Dashboard</h2>
      <Col>
        <Row>
          <ChipsArray compload={LoadComponent} />
        </Row>
        <CompCheck c={comp} />
      </Col>
    </Container>
  );
}
function CompCheck(props) {
  if (props.c === "Twitter") {
    return <Twitter />;
  } else if (props.c === "Youtube") {
    return <Youtube url={props.url} />;
  } else if (props.c === "Facebook") {
    return <Facebook />;
  } else if (props.c === "Instagram") {
    return <Instagram />;
  } else {
    return <div>{props.c}</div>;
  }
}
export default Dashboard;
