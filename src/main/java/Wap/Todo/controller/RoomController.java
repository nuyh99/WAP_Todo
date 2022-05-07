package Wap.Todo.controller;

import Wap.Todo.domain.Room;
import Wap.Todo.domain.Todo;
import Wap.Todo.service.RoomService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    //방삭제
    @DeleteMapping("/{room_num}")
    @ResponseBody
    public Long deleteRoom(@PathVariable("room_num") Long num, HttpSession session){
        String id = (String)session.getAttribute("memberId");

        return roomService.deleteRoom(num, id);
    }

    //방만들기
    @PostMapping("/invite")
    @ResponseBody
    public Room createRoom(@RequestBody String introduce, HttpSession session){
        String id = (String)session.getAttribute("memberId");

        return roomService.joinRoom(introduce,id);
    }

    //방 초대받기
    @GetMapping("/invite")
    @ResponseBody
    public Room inviteRoom(@RequestBody Map<String, String> code, HttpSession session){
        String id = (String)session.getAttribute("memberId");

        return roomService.attend(code.get("code"), id);
    }

    //방입장
    @GetMapping("/{room_num}")
    @ResponseBody
    public List<Todo> enterRoom(@PathVariable("room_num") Long num){

        return roomService.getTodos(num);
    }

    //투두 등록 및 수정
    @PostMapping("/{room_num}/todo")
    @ResponseBody
    public Todo modifyTodo(@PathVariable("room_num") Long num,
                             @RequestBody Todo todo, HttpSession session){
        String id = (String)session.getAttribute("memberId");

        return roomService.updateTodo(num, todo, id);
    }

    //투두 삭제
    @DeleteMapping("/{room_num}/{id}")
    @ResponseBody
    public Todo deleteTodo(@PathVariable("room_num") Long num,
                             @PathVariable ("id") Long id){
        return roomService.deleteTodo(num, id);
    }
}
