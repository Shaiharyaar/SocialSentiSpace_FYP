import React from "react";
import "../../resources/css/profile.css";
function Profile(props) {
  return (
    <div className="body1">
      <aside class="profile-card">
        <header>
          <a target="_blank" href="#">
            <img
              src={
                "https://scontent.fisb6-1.fna.fbcdn.net/v/t31.0-8/23270132_1912325568781006_8763253149887637994_o.jpg?_nc_cat=107&_nc_sid=174925&_nc_ohc=DMek1jgKip4AX-K-SJm&_nc_ht=scontent.fisb6-1.fna&oh=7164ae08be58ecf7f40c775e91056fe4&oe=5F6AD455"
              }
              class="hoverZoomLink"
            />
          </a>

          <h4>{"Haris Khan"}</h4>
        </header>

        <div class="profile-bio">
          <p>
            <strong>Email: </strong>
            {"Hariskhan55@gmail.com"}
            <br />
            <br />
            <strong>Gender: </strong>
            {"Male"}
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
}
export default Profile;
