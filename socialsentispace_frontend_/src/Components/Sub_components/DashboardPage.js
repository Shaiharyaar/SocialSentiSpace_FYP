import React, { useState } from "react";
import ChipsArray from "../chips";
import { Maincard } from "./ParentCard";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Youtubecard } from "../Cards/youtubeCard";
import { Facebookcomponent } from "./Chart_Components/FacebookComponent";

import { Instagramcomponent } from "./Chart_Components/InstagramComponent";
import { Twittercomponent } from "./Chart_Components/TwitterComponent";
import { Youtubecomponent } from "./Chart_Components/YoutubeComponent";
export const Dashboard = () => {
  const [comp, setcomp] = useState("Twitter");

  const [info, setinfo] = useState({
    title1: "Information",
    title2: "Latest Tweet",
    title3: "tweeted",
    post: "Here lies the latest tweet that was tweeted ...",
    name: "Obama",
    line1: "This was tweeted at",
    dt: "date and time",

    url: "https://www.youtube.com/watch?v=Na8vHaCLwKc",
    youtuber: "Pewdiepie",
  });

  const LoadComponent = (c) => {
    setcomp(c);
  };

  return (
    <div>
      <div className={"container"}>
        <ChipsArray compload={LoadComponent} />
      </div>
      <CompCheck c={comp} info={info} />
    </div>
  );
};

const CompCheck = (props) => {
  if (props.c === "Twitter") {
    return (
      <div>
        <div className="row screens">
          <h3>Twitter Analysis </h3>
          <FaTwitter color="blue" size="2.2em" style={{ marginLeft: 10 }} />
        </div>
        <Maincard
          info={props.info}
          countervalues={[20, 10, 70]}
          data={[128, 229, 33, 436, 99, 132, 233]}
        />
      </div>
    );
  } else if (props.c === "Youtube") {
    return (
      <div>
        <div className="row screens">
          <h3>Youtube Analysis </h3>
          <FaYoutube color="red" size="2.2em" style={{ marginLeft: 10 }} />
          <Youtubecard info={props.info} countervalues={[20, 10, 70]} />
        </div>
      </div>
    );
  } else if (props.c === "Facebook") {
    return (
      <div>
        <div className="row screens">
          <h3>Facebook Analysis </h3>
          <FaFacebook color="blue" size="2.2em" style={{ marginLeft: 10 }} />
          <Maincard
            info={props.info}
            countervalues={[20, 10, 70]}
            data={[128, 229, 33, 436, 99, 132, 233]}
          />
        </div>
      </div>
    );
  } else if (props.c === "Instagram") {
    return (
      <div>
        <div className="row screens">
          <h3>Instagram Analysis </h3>
          <FaInstagram
            color="#e1306c"
            size="2.2em"
            style={{ marginLeft: 10 }}
          />
          <Maincard
            info={props.info}
            countervalues={[20, 10, 70]}
            data={[128, 229, 33, 436, 99, 132, 233]}
          />
        </div>
      </div>
    );
  } else {
    return <div>{props.c}</div>;
  }
};
