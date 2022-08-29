import React from "react";
import { useHistory } from "react-router-dom";
import { getAuthDetails, deleteAuthDetails } from "../auth/AuthDetails";
import KeycloakLogout from "../auth/KeycloakLogout";

const Profile = () => {
  const history = useHistory();
  const authDetails = getAuthDetails();
  console.log(authDetails);
  if (authDetails.uid == null) {
    history.push("/");
  }

  const onLogOutClick = () => {
    deleteAuthDetails();
    KeycloakLogout(authDetails);
    history.push("/");
  };

  return (
    <div>
      <ul>
        <li>{authDetails.uid}</li>
        <li>{authDetails.name}</li>
        <li>{authDetails.email}</li>
        <li>{authDetails.token}</li>
      </ul>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
