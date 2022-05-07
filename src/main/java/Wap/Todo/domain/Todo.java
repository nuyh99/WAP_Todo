package Wap.Todo.domain;

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

    @ManyToOne
    @JoinColumn(name = "room_num")
    private Room room;

    private Date deadline;
    private String content;
    private Status status;
    private boolean isEditing;

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
                ", lastUpdateId='" + lastUpdateId + '\'' +
                '}';
    }
}
