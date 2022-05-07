package Wap.Todo.service;

import Wap.Todo.domain.Member;
import Wap.Todo.domain.MemberRepository;
import Wap.Todo.domain.Room;
import Wap.Todo.domain.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

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
    @Transactional
    public Member join(Member member) {
        if(memberRepository.existsById(member.getId()))
            return null;

        member.setRooms(new HashSet<>());
        return memberRepository.save(member);
    }

    //로그인 id, pw 확인
    @Transactional
    public Member login(Member member) {
        if(memberRepository.existsById(member.getId())) {
            Optional<Member> byId = memberRepository.findById(member.getId());
            if(byId.isPresent() && member.getPw().equals(byId.get().getPw()))
                return byId.get();
        }

        return null;
    }

    //방 목록 조회
    @Transactional
    public List<Room> getRoomsById(String id) {
        Optional<Member> byId = memberRepository.findById(id);
        return byId.map(member -> member.getRooms().stream().toList()).orElse(null);
    }
}
