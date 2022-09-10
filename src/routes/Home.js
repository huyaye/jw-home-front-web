import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { getAuthDetails, deleteAuthDetails } from "../auth/AuthDetails";
import axios from "axios";
import RoomList from "../components/RoomList";
import { logoutOidcSession } from "../auth/OpenIdConnectService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const history = useHistory();
  const authDetails = getAuthDetails();
  if (authDetails.uid == null) {
    history.push("/");
  }

  const [loading, setLoading] = useState(true);
  const [homeList, setHomeList] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const getHomeList = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_SERVER_ENDPOINT + "/api/v1/homes",
        {
          headers: {
            Authorization: `Bearer ${authDetails.access_token}`,
          },
        }
      );
      setHomeList(response.data.resultData.homes);
      setSelectedHome(response.data.resultData.homes[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      deleteAuthDetails();
      logoutOidcSession(authDetails.refresh_token);
    }
  };
  const onChangeHome = (event) => {
    const {
      target: { value },
    } = event;
    for (const home of homeList) {
      if (home.id === value) {
        setSelectedHome(home);
      }
    }
  };

  useEffect(() => {
    getHomeList();
  }, []);

  return (
    <>
      {loading ? (
        <h1 align="center">Loading...</h1>
      ) : (
        <>
          <header className="header">
            <div className="header_left" align="right">
              <select name="home" id="home" onChange={onChangeHome}>
                {homeList.map((home) => (
                  <option key={home.id} value={home.id}>
                    {home.homeName}
                  </option>
                ))}
              </select>
            </div>
            <div className="header_right" align="right">
              <Link to="/profile">Profile</Link>
            </div>
          </header>
          <RoomList home={selectedHome} />
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default Home;
