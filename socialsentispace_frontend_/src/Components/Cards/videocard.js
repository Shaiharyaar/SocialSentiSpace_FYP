import React from "react";
import ReactPlayer from "react-player/youtube";

export const Video = (props) => {
  return <ReactPlayer url={props.url} width="90%" height="400px" />;
};
