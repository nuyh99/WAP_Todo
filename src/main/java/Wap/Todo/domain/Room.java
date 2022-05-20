package Wap.Todo.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@ToString
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

    @Column(length = 6)
    private String code;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Todo> todos = new ArrayList<>();

    @ManyToMany(mappedBy = "rooms", fetch = FetchType.LAZY)
    private List<Member> members;
}