import { Route, Routes } from "react-router-dom";
import PersonalRooms from "./RoomsList/PersonalRooms";
import RoomDetail from "./RoomDetail/RoomDetail";
import Login from "./Register/Login";
import Form from "./Register/Form";
import { useReducer, useState } from "react";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;

  const isAuth = sessionStorage.getItem("isAuth");

  console.log(isAuth);

  return (
    <div>
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<PersonalRooms />}></Route>
            <Route path="/room/:roomid" element={<RoomDetail />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Form />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
