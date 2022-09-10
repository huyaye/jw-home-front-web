import React from "react";
import Trait from "./Trait";

const displayTypeName = ({ type }) => {
  switch (type) {
    case "action.devices.types.LIGHT":
      return "LIGHT";
    default:
      return "Unknown";
  }
};

const Device = ({ device }) => {
  console.log(device);
  return (
    <>
      <div className={`device ${device.online ? "" : "disabled"}`}>
        <div className="device_info_container">
          <div className="device_type">{displayTypeName(device)}</div>
          <div className="device_info">{device.name}</div>
          <div className="device_info">{device.serial}</div>
          {!device.online && (
            <div className="device_info">- disconnected -</div>
          )}
        </div>
        <div className="trait_container">
          {device.traits.map((trait) => (
            <Trait
              trait={trait}
              connection={device.connection}
              deviceId={device.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Device;
