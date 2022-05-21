import React, { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const Chat = (prop) => {
  console.log("chat");
  const room_num = prop.room_num;
  const client = useRef(null);

  const [isOpenChat, setIsOpenChat] = useState(false); // Chat 아이콘 클릭 여부

  const [isSend, setIsSend] = useState(false); // Chat 전송 클릭 여부

  const [chat, setChat] = useState("");

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  const subscribe = () => {
    if (client.current != null) {
      client.current.subscribe(`/topic/chat/${room_num}`, (data) => {
        const newMessage = data;
        console.log(newMessage);
      });
    }
  };

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
          room: room_num,
          message: chat,
          id: "세션스토리지 아이디",
          name: "세션스토리지 네임",
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
      <div style={{ textAlign: "right" }}>
        <Button onClick={handler} startIcon={<ChatIcon />} variant="outlined">
          Chat
        </Button>
      </div>
    </>
  );
};

export default Chat;
