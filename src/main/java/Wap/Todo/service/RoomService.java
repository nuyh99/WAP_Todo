package Wap.Todo.service;

import Wap.Todo.domain.Member;
import Wap.Todo.domain.MemberRepository;
import Wap.Todo.domain.Room;
import Wap.Todo.domain.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

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
        if(roomRepository.existsById(num))
            if (roomRepository.getById(num).getMaster().equals(id)) {
                Room room=roomRepository.getById(num);
                Member member = memberRepository.getById(id);

                member.getRooms().remove(room);
                roomRepository.deleteById(num);
            }

        return null;
    }
}
