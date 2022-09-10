import React from "react";
import Room from "./Room";

const RoomList = ({ home }) => {
  let noRoom = {
    roomName: "noRoom",
    devices: home.noRoomDevices,
  };

  return (
    <div className="roomList">
      <Room room={noRoom} />
      {home.rooms.map((room) => (
        <div key={room.roomName}>
          <Room room={room} />
        </div>
      ))}
    </div>
  );
};

export default RoomList;
