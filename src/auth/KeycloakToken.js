import { KEYCLOAK_ID, KEYCLOAK_SECRET, REDIRECT_URI } from "../env";
import queryString from "query-string";
import { CODE_VERIFIER } from "./PCKEConfigs";
import URL from "url";

const KeycloakToken = async (code) => {
  let params = {
    client_id: KEYCLOAK_ID,
    code: code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
    code_verifier: CODE_VERIFIER,
    state: JSON.stringify({ provider: "Keycloak" }),
    // proxyBaseUrl: `http://localhost:8080/auth/realms/oauth2-demo-pkce-client/protocol/openid-connect/token`
  };

  const post_data = queryString.stringify(params);
  let parsedUrl = URL.parse(
    `http://localhost:8080/realms/oauth2-demo-realm/protocol/openid-connect/token`,
    true
  );

  let realHeaders = {};
  realHeaders["Host"] = parsedUrl.host;
  realHeaders["Content-Length"] = post_data.length;
  realHeaders["Content-Type"] = "application/x-www-form-urlencoded";

  const options = {
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.pathname,
    method: "POST",
    headers: realHeaders,
  };

  const payload = Object.assign(
    {
      body: post_data,
    },
    options
  );

  let response = await (
    await fetch(
      `http://localhost:8080/realms/oauth2-demo-realm/protocol/openid-connect/token`,
      payload
    )
  ).json();
  console.log(response);
  // const token_object = JSON.parse(res.body);

  return {
    token: response.access_token,
    refresh_token: response.refresh_token,
  };
};

export default KeycloakToken;
