import React, { useState } from "react";
import { callDeviceControlAPI } from "../../serivce/APICallService";

const Brightness = ({ trait, connection, deviceId }) => {
  const [brightness, setBrightness] = useState(trait.state.brightness);
  const onChangeBrightness = (event) => {
    const {
      target: { value },
    } = event;
    setBrightness(value);
  };
  const controlBrightness = (event) => {
    const {
      target: { value },
    } = event;
    callDeviceControlAPI(
      connection,
      deviceId,
      "action.devices.commands.BrightnessAbsolute",
      {
        brightness: Number(value),
      }
    );
  };

  return (
    <>
      <label>Brightness</label>
      <div className="slider_form">
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={onChangeBrightness}
          onMouseUp={controlBrightness}
          onTouchEnd={controlBrightness}
          className="slider_area"
        />
        <span className="slider_value">{brightness}</span>
      </div>
    </>
  );
};

export default Brightness;
