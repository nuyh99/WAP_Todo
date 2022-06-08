import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CancelIcon from "@mui/icons-material/Cancel";
import CreateIcon from "@mui/icons-material/Create";

import axios from "axios";

const AddRoom = () => {
  const [open, setOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    title: "",
    introduce: "",
  });
  const { title, introduce } = newRoom; // 비구조화 할당으로 객체 분해

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    // Dialog 닫을 때 초기화
    setOpen(false);
    setNewRoom({
      title: "",
      introduce: "",
    });
  };

  const onChangeFunc = (e) => {
    const { value, name } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const hi = () => {
    console.log("asd");
  };

  const onSubmitFunc = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: "/room/create",
      // url: "http://localhost:8080/room/create",
      data: {
        title: title,
        introduce: introduce,
      },
    });
    if (res.status === 200) {
      handleClose();
      setInterval(() => {
        window.location.replace("/");
      }, 500);
    } else {
      handleClose();
    }
  };

  return (
    <div style={{ margin: "7px 15px 0 0" }}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<AddBoxIcon />}
        style={{ width: "180px" }}
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
              name="title"
              label="Room's Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChangeFunc}
              value={title}
              required
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              name="introduce"
              label="Room's Intro"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChangeFunc}
              value={introduce}
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
