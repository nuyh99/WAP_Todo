package Wap.Todo.service;

import Wap.Todo.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class RoomService {
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final TodoRepository todoRepository;

    @Autowired
    public RoomService(MemberRepository memberRepository, RoomRepository roomRepository, TodoRepository todoRepository) {
        this.memberRepository = memberRepository;
        this.roomRepository = roomRepository;
        this.todoRepository = todoRepository;
    }

    //방 삭제
    @Transactional
    public Long deleteRoom(Long num, String id) {
        if (roomRepository.existsById(num)) {      //해당 방이 존재하면
            Room room = roomRepository.findById(num).get();
            Member member = memberRepository.getById(id);

            if (room.getMaster().equals(id)) {   //방의 master가 세션의 id와 같으면
                List<Member> members = room.getMembers();
                members.forEach(o->o.getRooms().remove(room));
                roomRepository.deleteById(num);
            } else {
                member.getRooms().remove(room);
                room.getMembers().remove(member);
            }

            return num;
        }

        return null;
    }

    //방 초대코드 받기
    @Transactional
    public String getInviteCode(Long num) {
        return roomRepository.getById(num).getCode();
    }

    //방 만들기
    @Transactional
    public Room joinRoom(String introduce, String title, String id) {

            String generatedString = UUID.randomUUID()
                    .toString()
                    .substring(0, 10);  //초대 코드 생성후 10자리까지 자르기

        Room room = Room.builder()
                .master(id)
                .introduce(introduce)
                .code(generatedString)
                .todos(new ArrayList<>())
                .title(title)
                .members(new ArrayList<>())
                .build();

        Room result = roomRepository.save(room);
        Member member = memberRepository.getById(id);
        member.getRooms().add(result);
        result.getMembers().add(member);

        return result;
    }

    //방 초대 받기
    @Transactional
    public Room attend(String code, String id) {
        List<Room> room = roomRepository.findAll().stream()
                .filter(o -> o.getCode().equals(code))
                .toList();

        if (room.size() == 0)
            return null;

        Member member = memberRepository.getById(id);
        member.getRooms().add(room.get(0));
        room.get(0).getMembers().add(member);
        return room.get(0);
    }

    //방 입장 하기
    @Transactional
    public List<Todo> getTodos(Long num) {
        return roomRepository.getById(num).getTodos();
    }

    //투두 등록 및 수정
    @Transactional
    public Todo updateTodo(Long num, Todo todo) {
        if (todo.getId() == null) {
            todo.setRoom(roomRepository.getById(num));
            roomRepository.getById(num).getTodos().add(todo);
        }

        return todoRepository.save(todo);
    }

    //투두 삭제
    @Transactional
    public Todo deleteTodo(Long num, Long id) {
        Optional<Todo> byId = todoRepository.findById(id);

        if (byId.isPresent()) {
            roomRepository.getById(num).getTodos().remove(byId.get());
            todoRepository.deleteById(id);
            return byId.get();
        }

        return null;
    }

    @Transactional
    public String sendCode(Long num){
        return roomRepository.getById(num).getCode();
    }
}
