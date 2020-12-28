import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login, Signup } from "../Components/login";
import { Mainscreen } from "../Components/Main";
import { Splashscreen } from "../Components/splash";
import { Facebookcomponent } from "../Components/Sub_components/Chart_Components/FacebookComponent";
import { Instagramcomponent } from "../Components/Sub_components/Chart_Components/InstagramComponent";
import { Twittercomponent } from "../Components/Sub_components/Chart_Components/TwitterComponent";
import { Youtubecomponent } from "../Components/Sub_components/Chart_Components/YoutubeComponent";
import { Dashboard } from "../Components/Sub_components/DashboardPage";
import Profile from "../Components/Sub_components/ProfilePage";
export const BaseRouter = () => (
  <Switch>
    <Route exact path="/">
      <Splashscreen />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/signup">
      <Signup />
    </Route>

    <Mainscreen>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/twitter">
        <Twittercomponent />
      </Route>
      <Route exact path="/facebook">
        <Facebookcomponent />
      </Route>
      <Route exact path="/youtube">
        <Youtubecomponent />
      </Route>

      <Route exact path="/instagram">
        <Instagramcomponent />
      </Route>
    </Mainscreen>
  </Switch>
);
