package Wap.Todo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "todo")
public class Todo {
    @Id
    private String id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "room_num")
    private Room room;

    private String deadline;
    private String content;
    private Status status;

    @JsonProperty(value = "isEditing")
    private boolean isEditing;

    @Builder.Default
    private Long todoIndex =Long.MAX_VALUE;

    @Column(length = 20)
    private String lastUpdateId;

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", deadline=" + deadline +
                ", content='" + content + '\'' +
                ", status=" + status +
                ", isEditing=" + isEditing +
                ", order=" + todoIndex +
                ", lastUpdateId='" + lastUpdateId + '\'' +
                '}';
    }
}
