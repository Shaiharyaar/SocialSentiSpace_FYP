import React from "react";
import ReactPlayer from "react-player/youtube";

function VideoComp(props) {
  return <ReactPlayer url={props.url} width="100%" />;
}
export default VideoComp;
