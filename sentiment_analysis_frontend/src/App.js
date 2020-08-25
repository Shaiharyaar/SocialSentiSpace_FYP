import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./resources/css/style.css";
import "./vendors/css/grid.css";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./Routes/comp_routes";
import axiosInstance from "./Jwt";
function App() {
  return (
    <Router>
      <BaseRouter></BaseRouter>
    </Router>
  );
}

export default App;
