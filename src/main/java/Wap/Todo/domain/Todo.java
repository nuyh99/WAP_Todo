package Wap.Todo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "todo")
public class Todo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "room_num")
    private Room room;

    private String deadline;
    private String content;
    private Status status;
    private boolean isEditing;

    @Builder.Default
    private Long todoIndex =Long.MAX_VALUE;

    @Column(length = 20)
    private String lastUpdateId;

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", room=" + room.getNum() +
                ", deadline=" + deadline +
                ", content='" + content + '\'' +
                ", status=" + status +
                ", isEditing=" + isEditing +
                ", order=" + todoIndex +
                ", lastUpdateId='" + lastUpdateId + '\'' +
                '}';
    }
}
