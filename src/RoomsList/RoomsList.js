import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserDispatch } from "./PersonalRooms";

const RoomsList = (prop) => {
  prop.rooms.map((intro) => console.log(intro.roomName));
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>방목록</h1>
      <div style={{ width: "175vh" }}>
        {prop.rooms.map((detail) => {
          return (
            <div
              key={detail.roomId}
              style={{
                float: "right",
                margin: "0px 0px 0px 10px",
                border: "3px solid black",
                width: "50vh",
                boxSizing: "borderbox",
              }}
            >
              <Link
                to={`/room/${detail.roomId}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                방 이름 : {detail.roomName}
                <br />방 한줄 소개 : {detail.roomIntro}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomsList;
