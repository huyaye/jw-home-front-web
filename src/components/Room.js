import React from "react";
import Device from "./Device";

const Room = ({ room }) => {
  return (
    <>
      <div className="room">
        <div className="roomName">{room.roomName}</div>
        {room.devices &&
          room.devices.map((device) => <Device device={device} />)}
      </div>
    </>
  );
};

export default Room;
