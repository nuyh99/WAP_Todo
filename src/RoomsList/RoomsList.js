import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserDispatch } from "./PersonalRooms";

const RoomsList = (prop) => {
  console.log(prop);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>방목록</h1>
      <div style={{ width: "175vh" }}>
        {prop.rooms.map((detail) => {
          return (
            <div
              key={detail.code}
              style={{
                float: "left",
                margin: "0px 0px 0px 10px",
                border: "3px solid black",
                width: "50vh",
                boxSizing: "borderbox",
              }}
            >
              <Link
                to={`/room/${detail.num}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                방 이름 : {detail.title}
                <br />방 한줄 소개 : {detail.introduce}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomsList;
