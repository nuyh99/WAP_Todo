package Wap.Todo.service;

import Wap.Todo.domain.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class RoomServiceTest {
    private final UserService userService;
    private final RoomService roomService;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final TodoRepository todoRepository;

    @Autowired
    public RoomServiceTest(MemberRepository memberRepository, RoomRepository roomRepository, UserService userService, RoomService roomService, TodoRepository todoRepository) {
        this.userService = userService;
        this.memberRepository = memberRepository;
        this.roomRepository = roomRepository;
        this.roomService = roomService;
        this.todoRepository = todoRepository;
    }

    @Transactional
    @Test
    @DisplayName("방 삭제")
    public void deleteRoom() {
        //given
        Member member = new Member("id", "pw", "name", null);
        userService.join(member);
        Room room = roomService.joinRoom("test", member.getId());
        System.out.println(room);

        //when
        Long id = roomService.deleteRoom(room.getNum(), member.getId());

        //then
        assertThat(id).isNotNull();
    }
}