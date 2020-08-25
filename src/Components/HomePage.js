import React from "react";
function HomePage() {
  return (
    <div className="body">
      <header className="header">
        <h1 className="heading">
          Understand your audience feelings.
          <br />
          Sentimental Analysis.
        </h1>
        <div>
          <a className="btn btn-full js--scroll-to-plans" href="/login">
            Get Started
          </a>
          <a
            className="btn btn-ghost js--scroll-to-start"
            target="_blank"
            href="https://towardsdatascience.com/sentiment-analysis-concept-analysis-and-applications-6c94d6f58c17"
          >
            Learn More
          </a>
        </div>
      </header>
    </div>
  );
}
export default HomePage;
