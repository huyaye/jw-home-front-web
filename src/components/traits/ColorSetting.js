import React, { useState } from "react";
import { callDeviceControlAPI } from "../../serivce/APICallService";

const ColorSetting = ({ trait, connection, deviceId }) => {
  const [colortemp, setColortemp] = useState(trait.state.color.temperatureK);
  const onChangeColortemp = (event) => {
    const {
      target: { value },
    } = event;
    setColortemp(value);
  };
  const controlColortemp = (event) => {
    const {
      target: { value },
    } = event;
    callDeviceControlAPI(
      connection,
      deviceId,
      "action.devices.commands.ColorAbsolute",
      {
        color: {
          temperature: Number(value),
        },
      }
    );
  };

  return (
    <div>
      <label>ColorTemp</label>
      <div className="slider_form">
        <input
          type="range"
          min={trait.attr.colorTemperatureRange.temperatureMinK}
          max={trait.attr.colorTemperatureRange.temperatureMaxK}
          value={colortemp}
          onChange={onChangeColortemp}
          onMouseUp={controlColortemp}
          onTouchEnd={controlColortemp}
          className="slider_area"
        />
        <span className="slider_value">{colortemp}</span>
      </div>
    </div>
  );
};

export default ColorSetting;
