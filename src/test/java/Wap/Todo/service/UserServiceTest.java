package Wap.Todo.service;

import Wap.Todo.domain.Member;
import Wap.Todo.domain.MemberRepository;
import Wap.Todo.domain.RoomRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class UserServiceTest {
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public UserServiceTest(MemberRepository memberRepository, RoomRepository roomRepository) {
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
        memberRepository.saveAndFlush(member);

        //then
        assertThat(memberRepository.findById(member.getId()).get().getId()).isEqualTo("test");
    }

}