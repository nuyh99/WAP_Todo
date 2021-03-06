package Wap.Todo.vo;

import Wap.Todo.domain.Todo;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

@NoArgsConstructor
@Getter
@EqualsAndHashCode
public class TodoVO {
    private List<Todo> todos;

    public TodoVO(List<Todo> todos) {
        this.todos = new ArrayList<>();

        PriorityQueue<Todo> pq = new PriorityQueue<>((o1, o2) -> {
            if (o1.getStatus() == o2.getStatus())
                return (int) (o1.getTodoIndex() - o2.getTodoIndex());

            return o1.getStatus().compareTo(o2.getStatus());
        });

        pq.addAll(todos);
        while(!pq.isEmpty())
            this.todos.add(pq.poll());
    }
}
