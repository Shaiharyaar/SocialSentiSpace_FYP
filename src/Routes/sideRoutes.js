import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../Components/User/dashboard";
import Signup from "../Components/Signup";
const SideRouter = () => (
  <Switch>
    <Route exact path="/userPage">
      <Dashboard />
    </Route>{" "}
    <Route exact path="/signup">
      <Signup />
    </Route>
  </Switch>
);
export default SideRouter;
