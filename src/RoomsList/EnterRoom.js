import { useState } from "react";
import React, { useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import AddBoxIcon from "@mui/icons-material/AddBox";
import CancelIcon from "@mui/icons-material/Cancel";
import CreateIcon from "@mui/icons-material/Create";

import { UserDispatch } from "./PersonalRooms";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EnterRoom = () => {
  axios.defaults.withCredentials = true;
  const [open, setOpen] = useState(false);
  const [enterCode, setEnderCode] = useState("");

  console.log(enterCode);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    // Dialog 닫을 때 초기화
    setOpen(false);
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
      method: "get",
      url: "http://localhost:8080/room/invite",
      params: {
        code: enterCode,
      },
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
        onClick={handleClickOpen}
        endIcon={<AddBoxIcon />}
      >
        Enter Room
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={onSubmitFunc}>
          <DialogTitle>Input Room's Invite Code</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="roomName"
              label="Room's Invite Code"
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
              Enter
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="error"
              endIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EnterRoom;
