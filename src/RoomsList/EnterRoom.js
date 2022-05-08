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
import { useNavigate } from "react-router-dom";

const EnterRoom = () => {
  const [open, setOpen] = useState(false);
  const [enterCode, setEnderCode] = useState("");

  const navigate = useNavigate();

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

  const onSubmitFunc = (e) => {
    e.preventDefault();
    navigate(`/room/${enterCode}`);
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
