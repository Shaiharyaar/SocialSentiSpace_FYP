import React from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "../Components/User/UserProfile";
import HomePage from "../Components/HomePage";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import MainDashboard from "../Components/User/UserMain";
import Dashboard from "../Components/User/dashboard";
import AdminPage from "../Components/Admin/Admin";
import YoutubeComponent from "../Components/User/Components/YoutubeComponent";
import FacebookComponent from "../Components/User/Components/FacebookComponent";
import InstagramComponent from "../Components/User/Components/InstagramComponent";
import TwitterComponent from "../Components/User/Components/TwitterComponent";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/">
      <HomePage />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>{" "}
    <Route exact path="/Signup">
      <Signup />
    </Route>
    <MainDashboard>
      <Route exact path="/userPage">
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
    <Route exact path="/adminPage">
      <AdminPage />
    </Route>
  </Switch>
);
export default BaseRouter;
