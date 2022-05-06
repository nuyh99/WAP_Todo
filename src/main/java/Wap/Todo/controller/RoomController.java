package Wap.Todo.controller;

import Wap.Todo.domain.Room;
import Wap.Todo.domain.Todo;
import Wap.Todo.service.RoomService;
import Wap.Todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;


@Controller
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomService roomService;

    //방삭제
    @DeleteMapping("/{room_num}")
    @ResponseBody
    public Long deleteRoom(@PathVariable("room_num") Long num, HttpSession session){

        String id = (String)session.getAttribute("memberId");

        Long room_num = roomService.deleteRoom(num, id);
        return room_num;
    }

    //방만들기
    @PostMapping("/invite")
    @ResponseBody
    public String createRoom(@RequestBody String introduce, HttpSession session){

        String id = (String)session.getAttribute("memberId");
        Room room = roomService.joinRoom(introduce,id);

        return room.toString();
    }

    //방 초대받기
    @GetMapping("/invite")
    @ResponseBody
    public String inviteRoom(@RequestBody Map<String, String> code, HttpSession session){


        String id = (String)session.getAttribute("memberId");
        Room room = roomService.attend(code.get("code"), id);
        if(room == null)
            return null;
        return room.toString();
    }

    //방입장
    @GetMapping("/{room_num}")
    @ResponseBody
    public List<Todo> enterRoom(@PathVariable("room_num") Long num){

        List<Todo> todos = roomService.getTodos(num);
        return todos;
    }

    //투두 등록 및 수정
    @PostMapping("/{room_num}/todo")
    @ResponseBody
    public String modifyTodo(@PathVariable("room_num") Long num,
                             @RequestBody Todo todo, HttpSession session){
        String id = (String)session.getAttribute("memberId");

        Todo updatetodo = roomService.updateTodo(num, todo, id);
        return updatetodo.toString();
    }

    //투두 삭제
    @DeleteMapping("/{room_num}/{id}")
    @ResponseBody
    public String deletetodo(@PathVariable("room_num") Long num,
                           @PathVariable ("id") Long id){
        Todo todo = roomService.deleteTodo(num, id);

        return todo.toString();
    }



}
