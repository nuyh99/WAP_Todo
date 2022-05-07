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
import uuid from "react-uuid";

const AddRoom = () => {
  const [open, setOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomName: "",
    roomIntro: "",
    roomId: "",
  });

  const { roomName, roomIntro } = newRoom; // 비구조화 할당으로 객체 분해

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    // Dialog 닫을 때 초기화
    setOpen(false);
    setNewRoom({
      roomName: "",
      roomIntro: "",
    });
  };

  const onChangeFunc = (e) => {
    const { value, name } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const dispatch = useContext(UserDispatch);

  const onSubmitFunc = (e) => {
    e.preventDefault();
    const id = uuid();
    dispatch({
      type: "ADD_ROOM_LIST",
      room: { ...newRoom, roomId: id },
    });
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<AddBoxIcon />}
      >
        Add Room
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={onSubmitFunc}>
          <DialogTitle>Input New Room's Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="roomName"
              label="Room's Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChangeFunc}
              value={roomName}
              required
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              name="roomIntro"
              label="Room's Intro"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChangeFunc}
              value={roomIntro}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="outlined"
              color="success"
              endIcon={<CreateIcon />}
            >
              Create
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

export default AddRoom;
