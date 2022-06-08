import { useContext, useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";
import * as React from "react";

import RoomSetting from "./RoomSetting";
import ToDoDetail from "./ToDoDetail";

import ChatIcon from "@mui/icons-material/Chat";
import { Client } from "@stomp/stompjs";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import PublishIcon from "@mui/icons-material/Publish";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { WifiTetheringErrorRounded } from "@mui/icons-material";

function RoomDetail() {
  const param = useParams().roomid; // url에서 roomid가져오기

  const [userName, setName] = useState(sessionStorage.getItem("name"));

  const [inviteCode, setInviteCode] = useState("");

  // 처음 todo 가져오기전에 웹소켓 연결 x
  const [loading, setLoading] = useState(false);

  // 접속시 toDos 가져옴
  const getToDos = async () => {
    const res = await axios({
      method: "get",
      url: `http://localhost:8080/room/${param}`,
    });
    if (res.status === 200) {
      console.log(res.data);
      setColumnsFromBackend(res.data);
    } else {
      console.log(res);
    }
  };

  // 접속시 inviteCode 가져옴
  const getInviteCode = async () => {
    const res = await axios({
      method: "get",
      url: `http://localhost:8080/room/${param}/code`,
    });
    if (res.status === 200) {
      setInviteCode(res.data);
    }
  };

  // 접속시 todos와 invite code 가져오기
  useEffect(() => {
    getToDos();
    getInviteCode();
  }, []);

  // Drag 시작
  const onDragStart = (result, columns, setColumns) => {
    // 06.07 수정 내용 isEditing일 땐 true 변경 안되게
    // columns[result.source.droppableId].items.forEach((element) => {
    //   if (element.id === result.draggableId) {
    //     element.isEdit = true;
    //   }
    // });
    // // 여기에 publish 하기
  };

  // Drag And Drop 구현부 시작부분
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      // 출발지, 목적지 column 가져오기
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      // 출발지, 목적지의 items 배열 가져오기
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);
      console.log(removed);
      console.log(sourceItems);

      // sourceItem의 index 재정렬
      console.log(sourceItems);
      sourceItems.forEach((element) => {
        if (element.todoIndex > source.index) {
          element.todoIndex -= 1;
        }
      });

      // Column이 다르면 condition과 index를 변경
      removed.status = destination.droppableId;
      // 옮기는 Item의 항목의 index를 destination의 index로 변경
      console.log(removed);

      removed.todoIndex = destination.index;
      // destination의 index를 재 정렬
      destItems.forEach((element) => {
        if (element.todoIndex >= destination.index) {
          element.todoIndex += 1;
        }
      });

      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      sendToDosFunc(columnsFromBackend);
    } else {
      // 같은 Droppable에서 바꿀 때
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);

      removed.todoIndex = destination.index;

      copiedItems.splice(destination.index, 0, removed);

      /*
    전체 index 재정렬아닌 바뀐 항목만 index 재정렬하도록 수정하기
    */

      // Droppable Item의 Index 재정렬
      let test = 0;
      copiedItems.forEach((element) => {
        element.todoIndex = test;
        test++;
      });

      console.log(copiedItems);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
      sendToDosFunc(columnsFromBackend);
    }
  };
  // Drag And Drop 구현부 끝부분

  // 새로운 todo 추가 및 취소 버튼
  const onClickAddOpen = (e) => {
    setIsClick((prev) => !prev);
    setToDoAdd({
      content: "",
      date: new Date().toLocaleDateString(),
    });
  };

  // 새로운 todo 추가 textfield 변경 함수
  const toDoInputFunc = (e) => {
    const { name, value } = e.target;
    setToDoAdd({ ...toDoAdd, [name]: value });
  };

  // 새로운 todo 기간 설정 함수
  const setDate = (newDate) => {
    const setNewDate = newDate.toLocaleDateString();
    console.log(setNewDate);
    setToDoAdd({ ...toDoAdd, date: setNewDate });
  };

  // 새로운 toDo 등록 함수
  const toDoAddFunc = (e) => {
    e.preventDefault();
    // newItem을 작성한 걸로

    const newItem = {
      status: "READY",
      todoIndex: columns["READY"].items.length,
      content: toDoAdd.content,
      deadline: "2022-06-08",
      isEditing: false,
      lastUpdateId: userName,
      id: uuid(),
    };

    // 추가한 toDo를 columns에 추가

    const newArr = [...columnsFromBackend, newItem];

    setColumnsFromBackend([...columnsFromBackend, newItem]);

    sendToDosFunc(newArr);
    // 등록하기 버튼 클릭스 일정 추가하기 dialog 닫기
    setIsClick((prev) => !prev);
  };

  // toDo 삭제
  const toDoDeleteFunc = (e) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const { id, value } = e.target;
      console.log(id, value);
      let sortIndex = 0;

      // 다른 Condition을 가진 배열 가져오기
      const anotherConditionArr = columnsFromBackend.filter(
        (element) => element.status !== id
      );

      // filter를 통해 내가 삭제를 원하는 item을 빼고 새 배열을 생성
      console.log(columns[id]);
      const updateArr = columns[id].items.filter((delId) => {
        if (delId.id === value) {
          sortIndex = delId.todoIndex;
        }
        return delId.id !== value;
      });
      console.log(sortIndex);
      updateArr.forEach((element) => {
        if (element.todoIndex > sortIndex) {
          element.todoIndex -= 1;
        }
      });
      const newCols = [...anotherConditionArr, ...updateArr];
      console.log("delete and new cols", newCols);
      sendToDosFunc(newCols);
      setColumnsFromBackend([...anotherConditionArr, ...updateArr]);
    }
  };

  // 가져온 toDo
  const [columnsFromBackend, setColumnsFromBackend] = useState([]);

  // condition에 맞게 toDo나열
  const [columns, setColumns] = useState({
    READY: {
      name: "진행 예정",
      items: [],
    },
    PROCESSING: {
      name: "진행 중",
      items: [],
    },
    DONE: {
      name: "진행 완료",
      items: [],
    },
    DEFER: {
      name: "잠정 보류",
      items: [],
    },
  });

  // 일정 추가버튼 click 여부
  const [isClick, setIsClick] = useState(false);

  // 일정 추가(condition, todoIndex, content, deadline, isEditing)
  const [toDoAdd, setToDoAdd] = useState({
    status: "READY",
    todoIndex: 0,
    content: "",
    deadline: "",
    isEditing: false,
    id: "",
    lastUpdateId: userName,
  });

  // todo들이 바뀌면
  useEffect(() => {
    itemforEach(columnsFromBackend);
  }, [columnsFromBackend]);

  // ToDo 내용 변경, 추가, 삭제시 호출되는 함수
  const itemforEach = async (items) => {
    const newToDos = {
      ...columns,
      READY: {
        name: "진행 예정",
        items: [],
      },
      PROCESSING: {
        name: "진행 중",
        items: [],
      },
      DONE: {
        name: "진행 완료",
        items: [],
      },
      DEFER: {
        name: "잠정 보류",
        items: [],
      },
    };
    await items.forEach((element) => {
      newToDos[element.status].items.push(element);
    });
    setColumns(newToDos);
  };

  const sendToDosFunc = (sendToDos) => {
    handler(sendToDos);
  };

  /* todo websocket*/
  const client = useRef(null);

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  const subscribe = () => {
    console.log("subscribe");
    if (client.current != null) {
      client.current.subscribe(`/topic/todo/${param}`, (data) => {
        const newMessage = JSON.parse(data.body);
        setColumnsFromBackend(newMessage);
        console.log(newMessage);
        // 받아온 메세지를 순차적으로 저장
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

  const handler = (sendToDos1) => {
    if (client.current != null) {
      if (!client.current.connected) {
        return;
      }
      console.log("handler", sendToDos1);
      client.current.publish({
        destination: `/app/todo/${param}`,
        body: JSON.stringify({
          todos: sendToDos1,
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
  /* todo websocket*/

  // 방 상세 정보 dialog 오픈 여부
  const [open, setOpen] = useState(false);

  // 수정하려는 toDo, ToDoDetail에 넘기기 위해
  const [writeTodo, setWriteTodo] = useState();

  const onClickFunczz = (item, e) => {
    setWriteTodo(item);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  /* 05.08 ToDo 수정 오류 */
  const writeTodoFunc = (childToDo) => {
    const fixToDo = childToDo;
    fixToDo.lastUpdateId = userName;
    console.log("fixed!!!", fixToDo);

    const newCol = [
      ...columnsFromBackend.filter((element) => element.id !== fixToDo.id),
      fixToDo,
    ];

    setColumnsFromBackend((tt) => [
      ...tt.filter((element) => element.id !== fixToDo.id),
      fixToDo,
    ]);

    console.log("new col", newCol);
    console.log(columnsFromBackend);
    sendToDosFunc(newCol);
  };

  console.log(columnsFromBackend);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "30px 0px 0px 0px",
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          onDragStart={(result) => onDragStart(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "320px",
                }}
                key={columnId}
              >
                <h3>{column.name}</h3>
                <div style={{ margin: 15 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "skyblue"
                              : "lightgrey",
                            padding: 4,
                            width: "290px",
                            borderRadius: "25px 25px 25px 25px",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#3c473a"
                                          : "grey",
                                        color: "black",
                                        ...provided.draggableProps.style,
                                        borderRadius: "25px 25px 25px 25px",
                                      }}
                                    >
                                      <div>
                                        <Button
                                          style={{
                                            fontSize: "12px",
                                            color: "white",
                                            padding: "0px 0px 0px 0px",
                                            minWidth: "1px",
                                          }}
                                          onClick={(e) =>
                                            onClickFunczz(item, e)
                                          }
                                        >
                                          <div
                                            style={{
                                              fontSize: "12px",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              maxWidth: "290px",
                                              textAlign: "left",
                                            }}
                                          >
                                            {item.content}
                                          </div>
                                        </Button>
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "10px",
                                          color: "black",
                                          height: "20px",
                                        }}
                                      >
                                        <Button
                                          style={{
                                            color: "black",
                                            height: "20px",
                                            padding: "0px 0px 0px 0px",
                                          }}
                                        >
                                          {item.date}
                                        </Button>
                                        <div
                                          style={{
                                            display: "inline-block",
                                            align: "right",
                                            height: "20px",
                                          }}
                                        >
                                          <Button
                                            style={{
                                              fontSize: "10px",
                                              height: "20px",
                                              padding: "0px 0px 0px 125px",
                                            }}
                                            color="error"
                                            onClick={toDoDeleteFunc}
                                            value={item.id}
                                            id={item.status}
                                            disableElevation
                                            startIcon={<DeleteForeverIcon />}
                                          >
                                            삭제
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <div style={{ textAlign: "center", height: "100%" }}>
        {isClick ? (
          <div
            style={{
              maxWidth: "500px",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            <form type="submit" onSubmit={toDoAddFunc}>
              <TextField
                margin="dense"
                name="content"
                label="ToDo 내용"
                type="text"
                fullWidth
                variant="standard"
                onChange={toDoInputFunc}
                value={toDoAdd.content}
                required
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={toDoAdd.date}
                  onChange={setDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <Button
                type="submit"
                endIcon={<PublishIcon />}
                variant="outlined"
                color="success"
              >
                등록하기
              </Button>
              <Button
                onClick={onClickAddOpen}
                endIcon={<CancelIcon />}
                variant="outlined"
                color="error"
              >
                취소하기
              </Button>
            </form>
          </div>
        ) : (
          <>
            <Button
              onClick={onClickAddOpen}
              endIcon={<AddTaskIcon />}
              variant="contained"
            >
              일정 추가하기
            </Button>
            <Button onClick={sendToDosFunc}>todotest</Button>
          </>
        )}
      </div>
      <div style={{ textAlign: "right" }}>
        <RoomSetting inviteCode={inviteCode} />
      </div>
      {open ? (
        <ToDoDetail
          func={closeDialog}
          writeTodo={writeTodo}
          writeTodoFunc={writeTodoFunc}
        />
      ) : (
        ""
      )}
      <div style={{ textAlign: "right" }}>
        <Button
          style={{ width: "145px", margin: "5px 0 0 10px" }}
          variant="outlined"
          endIcon={<ChatIcon />}
        >
          <Link
            to={`/room/chat/${param}`}
            style={{
              textDecoration: "none",
              color: "gray",
            }}
          >
            채팅
          </Link>
        </Button>
      </div>
    </>
  );
}

export default RoomDetail;
