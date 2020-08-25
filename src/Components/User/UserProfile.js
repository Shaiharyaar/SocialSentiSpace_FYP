import React from "react";
import { Container } from "react-bootstrap";
import "../../resources/css/profile.css";
function Profile(props) {
  const data = JSON.parse(localStorage.getItem("UserInfo"));
  console.log(data);
  return (
    <Container>
      <h2 style={{ fontSize: "260%", marginBottom: 30 }}>User Profile</h2>
    </Container>
  );
}
export default Profile;
