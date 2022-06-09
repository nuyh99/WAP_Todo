import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import CreateIcon from "@mui/icons-material/Create";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ToDoDetail = (prop) => {
  const [writeTodo, setWriteTodo] = useState("");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setWriteTodo(prop.writeTodo);
    setOpen(true);
  }, []);

  const handleClose = (e) => {
    writeTodo.isEditing = false;
    prop.writeTodoFunc(writeTodo);
    prop.func();
  };

  const onSubmitFunc = (e) => {
    e.preventDefault();
    writeTodo.isEditing = false;
    prop.writeTodoFunc(writeTodo);
    prop.func();
  };

  const onChangeFunc = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setWriteTodo({ ...writeTodo, [name]: value });
  };

  const setDate = (newDate) => {
    const setNewDate = newDate.toLocaleDateString();
    console.log(setNewDate);
    setWriteTodo({ ...writeTodo, deadline: setNewDate });
  };

  return (
    <>
      {writeTodo === "" ? (
        ""
      ) : (
        <div>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <form onSubmit={onSubmitFunc}>
              <DialogTitle>{prop.writeTodo.content}</DialogTitle>
              <DialogContent>
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
                  rows={2}
                  required
                />
              </DialogContent>
              <DialogActions>
                <div style={{ margin: "0px 40px 0px 0px" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date desktop"
                      inputFormat="MM/dd/yyyy"
                      value={writeTodo.deadline}
                      onChange={setDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
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
