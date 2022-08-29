import { KEYCLOAK_ID } from "../env";
import queryString from "query-string";
import URL from "url";

const KeycloakLogout = async (authDetails) => {
  let params = {
    client_id: KEYCLOAK_ID,
    refresh_token: authDetails.refresh_token,
  };

  const post_data = queryString.stringify(params);
  let parsedUrl = URL.parse(
    `http://localhost:8080/realms/oauth2-demo-realm/protocol/openid-connect/logout`,
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
      `http://localhost:8080/realms/oauth2-demo-realm/protocol/openid-connect/logout`,
      payload
    )
  ).json();
  console.log(response);
  // const token_object = JSON.parse(res.body);
};

export default KeycloakLogout;
