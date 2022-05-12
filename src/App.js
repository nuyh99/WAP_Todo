import { Route, Routes } from "react-router-dom";
import PersonalRooms from "./RoomsList/PersonalRooms";
import RoomDetail from "./RoomDetail/RoomDetail";
import Login from "./Register/Login";
import Form from "./Register/Form";
import { Cookies } from "react-cookie";

function App() {
  const isAuth = sessionStorage.getItem("isAuth");
  console.log(isAuth);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/user/:userid" element={<PersonalRooms />}></Route>
        <Route path="/room/:roomid" element={<RoomDetail />}></Route>
        <Route path="/signup" element={<Form />}></Route>
      </Routes>
    </div>
  );
}

export default App;
