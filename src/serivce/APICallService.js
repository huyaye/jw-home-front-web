import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAuthDetails, getAuthDetails } from "../auth/AuthDetails";
import { logoutOidcSession } from "../auth/OpenIdConnectService";

export async function callDeviceControlAPI(
  connection,
  deviceId,
  command,
  params
) {
  const authDetails = getAuthDetails();
  try {
    const response = await axios.put(
      process.env.REACT_APP_API_SERVER_ENDPOINT + "/api/v1/devices/control",
      {
        connection: connection,
        deviceId: deviceId,
        command: command,
        params: params,
      },
      {
        headers: {
          Authorization: `Bearer ${authDetails.access_token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
    if (error.response) {
      if (error.response.status === 401) {
        deleteAuthDetails();
        logoutOidcSession(authDetails.refresh_token);
        toast.error("Token is not valid.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: true,
        });
      } else if (error.response.status === 409) {
        toast.error(error.response.data.resultData.cause, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    }
  }
}
