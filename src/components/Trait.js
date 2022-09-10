import React from "react";
import Brightness from "./traits/Brightness";
import ColorSetting from "./traits/ColorSetting";
import OnOff from "./traits/OnOff";

const Trait = ({ trait, connection, deviceId }) => {
  const getForm = (trait) => {
    switch (trait.type) {
      case "action.devices.traits.OnOff":
        return (
          <OnOff trait={trait} connection={connection} deviceId={deviceId} />
        );
      case "action.devices.traits.Brightness":
        return (
          <Brightness
            trait={trait}
            connection={connection}
            deviceId={deviceId}
          />
        );
      case "action.devices.traits.ColorSetting":
        return (
          <ColorSetting
            trait={trait}
            connection={connection}
            deviceId={deviceId}
          />
        );
      default:
        return <div>Unknown Trait - {trait.type}</div>;
    }
  };

  return <div className="trait">{getForm(trait)}</div>;
};

export default Trait;
