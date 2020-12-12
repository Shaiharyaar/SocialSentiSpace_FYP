import React from "react";
import Lottie from "react-lottie";
import * as loading from "./json files/890-loading-animation.json";
export const Chiploader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div style={{ paddingTop: 4 }}>
      <Lottie options={defaultOptions} height={50} width={300} />
    </div>
  );
};
