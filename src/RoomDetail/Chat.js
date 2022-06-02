import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { Button, TextField } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import { border } from "@mui/system";

const Chat = () => {
  const room_num = useParams();

  const client = useRef(null);

  const [userInfo, setUserInfo] = useState("test"); // 유저 정보 저장
  const [isSend, setIsSend] = useState(false); // Chat 전송 클릭 여부
  const [chat, setChat] = useState("");

  const [receiveChats, setReceiveChats] = useState([]);

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
      client.current.subscribe(`/topic/chat/${room_num.roomid}`, (data) => {
        const newMessage = JSON.parse(data.body);
        // 받아온 메세지를 순차적으로 저장
        setReceiveChats((receiveChats) => [
          ...receiveChats,
          { ...newMessage, uniId: uuid() },
        ]);
      });
    }
  };

  console.log(receiveChats);

  const connect = () => {
    client.current = new Client({
      brokerURL: "ws://localhost:8080/ws/websocket",
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
          room: room_num.roomid,
          message: chat,
          id: "test",
          name: "test",
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

  return (
    <>
      <h1 style={{ textAlign: "center" }}>실시간 채팅</h1>
      <div
        style={{
          width: "100vh",
          height: "100vh",
          border: "3px solid gray",
          margin: "0 auto",
        }}
      >
        <div style={{ width: "80vh", height: "90vh" }}>
          {receiveChats.map((chat) => {
            if (chat.id === userInfo) {
              return (
                <div key={chat.uniId} style={{ color: "red" }}>
                  [{chat.name}] : {chat.message}
                </div>
              );
            } else {
              return (
                <div key={chat.uniId}>
                  [{chat.name}] : {chat.message}{" "}
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
              label="Input text"
              style={{
                width: "70vh",
                margin: "0 10px 0 10px",
              }}
            />
            <Button variant="outlined" type="submit">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
