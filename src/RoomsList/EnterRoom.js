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
import Swal from "sweetalert2";

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

  const onSubmitFunc = async (e) => {
    e.preventDefault();
    setOpen(false);
    const res = await axios({
      method: "post",
      url: "/room/invite",
      data: {
        code: enterCode,
      },
    });
    if (res.status === 200) {
      if (res.data !== "") {
        console.log(res.data);
        window.location.replace("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "존재하지 않는 코드에요.",
        });
      }
    }
  };

  return (
    <div style={{ margin: "7px 15px 0 0" }}>
      <Button
        variant="contained"
        onClick={handleEnterRoomClick}
        endIcon={<AddBoxIcon />}
        style={{ width: "180px" }}
      >
        Enter Room
      </Button>
      <Dialog open={open} onClose={handleEnterRoomClick}>
        <form onSubmit={onSubmitFunc}>
          <DialogTitle>입장할 방의 초대 코드를 입력하세요.</DialogTitle>
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
