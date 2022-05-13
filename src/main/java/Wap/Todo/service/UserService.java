package Wap.Todo.service;

import Wap.Todo.domain.Member;
import Wap.Todo.domain.MemberRepository;
import Wap.Todo.domain.Room;
import Wap.Todo.domain.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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

    //중복 확인
    public boolean duplicate(String id) {
        return memberRepository.existsById(id);
    }

    //Member 회원가입
    @Transactional
    public Member join(Member member) throws NoSuchAlgorithmException {
        if(memberRepository.existsById(member.getId()))
            return null;

        member.setRooms(new HashSet<>());

        MessageDigest md= MessageDigest.getInstance("SHA-256");
        md.update(md.digest(member.getPw().getBytes(StandardCharsets.UTF_8)));
        StringBuilder builder = new StringBuilder();
        for (byte b:md.digest())
            builder.append(String.format("%02x", b));
        member.setPw(builder.toString());

        return memberRepository.save(member);
    }

    //로그인 id, pw 확인
    @Transactional
    public String login(Member member) throws NoSuchAlgorithmException {
        if(memberRepository.existsById(member.getId())) {
            MessageDigest md= MessageDigest.getInstance("SHA-256");
            md.update(md.digest(member.getPw().getBytes(StandardCharsets.UTF_8)));
            StringBuilder builder = new StringBuilder();
            for (byte b:md.digest())
                builder.append(String.format("%02x", b));

            Optional<Member> byId = memberRepository.findById(member.getId());
            if(byId.isPresent() && byId.get().getPw().equals(builder.toString()))
                return byId.get().getId()+", "+byId.get().getName();
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
