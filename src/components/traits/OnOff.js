import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { callDeviceControlAPI } from "../../serivce/APICallService";

const OnOff = ({ trait, connection, deviceId }) => {
  console.log(trait);
  const [isOn, setIsOn] = useState(trait.state.on);
  const onChangeCheck = (event) => {
    const {
      target: { checked },
    } = event;
    setIsOn(checked);

    callDeviceControlAPI(
      connection,
      deviceId,
      "action.devices.commands.OnOff",
      {
        on: checked,
      }
    );
  };

  return (
    <div>
      <label>OnOff</label>
      <input type="checkbox" checked={isOn} onChange={onChangeCheck} />
    </div>
  );
};

export default OnOff;
