import React from "react";
import {SplashLoader} from "../Components/loading_animations/cardloading"
import Logo from "../resources/img/logoblackbg.png"
import mainbg from "../resources/img/splashbg.png"

export const Splashscreen = () => {
  return (
    <div className="mainmain">
    <div className="mainPage container-fluid">
      {/* <div className="header"> 
            <div className="logoBox"></div>
            
      </div> */}
      <div className="row">
        <div className="col-md-7 leftBox container">
              <img src={Logo}
                    style={{
                      height:"15vh",
                      width:"30vh",
                      marginTop: "20vh",
                      marginBottom: "10vh",
                    }}
              />
              <h1>Understand your audience sentiment</h1>
              <div className="d-flex justify-content-around p-4" style={{}}>
                  <a className="btn btn-full button1" href="/login" style={{width: "30%"}}>
                        Get Started
                  </a>
                  <a
                    style={{width: "30%"}}
                    className="btn btn-ghost"
                    target="_blank"
                    href="https://towardsdatascience.com/sentiment-analysis-concept-analysis-and-applications-6c94d6f58c17"
                  >
                    Learn More
                  </a>

              </div>
              
        </div>
        <div className="col-md-5 rightBox container">
          <div className="loaderMain">
            <SplashLoader />
          </div>
        </div>
      </div>
      <style jsx>
        { 
        //language=CSS
          `
          .mainmain{
            background: #ece9e6; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #ece9e6, #ffffff); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #ece9e6, #ffffff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

          }
          .mainPage{
              background: url(${mainbg}) repeat-x center;
          }


          // .header{
          //   display: flex;
          //   justify-content: center;
          // }
          // .logoBox{
          //   padding: 1vh 15vh 0vh 15vh;
          //   background-color: #212121;
          //   align-items: center;
          //   clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 52% 50%, 50% 50%, 0% 50%);
          // }
          .rightBox{
              // background-color: #f9f9f9;
             
          }
          .leftBox{
            background: #141E30;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            width:100%;
            height: 100vh;
            paddingTop: 5vh;
            paddingBottom: 5vh;
            clip-path: polygon(56% 15%, 100% 26.5%, 100% 26.5%, 100% 74%, 100% 74%, 56% 87%, 0 87%, 0 76%, 0 36%, 0 15%);
          }
          .leftBox h1{
              font-family: -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              Roboto,
              "Helvetica Neue",
              Arial,
              "Noto Sans",
              sans-serif,
              "Apple Color Emoji",
              "Segoe UI Emoji",
              "Segoe UI Symbol",
              "Noto Color Emoji" !important;
              font-size: 4vh;
              font-weight: bold;
              color: #ece9e6;
              text-shadow: 1px 1px 5px rgba(236,233,230,0.61);
          }
          .loaderMain{
            margin-right: auto;
            margin-left: auto;
            margin-top: 16vh;
          }

          

        
        
        `}
      </style>
      {/* <header className="header">
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
      </header> */}
    </div>
    </div>
  );
};
