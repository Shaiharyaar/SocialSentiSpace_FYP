import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as loading from "./json files/loadcard.json";
import * as loading1 from "./json files/loadcard2.json";

export const Cardloader = () => {
  // useEffect(() => {
  //   setcheck(!check);
  // }, []);
  // const [check, setcheck] = useState(false);
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: loading.default,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: loading1.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="cardloader"
      style={{ paddingTop: "10vh", paddingBottom: "10vh" }}
    >
      <Lottie options={defaultOptions1} height={500} width={600} />
    </div>
  );
};
