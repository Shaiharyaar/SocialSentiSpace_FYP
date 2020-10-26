import React, { useEffect, useState } from "react";

export const Profile = () => {
  useEffect(() => {
    getUser();
  }, []);
  const [user, setuser] = useState({});
  const getUser = () => {
    if (localStorage.getItem("UserInfo")) {
      const u = localStorage.getItem("UserInfo");
      setuser(JSON.parse(u).data.User);
      console.log("USER: ", user);
    }
  };

  return (
    <div className="body1">
      <aside class="profile-card">
        <header>
          <a target="_blank" href="#">
            <img src={user.image} class="hoverZoomLink" />
          </a>

          <h4>{user.firstname + " " + user.lastname}</h4>
        </header>

        <div class="profile-bio">
          <p>
            <strong>Email: </strong>
            {user.email}
            <br />
            <br />
            <strong>Gender: </strong>
            {user.gender}
            <br />
          </p>
          <a
            href="#"
            className="btn btn-full profbtn"
            style={{
              position: "absolute",
              width: 150,
              height: 35,
              left: 67,
              top: 350,
            }}
          >
            Your Profile
          </a>
        </div>
      </aside>
    </div>
  );
};
