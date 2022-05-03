import { useState } from "react";
import { useParams } from "react-router-dom";
import AddRoom from "./AddRoom";
import RoomsList from "./RoomsList";

const Rooms = () => {
  const id = useParams();

  const [userId, setUserId] = useState("test");
  const [rooms, setRooms] = useState([
    { roomName: "test1", roomIntro: "test1 intros", roomId: "a1" },
    { roomName: "test2", roomIntro: "test2 intros", roomId: "b2" },
  ]);

  const addRoomFunc = (room) => {
    setRooms([...rooms, room]);
  };

  return (
    <div>
      접속중인 아이디 : {userId}
      <AddRoom addRoomFunc={addRoomFunc} />
      <RoomsList rooms={rooms} />
    </div>
  );
};

export default Rooms;
