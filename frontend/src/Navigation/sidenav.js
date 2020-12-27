import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
export const Sidenavbar = (props) => {
  useEffect(() => {
    getUser();
  }, []);

  const [image, setimage] = useState(null);
  var user = {};

  const handlename = (name) => {
    props.setname(name);
  };

  const getUser = () => {
    if (localStorage.getItem("UserInfo")) {
      const u = localStorage.getItem("UserInfo");
      user = JSON.parse(u).data.User;
    }
    setimage(user.image);
  };

  const history = useHistory();

  const handlelogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <nav className="main-menu">
      <Avatar className="image" src={image} />

      <ul>
        <li>
          <NavLink to="/dashboard" onClick={() => handlename("Dashboard")}>
            <a>
              <i className="fa fa-home fa-2x"></i>
              <span className="nav-text">Dashboard</span>
            </a>
          </NavLink>
        </li>
        <li className="has-subnav">
          <NavLink to="/profile" onClick={() => handlename("Profile")}>
            <a>
              <i className="fa fa-laptop fa-2x"></i>
              <span className="nav-text">User Profile</span>
            </a>
          </NavLink>
        </li>
        <div className="dropdown">
          <li>
            <NavLink to="/twitter" onClick={() => handlename("Twitter")}>
              <a>
                <i className="fa fa-bar-chart-o fa-2x"></i>
                <span className="nav-text">Graphs {"&"} Statistics </span>
              </a>
            </NavLink>
          </li>
          <div className="dropdown-content">
            <li className="has-subnav">
              <NavLink to="/twitter" onClick={() => handlename("Twitter")}>
                <a>
                  <i className="fa fa-twitter fa-2x" />
                  <span className="nav-text"> Twitter Charts</span>
                </a>
              </NavLink>
            </li>
            <li className="has-subnav">
              <NavLink to="/facebook" onClick={() => handlename("Facebook")}>
                <a>
                  <i className="fa fa-facebook fa-2x" />
                  <span className="nav-text">Facebook Charts</span>
                </a>
              </NavLink>
            </li>
            <li className="has-subnav">
              <NavLink to="/youtube" onClick={() => handlename("Youtube")}>
                <a>
                  <i className="fa fa-youtube fa-2x" />
                  <span className="nav-text"> Youtube Charts</span>
                </a>
              </NavLink>
            </li>
            <li className="has-subnav">
              <NavLink to="/instagram" onClick={() => handlename("Instagram")}>
                <a>
                  <i className="fa fa-instagram fa-2x" />
                  <span className="nav-text"> Instagram Charts</span>
                </a>
              </NavLink>
            </li>
          </div>
        </div>
      </ul>

      <ul className="logout">
        <li>
          <a href="#" onClick={handlelogout}>
            <i className="fa fa-power-off fa-2x"></i>
            <span className="nav-text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
