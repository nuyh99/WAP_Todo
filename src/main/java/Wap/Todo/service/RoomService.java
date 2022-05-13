package Wap.Todo.service;

import Wap.Todo.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

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
            if (roomRepository.getById(num).getMaster().equals(id)) {   //방의 master가 세션의 id와 같으면
                Room room = roomRepository.getById(num);
                Member member = memberRepository.getById(id);

                member.getRooms().remove(room);
                memberRepository.findAll().stream()
                        .filter(o -> o.getRooms().contains(room))
                        .forEach(o -> o.getRooms().remove(room));

                roomRepository.deleteById(num);
            } else {
                memberRepository.getById(id).getRooms().remove(roomRepository.getById(num));
            }

            return num;
        }

        return null;
    }

    //방 만들기
    @Transactional
    public Room joinRoom(String introduce, String title, String id) {
        Random random = new Random();       //랜덤 초대 코드 생성
        String generatedString = random.ints(48, 123)
                .limit(6)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        Room room = Room.builder()
                .master(id)
                .introduce(introduce)
                .code(generatedString)
                .todos(new ArrayList<>())
                .title(title)
                .build();

        Room result = roomRepository.save(room);
        memberRepository.getById(id).getRooms().add(result);

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

        memberRepository.getById(id).getRooms().add(room.get(0));
        return room.get(0);
    }

    //방 입장 하기
    @Transactional
    public List<Todo> getTodos(Long num) {
        return roomRepository.getById(num).getTodos();
    }

    //투두 등록 및 수정
    @Transactional
    public Todo updateTodo(Long num, Todo todo, String id) {
        if (todo.getId() != null && todoRepository.existsById(todo.getId())) {      //투두 수정
            todo.setLastUpdateId(id);
            return todoRepository.save(todo);
        } else {                                            //투두 등록
            Todo result = Todo.builder()
                    .room(roomRepository.getById(num))
                    .content(todo.getContent())
                    .deadline(todo.getDeadline())
                    .lastUpdateId(id)
                    .isEditing(false)
                    .status(todo.getStatus())
                    .todoIndex(todo.getTodoIndex())
                    .build();

            result = todoRepository.save(result);
            roomRepository.getById(num).getTodos().add(result);
            return result;
        }
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
}
