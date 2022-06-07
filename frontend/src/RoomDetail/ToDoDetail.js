import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import CreateIcon from "@mui/icons-material/Create";

const ToDoDetail = (prop) => {
  const [writeTodo, setWriteTodo] = useState("");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setWriteTodo(prop.writeTodo);
    setOpen(true);
  }, []);

  const handleClose = (e) => {
    prop.func();
  };

  const onSubmitFunc = (e) => {
    e.preventDefault();
    prop.writeTodoFunc(writeTodo);
    prop.func();
  };

  const onChangeFunc = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setWriteTodo({ ...writeTodo, [name]: value });
  };

  return (
    <>
      {writeTodo === "" ? (
        ""
      ) : (
        <div>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <form onSubmit={onSubmitFunc}>
              <DialogTitle>{prop.writeTodo.title}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="title"
                  label="제목바꾸기"
                  type="text"
                  fullWidth
                  variant="standard"
                  required
                  onChange={onChangeFunc}
                  value={writeTodo.title}
                />
                <br />
                <TextField
                  autoFocus
                  margin="dense"
                  name="content"
                  label="내용 바꾸기"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={writeTodo.content}
                  onChange={onChangeFunc}
                  multiline
                  rows={4}
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
                  바꾸기
                </Button>

                <Button
                  onClick={handleClose}
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
      )}
    </>
  );
};

export default ToDoDetail;
