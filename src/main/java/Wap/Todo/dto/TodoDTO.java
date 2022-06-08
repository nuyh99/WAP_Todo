package Wap.Todo.dto;

import Wap.Todo.domain.Room;
import Wap.Todo.domain.Status;
import Wap.Todo.domain.Todo;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDTO {
    private Long id;
    private Room room;
    private String deadline;
    private String content;
    private Status status;
    private boolean isEditing;
    private Long todoIndex;
    private String lastUpdateId;

    private List<TodoDTO> todos;

    public Todo convertToTodo(TodoDTO dto) {

        return Todo.builder()
                .isEditing(dto.isEditing())
                .content(dto.content)
                .deadline(dto.deadline)
                .id(dto.id)
                .lastUpdateId(dto.lastUpdateId)
                .room(dto.room)
                .status(dto.status)
                .todoIndex(dto.todoIndex)
                .build();
    }
}
