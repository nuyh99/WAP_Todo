package Wap.Todo.service;

import Wap.Todo.domain.Member;
import Wap.Todo.domain.MemberRepository;
import Wap.Todo.domain.Room;
import Wap.Todo.domain.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;
import java.util.random.RandomGenerator;

@Service
public class RoomService {
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(MemberRepository memberRepository, RoomRepository roomRepository) {
        this.memberRepository = memberRepository;
        this.roomRepository = roomRepository;
    }

    //방 삭제
    @Transactional
    public Long deleteRoom(Long num, String id) {
        if(roomRepository.existsById(num))      //해당 방이 존재하면
            if (roomRepository.getById(num).getMaster().equals(id)) {   //방의 master가 세션의 id와 같으면
                Room room=roomRepository.getById(num);
                Member member = memberRepository.getById(id);

                member.getRooms().remove(room);
                roomRepository.deleteById(num);
            }

        return null;
    }

    //방 만들기
    @Transactional
    public Room joinRoom(String introduce, String id) {
        Random random = new Random();       //랜덤 초대 코드 생성
        String generatedString = random.ints(48, 123)
                .limit(6)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        Room room = Room.builder()
                .master(id)
                .introduce(introduce)
                .code(generatedString)
                .build();

        return roomRepository.save(room);
    }
}
