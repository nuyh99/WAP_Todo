package Wap.Todo.service;

import Wap.Todo.domain.Member;
import Wap.Todo.domain.MemberRepository;
import Wap.Todo.domain.Room;
import Wap.Todo.domain.RoomRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class UserServiceTest {
    private final UserService userService;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public UserServiceTest(MemberRepository memberRepository, RoomRepository roomRepository, UserService userService) {
        this.userService = userService;
        this.memberRepository = memberRepository;
        this.roomRepository = roomRepository;
    }

    @Transactional
    @Test
    @DisplayName("회원가입")
    public void join() {
        //given
        Member member = new Member("test", "123", "헤헤", null);

        //when
        userService.join(member);

        //then
        assertThat(memberRepository.findById(member.getId()).get().getId()).isEqualTo("test");
    }

    @Transactional
    @Test
    @DisplayName("중복 회원가입")
    public void duplicateJoin() {
        //given
        Member member = new Member("test", "123", "헤헤", null);
        Member member2 = new Member("test", "123", "헤헤", null);

        //when
        userService.join(member);

        //then
        assertThat(userService.join(member2)).isNull();
    }

    @Transactional
    @Test
    @DisplayName("로그인")
    public void login() {
        //given
        Member member = new Member("test", "123", "헤헤", null);
        Member toLogin = new Member("test", "123", null, null);
        Member toLogin2 = new Member("test", "1234", null, null);

        //when
        userService.join(member);

        //then
        assertThat(userService.login(toLogin)).isNotNull();
        assertThat(userService.login(toLogin2)).isNull();
        System.out.println(userService.login(toLogin).toString());
    }

    @Transactional
    @Test
    @DisplayName("방 목록 가져오기")
    public void getRooms() {
        //given
        Member member = new Member("test", "123", "헤헤", null);
        Room room=new Room();
        room.setNum(5L);

        //when
        userService.join(member);
        roomRepository.save(room);
        memberRepository.getById(member.getId()).getRooms().add(room);

        //then
        assertThat(userService.getRoomsById(member.getId()).get(0).getNum()).isEqualTo(5L);
    }
}