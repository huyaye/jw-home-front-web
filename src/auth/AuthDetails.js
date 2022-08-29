export function getAuthDetails() {
  return {
    uid: window.localStorage.getItem("uid"),
    name: window.localStorage.getItem("name"),
    email: window.localStorage.getItem("email"),
    token: window.localStorage.getItem("token"),
    refresh_token: window.localStorage.getItem("refresh_token"),
  };
}

export function setAuthDetails(uid, name, email, token, refresh_token) {
  window.localStorage.setItem("uid", uid);
  window.localStorage.setItem("name", name);
  window.localStorage.setItem("email", email);
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("refresh_token", refresh_token);
}

export function deleteAuthDetails() {
  console.log("deleteAuthDetails");
  window.localStorage.removeItem("uid");
  window.localStorage.removeItem("name");
  window.localStorage.removeItem("email");
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("refresh_token");
}
