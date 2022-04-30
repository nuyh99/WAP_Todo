import { Route, Routes } from "react-router-dom";
import PersonalRooms from "./Rooms/PersonalRooms";
import RoomDetail from "./Rooms/RoomDetail";

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
