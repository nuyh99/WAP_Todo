import { useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CancelIcon from "@mui/icons-material/Cancel";
import CreateIcon from "@mui/icons-material/Create";

const EnterRoom = () => {
  const [open, setOpen] = useState(false);
  const [enterCode, setEnderCode] = useState("");

  const handleEnterRoomClick = () => {
    setOpen((prev) => !prev);
    setEnderCode("");
  };

  const onChangeFunc = (e) => {
    const { value } = e.target;
    setEnderCode(value);
  };

  // 05-14 고칠 내용
  // 1. api 고치기
  // 2. 유효하다면 방에 바로 들어가기
  // 3. 뒤로 나왔을 때 해당 방이 불러올 수 있도록
  const onSubmitFunc = async (e) => {
    e.preventDefault();
    console.log("hi");
    // 오류 난다.
    const res = await axios({
      method: "post",
      url: `http://localhost:8080/room/invite/${enterCode}`,
    });
    if (res.status === 200) {
      console.log(res.data);
    } else {
      console.log("asd");
      window.alert("Error!");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleEnterRoomClick}
        endIcon={<AddBoxIcon />}
      >
        Enter Room
      </Button>
      <Dialog open={open} onClose={handleEnterRoomClick}>
        <form onSubmit={onSubmitFunc}>
          <DialogTitle>방 초대 코드를 입력하세요.</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="roomName"
              label="초대 코드 입력"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChangeFunc}
              value={enterCode}
              required
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="outlined"
              color="success"
              endIcon={<CreateIcon />}
            >
              입장하기
            </Button>
            <Button
              onClick={handleEnterRoomClick}
              variant="outlined"
              color="error"
              endIcon={<CancelIcon />}
            >
              취소하기
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EnterRoom;
