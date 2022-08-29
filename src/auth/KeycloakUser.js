const KeycloakUser = async (token) => {
  let userProvider;
  const res = await fetch(
    `http://localhost:8080/realms/oauth2-demo-realm/protocol/openid-connect/userinfo`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const res_obj = await res.json();
  const me = res_obj;
  console.log(me);
  if (me.sub) {
    userProvider = {
      uid: me.preferred_username,
      name: me.name,
      email: me.email,
    };
  }
  return userProvider;
};

export default KeycloakUser;
