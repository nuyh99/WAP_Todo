import { useParams } from "react-router-dom";
import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RoomSetting = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickInviteCode = (e) => {
    const { outerText } = e.target;
    console.log(e.target.outerText);
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(outerText)
        .then(() => {
          alert("클립보드에 복사되었습니다.");
        })
        .catch(() => {
          alert("복사를 다시 시도해주세요.");
        });
    } else {
      // 흐름 2.
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<SettingsApplicationsOutlinedIcon />}
        style={{ width: "145px", margin: "5px 15px 0 10px" }}
      >
        방 상세정보
      </Button>
      <Dialog
        fullWidth
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
        }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              방 상세 정보
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {/* <ListItem button>
            <ListItemText primary="방장" secondary="Titania" />
          </ListItem> */}
          <Divider />
          <ListItem>
            <ListItemText primary="초대코드" />
          </ListItem>
          <ListItem button onClick={onClickInviteCode}>
            <ListItemText secondary={props.inviteCode} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default RoomSetting;
