import { Button } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect, useState } from "react";
import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";

const Chat = (prop) => {

    const endPoint = prop.endPoint;

    console.log(prop)

    // chat 아이콘 클릭여부
    const [open, setOpen] = useState(false);

    // chat 목록
    const [chats, setChats] = useState([])

    var sock = new SockJS(`http://localhost:8080/room`)
    let client = Stomp.over(sock);
    

    const onClickChat = async () => {
        setOpen(prev => !prev);
    }

    useEffect( () => {
        if(open === true) {
            connectSock();
        } else {
            unconnectSock();
        }
    },[open])


    client.connect({}, () => client.subscribe(`topic/chat/todo/${endPoint}`), (data) => {
        const newMessage = JSON.parse(data.body);
        console.log(newMessage);
        setChats([...chats, newMessage]);
    })     



    const connectSock = () => {
        // console.log("gooood!!~");
        // client.connect({}, () => client.subscribe(`topic/chat/todo/${endPoint}`), (data) => {
        //     const newMessage = JSON.parse(data.body);
        //     setChats([...chats, newMessage]);
        // })        
    }

    const unconnectSock = () => {
        console.log("unconnect")
    }
    
    // const onClickSend = () => {
    //     client.connect({}, () => client.send(), (data) => {

    //     })
    // }
    
    return (
        <>
        <div>
            <Button variant="outlined" endIcon={<ChatIcon /> } onClick={onClickChat}>채팅</Button>
        </div>
        {open ? "" : ""}
        </>
    )
}


export default Chat;