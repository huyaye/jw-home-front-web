export function getAuthDetails() {
  return {
    uid: window.localStorage.getItem("uid"),
    name: window.localStorage.getItem("name"),
    email: window.localStorage.getItem("email"),
    access_token: window.localStorage.getItem("access_token"),
    refresh_token: window.localStorage.getItem("refresh_token"),
  };
}

export function setAuthDetails(uid, name, email, access_token, refresh_token) {
  window.localStorage.setItem("uid", uid);
  window.localStorage.setItem("name", name);
  window.localStorage.setItem("email", email);
  window.localStorage.setItem("access_token", access_token);
  window.localStorage.setItem("refresh_token", refresh_token);
}

export function deleteAuthDetails() {
  window.localStorage.removeItem("uid");
  window.localStorage.removeItem("name");
  window.localStorage.removeItem("email");
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("refresh_token");
}
