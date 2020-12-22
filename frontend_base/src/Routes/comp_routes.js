import React from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "../Components/User/UserProfile";
import MainDashboard from "../Components/User/UserMain";
import Dashboard from "../Components/User/dashboard";
import YoutubeComponent from "../Components/User/Components/YoutubeComponent";
import FacebookComponent from "../Components/User/Components/FacebookComponent";
import InstagramComponent from "../Components/User/Components/InstagramComponent";
import TwitterComponent from "../Components/User/Components/TwitterComponent";

const BaseRouter = () => (
  <Switch>
    <MainDashboard>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/userProfile">
        <Profile />
      </Route>
      <Route exact path="/twitter">
        <TwitterComponent />
      </Route>
      <Route exact path="/youtube">
        <YoutubeComponent />
      </Route>
      <Route exact path="/instagram">
        <InstagramComponent />
      </Route>
      <Route exact path="/facebook">
        <FacebookComponent />
      </Route>
    </MainDashboard>
  </Switch>
);
export default BaseRouter;
