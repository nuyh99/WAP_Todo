import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserDispatch } from "./PersonalRooms";

const RoomsList = (prop) => {
  prop.rooms.map((intro) => console.log(intro.roomName));
  return (
    <div>
      <h1>방목록</h1>
      {prop.rooms.map((detail) => {
        return (
          <div key={detail.roomId}>
            <Link to={`/room/${detail.roomId}`}>
              이름 : {detail.roomName} 소개 : {detail.roomIntro}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RoomsList;
