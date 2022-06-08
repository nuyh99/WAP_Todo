package Wap.Todo.controller;

import Wap.Todo.domain.Room;
import Wap.Todo.domain.Todo;
import Wap.Todo.service.RoomService;
import Wap.Todo.vo.TodoVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@Controller
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;

    //방삭제
    @DeleteMapping("/{room_num}")
    @ResponseBody
    public Long deleteRoom(@PathVariable("room_num") Long num, HttpSession session){
        String id = (String)session.getAttribute("memberId");

        return roomService.deleteRoom(num, id);
    }

    //방만들기
    @PostMapping("/create")
    @ResponseBody
    public Room createRoom(@RequestBody Map<String, String> introduce, HttpSession session){
        String id = (String)session.getAttribute("memberId");

        return roomService.joinRoom(introduce.get("introduce"), introduce.get("title"), id);
    }

    //방 초대받기
    @PostMapping("/invite")
    @ResponseBody
    public Room inviteRoom(@RequestBody Map<String, String> code, HttpSession session){
        String id = (String)session.getAttribute("memberId");

        return roomService.attend(code.get("code"), id);
    }

    //방입장
    @GetMapping("/{room_num}")
    @ResponseBody
    public List<Todo> enterRoom(@PathVariable("room_num") Long num){

        return new TodoVO(roomService.getTodos(num)).getTodos();
    }

    //초대 코드 받기
    @GetMapping("/{room_num}/code")
    @ResponseBody
    public String getCode(@PathVariable("room_num") Long num) {
        return roomService.getInviteCode(num);
    }

    //투두 삭제
    @DeleteMapping("/{room_num}/{id}")
    @ResponseBody
    public Todo deleteTodo(@PathVariable("room_num") Long num,
                             @PathVariable ("id") Long id){
        return roomService.deleteTodo(num, id);
    }


    @GetMapping("/code/{room_num}")
    @ResponseBody
    public String sendCode(@PathVariable("room_num") Long num){
        return roomService.sendCode(num);
    }
}
