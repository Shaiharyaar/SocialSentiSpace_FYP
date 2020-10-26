import React from "react";

export const Splashscreen = () => {
  return (
    <div className="body">
      <header className="header">
        <h1 className="heading">
          Understand your audience feelings.
          <br />
          Sentimental Analysis.
        </h1>
        <div>
          <a className="btn btn-full" href="/login">
            Get Started
          </a>
          <a
            className="btn btn-ghost"
            target="_blank"
            href="https://towardsdatascience.com/sentiment-analysis-concept-analysis-and-applications-6c94d6f58c17"
          >
            Learn More
          </a>
        </div>
      </header>
    </div>
  );
};
