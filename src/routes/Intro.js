import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import KeycloakAuthUrl from "../auth/Keycloak";
import KeycloakToken from "../auth/KeycloakToken";
import KeycloakUser from "../auth/KeycloakUser";
import { getAuthDetails, setAuthDetails } from "../auth/AuthDetails";

const Intro = () => {
  const history = useHistory();

  const loadAuth = async () => {
    const code_url = /((\?|\&)code\=)[^\&]+/.exec(window.location.search);
    const state_provider = /((\?|\&)state\=)[^\&]+/.exec(
      window.location.search
    );

    const authDetails = getAuthDetails();
    if (code_url != null) {
      let code = decodeURIComponent(
        String(code_url[0]).replace(/(\?|\&)?code\=/, "")
      );
      let provider_obj = String(decodeURIComponent(state_provider[0])).replace(
        /(\?|\&)?state\=/,
        ""
      );
      const provider = JSON.parse(provider_obj).provider;
      if (authDetails.uid == null) {
        const token = await KeycloakToken(code);
        const userInfo = await KeycloakUser(token.token);
        setAuthDetails(
          userInfo.uid,
          userInfo.name,
          userInfo.email,
          token.token,
          token.refresh_token
        );
        history.push("/home");
      }
    } else if (authDetails.uid == null) {
      window.location.href = KeycloakAuthUrl;
    } else {
      history.push("/home");
    }
  };

  useEffect(() => {
    loadAuth();
  }, []);
};

export default Intro;
