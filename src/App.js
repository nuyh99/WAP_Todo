import { Route, Routes } from "react-router-dom";
import PersonalRooms from "./RoomsList/PersonalRooms";
import RoomDetail from "./RoomDetail/RoomDetail";
import ToDoDetail from "./RoomDetail/ToDoDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/user/:userid" element={<PersonalRooms />}></Route>
        <Route path="/room/:roomid" element={<RoomDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
