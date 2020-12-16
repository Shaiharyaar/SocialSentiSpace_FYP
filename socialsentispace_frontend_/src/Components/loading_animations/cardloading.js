import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as loading from "./json files/loadcard.json";
import * as loading1 from "./json files/loadcard2.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: loading1.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const Cardloader = () => {
  useEffect(() => {
    setcheck(!check);
  }, []);
  const [check, setcheck] = useState(false);
  return (
    <div
      className="cardloader"
      style={{ paddingTop: "10vh", paddingBottom: "10vh" }}
    >
      <Lottie options={defaultOptions1} height={500} width={600} />
    </div>
  );
};

export const SubCardloader = () => {
  useEffect(() => {
    setcheck(!check);
  }, []);
  const [check, setcheck] = useState(false);
  return (
    <div
      className="cardloader"
      style={{ paddingTop: "5vh", paddingBottom: "10vh" }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};
