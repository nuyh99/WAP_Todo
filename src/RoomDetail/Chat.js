import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { Button, TextField } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import { border } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const Chat = () => {
  const room_num = useParams().roomid;

  const [userInfo, setUserInfo] = useState(sessionStorage.getItem("name")); // 유저 정보 저장

  const navi = useNavigate();

  const [isSend, setIsSend] = useState(false); // Chat 전송 클릭 여부
  const [chat, setChat] = useState("");

  const [receiveChats, setReceiveChats] = useState([]);

  const client = useRef(null);

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  // 채팅 작성
  const setChatFunc = (e) => {
    const { value } = e.target;
    setChat(value);
  };

  // 채팅 보내기
  const chatSendFunc = (e) => {
    e.preventDefault();
    setChat("");
    handler();
  };

  const subscribe = () => {
    if (client.current != null) {
      client.current.subscribe(`/topic/chat/${room_num}`, (data) => {
        const newMessage = JSON.parse(data.body);
        // 받아온 메세지를 순차적으로 저장
        setReceiveChats((receiveChats) => [...receiveChats, { ...newMessage }]);
      });
    }
  };

  console.log(receiveChats);

  const connect = () => {
    client.current = new Client({
      // brokerURL: "ws://localhost:8080/ws/websocket",
      brokerURL: "ws://50.18.213.243:8080/ws/websocket",

      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        subscribe();
      },
    });
    client.current.activate();
  };

  const handler = () => {
    if (client.current != null) {
      if (!client.current.connected) {
        return;
      }
      client.current.publish({
        destination: "/app/chat",
        body: JSON.stringify({
          room: room_num,
          message: chat,
          id: userInfo,
          name: userInfo,
        }),
      });
    }
  };

  const disConnect = () => {
    if (client.current != null) {
      if (client.current.connected) client.current.deactivate();
    }
    console.log("disconnected");
  };

  // 뒤로가기 누르면 원래 페이지로 이동
  const backRoom = () => {
    navi(`/room/${room_num}`);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>실시간 채팅</h1>
      <div
        style={{
          width: "80vh",
          height: "80vh",
          border: "3px solid gray",
          margin: "0 auto",
        }}
      >
        <div style={{ width: "80vh", height: "70vh", overflow: "auto" }}>
          {receiveChats.map((chat) => {
            if (chat.id !== userInfo) {
              return (
                <div
                  key={chat.uniId}
                  style={{
                    color: "black",
                    height: "25px",
                    margin: "5px 0 0 0",
                  }}
                >
                  [{chat.name}] : {chat.message}
                </div>
              );
            } else {
              return (
                <div
                  key={chat.uniId}
                  style={{
                    color: "black",
                    height: "25px",
                    margin: "5px 0 0 0",
                    textAlign: "right",
                  }}
                >
                  {chat.message} : [나]
                </div>
              );
            }
          })}
        </div>
        <div>
          <form onSubmit={chatSendFunc}>
            <TextField
              name="message"
              onChange={(e) => setChatFunc(e)}
              value={chat}
              variant="outlined"
              label="Input Message"
              style={{
                width: "50vh",
                margin: "0 10px 0 10px",
              }}
            />
            <Button
              variant="outlined"
              type="submit"
              endIcon={<SendIcon />}
              style={{ width: "80px" }}
            >
              Send
            </Button>
            <Button
              variant="outlined"
              type="submit"
              endIcon={<ExitToAppIcon />}
              onClick={backRoom}
              style={{ width: "80px", margin: "0 0 0 15px", color: "red" }}
            >
              Back
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
