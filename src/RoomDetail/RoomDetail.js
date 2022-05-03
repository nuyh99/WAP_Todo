import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Button, Input, TextField } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import CancelIcon from "@mui/icons-material/Cancel";

const itemsFromBackend = [
  { id: uuid(), content: "알고리즘 과제", condition: "ready" },
  { id: uuid(), content: "운영체제 과제", condition: "processing" },
  { id: uuid(), content: "중간고사", condition: "done" },
  { id: uuid(), content: "기말고사", condition: "defer" },
  { id: uuid(), content: "팀프로젝트", condition: "ready" },
];

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
    name: "보류",
    items: [],
  },
};

itemsFromBackend.forEach((element) => {
  console.log("Test");
  columnsFromBackend[element.condition].items.push(element);
});

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
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
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function RoomDetail() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [isClick, setIsClick] = useState(false);

  const [toDoAdd, setToDoAdd] = useState({
    content: "",
  });

  // 일정추가 Input 함수
  const toDoInputFunc = (e) => {
    const { name, value } = e.target;
    setToDoAdd({ ...toDoAdd, content: value });
  };

  // 등록하기 버튼
  const toDoAddFunc = (e) => {
    e.preventDefault();
    columns["ready"].items.push({
      id: uuid(),
      content: toDoAdd.content,
      condition: "ready",
    });
    console.log(toDoAdd.content);

    setIsClick((prev) => !prev);
  };

  // 추가하기, 취소하기 버튼
  const onClickAddOpen = () => {
    setIsClick((prev) => !prev);
    setToDoAdd({ ...toDoAdd, content: "" });
  };
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
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
                            width: 250,
                            minHeight: 500,
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
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                      <Button
                                        style={{ justifyContent: "right" }}
                                        color="error"
                                      >
                                        X
                                      </Button>
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
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        {isClick ? (
          <div>
            <form type="submit" onSubmit={toDoAddFunc}>
              <TextField
                autoFocus
                margin="dense"
                name="toDoName"
                label="toDoName"
                type="text"
                fullWidth
                variant="standard"
                onChange={toDoInputFunc}
                value={toDoAdd.content}
                required
              />
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
    </>
  );
}

export default RoomDetail;
