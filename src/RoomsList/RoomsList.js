import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import Loading from "../Loading";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const RoomsList = (prop) => {
  const name = sessionStorage.getItem("name");

  // 방 삭제중인지
  const [isLoading, setisLoading] = useState(false);

  // 방 삭제 함수
  const onClickDelete = (e, detail) => {
    e.preventDefault();
    const inputMsg = prompt(
      `방 삭제를 원하시면 방 이름(${detail.title})을 정확하게 입력하세요.`
    );
    if (inputMsg === detail.title) {
      console.log("일치합니다.");
      setisLoading((prev) => !prev);
      deleteRoom(detail.num);
    } else {
      console.log("방 이름이 일치하지 않습니다. 다시 입력하세요.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "방 이름이 달라요. 다시 입력해주세요.",
      });
    }

    console.log(e, detail);
  };

  // 방 이름을 정확히 입력했을 때
  const deleteRoom = async (num) => {
    axios.defaults.withCredentials = true;
    console.log(num);

    const res = await axios({
      method: "delete",
      url: `http://localhost:8080/room/${num}`,
    });
    setisLoading((prev) => !prev);

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "방이 삭제되었습니다.",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    }
  };

  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <h1 style={{ textAlign: "center" }}>방목록</h1>
      <div style={{ width: "175vh" }}>
        {prop.rooms.map((detail) => {
          return (
            <div
              key={detail.code}
              style={{
                float: "left",
                margin: "0px 0px 0px 10px",
                border: "3px solid black",
                width: "50vh",
                boxSizing: "borderbox",
              }}
            >
              <Link
                to={`/room/${detail.num}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                방 이름 : {detail.title}
                <br />방 한줄 소개 : {detail.introduce}
              </Link>
              <Button
                onClick={(e) => onClickDelete(e, detail)}
                endIcon={<DeleteForeverIcon />}
                style={{ color: "red" }}
              >
                삭제
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomsList;
