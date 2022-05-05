package Wap.Todo.service;

import Wap.Todo.domain.Member;
import Wap.Todo.domain.MemberRepository;
import Wap.Todo.domain.Room;
import Wap.Todo.domain.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public UserService(MemberRepository memberRepository, RoomRepository roomRepository) {
        this.memberRepository = memberRepository;
        this.roomRepository = roomRepository;
    }

    //Member 회원가입
    public Member join(Member member) {
        if(memberRepository.existsById(member.getId()))
            return null;

        return memberRepository.save(member);
    }

    //로그인 id, pw 확인
    public Member login(Member member) {
        if(memberRepository.existsById(member.getId())) {
            Member expected = memberRepository.getById(member.getId());

            if(member.getPw().equals(expected.getPw()))
                return expected;
        }

        return null;
    }

    //방 목록 조회
    public List<Room> getRoomsById(String id) {
        return memberRepository.getById(id).getRooms().stream().toList();
    }
}
