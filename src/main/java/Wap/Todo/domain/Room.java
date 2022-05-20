package Wap.Todo.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long num;

    @Column(length = 20)
    private String master;

    @Column(length = 20)
    private String title;

    private String introduce;

    @Column(length = 10)
    private String code;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Todo> todos = new ArrayList<>();

    @ManyToMany(mappedBy = "rooms", fetch = FetchType.LAZY)
    private List<Member> members;

    @Override
    public String toString() {
        return "Room{" +
                "num=" + num +
                ", master='" + master + '\'' +
                ", title='" + title + '\'' +
                ", introduce='" + introduce + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
}