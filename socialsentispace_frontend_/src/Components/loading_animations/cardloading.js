import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as loading from "./json files/loadcard.json";
import * as loading1 from "./json files/loadcard2.json";
import * as confirm from "./json files/confirmation.json";
import * as twitter from "./json files/twittierloading.json";
import * as youtube from "./json files/youtube.json";
import * as facebook from "./json files/facebook.json";
import * as instagram from "./json files/instagram.json";

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
const twitteroptions = {
  loop: true,
  autoplay: true,
  animationData: twitter.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const youtubeoptions = {
  loop: true,
  autoplay: true,
  animationData: youtube.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const facebookoptions = {
  loop: true,
  autoplay: true,
  animationData: facebook.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const instagramoptions = {
  loop: true,
  autoplay: true,
  animationData: instagram.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const confirmation = {
  loop: false,
  autoplay: true,
  animationData: confirm.default,
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

export const SubCardloader = (props) => {
  useEffect(() => {
    setcheck(!check);
  }, []);
  const [check, setcheck] = useState(false);
  return (
    <div
      className="cardloader"
      style={{ paddingTop: "5vh", paddingBottom: "10vh" }}
    >
      <Lottie
        options={props.loading ? confirmation : defaultOptions}
        height={400}
        width={400}
      />
    </div>
  );
};

export const TwitterLoader = (props) => {
  useEffect(() => {
    setcheck(!check);
  }, []);
  const [check, setcheck] = useState(false);
  return (
    <div
      className="cardloader"
      style={{ paddingTop: "5vh", paddingBottom: "10vh" }}
    >
      <Lottie
        options={props.loading ? confirmation : twitteroptions}
        height={400}
        width={400}
      />
    </div>
  );
};

export const YoutubeLoader = (props) => {
  useEffect(() => {
    setcheck(!check);
  }, []);
  const [check, setcheck] = useState(false);
  return (
    <div
      className="cardloader"
      style={{ paddingTop: "5vh", paddingBottom: "10vh" }}
    >
      <Lottie
        options={props.loading ? confirmation : youtubeoptions}
        height={400}
        width={400}
      />
    </div>
  );
};
export const FacebookLoader = (props) => {
  useEffect(() => {
    setcheck(!check);
  }, []);
  const [check, setcheck] = useState(false);
  return (
    <div
      className="cardloader"
      style={{ paddingTop: "5vh", paddingBottom: "10vh" }}
    >
      <Lottie
        options={props.loading ? confirmation : facebookoptions}
        height={400}
        width={400}
      />
    </div>
  );
};
export const InstagramLoader = (props) => {
  useEffect(() => {
    setcheck(!check);
  }, []);
  const [check, setcheck] = useState(false);
  return (
    <div
      className="cardloader"
      style={{ paddingTop: "5vh", paddingBottom: "10vh" }}
    >
      <Lottie
        options={props.loading ? confirmation : instagramoptions}
        height={400}
        width={400}
      />
    </div>
  );
};
