import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import AddRoom from "./AddRoom";
import EnterRoom from "./EnterRoom";
import RoomsList from "./RoomsList";

// useReducer
const reducer = (state, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case "GET_ROOM_LIST":
      return state;
    case "ADD_ROOM_LIST":
      return [...state, action.room];
    case "GET_ROOM_NAME":
      const room_name = state.forEach((element) => {
        return element.roomId === action.roomId;
      });
      return room_name;
    default:
      return state;
  }
};

export const UserDispatch = React.createContext(null);

const Rooms = () => {
  const [userId, setUserId] = useState("test");

  // 초기 방 가져오기
  const rooms = [
    { roomName: "test1", roomIntro: "test1 intros", roomId: "a1" },
    { roomName: "test2", roomIntro: "test2 intros", roomId: "b2" },
    { roomName: "테스트4", roomIntro: "test3 intros", roomId: "bb5" },
  ];

  const [roomList, dispatch] = useReducer(reducer, rooms);

  return (
    <div>
      접속중인 아이디 : {userId}
      <UserDispatch.Provider value={dispatch}>
        <AddRoom />
        <EnterRoom />
        <RoomsList rooms={roomList} />
      </UserDispatch.Provider>
    </div>
  );
};

export default Rooms;
