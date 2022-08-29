import { KEYCLOAK_ID, REDIRECT_URI } from "../env";
import queryString from "query-string";
import { CODE_CHALLENGE_METHOD, CODE_CHALLENGE } from "./PCKEConfigs";

const Keycloak = () => {
  return queryString.stringifyUrl({
    url: `http://localhost:8080/realms/oauth2-demo-realm/protocol/openid-connect/auth`,
    query: {
      client_id: KEYCLOAK_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: ["openid", "profile"].join(" "),
      state: JSON.stringify({ provider: "Keycloak" }),
      code_challenge: CODE_CHALLENGE,
      code_challenge_method: CODE_CHALLENGE_METHOD,
    },
  });
};

export default Keycloak();
