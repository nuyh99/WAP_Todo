import axios from "axios";
import React, { useReducer, useState, useEffect } from "react";

import AddRoom from "./AddRoom";
import EnterRoom from "./EnterRoom";
import RoomsList from "./RoomsList";
import Loading from "../Loading";

import { Button } from "@mui/material";

const reducer = (state, action) => {
  console.log(action.room);
  switch (action.type) {
    case "GET_ROOMS_LIST":
      return state;
    case "ADD_ROOM_LIST":
      return [...state, ...action.room];
    default:
      return state;
  }
};

// Context API로 전역 값 관리
export const UserDispatch = React.createContext(null);

const Rooms = () => {
  axios.defaults.withCredentials = true;
  // 세션에 저장된 name을 가져온다.
  const name = sessionStorage.getItem("name");

  // 방을 가져오는중인지
  const [isLoading, setIsLoading] = useState(false);

  // 로그아웃하면 sessionStorage에 Item을 지운다.
  const logoutFunc = () => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("isAuth");
    // 메인화면으로 새로고침
    window.location.replace("/");
  };

  const [roomList, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    setIsLoading(true);
    getRooms();
  }, []);

  // 방 목록 가져오기
  const getRooms = async () => {
    const res = await axios({
      method: "get",
      url: "/user/rooms",
    });
    setIsLoading(false);
    if (res.status === 200) {
      console.log(res.data);
      if (res.data.length !== 0) {
        dispatch({
          type: "ADD_ROOM_LIST",
          room: res.data,
        });
      }
    }
  };

  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <div
        style={{
          textAlign: "right",
          margin: "0 15px 0 0",
          fontStyle: "italic",
        }}
      >
        접속중인 아이디 : {name}
      </div>
      <UserDispatch.Provider value={dispatch}>
        <div style={{ textAlign: "right" }}>
          <AddRoom />
          <EnterRoom />
          <Button
            onClick={logoutFunc}
            variant="outlined"
            style={{ margin: "7px 15px 0 0", width: "180px" }}
          >
            로그아웃
          </Button>
        </div>

        <RoomsList rooms={roomList} />
      </UserDispatch.Provider>
    </div>
  );
};

export default Rooms;
