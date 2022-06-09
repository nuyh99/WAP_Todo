package Wap.Todo.dto;

import Wap.Todo.domain.Status;
import Wap.Todo.domain.Todo;
import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDTO {
    private String id;
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
                .status(dto.status)
                .todoIndex(dto.todoIndex)
                .build();
    }
}
