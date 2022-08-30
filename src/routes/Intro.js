import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getAuthDetails, setAuthDetails } from "../auth/AuthDetails";
import {
  getOidcAuthUrl,
  getOidcToken,
  getOidcUserInfo,
} from "../auth/OpenIdConnectService";

const Intro = () => {
  const history = useHistory();
  const location = useLocation();

  const loadAuth = async () => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    const authDetails = getAuthDetails();
    if (code != null) {
      const tokenInfo = await getOidcToken(code);
      const userInfo = await getOidcUserInfo(tokenInfo.access_token);
      setAuthDetails(
        userInfo.uid,
        userInfo.name,
        userInfo.email,
        tokenInfo.access_token,
        tokenInfo.refresh_token
      );
      history.push("/home");
    } else if (authDetails.uid == null) {
      window.location.href = getOidcAuthUrl();
    } else {
      history.push("/home");
    }
  };

  useEffect(() => {
    loadAuth();
  }, []);
};

export default Intro;
