import queryString from "query-string";
import {
  CODE_CHALLENGE_METHOD,
  CODE_CHALLENGE,
  CODE_VERIFIER,
} from "./PCKEConfigs";

export function getOidcAuthUrl() {
  return queryString.stringifyUrl({
    url: process.env.REACT_APP_OIDC_AUTH_ENDPOINT,
    query: {
      client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_OIDC_REDIRECT_URI,
      response_type: "code",
      scope: ["openid", "profile"].join(" "),
      state: "state for client protect",
      code_challenge: CODE_CHALLENGE,
      code_challenge_method: CODE_CHALLENGE_METHOD,
    },
  });
}

export async function getOidcToken(code) {
  let params = {
    client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
    code: code,
    grant_type: "authorization_code",
    redirect_uri: process.env.REACT_APP_OIDC_REDIRECT_URI,
    code_verifier: CODE_VERIFIER,
    state: "state for client protect",
  };

  let realHeaders = {};
  realHeaders["Content-Type"] = "application/x-www-form-urlencoded";
  const payload = Object.assign(
    {
      body: queryString.stringify(params),
    },
    {
      method: "POST",
      headers: realHeaders,
    }
  );
  const response = await (
    await fetch(process.env.REACT_APP_OIDC_TOKEN_ENDPOINT, payload)
  ).json();

  return {
    access_token: response.access_token,
    refresh_token: response.refresh_token,
  };
}

export async function getOidcUserInfo(access_token) {
  let userProvider;
  const response = await (
    await fetch(process.env.REACT_APP_OIDC_USERINFO_ENDPOINT, {
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  ).json();
  console.log(response);
  if (response.sub) {
    userProvider = {
      uid: response.preferred_username,
      name: response.name,
      email: response.email,
    };
  }
  return userProvider;
}

export async function logoutOidcSession(refresh_token) {
  let params = {
    client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
    refresh_token: refresh_token,
  };

  let realHeaders = {};
  realHeaders["Content-Type"] = "application/x-www-form-urlencoded";

  const options = {
    method: "POST",
    headers: realHeaders,
  };
  const payload = Object.assign(
    {
      body: queryString.stringify(params),
    },
    options
  );

  await fetch(process.env.REACT_APP_OIDC_LOGOUT_ENDPOINT, payload);
}
