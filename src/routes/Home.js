import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { getAuthDetails } from "../auth/AuthDetails";

const Home = () => {
  const history = useHistory();
  const authDetails = getAuthDetails();
  console.log(authDetails);
  if (authDetails.uid == null) {
    history.push("/");
  }

  const getHomeList = () => {};

  useEffect(() => {
    const homeList = getHomeList();
  }, []);

  return (
    <>
      <div>home</div>
      <Link to="/profile">Profile</Link>
    </>
  );
};

export default Home;
