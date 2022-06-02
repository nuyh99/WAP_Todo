import { Route, Routes } from "react-router-dom";
import axios from "axios";

import PersonalRooms from "./RoomsList/PersonalRooms";
import RoomDetail from "./RoomDetail/RoomDetail";
import Login from "./Register/Login";
import Form from "./Register/Form";
import Chat from "./RoomDetail/Chat";

function App() {
  axios.defaults.withCredentials = true;

  // 로그인 여부를 확인한다.
  const isAuth = sessionStorage.getItem("isAuth");

  return (
    <div>
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<PersonalRooms />}></Route>
            <Route path="/room/:roomid" element={<RoomDetail />}></Route>
            <Route path="/room/chat/:roomid" element={<Chat />}></Route>
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
