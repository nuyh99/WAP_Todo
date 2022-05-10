import { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import AddTaskIcon from "@mui/icons-material/AddTask";
import * as React from "react";
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
import RoomSetting from "./RoomSetting";
import ToDoDetail from "./ToDoDetail";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
function RoomDetail() {
  // 백엔드에 저장된 ToDo라 가정
  const [itemsFromBackend, setItemFromBackend] = useState([
    {
      condition: "ready",
      index: 0,
      title: "알고리즘",
      content: "알고리즘 과제",
      date: "2022-05-11",
      isEdit: false,
      id: uuid(),
    },
    {
      condition: "processing",
      index: 0,
      title: "운영체제",
      content: "O/S 과제",
      date: "2022-05-14",
      isEdit: false,
      id: uuid(),
    },
    {
      condition: "done",
      index: 0,
      title: "중간고사",
      content: "중간고사대비",
      date: "2022-05-20",
      isEdit: false,
      id: uuid(),
    },
    {
      condition: "ready",
      index: 1,
      title: "기말고사",
      content: "기말고사 대비",
      date: "2022-05-07",
      isEdit: false,
      id: uuid(),
    },
    {
      condition: "ready",
      index: 2,
      title: "팀프로젝트",
      content: "팀프로젝트 대비",
      date: "2022-05-14",
      isEdit: false,
      id: uuid(),
    },
    {
      condition: "processing",
      index: 1,
      title: "파이썬",
      content: "파이썬 공부",
      date: "2022-05-30",
      isEdit: false,
      id: uuid(),
    },
    {
      condition: "defer",
      index: 0,
      title: "자바",
      content: "자바공부",
      date: "2022-06-30",
      isEdit: false,
      id: uuid(),
    },
    {
      condition: "ready",
      index: 3,
      title: "스포츠데이터",
      content: "스포츠데이터 과제",
      date: "2022-07-02",
      isEdit: false,
      id: uuid(),
    },
  ]);

  // 받아온 ToDo를 condition에 따라 분류
  const columnsFromBackend = {
    ready: {
      name: "진행 예정",
      items: [],
    },
    processing: {
      name: "진행 중",
      items: [],
    },
    done: {
      name: "진행 완료",
      items: [],
    },
    defer: {
      name: "잠정 보류",
      items: [],
    },
  };

  // console.log(itemsFromBackend);
  // 백에서 가져온 ToDo를 저장하기위한 State
  const [columns, setColumns] = useState(columnsFromBackend);

  // 백에서 자료를 다 가져왔는지 확인
  const [loading, setLoading] = useState(true);

  // 일정 추가버튼 onClick 여부
  const [isClick, setIsClick] = useState(false);

  // 일정 추가
  const [toDoAdd, setToDoAdd] = useState({
    condition: "ready",
    index: 0,
    title: "",
    content: "",
    date: "",
    isEdit: false,
  });

  // ToDo 추가하거나 가져올 때 호출되는 함수
  const itemforEach = async (itemsFromBackend) => {
    await itemsFromBackend.forEach((element) => {
      columnsFromBackend[element.condition].items.push(element);
    });
    await setColumns(columnsFromBackend);
    // 다 가져오면 setLoading을 false로 바꿔 화면에 ToDo가 렌더링 되게 변경
    await setLoading(false);
  };

  // ToDo를 가져오거나, 추가될 때 사용되는 Hook
  useEffect(() => {
    itemforEach(itemsFromBackend);
  }, [itemsFromBackend]);

  // 05.05 수정중일 때 droppableId를 updating으로 변경
  const onDragStart = (result, columns, setColumns) => {
    columns[result.source.droppableId].items.forEach((element) => {
      if (element.id === result.draggableId) {
        element.isEdit = true;
        console.log(element.isEdit);
      }
    });
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      // isEdit False로
      removed.isEdit = false;

      // sourceItem의 index 재 정렬
      sourceItems.forEach((element) => {
        if (element.index > source.index) {
          element.index -= 1;
        }
      });

      // Column이 다르면 condition과 index를 변경
      removed.condition = destination.droppableId;
      // 옮기는 Item의 항목의 index를 destination의 index로 변경
      removed.index = destination.index;
      // destination의 index를 재 정렬
      destItems.forEach((element) => {
        if (element.index >= destination.index) {
          element.index += 1;
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
    } else {
      // 같은 Droppable에서 바꿀 때
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);

      // isEdit False로
      removed.isEdit = false;
      removed.index = destination.index;

      copiedItems.splice(destination.index, 0, removed);

      /*
    전체 index 재정렬아닌 바뀐 항목만 index 재정렬하도록 수정하기
    */

      // Droppable Item의 Index 재정렬
      let test = 0;
      copiedItems.forEach((element) => {
        element.index = test;
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
    }
  };

  // 일정 추가하기 및 취소 버튼
  const onClickAddOpen = (e) => {
    setIsClick((prev) => !prev);
    setToDoAdd({ title: "", content: "", date: new Date().toLocaleDateString() });
    console.log(toDoAdd.date)
  };

  // 일정 추가 Input
  const toDoInputFunc = (e) => {
    console.log(e.target)
    const { name, value } = e.target;
    setToDoAdd({ ...toDoAdd, [name]: value });
  };
  const setDate = (newDate) => {
    const setNewDate = newDate.toLocaleDateString();
    console.log(setNewDate)
    setToDoAdd({...toDoAdd, date : setNewDate})
  
  }

  
  // toDo 등록 버튼
  const toDoAddFunc = (e) => {
    e.preventDefault();
    const newItem = {
      condition: "ready",
      index: columns["ready"].items.length,
      title: toDoAdd.title,
      content: toDoAdd.content,
      date: toDoAdd.date,
      isEdit: false,
      id: uuid(),
    };

    setItemFromBackend([...itemsFromBackend, newItem]);

    setIsClick((prev) => !prev);
  };

  // toDo 삭제
  const toDoDeleteFunc = (e) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const { id, value } = e.target;
      console.log(value);
      let sortIndex = 0;

      // 다른 Condition을 가진 배열 가져오기
      const anotherConditionArr = itemsFromBackend.filter(
        (element) => element.condition !== id
      );

      // filter를 통해 내가 삭제를 원하는 item을 빼고 새 배열을 생성
      console.log(columns[id]);
      const updateArr = columns[id].items.filter((delId) => {
        if (delId.id === value) {
          sortIndex = delId.index;
        }
        return delId.id !== value;
      });

      updateArr.forEach((element) => {
        if (element.index > sortIndex) {
          element.index -= 1;
        }
      });
      setItemFromBackend([...anotherConditionArr, ...updateArr]);
    }
  };

  // dialog 오픈 여부
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
    console.log(fixToDo);

    setItemFromBackend([
      ...itemsFromBackend.filter((element) => element.id !== fixToDo.id),
      fixToDo,
    ]);
  };


  // 05.09 Add Date
  

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
                            width: "350px",
                            minHeight: "400px",
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
                                            fontSize: "15px",
                                            color: "black",
                                            minWidth: "1px",
                                            padding: "0px 0px 0px 0px",
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
                                              maxWidth: "300px",
                                              textAlign: "left",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {item.title}
                                          </div>
                                        </Button>
                                      </div>
                                      <div>
                                        <Button
                                          style={{
                                            fontSize: "12px",
                                            color: "white",
                                            padding: "0px 0px 0px 0px",
                                            minWidth: "1px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              fontSize: "12px",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              maxWidth: "300px",
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
                                              padding: "0px 0px 0px 0px",
                                            }}
                                            color="error"
                                            onClick={toDoDeleteFunc}
                                            value={item.id}
                                            id={item.condition}
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
                autoFocus
                margin="dense"
                name="title"
                label="ToDo 제목"
                type="text"
                fullWidth
                variant="standard"
                onChange={toDoInputFunc}
                value={toDoAdd.title}
                required
              />
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
          <Button
            onClick={onClickAddOpen}
            endIcon={<AddTaskIcon />}
            variant="contained"
          >
            일정 추가하기
          </Button>
        )}
      </div>
      <div style={{ textAlign: "right" }}>
        <RoomSetting />
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
    </>
  );
}

export default RoomDetail;
