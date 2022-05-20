package Wap.Todo.service;

import Wap.Todo.domain.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class RoomServiceTest {
    private final UserService userService;
    private final RoomService roomService;
    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;

    @Autowired
    RoomServiceTest(UserService userService, RoomService roomService, RoomRepository roomRepository, MemberRepository memberRepository) {
        this.userService = userService;
        this.roomService = roomService;
        this.roomRepository = roomRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    @Test
    @DisplayName("방 삭제")
    public void deleteRoom() throws NoSuchAlgorithmException {
        //given
        Member member = new Member("id", "pw", "name", null, null);
        member = userService.join(member);        //회원가입

        Room room = roomService.joinRoom("test","제목", member.getId());
        System.out.println(room);               //방 생성

        //when
        Long id = roomService.deleteRoom(room.getNum(), member.getId());

        //then
        assertThat(id).isNotNull();
        assertThat(roomService.deleteRoom(room.getNum() + 1L, member.getId())).isNull();
    }

    @Transactional
    @Test
    @DisplayName("방의 마스터가 해당 방을 삭제했을 때 나머지 유저들 CASCADE")
    public void cascadeTest() throws NoSuchAlgorithmException {
        Member member = new Member("id", "pw2", "name", null, null);
        member = userService.join(member);        //회원가입
        Member member2 = new Member("id2", "pw", "name", null, null);
        member2 = userService.join(member2);        //회원가입

        Room room = roomService.joinRoom("test","", member.getId());
        System.out.println(room);               //방 생성
        roomService.attend(room.getCode(), member2.getId());

        //when
        roomService.deleteRoom(room.getNum(), member.getId());

        //then
        assertThat(memberRepository.getById(member2.getId()).getRooms().contains(room)).isFalse();
        System.out.println(member2.getRooms());
    }

    @Transactional
    @Test
    @DisplayName("방 초대 받기")
    public void invitingUser() throws NoSuchAlgorithmException {
        //given
        Member member = new Member("id", "pw2", "name", null, null);
        member = userService.join(member);        //회원가입
        Member member2 = new Member("id2", "pw", "name", null, null);
        member2 = userService.join(member2);        //회원가입

        Room room = roomService.joinRoom("test","", member.getId());
        System.out.println(room);               //방 생성


        //when
        Room attend = roomService.attend(room.getCode(), member2.getId());

        //then
        assertThat(attend).isNotNull();
        assertThat(member2.getRooms().contains(attend)).isTrue();
    }
}