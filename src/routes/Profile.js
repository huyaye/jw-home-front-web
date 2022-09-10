import React from "react";
import { useHistory } from "react-router-dom";
import { getAuthDetails, deleteAuthDetails } from "../auth/AuthDetails";
import { logoutOidcSession } from "../auth/OpenIdConnectService";

const Profile = () => {
  const history = useHistory();
  const authDetails = getAuthDetails();
  if (authDetails.uid == null) {
    history.push("/");
  }

  const onLogOutClick = async () => {
    deleteAuthDetails();
    await logoutOidcSession(authDetails.refresh_token);
    history.push("/");
  };

  return (
    <div>
      <ul>
        <li>{authDetails.uid}</li>
        <li>{authDetails.name}</li>
        <li>{authDetails.email}</li>
        <li>{authDetails.access_token}</li>
      </ul>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
