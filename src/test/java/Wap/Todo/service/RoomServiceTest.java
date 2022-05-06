package Wap.Todo.service;

import Wap.Todo.domain.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class RoomServiceTest {
    private final UserService userService;
    private final RoomService roomService;

    @Autowired
    public RoomServiceTest(MemberRepository memberRepository, RoomRepository roomRepository, UserService userService, RoomService roomService, TodoRepository todoRepository) {
        this.userService = userService;
        this.roomService = roomService;
    }

    @Transactional
    @Test
    @DisplayName("방 삭제")
    public void deleteRoom() {
        //given
        Member member = new Member("id", "pw", "name", null);
        member = userService.join(member);        //회원가입

        Room room = roomService.joinRoom("test", member.getId());
        System.out.println(room);               //방 생성

        //when
        Long id = roomService.deleteRoom(room.getNum(), member.getId());

        //then
        assertThat(id).isNotNull();
        assertThat(roomService.deleteRoom(room.getNum() + 1L, member.getId())).isNull();
    }

    @Transactional
    @Test
    @DisplayName("방 초대 받기")
    public void invitingUser() {
        //given
        Member member = new Member("id", "pw", "name", null);
        member = userService.join(member);        //회원가입
        Member member2 = new Member("id2", "pw", "name", null);
        member2 = userService.join(member2);        //회원가입

        Room room = roomService.joinRoom("test", member.getId());
        System.out.println(room);               //방 생성

        //when
        Room attend = roomService.attend(room.getCode(), member2.getId());

        //then
        assertThat(attend).isNotNull();
        assertThat(member2.getRooms().contains(attend)).isTrue();
    }

    @Transactional
    @Test
    @DisplayName("투두 받기")
    public void getTodos() {
        //given
        Member member = new Member("id", "pw", "name", null);
        member = userService.join(member);        //회원가입
        Room room = roomService.joinRoom("test", member.getId());   //방 생성
        Todo todo = Todo.builder()
                .content("dfjklsdjklf")
                .build();

        //when
        todo=roomService.updateTodo(room.getNum(), todo, member.getId());    //방에 투두 추가

        System.out.println(todo);
        System.out.println(room);

        //then
        assertThat(roomService.getTodos(room.getNum()).size()).isEqualTo(1);    //방의 투두 갯수=1
        roomService.deleteTodo(room.getNum(), todo.getId());                    //방의 투두 삭제
        assertThat(roomService.getTodos(room.getNum()).size()).isEqualTo(0);    //방의 투두 갯수=0
    }

    @Transactional
    @Test
    @DisplayName("투두 삭제")
    public void deleteTodo() {
        //given
        Member member = new Member("id", "pw", "name", null);
        member = userService.join(member);        //회원가입
        Room room = roomService.joinRoom("test", member.getId());   //방 생성
        Todo todo = Todo.builder()
                .content("dfjklsdjklf")
                .build();
        todo=roomService.updateTodo(room.getNum(), todo, member.getId());    //방에 투두 추가

        //when
        roomService.deleteTodo(room.getNum(), todo.getId());                 //투두 삭제

        //then
        assertThat(roomService.getTodos(room.getNum()).size()).isEqualTo(0); //방의 투두 갯수=0
    }
}