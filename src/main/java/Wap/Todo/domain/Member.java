package Wap.Todo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@ToString(exclude = "rooms")
@Table(name = "member")
public class  Member {
    @Id
    @Column(length = 20)
    private String id;

    @Column(length = 65)
    private String pw;

    @Column(length = 10)
    private String name;

    @Column(length = 30)
    private String email;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "member_room",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "room_num"))
    private Set<Room> rooms = new HashSet<>();

}